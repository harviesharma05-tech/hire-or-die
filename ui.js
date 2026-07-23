/* =========================
HIRE OR DIE V20
UI.JS
Skills, shop, inventory, achievements, menu & overlay wiring
========================= */

function togglePanel(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("hidden");
}

function initSkillUI() { updateSkillUI(); }

function updateSkillUI() {
    const el = document.getElementById("skills");
    if (!el) return;
    el.innerHTML = SKILLS.map(s => {
        const unlocked = player.skillsUnlocked.includes(s.id);
        if (!unlocked) {
            return `<p style="opacity:0.5">🔒 ${s.name}<br><small>${s.desc}</small></p>`;
        }
        if (s.type === "passive") {
            return `<p>✅ ${s.name}<br><small>${s.desc}</small></p>`;
        }
        const cd = skillCooldowns[s.id] || 0;
        const remaining = Math.max(0, cd - performance.now());
        const disabled = remaining > 0 || player.mana < s.cost;
        return `<p>⚡ ${s.name}<br><small>${s.desc}</small><br>
            <button ${disabled ? "disabled" : ""} onclick="useActiveSkill('${s.id}')">
                ${remaining > 0 ? `⏳ ${Math.ceil(remaining / 1000)}s` : `Use (${s.cost} mana)`}
            </button></p>`;
    }).join("");
}

function useActiveSkill(id) {
    const skill = SKILLS.find(s => s.id === id);
    if (!skill || !player.skillsUnlocked.includes(id)) return;
    const cdUntil = skillCooldowns[id] || 0;
    if (performance.now() < cdUntil || player.mana < skill.cost) return;

    player.mana -= skill.cost;
    skillCooldowns[id] = performance.now() + skill.cooldown;

    if (id === "freeze") {
        if (world && world.zombies) {
            world.zombies.forEach(z => { z.frozenUntil = performance.now() + 4000; });
            showMessage("❄ Zombies frozen!", 2000);
        }
    } else if (id === "lightning") {
        const lvl = LEVELS[currentLevelIndex];
        if (lvl.isBoss && bossState.active) {
            dealBossDamage(40);
            showMessage("⚡ Lightning Strike!", 1500);
        } else {
            showMessage("⚡ No boss to strike here!", 1500);
        }
    }
}

function initShopUI() { updateShopUI(); }

function updateShopUI() {
    const el = document.getElementById("shop");
    if (!el) return;
    el.innerHTML = SHOP_ITEMS.map(item => {
        const symbol = item.currency === "coins" ? "🪙" : "💎";
        return `<p>${item.label} — ${item.cost}${symbol}<br>
            <button onclick="buyShopItem('${item.id}')">Buy</button></p>`;
    }).join("");
}

function buyShopItem(id) {
    const item = SHOP_ITEMS.find(i => i.id === id);
    if (!item) return;
    const balance = item.currency === "coins" ? player.coins : player.gems;
    if (balance < item.cost) {
        showMessage("Not enough currency!", 1500);
        return;
    }
    if (item.currency === "coins") player.coins -= item.cost; else player.gems -= item.cost;

    if (id === "buyPotion") { player.hp = Math.min(player.maxHp, player.hp + 25); showMessage("🧪 +25 HP", 1500); }
    if (id === "buyShield") { player._shieldUntil = performance.now() + 15000; showMessage("🛡 Shield active 15s", 1500); }
    if (id === "buyXpBoost") { grantXP(50); showMessage("⚡ +50 XP", 1500); }
    if (id === "buyLife") { player.hp = player.maxHp; player.mana = player.maxMana; showMessage("❤ Fully restored!", 1500); }

    updateHUD();
}

function updateInventoryUI() {
    const el = document.getElementById("inventory");
    if (!el) return;
    el.innerHTML = ITEM_TYPES.map(t =>
        `<p>${t.emoji} ${t.label}: ${player.inventory[t.id] || 0}</p>`
    ).join("");
}

