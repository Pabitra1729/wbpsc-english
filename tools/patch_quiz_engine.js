const fs = require('fs');
let content = fs.readFileSync('js/quiz-engine.js', 'utf8');

content = content.replace(
  '${note.commonMistakes?.length?`<section><h2>Common mistakes</h2><ul>${note.commonMistakes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}',
  '${note.commonMistakes?.length?`<section class="note-callout mistakes-callout"><h2><span class="callout-icon" aria-hidden="true">⚠️</span> Common Exam Traps &amp; Mistakes</h2><ul>${note.commonMistakes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}'
);
content = content.replace(
  '${note.examTricks?.length?`<section><h2>Exam tricks</h2><ul>${note.examTricks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}',
  '${note.examTricks?.length?`<section class="note-callout tricks-callout"><h2><span class="callout-icon" aria-hidden="true">⚡</span> Exam Tricks &amp; High-Yield Shortcuts</h2><ul>${note.examTricks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}'
);
content = content.replace(
  '${note.memoryTricks?.length?`<section><h2>Memory tricks</h2><ul>${note.memoryTricks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}',
  '${note.memoryTricks?.length?`<section class="note-callout memory-callout"><h2><span class="callout-icon" aria-hidden="true">🧠</span> Memory Tricks &amp; Mnemonics</h2><ul>${note.memoryTricks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}'
);
content = content.replace(
  '${note.revision?.length?`<section class="revision"><h2>Quick revision</h2><ul>${note.revision.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}',
  '${note.revision?.length?`<section class="note-callout revision-callout"><h2><span class="callout-icon" aria-hidden="true">📌</span> Quick Revision Capsule</h2><ul>${note.revision.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}'
);

fs.writeFileSync('js/quiz-engine.js', content, 'utf8');
console.log('Patch applied to js/quiz-engine.js!');
