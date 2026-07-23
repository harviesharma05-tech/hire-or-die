/* =========================
HIRE OR DIE V20
BOSSFIGHT.JS
Boss encounters with phases and mid-fight coding challenges
========================= */

const bossState = {
    active: false,
    boss: null,
    mapIndex: 0,
    hp: 0,
    maxHp: 0,
    phase: 1,
    attackInterval: 2200,
    lastBossAttack: 0,
    lastPlayerAttack: 0,
    playerAttackCooldown: 500,
    frozenUntil: 0,
    nextQuestionAt: 0
};

function startBossFight(mapIndex) {
    const map = MAPS[mapIndex];
    player.x = 200;
    player.y = 400;

    bossState.active = true;
    bossState.boss = map.boss;
    bossState.mapIndex = mapIndex;
    bossState.hp = map.boss.hp;
    bossState.maxHp = map.boss.hp;
    bossState.phase = 1;
    bossState.attackInterval = 2200;
    bossState.lastBossAttack = performance.now();
    bossState.lastPlayerAttack = 0;
    bossState.frozenUntil = 0;
    bossState.nextQuestionAt = performance.now() + 8000;

    document.getElementById("currentZombie").style.display = "none";
    document.getElementById("currentBoss").style.display = "block";
    document.getElementById("bossName").innerText = map.boss.name;
    document.getElementById("bossHP").innerText = `HP: ${bossState.hp}/${bossState.maxHp}`;

    document.getElementById("storyTitle").innerText = `⚠ BOSS: ${map.boss.name}`;
    document.getElementById("storyText").innerText = "Press SPACE to attack. Answer challenges for bonus damage!";

    playSound(map.boss.roar);
    playBossMusic();
}

function handleAttackInput() {
    if (gameState !== GAME_STATE.PLAYING) return;
    const lvl = LEVELS[currentLevelIndex];

    if (lvl.isBoss && bossState.active) {
        if (answering) return;
        const now = performance.now();
        if (now - bossState.lastPlayerAttack < bossState.playerAttackCooldown) return;
        bossState.lastPlayerAttack = now;
        let dmg = 6 + player.level * 1.5;
        if (player.skillsUnlocked.includes("critical") && Math.random() < 0.3) {
            dmg *= 2;
            showMessage("💥 Critical Hit!", 800);
        }
        dealBossDamage(dmg);
        return;
    }

    // Normal level: melee the nearest zombie in range
    if (!world || answering) return;
    const now = performance.now();
    if (now - (player.lastAttack || 0) < 400) return;
    player.lastAttack = now;

    let nearest = null, best = 46;
    for (const z of world.zombies) {
        if (z.hp <= 0) continue;
        const d = Math.hypot(player.x - z.x, player.y - z.y);
        if (d < best) { best = d; nearest = z; }
    }
    if (!nearest) return;

    let dmg = 10 + player.level * 2;
    if (player.skillsUnlocked.includes("critical") && Math.random() < 0.3) dmg *= 2;
    nearest.hp -= dmg;
    spawnParticles(nearest.x, nearest.y, "orange", 8);
    playSound("beep.mp3");

    if (nearest.hp <= 0) {
        spawnParticles(nearest.x, nearest.y, "red", 16);
        grantRewards({ xp: 5, coins: 2, gems: 0 });
        showMessage("🧟 Zombie defeated!", 1000);
    }
}

function dealBossDamage(amount) {
    const bonusAmount = applyComboBonus(amount);
    bossState.hp -= bonusAmount;
    if (bossState.hp <= 0) {
        bossState.hp = 0;
        winBossFight();
    }
}