function updateAchievementUI() {
    const el = document.getElementById("achievements");
    if (!el) return;
    if (!achievementsUnlocked.length) {
        el.innerHTML = "<p>No achievements yet</p>";
        return;
    }
    el.innerHTML = achievementsUnlocked.map(a => `<p>🏆 ${a}</p>`).join("");
}

/* -------------------------
MENU / OVERLAYS
------------------------- */

let mapSelectSource = "newGame"; // "newGame" | "pause"

function wireTouchControls() {
    const bind = (id, key) => {
        const el = document.getElementById(id);
        if (!el) return;
        const start = (e) => { e.preventDefault(); keys[key] = true; };
        const end = (e) => { e.preventDefault(); keys[key] = false; };
        el.addEventListener("touchstart", start, { passive: false });
        el.addEventListener("touchend", end, { passive: false });
        el.addEventListener("touchcancel", end, { passive: false });
        el.addEventListener("mousedown", start);
        el.addEventListener("mouseup", end);
        el.addEventListener("mouseleave", end);
    };
    bind("dpadUp", "w");
    bind("dpadDown", "s");
    bind("dpadLeft", "a");
    bind("dpadRight", "d");

    const attackBtn = document.getElementById("attackBtn");
    if (attackBtn) {
        const fire = (e) => { e.preventDefault(); handleAttackInput(); };
        attackBtn.addEventListener("touchstart", fire, { passive: false });
        attackBtn.addEventListener("click", fire);
    }

    const pauseBtn = document.getElementById("pauseBtn");
    if (pauseBtn) pauseBtn.onclick = togglePause;
    const resumeBtn = document.getElementById("btnResume");
    if (resumeBtn) resumeBtn.onclick = togglePause;

    const muteBtn = document.getElementById("muteBtn");
    if (muteBtn) muteBtn.onclick = toggleMute;
}

function wireMenuButtons() {
    wireTouchControls();

    const continueBtn = document.getElementById("btnContinue");
    if (continueBtn) continueBtn.style.display = hasSave() ? "block" : "none";

    const nextBtn = document.getElementById("btnNextToCharacter");
    if (nextBtn) nextBtn.onclick = () => {
        const nameInput = document.getElementById("playerNameInput");
        player.name = (nameInput && nameInput.value.trim()) || "Player";
        document.getElementById("nameStep").classList.add("hidden");
        document.getElementById("characterStep").classList.remove("hidden");
        renderCharacterGrid();
    };

    if (continueBtn) continueBtn.onclick = () => {
        loadGame();
        hideOverlays();
        gameState = GAME_STATE.PLAYING;
        advanceToLevel(currentLevelIndex);
    };

    const toMapBtn = document.getElementById("btnToMapSelect");
    if (toMapBtn) toMapBtn.onclick = () => {
        mapSelectSource = "newGame";
        showOverlay("mapSelectOverlay");
        renderMapGrid();
    };

    const closeMapBtn = document.getElementById("btnCloseMapSelect");
    if (closeMapBtn) closeMapBtn.onclick = () => {
        if (mapSelectSource === "pause") {
            showOverlay("pauseOverlay");
        } else {
            showOverlay("menuOverlay");
            document.getElementById("nameStep").classList.add("hidden");
            document.getElementById("characterStep").classList.remove("hidden");
        }
    };

    const retryBtn = document.getElementById("btnRetry");
    if (retryBtn) retryBtn.onclick = () => {
        player.hp = player.maxHp;
        hideOverlays();
        gameState = GAME_STATE.PLAYING;
        advanceToLevel(currentLevelIndex);
    };

    const playAgainBtn = document.getElementById("btnPlayAgain");
    if (playAgainBtn) playAgainBtn.onclick = () => {
        localStorage.removeItem("hireOrDieV20Save");
        location.reload();
    };

    const pauseBtn = document.getElementById("pauseBtn");
    if (pauseBtn) pauseBtn.onclick = () => togglePause();

    const resumeBtn = document.getElementById("btnResume");
    if (resumeBtn) resumeBtn.onclick = () => togglePause();

    const changeMapBtn = document.getElementById("btnChangeMap");
    if (changeMapBtn) changeMapBtn.onclick = () => {
        mapSelectSource = "pause";
        showOverlay("mapSelectOverlay");
        renderMapGrid();
    };

    const muteBtn = document.getElementById("muteBtn");
    if (muteBtn) muteBtn.onclick = () => toggleMute();
}

