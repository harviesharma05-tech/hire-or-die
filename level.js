/* =========================
HIRE OR DIE V20
LEVEL.JS
Level world: walls, hazards, doors, zombies, NPC, pickups
========================= */

const bgImages = {};
const brokenAssets = new Set();
const MAP_FALLBACK_COLORS = ["#150e05", "#04141c", "#120414", "#031505"];

function getBgImage(src) {
    if (!bgImages[src]) {
        const img = new Image();
        img.onerror = () => brokenAssets.add(src);
        img.src = src;
        bgImages[src] = img;
    }
    return bgImages[src];
}

let world = null;
let screenFlash = null; // {color, until}
const dustParticles = [];

function triggerFlash(color, ms = 250) {
    screenFlash = { color, until: performance.now() + ms };
}

function spawnDust(x, y) {
    if (dustParticles.length > 40) dustParticles.shift();
    dustParticles.push({ x, y, life: 1, born: performance.now() });
}

function updateDust() {
    for (let i = dustParticles.length - 1; i >= 0; i--) {
        const p = dustParticles[i];
        p.life -= 0.04;
        if (p.life <= 0) dustParticles.splice(i, 1);
    }
}

function renderDust() {
    for (const p of dustParticles) {
        ctx.fillStyle = `rgba(200,200,200,${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * p.life, 0, Math.PI * 2);
        ctx.fill();
    }
}

function rand(min, max) { return Math.random() * (max - min) + min; }

function buildLevel(index) {
    currentLevelIndex = index;
    const lvl = LEVELS[index];
    const map = MAPS[lvl.mapIndex];

    player.x = 80;
    player.y = 360;
    answering = false;

    const difficulty = lvl.mapIndex * 2 + lvl.levelInMap;

    // Obstacles kept off the horizontal center lane (y 260-460) so a path always exists
    const walls = [];
    const wallCount = 2 + lvl.mapIndex;
    for (let i = 0; i < wallCount; i++) {
        const topHalf = Math.random() < 0.5;
        walls.push({
            x: rand(300, 820),
            y: topHalf ? rand(60, 220) : rand(500, 660),
            w: rand(60, 140),
            h: rand(20, 40)
        });
    }

    const hazards = [];
    const hazardCount = Math.min(4, 1 + Math.floor(lvl.mapIndex / 1));
    for (let i = 0; i < hazardCount; i++) {
        const topHalf = Math.random() < 0.5;
        hazards.push({
            x: rand(350, 820),
            y: topHalf ? rand(80, 200) : rand(520, 640),
            w: 50,
            h: 50,
            lastHitTime: 0
        });
    }

    const gate = { x: 950, y: 260, w: 50, h: 200, locked: true, questionUsed: false };

    const zombies = [];
    const zombieCount = 2 + lvl.mapIndex * 2 + Math.floor(lvl.levelInMap / 2);
    const diff = DIFFICULTIES.find(d => d.id === difficulty);
    const speedMult = diff ? diff.zombieSpeedMult : 1;
    const dmgMult = diff ? diff.damageMult : 1;
    for (let i = 0; i < zombieCount; i++) {
        const px = rand(250, 880);
        const py = rand(100, 620);
        zombies.push({
            x: px, y: py,
            radius: 16,
            speed: (0.6 + lvl.mapIndex * 0.25) * speedMult,
            hp: 20 + lvl.mapIndex * 3,
            maxHp: 20 + lvl.mapIndex * 3,
            dmg: Math.floor((4 + lvl.mapIndex * 2) * dmgMult),
            patrolA: { x: px - 60, y: py },
            patrolB: { x: px + 60, y: py },
            dir: 1,
            frozenUntil: 0,
            lastHitTime: 0
        });
    }

    const npc = { x: 800, y: 620, radius: 18, greeted: false, line: NPC_LINES[lvl.mapIndex] };

    const pickups = [];
    const pickupCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < pickupCount; i++) {
        const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
        pickups.push({
            x: rand(200, 880), y: rand(80, 640),
            radius: 12, type
        });
    }

    world = { map, lvl, walls, hazards, gate, zombies, npc, pickups };

    const storyTitle = document.getElementById("storyTitle");
    const storyText = document.getElementById("storyText");
    if (storyTitle && storyText) {
        storyTitle.innerText = `${map.name} — Level ${lvl.levelInMap}/5`;
        storyText.innerText = `Topic: ${lvl.topicLabel}. Reach the golden gate and answer correctly to unlock it.`;
    }

    document.getElementById("currentBoss").style.display = "none";
    document.getElementById("currentZombie").style.display = "block";

    updateInventoryUI();
    updateSkillUI();
    updateAchievementUI();
}

function circleRectCollide(cx, cy, r, rect) {
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return (dx * dx + dy * dy) < (r * r);
}

function movePlayerAxis(dx, dy) {
    let maxSpeed = player.speed;
    if (player.skillsUnlocked.includes("speed")) maxSpeed *= 1.35;

    // Smooth acceleration toward target velocity instead of snapping to full speed
    const accel = 0.35;
    player.vx = (player.vx || 0) + (dx * maxSpeed - (player.vx || 0)) * accel;
    player.vy = (player.vy || 0) + (dy * maxSpeed - (player.vy || 0)) * accel;

    const nx = player.x + player.vx;
    const ny = player.y + player.vy;

    let blockedX = false;
    let blockedY = false;
    for (const w of world.walls) {
        if (circleRectCollide(nx, player.y, player.radius, w)) blockedX = true;
        if (circleRectCollide(player.x, ny, player.radius, w)) blockedY = true;
    }

    if (!blockedX) player.x = Math.max(20, Math.min(canvas.width - 20, nx)); else player.vx = 0;
    if (!blockedY) player.y = Math.max(20, Math.min(canvas.height - 20, ny)); else player.vy = 0;
}

function decayPlayerVelocity() {
    // Called when no movement keys are held, so the player glides to a stop
    player.vx = (player.vx || 0) * 0.8;
    player.vy = (player.vy || 0) * 0.8;
    if (Math.abs(player.vx) > 0.05 || Math.abs(player.vy) > 0.05) {
        player.x += player.vx;
        player.y += player.vy;
    } else {
        player.vx = 0;
        player.vy = 0;
    }
}

function updateLevel() {
    if (answering) return;

    let dx = 0, dy = 0;
    if (isMovingUp()) dy -= 1;
    if (isMovingDown()) dy += 1;
    if (isMovingLeft()) dx -= 1;
    if (isMovingRight()) dx += 1;
    if (dx < 0) player.facing = -1;
    if (dx > 0) player.facing = 1;
    if (dx !== 0 || dy !== 0) {
        movePlayerAxis(dx, dy);
    } else {
        decayPlayerVelocity();
    }
    player.moving = Math.abs(player.vx || 0) > 0.3 || Math.abs(player.vy || 0) > 0.3;
    if (player.moving && Math.random() < 0.3) spawnDust(player.x, player.y + 20);
    updateDust();

    const now = performance.now();

    // Hazards
    for (const h of world.hazards) {
        if (circleRectCollide(player.x, player.y, player.radius, h) && now - h.lastHitTime > 500) {
            h.lastHitTime = now;
            damagePlayer(4);
            triggerFlash("rgba(255,120,0,0.25)", 200);
            showMessage("🔥 Hazard hit!", 1000);
        }
    }

    // Zombies
    for (const z of world.zombies) {
        if (z.hp <= 0) continue;
        if (now < z.frozenUntil) continue;

        const dist = Math.hypot(player.x - z.x, player.y - z.y);
        const aware = dist < 160;

        if (aware && !z.aggro) {
            z.aggro = true;
            z.lungeUntil = now + 200;
        }
        if (!aware) z.aggro = false;

        if (aware) {
            const ang = Math.atan2(player.y - z.y, player.x - z.x);
            const lungeBoost = now < (z.lungeUntil || 0) ? 2.2 : 1;
            z.x += Math.cos(ang) * z.speed * lungeBoost;
            z.y += Math.sin(ang) * z.speed * lungeBoost;
        } else {
            z.x += (z.dir > 0 ? 1 : -1) * z.speed * 0.5;
            if (z.x > z.patrolB.x) z.dir = -1;
            if (z.x < z.patrolA.x) z.dir = 1;
        }

        if (dist < player.radius + z.radius && now - z.lastHitTime > 900) {
            z.lastHitTime = now;
            damagePlayer(z.dmg);
            triggerFlash("rgba(255,0,0,0.25)", 200);
            showMessage("🧟 Zombie hit you!", 1000);
        }
    }

    // NPC
    const npc = world.npc;
    if (Math.hypot(player.x - npc.x, player.y - npc.y) < npc.radius + player.radius + 20) {
        if (!npc.greeted) {
            npc.greeted = true;
            document.getElementById("storyText").innerText = npc.line;
            player.hp = Math.min(player.maxHp, player.hp + 10);
            showMessage("🧑‍💻 Survivor gave you a health pack!", 2000);
        }
    }

    // Pickups
    world.pickups = world.pickups.filter(p => {
        if (Math.hypot(player.x - p.x, player.y - p.y) < p.radius + player.radius) {
            player.inventory[p.type.id] = (player.inventory[p.type.id] || 0) + 1;
            if (p.type.id === "potion") player.hp = Math.min(player.maxHp, player.hp + 15);
            if (p.type.id === "mana") player.mana = Math.min(player.maxMana, player.mana + 15);
            if (p.type.id === "coin") player.coins += 3;
            if (p.type.id === "gem") player.gems += 1;
            playSound("beep.mp3");
            updateInventoryUI();
            return false;
        }
        return true;
    });

    // Gate — one coding question, correct answer immediately clears the level
    const gate = world.gate;
    if (gate.locked && circleRectCollide(player.x, player.y, player.radius, gate) && !gate.questionUsed) {
        gate.questionUsed = true;
        startQuestion(world.lvl.topic, () => {
            gate.locked = false;
            triggerFlash("rgba(255,215,0,0.3)", 300);
            showMessage("🔓 Correct! Advancing...", 1200);
            completeLevel();
        }, () => {
            damagePlayer(10);
            triggerFlash("rgba(255,0,0,0.25)", 200);
            spawnPenaltyZombie();
            gate.questionUsed = false;
        });
    }
    if (gate.locked) {
        if (circleRectCollide(player.x, player.y, player.radius, gate)) player.x = gate.x - player.radius - 2;
    }

    updateZombiePanel();
}

function spawnPenaltyZombie() {
    world.zombies.push({
        x: player.x + 60, y: player.y,
        radius: 16, speed: 1.2, hp: 15, maxHp: 15, dmg: 5,
        patrolA: { x: player.x, y: player.y }, patrolB: { x: player.x + 100, y: player.y },
        dir: 1, frozenUntil: 0, lastHitTime: 0
    });
}

function updateZombiePanel() {
    const alive = world.zombies.filter(z => z.hp > 0);
    const nameEl = document.getElementById("zombieName");
    const hpEl = document.getElementById("zombieHP");
    if (!alive.length) {
        nameEl.innerText = "None nearby";
        hpEl.innerText = "HP: -";
        return;
    }
    let nearest = alive[0];
    let best = Infinity;
    for (const z of alive) {
        const d = Math.hypot(player.x - z.x, player.y - z.y);
        if (d < best) { best = d; nearest = z; }
    }
    nameEl.innerText = "HR Zombie";
    hpEl.innerText = `HP: ${Math.ceil(nearest.hp)}/${nearest.maxHp}`;
}

function completeLevel() {
    const lvl = world.lvl;
    const rewardBase = 10 + lvl.mapIndex * 5 + lvl.levelInMap * 2;
    grantRewards({ xp: rewardBase * 2, coins: rewardBase, gems: lvl.levelInMap === 4 ? 2 : 0 });
    saveGame();
    showMessage("🎉 Level Complete!", 2000);
    advanceToLevel(currentLevelIndex + 1);
}

function advanceToLevel(index) {
    if (index >= LEVELS.length) {
        triggerVictory();
        return;
    }
    currentLevelIndex = index;
    const lvl = LEVELS[index];
    if (lvl.isBoss) {
        startBossFight(lvl.mapIndex);
    } else {
        buildLevel(index);
    }
}

/* -------------------------
RENDER
------------------------- */

function renderLevel() {
    const bg = getBgImage(world.map.bg);
    if (bg.complete && bg.naturalWidth > 0) {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = MAP_FALLBACK_COLORS[world.map.id] || "#05070f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Walls
    ctx.fillStyle = "rgba(0,255,255,0.25)";
    ctx.strokeStyle = "cyan";
    for (const w of world.walls) {
        ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.strokeRect(w.x, w.y, w.w, w.h);
    }

    // Hazards (pulsing)
    const pulse = 0.4 + 0.3 * Math.sin(performance.now() / 150);
    ctx.fillStyle = `rgba(255,80,0,${pulse})`;
    for (const h of world.hazards) {
        ctx.fillRect(h.x, h.y, h.w, h.h);
    }

    // Gate
    drawDoor(world.gate, "GATE");

    // NPC
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.arc(world.npc.x, world.npc.y, world.npc.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText("🧑‍💻", world.npc.x - 12, world.npc.y + 7);

    // Pickups
    ctx.font = "18px Arial";
    for (const p of world.pickups) {
        ctx.fillText(p.type.emoji, p.x - 10, p.y + 6);
    }

    // Zombies
    for (const z of world.zombies) {
        if (z.hp <= 0) continue;
        ctx.font = "26px Arial";
        ctx.fillText("🧟", z.x - 13, z.y + 9);
        ctx.fillStyle = "black";
        ctx.fillRect(z.x - 16, z.y - 26, 32, 5);
        ctx.fillStyle = "red";
        ctx.fillRect(z.x - 16, z.y - 26, 32 * (z.hp / z.maxHp), 5);
    }

    // Player
    drawPlayer(player.x, player.y);

    renderDust();
    renderScreenFlash();
    renderAssetWarning();
}

function renderScreenFlash() {
    if (screenFlash && performance.now() < screenFlash.until) {
        ctx.fillStyle = screenFlash.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        screenFlash = null;
    }
}

function renderAssetWarning() {
    if (brokenAssets.size === 0) return;
    ctx.fillStyle = "rgba(200,0,0,0.85)";
    ctx.font = "13px Arial";
    ctx.fillText(`⚠ Missing file(s): ${[...brokenAssets].join(", ")}`, 10, canvas.height - 10);
}

// Shared player sprite renderer — used in both level and boss-fight views.
// Uses the chosen character portrait, flips to face movement direction,
// and bobs up/down while walking for a less static feel.
function drawPlayer(x, y) {
    const img = getBgImage(player.characterImg);
    const size = 44;
    const bob = player.moving ? Math.sin(performance.now() / 90) * 4 : 0;

    ctx.save();
    if (img.complete && img.naturalWidth > 0) {
        ctx.translate(x, y + bob);
        ctx.scale(player.facing, 1);
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y + bob, size / 2, 0, Math.PI * 2);
        ctx.stroke();
    } else {
        ctx.font = "28px Arial";
        ctx.fillText("🧙", x - 14, y + bob + 10);
        ctx.restore();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(x - 18, y - 34 + bob, 36, 6);
    ctx.fillStyle = "lime";
    ctx.fillRect(x - 18, y - 34 + bob, 36 * (player.hp / player.maxHp), 6);
}

function drawDoor(door, label) {
    ctx.fillStyle = door.locked ? "rgba(255,200,0,0.5)" : "rgba(0,255,0,0.35)";
    ctx.strokeStyle = door.locked ? "gold" : "lime";
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.strokeRect(door.x, door.y, door.w, door.h);
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(door.locked ? `🔒 ${label}` : `🔓 ${label}`, door.x - 10, door.y - 8);
}
