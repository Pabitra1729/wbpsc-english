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

console.log('Sample rows from Table 2 (OWS):', tables[2].slice(1, 4));
console.log('Sample rows from Table 3 (Synonyms):', tables[3].slice(1, 4));
console.log('Sample rows from Table 4 (Antonyms):', tables[4].slice(1, 4));
console.log('Sample rows from Table 5 (Spelling):', tables[5].slice(1, 4));
console.log('Table 6 (Terms):', tables[6]);
console.log('Table 7 (Homonyms):', tables[7]);
console.log('Sample rows from Table 8 (Homophone pairs):', tables[8].slice(1, 4));
console.log('Sample rows from Table 9 (Key words in sentences):', tables[9].slice(1, 4));
console.log('Sample rows from Table 10 (Context sentences):', tables[10].slice(1, 4));
console.log('Sample rows from Table 11 (Idioms):', tables[11].slice(1, 4));
console.log('Sample rows from Table 12 (Phrasal Verbs):', tables[12].slice(1, 4));
