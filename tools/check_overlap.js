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

const booklet = JSON.parse(fs.readFileSync('data/booklet/clerkship-booklet.json', 'utf8'));

// Check idioms (Table 11)
const docIdioms = tables[11].slice(1).map(r => ({ no: r[0], idiom: r[1], meaning: r[2] }));
const bookletIdioms = new Set(booklet.idioms.map(i => i.idiom.toLowerCase()));
let idiomMatches = 0;
docIdioms.forEach(d => {
  if (bookletIdioms.has(d.idiom.toLowerCase())) idiomMatches++;
});
console.log(`Doc idioms: ${docIdioms.length}, Matches in booklet: ${idiomMatches}`);

// Check phrasal verbs (Table 12)
const docPV = tables[12].slice(1).map(r => ({ no: r[0], phrase: r[1], meaning: r[2] }));
const bookletPV = new Set(booklet.phrasalVerbs.map(p => p.phrase.toLowerCase()));
let pvMatches = 0;
docPV.forEach(d => {
  if (bookletPV.has(d.phrase.toLowerCase())) pvMatches++;
});
console.log(`Doc Phrasal Verbs: ${docPV.length}, Matches in booklet: ${pvMatches}`);
