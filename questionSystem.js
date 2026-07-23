/* =========================
HIRE OR DIE V20
QUESTIONSYSTEM.JS
Coding challenges gate doors and appear inside boss fights
========================= */

let answering = false;

function startQuestion(topic, onCorrect, onWrong) {
    const pool = getQuestionsForTopic(topic || "html", 1);
    const q = pool[0];
    if (!q) { onCorrect(); return; }

    answering = true;
    const panel = document.getElementById("questionPanel");
    const titleEl = document.getElementById("questionTitle");
    const textEl = document.getElementById("questionText");

    panel.classList.add("active");
    titleEl.innerText = `💻 ${topic ? topic.toUpperCase() : "CODE"} CHALLENGE`;
    textEl.innerText = q.question;

    const shuffled = shuffleArray(q.options);
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`answer${i}`);
        const opt = shuffled[i - 1];
        btn.innerText = opt;
        btn.onclick = () => {
            answering = false;
            panel.classList.remove("active");
            if (opt === q.answer) {
                playSound("correct_answer.mp3");
                lastCorrectAnswerTime = performance.now();
                showMessage("✅ Correct! Door unlocking...", 1800);
                onCorrect();
            } else {
                playSound("beep.mp3");
                comboCounter = 0;
                showMessage(`❌ Wrong! Correct answer: ${q.answer}`, 2500);
                onWrong();
            }
        };
    }
}