function renderCharacterGrid() {
    const grid = document.getElementById("characterGrid");
    if (!grid) return;
    grid.innerHTML = CHARACTERS.map(c => `
        <div class="charCard" data-id="${c.id}" onclick="selectCharacter('${c.id}')">
            <img src="${c.img}" alt="${c.name}">
            <div>${c.name}</div>
        </div>
    `).join("");
    selectCharacter(CHARACTERS[0].id);
}

function selectCharacter(id) {
    const c = CHARACTERS.find(ch => ch.id === id);
    if (!c) return;
    player.character = c.id;
    player.characterImg = c.img;

    document.querySelectorAll(".charCard").forEach(el => {
        el.classList.toggle("selected", el.dataset.id === id);
    });
}

function renderMapGrid() {
    const grid = document.getElementById("mapGrid");
    if (!grid) return;
    grid.innerHTML = MAPS.map((m, i) => {
        const unlocked = player.mapsUnlocked.includes(i);
        return `
        <div class="mapCard ${unlocked ? "" : "locked"}" onclick="${unlocked ? `selectMap(${i})` : ""}">
            <img src="${m.bg}" alt="${m.name}">
            <div>${unlocked ? "" : "🔒 "}${m.name}</div>
            <small>${m.subtitle}</small>
        </div>`;
    }).join("");
}

function selectMap(mapIndex) {
    if (!player.mapsUnlocked.includes(mapIndex)) return;
    const startIndex = mapIndex * 5;
    hideOverlays();
    gameState = GAME_STATE.PLAYING;
    // Resume mid-map progress if we were already partway through this map, else start at level 1
    const alreadyInThisMap = currentLevelIndex >= startIndex && currentLevelIndex < startIndex + 5;
    advanceToLevel(alreadyInThisMap ? currentLevelIndex : startIndex);
}

// V21: Difficulty selection
function renderDifficultyGrid() {
    const grid = document.getElementById("difficultyGrid");
    if (!grid) return;
    grid.innerHTML = DIFFICULTIES.map(d => `
        <div class="diffCard" data-id="${d.id}" onclick="selectDifficulty('${d.id}')">
            <h3>${d.name}</h3>
            <div class="stats">
                <div>🧟 ${Math.round(d.zombieSpeedMult * 100)}% Speed</div>
                <div>💥 ${Math.round(d.damageMult * 100)}% Damage</div>
                <div>⭐ ${Math.round(d.xpMult * 100)}% XP</div>
            </div>
        </div>
    `).join("");
    selectDifficulty("normal");
}

function selectDifficulty(id) {
    difficulty = id;
    document.querySelectorAll(".diffCard").forEach(el => {
        el.classList.toggle("selected", el.dataset.id === id);
    });
}

// Wire difficulty step
const diffBtn = document.getElementById("btnToDifficulty");
if (diffBtn) diffBtn.onclick = () => {
    document.getElementById("characterStep").classList.add("hidden");
    document.getElementById("difficultyStep").classList.remove("hidden");
    renderDifficultyGrid();
};

const mapFromDiffBtn = document.getElementById("btnToMapSelectFromDiff");
if (mapFromDiffBtn) mapFromDiffBtn.onclick = () => {
    document.getElementById("difficultyStep").classList.add("hidden");
    showOverlay("mapSelectOverlay");
    renderMapGrid();
};
