/* =========================
HIRE OR DIE V20
CONTENT.JS
Maps, Levels, Topic-tagged question bank, Bosses, Skills, Items
========================= */

/* -------------------------
TOPIC CLASSIFICATION
questions.js has no category field, so we auto-tag every
question into one of 16 topics using keyword rules.
------------------------- */

const TOPIC_RULES = [
    ["recursion", /recursion|recursive/i],
    ["sorting", /sort(ing)?\b|bubble sort|merge sort|quick sort/i],
    ["searching", /search\b|binary search|linear search/i],
    ["algorithms", /algorithm|complexity|big[- ]o\b/i],
    ["data-structures", /stack\b|queue\b|linked list|\btree\b|\bgraph\b|\bheap\b|data structure/i],
    ["oop", /\bclass\b|object[- ]oriented|inheritance|polymorphism|encapsulation|constructor/i],
    ["async", /async|await|promise|callback|settimeout/i],
    ["apis", /\bapi\b|\brest\b|\bhttp\b|\bjson\b|ajax|endpoint/i],
    ["dom", /\bdom\b|document\.|getelementbyid|queryselector|addeventlistener/i],
    ["arrays", /array|\.map\(|\.filter\(|\.reduce\(|\bpush\b|\bpop\(/i],
    ["objects", /\bobject\b|key-value|property/i],
    ["functions", /function|arrow function|parameter|return keyword/i],
    ["loops", /loop|\bfor\s*\(|\bwhile\b|\bif\s*\(|switch|condition/i],
    ["js-variables", /variable|\bvar\b|\blet\b|\bconst\b|typeof|data ?type/i],
    ["css", /\bcss\b|\bstyle\b|selector|flexbox|\bgrid\b|margin|padding/i],
    ["html", /\bhtml\b|\btag\b|<[a-z]/i]
];

function classifyQuestions(bank) {
    const byTopic = {};
    const unclassified = [];
    for (const t of TOPIC_RULES) byTopic[t[0]] = [];

    bank.forEach(q => {
        let matched = false;
        for (const [topic, rx] of TOPIC_RULES) {
            if (rx.test(q.question)) {
                byTopic[topic].push(q);
                matched = true;
                break;
            }
        }
        if (!matched) unclassified.push(q);
    });

    return { byTopic, unclassified };
}

const CLASSIFIED = (typeof questions !== "undefined")
    ? classifyQuestions(questions)
    : { byTopic: {}, unclassified: [] };

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Returns `count` questions for a topic, falling back to the
// unclassified/general pool if a topic bucket is thin.
function getQuestionsForTopic(topic, count) {
    const primary = shuffleArray(CLASSIFIED.byTopic[topic] || []);
    if (primary.length >= count) return primary.slice(0, count);

    const fallback = shuffleArray(CLASSIFIED.unclassified.concat(
        ...Object.values(CLASSIFIED.byTopic)
    ));
    const result = primary.slice();
    for (const q of fallback) {
        if (result.length >= count) break;
        if (!result.includes(q)) result.push(q);
    }
    return result.slice(0, count);
}

/* -------------------------
MAPS
------------------------- */

const MAPS = [
    {
        id: 0,
        name: "City Ruins",
        subtitle: "Beginner",
        bg: "city-map.png",
        topics: ["html", "css", "js-variables", "loops"],
        topicLabels: ["HTML Basics", "CSS Basics", "JavaScript Variables", "Loops & Conditions"],
        boss: { name: "Recruiter Boss", img: "recruiter-boss.jpeg", hp: 150, dmg: 8, roar: "volatile_roar.mp3" }
    },
    {
        id: 1,
        name: "Tech Fortress",
        subtitle: "Intermediate",
        bg: "tech-fortress.png",
        topics: ["dom", "arrays", "objects", "functions"],
        topicLabels: ["DOM Manipulation", "Arrays", "Objects", "Functions"],
        boss: { name: "Tech Lead", img: "tech-lead-boss.jpeg", hp: 220, dmg: 11, roar: "volatile_roar.mp3" }
    },
    {
        id: 2,
        name: "Dark Lab",
        subtitle: "Advanced",
        bg: "dark-lab.png",
        topics: ["algorithms", "searching", "sorting", "recursion"],
        topicLabels: ["Algorithms", "Searching", "Sorting", "Recursion"],
        boss: { name: "CTO", img: "cto-boss.jpeg", hp: 300, dmg: 14, roar: "volatile_roar.mp3" }
    },
    {
        id: 3,
        name: "Final World",
        subtitle: "Expert",
        bg: "final-world.png",
        topics: ["data-structures", "oop", "async", "apis"],
        topicLabels: ["Data Structures", "OOP", "Async JavaScript", "APIs"],
        boss: { name: "God Recruiter", img: "apocalypse-king.jpeg", hp: 420, dmg: 18, roar: "volatile_roar.mp3" }
    }
];

// Build all 20 levels (4 maps * 5 levels each: 4 topic levels + 1 boss level)
const LEVELS = [];
MAPS.forEach((map, mapIndex) => {
    for (let li = 0; li < 4; li++) {
        LEVELS.push({
            globalIndex: LEVELS.length,
            mapIndex,
            levelInMap: li + 1,
            isBoss: false,
            topic: map.topics[li],
            topicLabel: map.topicLabels[li]
        });
    }
    LEVELS.push({
        globalIndex: LEVELS.length,
        mapIndex,
        levelInMap: 5,
        isBoss: true,
        topic: null,
        topicLabel: "Boss Fight"
    });
});

/* -------------------------
SKILLS
------------------------- */

const SKILLS = [
    { id: "speed", name: "Speed Boost", desc: "+35% movement speed", type: "passive", unlockAtMap: 0 },
    { id: "shield", name: "Shield", desc: "Halves incoming damage", type: "passive", unlockAtMap: 1 },
    { id: "doubleXp", name: "Double XP", desc: "Doubles XP earned", type: "passive", unlockAtMap: 3 },
    { id: "critical", name: "Critical Attack", desc: "30% chance to deal 2x boss damage", type: "passive", unlockAtMap: 2 },
    { id: "freeze", name: "Freeze Zombies", desc: "Freezes all zombies for 4s", type: "active", cost: 30, cooldown: 15000, unlockAtMap: 2 },
    { id: "lightning", name: "Lightning Strike", desc: "Deals 40 burst damage to boss", type: "active", cost: 40, cooldown: 12000, unlockAtMap: 3 }
];

/* -------------------------
ITEMS (pickups)
------------------------- */

const ITEM_TYPES = [
    { id: "potion", emoji: "🧪", label: "Health Potion" },
    { id: "mana", emoji: "🔷", label: "Mana Potion" },
    { id: "key", emoji: "🔑", label: "Key" },
    { id: "gem", emoji: "💎", label: "Gem" },
    { id: "coin", emoji: "🪙", label: "Coin" },
    { id: "fragment", emoji: "🧩", label: "Code Fragment" }
];

/* -------------------------
SHOP
------------------------- */

const SHOP_ITEMS = [
    { id: "buyPotion", label: "Health Potion", cost: 10, currency: "coins" },
    { id: "buyShield", label: "Shield Charge", cost: 15, currency: "coins" },
    { id: "buyXpBoost", label: "XP Boost (x2 for 1 level)", cost: 5, currency: "gems" },
    { id: "buyLife", label: "Extra Life", cost: 20, currency: "gems" }
];

/* -------------------------
CHARACTERS (selectable at game start)
------------------------- */

const CHARACTERS = [
    { id: "pixelBlaze", name: "Pixel Blaze", img: "pixel-blaze.jpeg" },
    { id: "codeTitan", name: "Code Titan", img: "code-titan.jpeg" },
    { id: "byteHunter", name: "Byte Hunter", img: "byte-hunter.jpeg" },
    { id: "shadowFirewall", name: "Shadow Firewall", img: "shadow-firewall.jpeg" }
];

/* -------------------------
NPC DIALOGUE (one flavor line per map)
------------------------- */

/* -------------------------
DIFFICULTY LEVELS (V21)
------------------------- */

const DIFFICULTIES = [
    { id: "easy", name: "Easy", zombieSpeedMult: 0.6, damageMult: 0.7, xpMult: 1.0 },
    { id: "normal", name: "Normal", zombieSpeedMult: 1.0, damageMult: 1.0, xpMult: 1.0 },
    { id: "hard", name: "Hard", zombieSpeedMult: 1.5, damageMult: 1.5, xpMult: 1.8 }
];

/* -------------------------
DAILY MISSIONS (V21)
------------------------- */

const DAILY_MISSIONS = [
    { id: "kill10", name: "Zombie Slayer", desc: "Defeat 10 zombies", target: 10, reward: { coins: 50, gems: 2 } },
    { id: "correct5", name: "Code Master", desc: "Answer 5 questions correctly", target: 5, reward: { xp: 100, gems: 1 } },
    { id: "boss1", name: "Boss Hunter", desc: "Defeat 1 boss", target: 1, reward: { coins: 100, gems: 5 } },
    { id: "complete2", name: "Level Rusher", desc: "Complete 2 levels", target: 2, reward: { xp: 75, coins: 60 } }
];

/* -------------------------
NPC DIALOGUE (one flavor line per map)
------------------------- */

const NPC_LINES = [
    "Survivor: \"Watch the HR Zombies near the gates... they bite hard on wrong answers.\"",
    "Survivor: \"The Tech Fortress firewalls only open for those who know their arrays.\"",
    "Survivor: \"Down in the Dark Lab, recursion will save you more than brute force ever will.\"",
    "Survivor: \"This is it... beat the God Recruiter and we all go home.\""
];
