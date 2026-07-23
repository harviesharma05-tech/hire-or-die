/* =========================
HIRE OR DIE V20
ENGINE.JS
Canvas, states, input, HUD, save/load, main loop
========================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GAME_STATE = {
    MENU: "menu",
    PLAYING: "playing",
    PAUSED: "paused",
    GAMEOVER: "gameover",
    VICTORY: "victory"
};

let gameState = GAME_STATE.MENU;

const player = {
    name: "Player",
    character: "pixelBlaze",
    characterImg: "pixel-blaze.jpeg",
    facing: 1,
    moving: false,
    x: 100,
    y: 100,
    radius: 16,
    speed: 3,
    hp: 100,
    maxHp: 100,
    mana: 100,
    maxMana: 100,
    level: 1,
    xp: 0,
    xpToNext: 50,
    coins: 0,
    gems: 0,
    inventory: { potion: 0, mana: 0, key: 0, gem: 0, coin: 0, fragment: 0 },
    skillsUnlocked: [],
    mapsUnlocked: [0],
    lastHitTime: 0
};

let currentLevelIndex = 0;
let achievementsUnlocked = [];
let skillCooldowns = {};

// V21: Difficulty and missions
let difficulty = "normal";
let dailyMissions = {};
let leaderboard = JSON.parse(localStorage.getItem("leaderboardV21") || "[]");
let comboCounter = 0;
let lastCorrectAnswerTime = 0;
let passiveHealTimer = 0;

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
    if (e.key.toLowerCase() === " ") {
        handleAttackInput();
    }
});
window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function isMovingUp() { return keys["w"] || keys["arrowup"]; }
function isMovingDown() { return keys["s"] || keys["arrowdown"]; }
function isMovingLeft() { return keys["a"] || keys["arrowleft"]; }
function isMovingRight() { return keys["d"] || keys["arrowright"]; }

/* -------------------------
HUD
------------------------- */

function updateHUD() {
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.innerText !== String(val)) {
            el.classList.remove("pop");
            void el.offsetWidth;
            el.classList.add("pop");
        }
        el.innerText = val;
    };
    set("hp", Math.max(0, Math.floor(player.hp)));
    set("mana", Math.max(0, Math.floor(player.mana)));
    set("level", player.level);
    set("xp", player.xp);
    set("coins", player.coins);
    set("gems", player.gems);

    const info = document.getElementById("infoPanel");
    if (info) {
        const lvl = LEVELS[currentLevelIndex];
        const map = MAPS[lvl.mapIndex];
        const charName = (CHARACTERS.find(c => c.id === player.character) || {}).name || "Unknown";
        info.innerHTML = `
            <h2>📜 Info</h2>
            <p>👤 ${player.name}</p>
            <p>⚔ Character: ${charName}</p>
            <p>🗺 Map: ${map.name}</p>
            <p>📖 Level: ${lvl.levelInMap}/5</p>
            <p>🏅 Progress: ${currentLevelIndex}/${LEVELS.length}</p>
        `;
    }
}

function showMessage(text, ms = 2000) {
    const el = document.getElementById("message");
    if (!el) return;
    el.innerText = text;
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
    clearTimeout(showMessage._t);
    showMessage._t = setTimeout(() => { el.innerText = "HIRE OR DIE V20"; }, ms);
}

/* -------------------------
XP / LEVEL UP
------------------------- */

function grantXP(amount) {
    if (player.skillsUnlocked.includes("doubleXp")) amount *= 2;
    player.xp += amount;
    while (player.xp >= player.xpToNext) {
        player.xp -= player.xpToNext;
        player.level++;
        player.xpToNext = Math.floor(player.xpToNext * 1.25);
        player.maxHp += 10;
        player.hp = player.maxHp;
        player.maxMana += 5;
        player.mana = player.maxMana;
        playSound("levelup.mp3");
        showMessage(`⭐ Level Up! Now Level ${player.level}`, 2500);
    }
}

function grantRewards({ xp = 0, coins = 0, gems = 0 }) {
    const diff = DIFFICULTIES.find(d => d.id === difficulty);
    const mult = diff ? diff.xpMult : 1;
    grantXP(Math.floor(xp * mult));
    player.coins += coins;
    player.gems += gems;
}

function applyComboBonus(baseDamage) {
    const now = performance.now();
    if (now - lastCorrectAnswerTime < 8000) {
        comboCounter++;
        const bonus = 1 + (comboCounter * 0.1);
        showMessage(`🔥 COMBO x${comboCounter}! +${Math.floor(baseDamage * (bonus - 1))} damage`, 1500);
        return Math.floor(baseDamage * bonus);
    }
    comboCounter = 0;
    return baseDamage;
}

