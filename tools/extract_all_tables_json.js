const fs = require('fs');

const xml = fs.readFileSync('temp_doc_notes/word/document.xml', 'utf8');

function unescapeXml(str) {
  return str.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
}

const tblRegex = /<w:tbl(?: [^>]*)?>([\s\S]*?)<\/w:tbl>/g;
const trRegex = /<w:tr(?: [^>]*)?>([\s\S]*?)<\/w:tr>/g;
const tcRegex = /<w:tc(?: [^>]*)?>([\s\S]*?)<\/w:tc>/g;
const tRegex = /<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g;

let tblMatch;
let tblIdx = 0;
const tables = {};

while ((tblMatch = tblRegex.exec(xml)) !== null) {
  tblIdx++;
  const tblXml = tblMatch[1];
  let trMatch;
  const rows = [];
  while ((trMatch = trRegex.exec(tblXml)) !== null) {
    const trXml = trMatch[1];
    let tcMatch;
    const cells = [];
    while ((tcMatch = tcRegex.exec(trXml)) !== null) {
      const tcXml = tcMatch[1];
      let tMatch;
      let cellText = '';
      while ((tMatch = tRegex.exec(tcXml)) !== null) {
        cellText += tMatch[1];
      }
      cells.push(unescapeXml(cellText).trim());
    }
    if (cells.some(c => c.length > 0)) {
      rows.push(cells);
    }
  }
  tables[tblIdx] = rows;
}

const rawDump = {
  ows100: tables[2].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], phrase: r[2] })),
  synonyms95: tables[3].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], synonym: r[2] })),
  antonyms90: tables[4].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], antonym: r[2] })),
  spelling75: tables[5].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], misspellings: r[2] })),
  terms6: tables[6].slice(1).map(r => ({ term: r[0], meaning: r[1], examples: r[2] })),
  homonyms7: tables[7].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], meanings: r[2] })),
  homophones8: tables[8].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], homophone: r[2] })),
  keyWordSentences9: tables[9].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], sentence: r[2] })),
  context70: tables[10].slice(1).map(r => ({ no: parseInt(r[0], 10), word: r[1], sentence: r[2] })),
  idioms102: tables[11].slice(1).map(r => ({ no: parseInt(r[0], 10), idiom: r[1], meaning: r[2] })),
  phrasalVerbs40: tables[12].slice(1).map(r => ({ no: parseInt(r[0], 10), phrase: r[1], meaning: r[2] }))
};

fs.writeFileSync('tools/raw_vocab_dump.json', JSON.stringify(rawDump, null, 2), 'utf8');
console.log('Successfully wrote tools/raw_vocab_dump.json');
Object.keys(rawDump).forEach(k => console.log(`${k}: ${rawDump[k].length} items`));
