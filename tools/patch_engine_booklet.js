const fs = require('fs');

const enginePath = 'js/quiz-engine.js';
let code = fs.readFileSync(enginePath, 'utf8');

// 1. Add jump pill for booklet
const jumpTarget = '${note.revision?.length ? `<a class="jump-pill" href="#sec-revision">Quick Revision</a>` : ""}';
const jumpReplacement = '${note.revision?.length ? `<a class="jump-pill" href="#sec-revision">Quick Revision</a>` : ""}\n       ${note.bookletList?.length ? `<a class="jump-pill highlight" href="#sec-booklet">Exam Directory (${note.bookletList.length})</a>` : ""}';

if (code.includes(jumpTarget)) {
  code = code.replace(jumpTarget, jumpReplacement);
}

// 2. Add booklet HTML section before chapter-bottom-cta
const ctaTarget = '<!-- Chapter Bottom Actions & Quiz Trigger -->';
const bookletHtml = `<!-- Vocabulary Booklet Repository Section (if present) -->
   \${note.bookletList?.length ? \`
     <section id="sec-booklet" class="booklet-section card">
       <div class="booklet-header">
         <div>
           <span class="section-sub">Official Booklet Repository</span>
           <h2>\${esc(note.bookletTitle || "High-Yield Vocabulary Directory")}</h2>
           <p class="callout-sub">\${note.bookletList.length} verified exam items with English and Bengali meanings</p>
         </div>
         <div class="booklet-search-wrap">
           <input type="search" id="booklet-search" placeholder="🔎 Search among \${note.bookletList.length} items (English or বাংলা)..." autocomplete="off">
         </div>
       </div>

       <div class="booklet-table-wrap">
         <table class="booklet-table" aria-label="Vocabulary directory">
           <thead>
             <tr>
               <th style="width: 50px;">#</th>
               <th style="width: 220px;">Word / Phrase</th>
               <th>English Meaning</th>
               <th style="width: 240px;">বাংলা অর্থ</th>
             </tr>
           </thead>
           <tbody id="booklet-tbody">
             \${note.bookletList.map((item, idx) => \`
               <tr>
                 <td class="b-num">\${idx + 1}</td>
                 <td class="b-term"><strong>\${esc(item.term)}</strong></td>
                 <td class="b-meaning">\${esc(item.meaning)}</td>
                 <td class="b-bengali">\${esc(item.bengali)}</td>
               </tr>
             \`).join("")}
           </tbody>
         </table>
       </div>
       <div id="booklet-empty" class="hidden" style="text-align:center; padding:1.5rem; color:var(--muted);">No matching entries found.</div>
     </section>
   \` : ""}

   <!-- Chapter Bottom Actions & Quiz Trigger -->`;

if (code.includes(ctaTarget)) {
  code = code.replace(ctaTarget, bookletHtml);
}

// 3. Attach booklet search event listener
const listenerTarget = 'const heroPracticeBtn = document.querySelector("#hero-practice-btn");';
const listenerCode = `const heroPracticeBtn = document.querySelector("#hero-practice-btn");
  if (heroPracticeBtn) heroPracticeBtn.addEventListener("click", () => { renderQuiz(questions, chapter); });

  const bookletSearch = document.querySelector("#booklet-search");
  if (bookletSearch && note.bookletList) {
    const tbody = document.querySelector("#booklet-tbody");
    const emptyMsg = document.querySelector("#booklet-empty");
    bookletSearch.addEventListener("input", () => {
      const q = bookletSearch.value.trim().toLowerCase();
      const filtered = note.bookletList.filter(item => 
        item.term.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.bengali.toLowerCase().includes(q)
      );
      tbody.innerHTML = filtered.map((item, idx) => \`
        <tr>
          <td class="b-num">\${idx + 1}</td>
          <td class="b-term"><strong>\${esc(item.term)}</strong></td>
          <td class="b-meaning">\${esc(item.meaning)}</td>
          <td class="b-bengali">\${esc(item.bengali)}</td>
        </tr>
      \`).join("");
      if (emptyMsg) emptyMsg.classList.toggle("hidden", filtered.length > 0);
    });
  }`;

if (code.includes('if (heroPracticeBtn) heroPracticeBtn.addEventListener("click", () => { renderQuiz(questions, chapter); });')) {
  code = code.replace('if (heroPracticeBtn) heroPracticeBtn.addEventListener("click", () => { renderQuiz(questions, chapter); });', listenerCode.replace(listenerTarget + '\n  ', ''));
}

fs.writeFileSync(enginePath, code, 'utf8');
console.log('Successfully patched quiz-engine.js with booklet repository support!');
