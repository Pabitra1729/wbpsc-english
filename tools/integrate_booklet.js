const fs = require('fs');
const path = require('path');

const bookletDir = path.join(__dirname, '..', 'data', 'booklet');
const phrasalVerbs = JSON.parse(fs.readFileSync(path.join(bookletDir, 'phrasal-verbs-250.json'), 'utf8'));
const idioms = JSON.parse(fs.readFileSync(path.join(bookletDir, 'idioms-250.json'), 'utf8'));
const words = JSON.parse(fs.readFileSync(path.join(bookletDir, 'vocab-words-250.json'), 'utf8'));

// 1. Expand vocabulary-builder.json to all 250 words
const expandedBuilder = words.map((w, idx) => ({
  id: `w${String(idx + 1).padStart(3, '0')}`,
  word: w.word,
  meaning: w.meaning,
  bengali: w.bengali,
  example: `The word '${w.word}' is frequently tested in WBPSC examinations.`,
  partOfSpeech: "vocabulary"
}));
fs.writeFileSync('data/vocabulary-builder.json', JSON.stringify(expandedBuilder, null, 2), 'utf8');
console.log(`Updated vocabulary-builder.json with ${expandedBuilder.length} items.`);

// 2. Enrich data/notes/vocabulary/05-phrasal-verbs.json
const pvNotePath = 'data/notes/vocabulary/05-phrasal-verbs.json';
if (fs.existsSync(pvNotePath)) {
  const pvNote = JSON.parse(fs.readFileSync(pvNotePath, 'utf8'));
  pvNote.bookletTitle = "WBPSC Clerkship Official 250 Phrasal Verbs Repository";
  pvNote.bookletType = "phrasal-verbs";
  pvNote.bookletList = phrasalVerbs.map(p => ({
    term: p.phrase,
    meaning: p.meaning,
    bengali: p.bengali
  }));
  fs.writeFileSync(pvNotePath, JSON.stringify(pvNote, null, 2), 'utf8');
  console.log(`Enriched ${pvNotePath} with 250 Phrasal Verbs booklet.`);
}

// 3. Enrich data/notes/vocabulary/04-idioms-phrases.json
const idNotePath = 'data/notes/vocabulary/04-idioms-phrases.json';
if (fs.existsSync(idNotePath)) {
  const idNote = JSON.parse(fs.readFileSync(idNotePath, 'utf8'));
  idNote.bookletTitle = "WBPSC Clerkship Official 250 Idioms & Phrases Repository";
  idNote.bookletType = "idioms";
  idNote.bookletList = idioms.map(i => ({
    term: i.idiom,
    meaning: i.meaning,
    bengali: i.bengali
  }));
  fs.writeFileSync(idNotePath, JSON.stringify(idNote, null, 2), 'utf8');
  console.log(`Enriched ${idNotePath} with 250 Idioms booklet.`);
}

// 4. Enrich data/notes/vocabulary/01-synonyms.json
const synNotePath = 'data/notes/vocabulary/01-synonyms.json';
if (fs.existsSync(synNotePath)) {
  const synNote = JSON.parse(fs.readFileSync(synNotePath, 'utf8'));
  synNote.bookletTitle = "WBPSC Clerkship Official 250 High-Frequency Vocabulary Words";
  synNote.bookletType = "words";
  synNote.bookletList = words.map(w => ({
    term: w.word,
    meaning: w.meaning,
    bengali: w.bengali
  }));
  fs.writeFileSync(synNotePath, JSON.stringify(synNote, null, 2), 'utf8');
  console.log(`Enriched ${synNotePath} with 250 Vocabulary Words booklet.`);
}

console.log('Booklet data integration completed successfully!');