function updateBossFight() {
    if (answering) return;
    const now = performance.now();

    // Player can still move around the arena floor while fighting
    let dx = 0, dy = 0;
    if (isMovingUp()) dy -= 1;
    if (isMovingDown()) dy += 1;
    if (isMovingLeft()) dx -= 1;
    if (isMovingRight()) dx += 1;
    player.moving = (dx !== 0 || dy !== 0);
    if (dx < 0) player.facing = -1;
    if (dx > 0) player.facing = 1;
    if (dx !== 0 || dy !== 0) {
        player.x = Math.max(60, Math.min(canvas.width - 60, player.x + dx * player.speed));
        player.y = Math.max(400, Math.min(canvas.height - 40, player.y + dy * player.speed));
    }

    // phase transitions
    const ratio = bossState.hp / bossState.maxHp;
    if (bossState.phase === 1 && ratio <= 0.66) {
        bossState.phase = 2;
        bossState.attackInterval = 1600;
        showMessage(`⚠ ${bossState.boss.name} enters Phase 2!`, 2000);
    } else if (bossState.phase === 2 && ratio <= 0.33) {
        bossState.phase = 3;
        bossState.attackInterval = 1100;
        showMessage(`🔥 ${bossState.boss.name} enters Phase 3!`, 2000);
    }

    // boss attacks player (with difficulty multiplier)
    if (now >= bossState.frozenUntil && now - bossState.lastBossAttack > bossState.attackInterval) {
        bossState.lastBossAttack = now;
        const diff = DIFFICULTIES.find(d => d.id === difficulty);
        const dmgMult = diff ? diff.damageMult : 1;
        damagePlayer(Math.floor((bossState.boss.dmg + bossState.phase * 2) * dmgMult));
        showMessage(`${bossState.boss.name} attacks!`, 900);
    }

    // periodic coding challenge
    if (now >= bossState.nextQuestionAt) {
        bossState.nextQuestionAt = now + 10000;
        const map = MAPS[bossState.mapIndex];
        const topic = map.topics[Math.floor(Math.random() * map.topics.length)];
        startQuestion(topic, () => {
            dealBossDamage(30);
            bossState.frozenUntil = performance.now() + 1500;
            showMessage("✅ Bonus hit landed!", 1500);
        }, () => {
            damagePlayer(12);
            showMessage("❌ The boss punishes your mistake!", 1500);
        });
    }

    document.getElementById("bossHP").innerText = `HP: ${Math.ceil(bossState.hp)}/${bossState.maxHp}`;
}

function winBossFight() {
    bossState.active = false;
    stopBossMusic();
    const mapIndex = bossState.mapIndex;
    const map = MAPS[mapIndex];

    grantRewards({ xp: 100 + mapIndex * 40, coins: 50 + mapIndex * 20, gems: 5 + mapIndex * 2 });

    const unlockable = SKILLS.filter(s => s.unlockAtMap === mapIndex && !player.skillsUnlocked.includes(s.id));
    unlockable.forEach(s => {
        player.skillsUnlocked.push(s.id);
        showMessage(`🌟 New Skill Unlocked: ${s.name}!`, 3000);
    });

    if (!achievementsUnlocked.includes(map.boss.name)) {
        achievementsUnlocked.push(map.boss.name);
        updateAchievementUI();
    }

    const nextMap = mapIndex + 1;
    if (nextMap < MAPS.length && !player.mapsUnlocked.includes(nextMap)) {
        player.mapsUnlocked.push(nextMap);
        showMessage(`🗺 New map unlocked: ${MAPS[nextMap].name}!`, 3000);
    }

    saveGame();
    showMessage(`🏆 ${map.boss.name} defeated!`, 2500);
    advanceToLevel(currentLevelIndex + 1);
}

function renderBossFight() {
    const bg = getBgImage("boss-arena.jpeg");
    if (bg.complete && bg.naturalWidth > 0) {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#1a0505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const bossImg = getBgImage(bossState.boss.img);
    const bw = 260, bh = 260;
    const bx = canvas.width / 2 - bw / 2;
    const by = 60;
    if (bossImg.complete && bossImg.naturalWidth > 0) {
        ctx.drawImage(bossImg, bx, by, bw, bh);
    } else {
        ctx.fillStyle = "darkred";
        ctx.fillRect(bx, by, bw, bh);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(bx, by - 20, bw, 12);
    ctx.fillStyle = "red";
    ctx.fillRect(bx, by - 20, bw * (bossState.hp / bossState.maxHp), 12);
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText(bossState.boss.name, bx, by - 28);

    drawPlayer(player.x, player.y);

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Press SPACE to attack", player.x - 60, player.y + 40);
}
