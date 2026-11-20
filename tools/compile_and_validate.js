const fs = require('fs');
const path = require('path');

const chapters = JSON.parse(fs.readFileSync('data/chapters.json', 'utf8'));
let allQuestions = [];
let totalErrors = 0;
const stats = {
  bySection: {},
  byChapter: {},
  byDifficulty: { easy: 0, medium: 0, hard: 0 },
  total: 0
};

chapters.forEach(c => {
  if (c.status === 'ready' && c.questionsFile) {
    const qPath = c.questionsFile;
    if (!fs.existsSync(qPath)) {
      console.warn(`File not found: ${qPath}`);
      return;
    }
    const qList = JSON.parse(fs.readFileSync(qPath, 'utf8'));
    stats.byChapter[c.id] = qList.length;
    stats.bySection[c.section] = (stats.bySection[c.section] || 0) + qList.length;

    qList.forEach((q, idx) => {
      // Validation checks
      if (!q.id) { console.error(`Missing id in ${c.id}[${idx}]`); totalErrors++; }
      if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
        console.error(`Invalid answer index in ${q.id}: ${q.answer}`);
        totalErrors++;
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.error(`Invalid options length in ${q.id}: ${q.options ? q.options.length : 0}`);
        totalErrors++;
      }
      if (!q.question || q.question.trim() === '') {
        console.error(`Empty question text in ${q.id}`);
        totalErrors++;
      }
      if (!q.explanation || q.explanation.trim() === '') {
        console.error(`Empty explanation in ${q.id}`);
        totalErrors++;
      }
      if (q.isPYQ === true && !q.source) {
        console.error(`PYQ without source verification in ${q.id}`);
        totalErrors++;
      }

      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;

      allQuestions.push({
        ...q,
        section: c.section,
        chapterTitle: c.title,
        chapterOrder: c.order
      });
    });
  }
});

stats.total = allQuestions.length;

fs.writeFileSync('data/all-questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');

console.log('=== COMPILE & VALIDATION SUMMARY ===');
console.log('Total aggregated questions:', allQuestions.length);
console.log('Section counts:', JSON.stringify(stats.bySection, null, 2));
console.log('Difficulty distribution:', JSON.stringify(stats.byDifficulty, null, 2));
console.log('Total validation errors found:', totalErrors);
