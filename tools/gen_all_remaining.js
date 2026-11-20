const fs = require('fs');
const path = require('path');

function appendToChapter(filePath, newItems) {
  const full = path.join(__dirname, '..', filePath);
  let existing = [];
  if (fs.existsSync(full)) {
    existing = JSON.parse(fs.readFileSync(full, 'utf8'));
  }
  const existingIds = new Set(existing.map(q => q.id));
  newItems.forEach(q => {
    if (!existingIds.has(q.id)) {
      existing.push(q);
      existingIds.add(q.id);
    }
  });
  fs.writeFileSync(full, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`Saved ${filePath}: total ${existing.length} questions.`);
}

console.log("Ready to generate comprehensive question bank batches...");
