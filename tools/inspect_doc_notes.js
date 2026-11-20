const fs = require('fs');

const xml = fs.readFileSync('temp_doc_notes/word/document.xml', 'utf8');

function unescapeXml(str) {
  return str
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
}

// Find all tables and their rows/cells
const tblRegex = /<w:tbl(?: [^>]*)?>([\s\S]*?)<\/w:tbl>/g;
const trRegex = /<w:tr(?: [^>]*)?>([\s\S]*?)<\/w:tr>/g;
const tcRegex = /<w:tc(?: [^>]*)?>([\s\S]*?)<\/w:tc>/g;
const tRegex = /<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g;

let tblMatch;
let tblIdx = 0;
const tables = [];

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
  tables.push({ index: tblIdx, rowCount: rows.length, sampleHeader: rows[0], sampleRow1: rows[1] });
}

console.log(`Found ${tables.length} tables in docx:`);
tables.forEach(t => {
  console.log(`Table #${t.index}: ${t.rowCount} rows. Header:`, t.sampleHeader, `Row 1:`, t.sampleRow1);
});
