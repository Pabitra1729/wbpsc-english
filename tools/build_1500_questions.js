const fs = require('fs');
const path = require('path');

// Helper to append questions cleanly
function appendBatch(filePath, newItems) {
  const fullPath = path.join(__dirname, '..', filePath);
  let existing = [];
  if (fs.existsSync(fullPath)) {
    existing = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }
  const existingIds = new Set(existing.map(q => q.id));
  newItems.forEach(q => {
    if (!existingIds.has(q.id)) {
      existing.push(q);
      existingIds.add(q.id);
    }
  });
  fs.writeFileSync(fullPath, JSON.stringify(existing, null, 2), 'utf8');
  return existing.length;
}

console.log("Starting question bank expansion to reach 1500+ questions...");
