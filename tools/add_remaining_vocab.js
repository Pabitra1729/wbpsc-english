const fs = require('fs');
const path = require('path');

function unescapeXml(str) {
  return str
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
}

function extractParagraphs(xmlPath) {
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const pRegex = /<w:p(?: [^>]*)?>([\s\S]*?)<\/w:p>/g;
  const tRegex = /<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g;
  const paragraphs = [];
  let pMatch;
  while ((pMatch = pRegex.exec(xml)) !== null) {
    let text = '';
    let tMatch;
    while ((tMatch = tRegex.exec(pMatch[1])) !== null) {
      text += tMatch[1];
    }
    text = unescapeXml(text).trim();
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}

function parseDocQuestions(folderName) {
  const xmlPath = path.join(__dirname, '..', `temp_${folderName}`, 'word', 'document.xml');
  const paras = extractParagraphs(xmlPath);
  const answerKey = {};
  
  // Extract answer key from lines like "1 – b"
  paras.forEach(p => {
    const m = p.match(/^(\d+)\s*[-–]\s*([a-d])$/i);
    if (m) {
      answerKey[parseInt(m[1], 10)] = m[2].toLowerCase();
    }
  });

  const list = [];
  for (let i = 0; i < paras.length; i++) {
    const p = paras[i];
    const qm = p.match(/^(\d+)\.\s*(.*)/);
    if (qm) {
      const num = parseInt(qm[1], 10);
      let optLine = '';
      for (let j = i + 1; j < Math.min(paras.length, i + 5); j++) {
        if (paras[j].includes('(a)') && paras[j].includes('(b)')) {
          optLine = paras[j];
          break;
        }
      }
      if (optLine) {
        const om = optLine.match(/\(a\)\s*(.*?)\s*\(b\)\s*(.*?)\s*\(c\)\s*(.*?)\s*\(d\)\s*(.*)/i);
        if (om) {
          const ansLetter = answerKey[num];
          if (!ansLetter) {
            throw new Error(`Missing answer key for ${folderName} question ${num}`);
          }
          const letterToIdx = { a: 0, b: 1, c: 2, d: 3 };
          list.push({
            num,
            questionText: qm[2].trim(),
            options: [om[1].trim(), om[2].trim(), om[3].trim(), om[4].trim()],
            ansIdx: letterToIdx[ansLetter],
            ansLetter
          });
        }
      }
    }
  }
  return list;
}

// 1. Process Spelling (75 MCQs)
console.log('Processing Spelling (75 MCQs)...');
const spellingList = parseDocQuestions('spelling');
console.log(`Parsed ${spellingList.length} spelling questions.`);
if (spellingList.length !== 75) throw new Error(`Expected 75 spelling questions, found ${spellingList.length}`);

const spellingFilePath = path.join(__dirname, '..', 'data', 'questions', 'vocabulary', '06-spelling.json');
const spellingData = JSON.parse(fs.readFileSync(spellingFilePath, 'utf8'));
const startSpellingIdx = spellingData.length + 1; // 46

spellingList.forEach((item, i) => {
  const currentNum = startSpellingIdx + i;
  const id = `v06-${String(currentNum).padStart(3, '0')}`;
  const correctWord = item.options[item.ansIdx];
  const diff = correctWord.length > 10 ? 'hard' : correctWord.length > 7 ? 'medium' : 'easy';
  
  spellingData.push({
    id,
    chapter: 'v06',
    type: 'spelling',
    difficulty: diff,
    isPYQ: false,
    question: 'Choose the correctly spelt word:',
    options: item.options,
    answer: item.ansIdx,
    explanation: `The correct spelling is '${correctWord}'.`,
    rule: `Spelling: ${correctWord}`,
    bengaliHint: `'${correctWord}'-এর সঠিক বানান নির্দেশ করুন।`
  });
});
fs.writeFileSync(spellingFilePath, JSON.stringify(spellingData, null, 2), 'utf8');
console.log(`Spelling updated. Total questions now: ${spellingData.length}`);

// 2. Process Homophones (70 MCQs)
console.log('\nProcessing Homophones (70 MCQs)...');
const homophonesList = parseDocQuestions('homophones');
console.log(`Parsed ${homophonesList.length} homophones questions.`);
if (homophonesList.length !== 70) throw new Error(`Expected 70 homophones questions, found ${homophonesList.length}`);

const homophonesFilePath = path.join(__dirname, '..', 'data', 'questions', 'vocabulary', '08-homophones-homonyms.json');
const homophonesData = JSON.parse(fs.readFileSync(homophonesFilePath, 'utf8'));
const startHomophonesIdx = homophonesData.length + 1; // 46

homophonesList.forEach((item, i) => {
  const currentNum = startHomophonesIdx + i;
  const id = `v08-${String(currentNum).padStart(3, '0')}`;
  const correctWord = item.options[item.ansIdx];
  let qText = item.questionText;
  if (!qText.endsWith('.') && !qText.endsWith('?') && !qText.endsWith('!')) {
    qText += '.';
  }
  const diffs = ['easy', 'medium', 'medium', 'hard'];
  const diff = diffs[i % diffs.length];

  homophonesData.push({
    id,
    chapter: 'v08',
    type: 'mcq',
    difficulty: diff,
    isPYQ: false,
    question: qText,
    options: item.options,
    answer: item.ansIdx,
    explanation: `'${correctWord}' is the correct choice here according to the sentence meaning and usage.`,
    rule: `Homophones & Homonyms: ${correctWord}`,
    bengaliHint: `বাক্যে অর্থপূর্ণভাবে সঠিক শব্দটি হলো '${correctWord}'।`
  });
});
fs.writeFileSync(homophonesFilePath, JSON.stringify(homophonesData, null, 2), 'utf8');
console.log(`Homophones updated. Total questions now: ${homophonesData.length}`);

// 3. Process Vocabulary in Context (70 MCQs)
console.log('\nProcessing Vocabulary in Context (70 MCQs)...');
const contextList = parseDocQuestions('context');
console.log(`Parsed ${contextList.length} context questions.`);
if (contextList.length !== 70) throw new Error(`Expected 70 context questions, found ${contextList.length}`);

const contextFilePath = path.join(__dirname, '..', 'data', 'questions', 'vocabulary', '09-vocabulary-in-context.json');
const contextData = JSON.parse(fs.readFileSync(contextFilePath, 'utf8'));
const startContextIdx = contextData.length + 1; // 46

contextList.forEach((item, i) => {
  const currentNum = startContextIdx + i;
  const id = `v09-${String(currentNum).padStart(3, '0')}`;
  const correctWord = item.options[item.ansIdx];
  let qText = item.questionText;
  if (!qText.endsWith('.') && !qText.endsWith('?') && !qText.endsWith('!')) {
    qText += '.';
  }
  const diffs = ['medium', 'medium', 'hard', 'easy'];
  const diff = diffs[i % diffs.length];

  contextData.push({
    id,
    chapter: 'v09',
    type: 'mcq',
    difficulty: diff,
    isPYQ: false,
    question: qText,
    options: item.options,
    answer: item.ansIdx,
    explanation: `'${correctWord}' is the most appropriate word fitting the tone and context of the sentence.`,
    rule: `Vocabulary in Context: ${correctWord}`,
    bengaliHint: `বাক্যের প্রেক্ষাপট অনুযায়ী সবচেয়ে যথোপযুক্ত শব্দ হলো '${correctWord}'।`
  });
});
fs.writeFileSync(contextFilePath, JSON.stringify(contextData, null, 2), 'utf8');
console.log(`Vocabulary in Context updated. Total questions now: ${contextData.length}`);

// Clean up temporary directories
['temp_spelling', 'temp_homophones', 'temp_context'].forEach(dir => {
  const p = path.join(__dirname, '..', dir);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    console.log(`Cleaned up ${dir}`);
  }
});

console.log('\nAll 215 remaining vocabulary questions processed successfully!');
