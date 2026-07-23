/* =========================
HIRE OR DIE V20
AUDIOLITE.JS
Minimal cached sound player
========================= */

const soundCache = {};
let soundEnabled = true;

function playSound(file) {
    if (!soundEnabled) return;
    try {
        if (!soundCache[file]) soundCache[file] = new Audio(file);
        const snd = soundCache[file].cloneNode();
        snd.volume = 0.6;
        snd.play().catch(() => {});
    } catch (e) { /* ignore playback errors */ }
}

let musicPlaying = false;
function playBossMusic() {
    if (!soundEnabled) return;
    try {
        if (!soundCache._music) {
            soundCache._music = new Audio("battle_theme.mp3");
            soundCache._music.loop = true;
            soundCache._music.volume = 0.3;
        }
        soundCache._music.play().catch(() => {});
        musicPlaying = true;
    } catch (e) { /* ignore */ }
}
function stopBossMusic() {
    if (soundCache._music) soundCache._music.pause();
    musicPlaying = false;
}