function passiveHeal() {
    const now = performance.now();
    if (now - passiveHealTimer > 5000) {
        passiveHealTimer = now;
        if (player.hp < player.maxHp) {
            player.hp = Math.min(player.maxHp, player.hp + 5);
        }
        if (player.mana < player.maxMana) {
            player.mana = Math.min(player.maxMana, player.mana + 3);
        }
    }
}

function damagePlayer(amount) {
    const tempShield = player._shieldUntil && performance.now() < player._shieldUntil;
    if (player.skillsUnlocked.includes("shield") || tempShield) amount *= 0.5;
    player.hp -= amount;
    triggerHitFlash();
    triggerShake(6, 220);
    if (player.hp <= 0) {
        player.hp = 0;
        triggerGameOver();
    }
}

/* -------------------------
SCREEN SHAKE
------------------------- */

const shakeState = { magnitude: 0, until: 0 };

function triggerShake(magnitude, ms) {
    shakeState.magnitude = magnitude;
    shakeState.until = performance.now() + ms;
}

function getShakeOffset() {
    if (performance.now() > shakeState.until) return { x: 0, y: 0 };
    const m = shakeState.magnitude;
    return { x: (Math.random() - 0.5) * m, y: (Math.random() - 0.5) * m };
}

function triggerHitFlash() {
    const el = document.getElementById("hitFlash");
    if (!el) return;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 120);
}

/* -------------------------
PARTICLES
------------------------- */

let particles = [];

function spawnParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        particles.push({
            x, y,
            vx: Math.cos(ang) * speed,
            vy: Math.sin(ang) * speed,
            life: 1,
            color
        });
    }
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.03;
    });
    particles = particles.filter(p => p.life > 0);
}

function renderParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

/* -------------------------
PAUSE / MUTE
------------------------- */

let previousStateBeforePause = null;

function togglePause() {
    if (gameState === GAME_STATE.PLAYING) {
        previousStateBeforePause = GAME_STATE.PLAYING;
        gameState = GAME_STATE.PAUSED;
        showOverlay("pauseOverlay");
    } else if (gameState === GAME_STATE.PAUSED) {
        gameState = GAME_STATE.PLAYING;
        hideOverlays();
    }
}

function toggleMute() {
    soundEnabled = !soundEnabled;
    if (!soundEnabled) stopBossMusic();
    const btn = document.getElementById("muteBtn");
    if (btn) btn.innerText = soundEnabled ? "🔊" : "🔇";
}

/* -------------------------
SAVE / LOAD
------------------------- */

function saveGame() {
    try {
        const data = { player, currentLevelIndex, achievementsUnlocked };
        localStorage.setItem("hireOrDieV20Save", JSON.stringify(data));
    } catch (e) { /* storage unavailable, ignore */ }
}

function loadGame() {
    try {
        const raw = localStorage.getItem("hireOrDieV20Save");
        if (!raw) return false;
        const data = JSON.parse(raw);
        Object.assign(player, data.player);
        currentLevelIndex = data.currentLevelIndex || 0;
        achievementsUnlocked = data.achievementsUnlocked || [];
        return true;
    } catch (e) {
        return false;
    }
}

function hasSave() {
    return !!localStorage.getItem("hireOrDieV20Save");
}

setInterval(() => { if (gameState === GAME_STATE.PLAYING) saveGame(); }, 60000);

/* -------------------------
GAME OVER / VICTORY
------------------------- */

function triggerGameOver() {
    gameState = GAME_STATE.GAMEOVER;
    showOverlay("gameoverOverlay");
}

function triggerVictory() {
    gameState = GAME_STATE.VICTORY;
    playSound("victory.mp3");
    showOverlay("victoryOverlay");
}

function showOverlay(id) {
    document.querySelectorAll(".overlay").forEach(el => el.classList.add("hidden"));
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}

function hideOverlays() {
    document.querySelectorAll(".overlay").forEach(el => el.classList.add("hidden"));
}

/* -------------------------
MAIN LOOP
------------------------- */

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (gameState !== GAME_STATE.PLAYING) return;

    passiveHeal();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const shake = getShakeOffset();
    ctx.save();
    ctx.translate(shake.x, shake.y);

    if (LEVELS[currentLevelIndex].isBoss && bossState.active) {
        updateBossFight();
        renderBossFight();
    } else {
        updateLevel();
        renderLevel();
    }

    updateParticles();
    renderParticles();
    ctx.restore();

    updateHUD();
}

/* -------------------------
BOOT
------------------------- */

window.addEventListener("load", () => {
    initShopUI();
    initSkillUI();
    wireMenuButtons();
    requestAnimationFrame(gameLoop);
});
