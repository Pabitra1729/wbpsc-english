const fs = require('fs');
const path = require('path');

const b1 = fs.readFileSync('tools/build_pyq_2019.js', 'utf8');
const b2 = fs.readFileSync('tools/build_both_pyq_2019.js', 'utf8');

// Helper to eval an array literal from string
function extractArray(code, regex) {
  const match = code.match(regex);
  if (!match) throw new Error("Could not match regex: " + regex);
  return eval(match[1]);
}

const s1GsRaw = extractArray(b1, /const gsRaw = (\[[\s\S]*?\]);/);
const s1ArithRaw = extractArray(b1, /const arithRaw = (\[[\s\S]*?\]);/);
const s1EnglishRaw = extractArray(b2, /const s1English = (\[[\s\S]*?\]);/);

const s2GsRaw = extractArray(b2, /const s2GsRaw = (\[[\s\S]*?\]);/);
const s2ArithRaw = extractArray(b2, /const s2ArithRaw = (\[[\s\S]*?\]);/);
const s2EnglishRaw = extractArray(b2, /const s2English = (\[[\s\S]*?\]);/);

console.log(`Loaded Shift 1: GS=${s1GsRaw.length}, Arith=${s1ArithRaw.length}, Eng=${s1EnglishRaw.length}`);
console.log(`Loaded Shift 2: GS=${s2GsRaw.length}, Arith=${s2ArithRaw.length}, Eng=${s2EnglishRaw.length}`);

// Convert GS & Arithmetic to full Question Schema
function formatGsQuestions(rawList, shiftCode, shiftName) {
  return rawList.map(item => ({
    id: `pyq-2019-${shiftCode}-${String(item.qNum).padStart(3, '0')}`,
    qNum: item.qNum,
    isPYQ: true,
    source: `WBPSC Clerkship 2019 (${shiftName})`,
    year: `2019-${shiftCode}`,
    stage: "part1",
    section: "generalStudies",
    topic: "generalStudies",
    subject: "General Studies",
    type: "mcq",
    difficulty: "medium",
    question: item.q,
    options: item.opts,
    answer: item.ans,
    explanation: item.expl || "Official Answer according to WBPSC Key.",
    bengaliHint: `সাধারণ জ্ঞান ও সাম্প্রতিক ঘটনাপ্রবাহ (General Studies Q.${item.qNum})`
  }));
}

function formatArithQuestions(rawList, shiftCode, shiftName) {
  return rawList.map(item => ({
    id: `pyq-2019-${shiftCode}-${String(item.qNum).padStart(3, '0')}`,
    qNum: item.qNum,
    isPYQ: true,
    source: `WBPSC Clerkship 2019 (${shiftName})`,
    year: `2019-${shiftCode}`,
    stage: "part1",
    section: "arithmetic",
    topic: "arithmetic",
    subject: "Arithmetic",
    type: "mcq",
    difficulty: "medium",
    question: item.q,
    options: item.opts,
    answer: item.ans,
    explanation: item.expl || "Official Answer and solution.",
    solution: item.expl || "",
    bengaliHint: `পাটিগণিত ও সমাধান পদ্ধতি (Arithmetic Q.${item.qNum})`
  }));
}

function formatEngQuestions(rawList, shiftCode, shiftName) {
  return rawList.map(item => ({
    ...item,
    id: `pyq-2019-${shiftCode}-${String(item.qNum).padStart(3, '0')}`,
    source: `WBPSC Clerkship 2019 (${shiftName})`,
    year: `2019-${shiftCode}`,
    section: "english",
    subject: "English",
    topic: item.topic || "english"
  }));
}

// 1. Build Shift 1 Full 100 Questions
const s1_100 = [
  ...formatGsQuestions(s1GsRaw, "s1", "Shift 1 / Series A DBF/19"),
  ...formatArithQuestions(s1ArithRaw, "s1", "Shift 1 / Series A DBF/19"),
  ...formatEngQuestions(s1EnglishRaw, "s1", "Shift 1 / Series A DBF/19")
];
if (s1_100.length !== 100) throw new Error("Shift 1 does not have 100 questions! Length: " + s1_100.length);

// 2. Build Shift 2 Full 100 Questions
const s2_100 = [
  ...formatGsQuestions(s2GsRaw, "s2", "Shift 2"),
  ...formatArithQuestions(s2ArithRaw, "s2", "Shift 2"),
  ...formatEngQuestions(s2EnglishRaw, "s2", "Shift 2")
];
if (s2_100.length !== 100) throw new Error("Shift 2 does not have 100 questions! Length: " + s2_100.length);

// Save shift-wise 100 question files
fs.writeFileSync('data/pyq/2019-shift1-100.json', JSON.stringify(s1_100, null, 2), 'utf8');
fs.writeFileSync('data/pyq/2019-shift2-100.json', JSON.stringify(s2_100, null, 2), 'utf8');
console.log('Saved data/pyq/2019-shift1-100.json (100 MCQs)');
console.log('Saved data/pyq/2019-shift2-100.json (100 MCQs)');

// 3. Save all 200 Questions into verified-pyq.json
const all200 = [...s1_100, ...s2_100];
fs.writeFileSync('data/pyq/verified-pyq.json', JSON.stringify(all200, null, 2), 'utf8');
console.log(`Saved ${all200.length} total verified PYQs (100 Shift 1 + 100 Shift 2) to data/pyq/verified-pyq.json`);

// 4. Update full paper json files
const paper1 = {
  exam: "WBPSC Clerkship Preliminary Examination",
  year: "2019",
  shift: "Shift 1",
  series: "Series A (DBF/19)",
  totalQuestions: 100,
  durationMinutes: 90,
  negativeMarking: "1/3 mark for each wrong answer",
  sections: {
    generalStudies: { count: 40, range: "Q1 - Q40", questions: s1GsRaw },
    arithmetic: { count: 30, range: "Q41 - Q70", questions: s1ArithRaw },
    english: { count: 30, range: "Q71 - Q100", questions: s1EnglishRaw }
  }
};
fs.writeFileSync('data/pyq/2019-shift1-full-paper.json', JSON.stringify(paper1, null, 2), 'utf8');

const paper2 = {
  exam: "WBPSC Clerkship Preliminary Examination",
  year: "2019",
  shift: "Shift 2",
  series: "Original 2nd Shift Paper",
  totalQuestions: 100,
  durationMinutes: 90,
  negativeMarking: "1/3 mark for each wrong answer",
  sections: {
    generalStudies: { count: 40, range: "Q1 - Q40", questions: s2GsRaw },
    arithmetic: { count: 30, range: "Q41 - Q70", questions: s2ArithRaw },
    english: { count: 30, range: "Q71 - Q100", questions: s2EnglishRaw }
  }
};
fs.writeFileSync('data/pyq/2019-shift2-full-paper.json', JSON.stringify(paper2, null, 2), 'utf8');

console.log('Both full paper structured files updated successfully.');
