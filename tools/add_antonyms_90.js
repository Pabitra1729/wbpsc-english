const fs = require('fs');

const rawData = [
  { q: "Antonym of: Ancient", opts: ["Old", "Modern", "Historic", "Archaic"], ans: "b" },
  { q: "Antonym of: Bold", opts: ["Brave", "Daring", "Timid", "Fearless"], ans: "c" },
  { q: "Antonym of: Brief", opts: ["Short", "Lengthy", "Concise", "Quick"], ans: "b" },
  { q: "Antonym of: Courage", opts: ["Bravery", "Valour", "Cowardice", "Boldness"], ans: "c" },
  { q: "Antonym of: Expand", opts: ["Contract", "Grow", "Spread", "Enlarge"], ans: "a" },
  { q: "Antonym of: Generous", opts: ["Liberal", "Kind", "Stingy", "Noble"], ans: "c" },
  { q: "Antonym of: Hostile", opts: ["Friendly", "Rude", "Angry", "Fierce"], ans: "a" },
  { q: "Antonym of: Humble", opts: ["Meek", "Modest", "Polite", "Arrogant"], ans: "d" },
  { q: "Antonym of: Optimistic", opts: ["Hopeful", "Pessimistic", "Cheerful", "Positive"], ans: "b" },
  { q: "Antonym of: Rigid", opts: ["Stiff", "Firm", "Flexible", "Strict"], ans: "c" },
  { q: "Antonym of: Scarce", opts: ["Rare", "Abundant", "Few", "Limited"], ans: "b" },
  { q: "Antonym of: Transparent", opts: ["Clear", "Opaque", "Thin", "Visible"], ans: "b" },
  { q: "Antonym of: Temporary", opts: ["Brief", "Short-lived", "Passing", "Permanent"], ans: "d" },
  { q: "Antonym of: Vague", opts: ["Obscure", "Hazy", "Precise", "Unclear"], ans: "c" },
  { q: "Antonym of: Zenith", opts: ["Peak", "Summit", "Apex", "Nadir"], ans: "d" },
  { q: "Antonym of: Ascend", opts: ["Climb", "Rise", "Descend", "Mount"], ans: "c" },
  { q: "Antonym of: Benevolent", opts: ["Kind", "Malevolent", "Generous", "Charitable"], ans: "b" },
  { q: "Antonym of: Diligent", opts: ["Industrious", "Lazy", "Hardworking", "Active"], ans: "b" },
  { q: "Antonym of: Fertile", opts: ["Barren", "Rich", "Fruitful", "Productive"], ans: "a" },
  { q: "Antonym of: Gloomy", opts: ["Dark", "Sad", "Cheerful", "Dull"], ans: "c" },
  { q: "Antonym of: Harmony", opts: ["Unity", "Peace", "Accord", "Discord"], ans: "d" },
  { q: "Antonym of: Inferior", opts: ["Lower", "Superior", "Minor", "Poor"], ans: "b" },
  { q: "Antonym of: Lenient", opts: ["Merciful", "Strict", "Mild", "Tolerant"], ans: "b" },
  { q: "Antonym of: Novice", opts: ["Beginner", "Amateur", "Expert", "Learner"], ans: "c" },
  { q: "Antonym of: Obscure", opts: ["Vague", "Hidden", "Clear", "Dim"], ans: "c" },
  { q: "Antonym of: Prodigal", opts: ["Wasteful", "Extravagant", "Lavish", "Thrifty"], ans: "d" },
  { q: "Antonym of: Reluctant", opts: ["Unwilling", "Eager", "Hesitant", "Loath"], ans: "b" },
  { q: "Antonym of: Tranquil", opts: ["Calm", "Peaceful", "Turbulent", "Quiet"], ans: "c" },
  { q: "Antonym of: Valid", opts: ["Legal", "Sound", "Genuine", "Invalid"], ans: "d" },
  { q: "Antonym of: Wisdom", opts: ["Folly", "Knowledge", "Sense", "Insight"], ans: "a" },
  { q: "Antonym of: Frequent", opts: ["Common", "Rare", "Regular", "Usual"], ans: "b" },
  { q: "Antonym of: Accept", opts: ["Reject", "Receive", "Take", "Agree"], ans: "a" },
  { q: "Antonym of: Victory", opts: ["Triumph", "Success", "Defeat", "Win"], ans: "c" },
  { q: "Antonym of: Conceal", opts: ["Hide", "Reveal", "Cover", "Bury"], ans: "b" },
  { q: "Antonym of: Inflate", opts: ["Expand", "Swell", "Deflate", "Enlarge"], ans: "c" },
  { q: "Antonym of: Abundant", opts: ["Plentiful", "Scanty", "Ample", "Rich"], ans: "b" },
  { q: "Antonym of: Ephemeral", opts: ["Brief", "Fleeting", "Eternal", "Momentary"], ans: "c" },
  { q: "Antonym of: Candid", opts: ["Frank", "Open", "Honest", "Deceitful"], ans: "d" },
  { q: "Antonym of: Arrogant", opts: ["Proud", "Haughty", "Modest", "Vain"], ans: "c" },
  { q: "Antonym of: Sane", opts: ["Rational", "Insane", "Sensible", "Normal"], ans: "b" },
  { q: "Antonym of: Absent", opts: ["Missing", "Away", "Present", "Gone"], ans: "c" },
  { q: "Antonym of: Admire", opts: ["Respect", "Praise", "Despise", "Honour"], ans: "c" },
  { q: "Antonym of: Adversity", opts: ["Hardship", "Prosperity", "Trouble", "Misery"], ans: "b" },
  { q: "Antonym of: Affluence", opts: ["Wealth", "Riches", "Abundance", "Poverty"], ans: "d" },
  { q: "Antonym of: Amateur", opts: ["Beginner", "Novice", "Professional", "Learner"], ans: "c" },
  { q: "Antonym of: Approve", opts: ["Disapprove", "Permit", "Allow", "Accept"], ans: "a" },
  { q: "Antonym of: Artificial", opts: ["Fake", "Natural", "Synthetic", "False"], ans: "b" },
  { q: "Antonym of: Attract", opts: ["Draw", "Pull", "Repel", "Invite"], ans: "c" },
  { q: "Antonym of: Blame", opts: ["Accuse", "Condemn", "Criticise", "Praise"], ans: "d" },
  { q: "Antonym of: Brave", opts: ["Cowardly", "Bold", "Daring", "Heroic"], ans: "a" },
  { q: "Antonym of: Cheap", opts: ["Low", "Expensive", "Affordable", "Economical"], ans: "b" },
  { q: "Antonym of: Combine", opts: ["Join", "Unite", "Separate", "Merge"], ans: "c" },
  { q: "Antonym of: Complex", opts: ["Complicated", "Simple", "Intricate", "Tangled"], ans: "b" },
  { q: "Antonym of: Compulsory", opts: ["Mandatory", "Obligatory", "Required", "Optional"], ans: "d" },
  { q: "Antonym of: Condemn", opts: ["Applaud", "Blame", "Censure", "Denounce"], ans: "a" },
  { q: "Antonym of: Constant", opts: ["Steady", "Fixed", "Variable", "Stable"], ans: "c" },
  { q: "Antonym of: Cruel", opts: ["Brutal", "Kind", "Harsh", "Savage"], ans: "b" },
  { q: "Antonym of: Defend", opts: ["Protect", "Guard", "Shield", "Attack"], ans: "d" },
  { q: "Antonym of: Deliberate", opts: ["Intentional", "Accidental", "Planned", "Purposeful"], ans: "b" },
  { q: "Antonym of: Dense", opts: ["Thick", "Compact", "Sparse", "Packed"], ans: "c" },
  { q: "Antonym of: Departure", opts: ["Exit", "Arrival", "Leaving", "Going"], ans: "b" },
  { q: "Antonym of: Domestic", opts: ["Foreign", "Local", "Native", "Household"], ans: "a" },
  { q: "Antonym of: Dull", opts: ["Blunt", "Boring", "Sharp", "Slow"], ans: "c" },
  { q: "Antonym of: Empty", opts: ["Vacant", "Hollow", "Blank", "Full"], ans: "d" },
  { q: "Antonym of: Evil", opts: ["Wicked", "Virtuous", "Sinful", "Vile"], ans: "b" },
  { q: "Antonym of: Exterior", opts: ["Outside", "Outer", "External", "Interior"], ans: "d" },
  { q: "Antonym of: Fake", opts: ["Genuine", "False", "Bogus", "Sham"], ans: "a" },
  { q: "Antonym of: Fiction", opts: ["Story", "Myth", "Fact", "Legend"], ans: "c" },
  { q: "Antonym of: Guilty", opts: ["Innocent", "Culpable", "Blameworthy", "Criminal"], ans: "a" },
  { q: "Antonym of: Hasty", opts: ["Quick", "Leisurely", "Rapid", "Rushed"], ans: "b" },
  { q: "Antonym of: Idle", opts: ["Lazy", "Inactive", "Busy", "Sluggish"], ans: "c" },
  { q: "Antonym of: Imprison", opts: ["Jail", "Confine", "Release", "Detain"], ans: "c" },
  { q: "Antonym of: Include", opts: ["Contain", "Add", "Embrace", "Exclude"], ans: "d" },
  { q: "Antonym of: Joy", opts: ["Delight", "Sorrow", "Pleasure", "Glee"], ans: "b" },
  { q: "Antonym of: Lofty", opts: ["Tall", "Lowly", "High", "Elevated"], ans: "b" },
  { q: "Antonym of: Majority", opts: ["Most", "Bulk", "Minority", "Mass"], ans: "c" },
  { q: "Antonym of: Maximum", opts: ["Highest", "Greatest", "Utmost", "Minimum"], ans: "d" },
  { q: "Antonym of: Mild", opts: ["Gentle", "Harsh", "Soft", "Tender"], ans: "b" },
  { q: "Antonym of: Mortal", opts: ["Human", "Fatal", "Immortal", "Deadly"], ans: "c" },
  { q: "Antonym of: Negligent", opts: ["Careless", "Careful", "Lax", "Remiss"], ans: "b" },
  { q: "Antonym of: Often", opts: ["Seldom", "Frequently", "Usually", "Regularly"], ans: "a" },
  { q: "Antonym of: Polite", opts: ["Courteous", "Civil", "Gracious", "Rude"], ans: "d" },
  { q: "Antonym of: Rapid", opts: ["Swift", "Quick", "Slow", "Fast"], ans: "c" },
  { q: "Antonym of: Rural", opts: ["Urban", "Rustic", "Pastoral", "Country"], ans: "a" },
  { q: "Antonym of: Strengthen", opts: ["Reinforce", "Weaken", "Fortify", "Harden"], ans: "b" },
  { q: "Antonym of: Sturdy", opts: ["Strong", "Robust", "Firm", "Frail"], ans: "d" },
  { q: "Antonym of: Sweet", opts: ["Sugary", "Bitter", "Pleasant", "Honeyed"], ans: "b" },
  { q: "Antonym of: Zeal", opts: ["Passion", "Ardour", "Apathy", "Eagerness"], ans: "c" },
  { q: "Antonym of: Vice", opts: ["Sin", "Evil", "Wickedness", "Virtue"], ans: "d" },
  { q: "Antonym of: Gather", opts: ["Collect", "Scatter", "Assemble", "Amass"], ans: "b" }
];

const letterMap = { a: 0, b: 1, c: 2, d: 3 };
const filePath = 'data/questions/vocabulary/02-antonyms.json';
const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let startId = 46;
const newQuestions = rawData.map((item, idx) => {
  const ansIdx = letterMap[item.ans];
  const correctWord = item.opts[ansIdx];
  const targetWord = item.q.replace("Antonym of: ", "").trim();
  const qNum = String(startId + idx).padStart(3, '0');
  return {
    id: `v02-${qNum}`,
    chapter: "v02",
    type: "antonym",
    difficulty: (idx % 3 === 0) ? "easy" : (idx % 3 === 1) ? "medium" : "hard",
    isPYQ: false,
    question: `What is the antonym of '${targetWord}'?`,
    options: item.opts,
    answer: ansIdx,
    explanation: `'${correctWord}' is opposite in meaning to '${targetWord}'.`,
    rule: "Antonyms & Contrast Clues",
    bengaliHint: `'${targetWord}'-এর বিপরীত শব্দ হলো '${correctWord}'।`
  };
});

const updated = existing.concat(newQuestions);
fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
console.log(`v02: successfully added ${newQuestions.length} questions. Total now: ${updated.length}`);
