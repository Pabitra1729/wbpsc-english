(()=>{
 const main=document.querySelector("#chapter-content");
 if(!main)return;
 const id=new URLSearchParams(location.search).get("id");
 const retryId=new URLSearchParams(location.search).get("retry");
 
 async function get(url){const r=await fetch(url);if(!r.ok)throw new Error("Could not load "+url);return r.json()}
 function esc(v){const d=document.createElement("div");d.textContent=v==null?"":v;return d.innerHTML}

 function formatMistake(item){
   const text = String(item);
   // Check if the item matches pattern: '... instead of ...'
   if(text.includes("instead of")){
     const parts = text.split("instead of");
     const badPart = parts[0].replace(/^(Saying|Writing|Using|Confusing)s+/i, "").replace(/['"]/g, "").trim();
     const goodPart = parts[1].replace(/['".]/g, "").trim();
     return `<div class="mistake-comparison">
       <div class="mistake-col bad"><span class="m-label">❌ Exam Trap</span><span class="m-text">${esc(badPart)}</span></div>
       <div class="mistake-col good"><span class="m-label">✅ Correct Usage</span><span class="m-text">${esc(goodPart)}</span></div>
     </div>`;
   }
   // Check if item contains '(Correct: ...)'
   if(text.includes("(Correct:")){
     const match = text.match(/(.*?)s*(Correct:s*(.*?))/i);
     if(match){
       const badPart = match[1].replace(/^(Saying|Writing|Using)s+/i, "").replace(/['"]/g, "").trim();
       const goodPart = match[2].replace(/['"]/g, "").trim();
       return `<div class="mistake-comparison">
         <div class="mistake-col bad"><span class="m-label">❌ Exam Trap</span><span class="m-text">${esc(badPart)}</span></div>
         <div class="mistake-col good"><span class="m-label">✅ Correct Usage</span><span class="m-text">${esc(goodPart)}</span></div>
       </div>`;
     }
   }
   return `<div class="mistake-bullet"><span class="m-icon">⚠️</span><span>${esc(text)}</span></div>`;
 }

 function renderNotes(note,chapter,questions){
  const sectionLabel = chapter.section ? chapter.section.toUpperCase() : "GENERAL";
  const orderFormatted = String(chapter.order || 1).padStart(2, "0");
  const isBookmarked = WBPSCBookmarks.has("chapter-" + chapter.id);

  main.innerHTML = `
   <header class="chapter-hero">
     <div class="chapter-meta-bar">
       <span class="badge badge-section">${esc(sectionLabel)} · CHAPTER ${orderFormatted}</span>
       <span class="badge badge-weightage">🎯 WBPSC Clerkship Core</span>
       <span class="badge badge-time">⏱️ ~8 min read</span>
       ${questions.length ? `<span class="badge badge-count">📝 ${questions.length} Practice Questions</span>` : ""}
     </div>
     <h1 class="chapter-title">${esc(note.title)}</h1>
     <p class="chapter-intro-lead">${esc(note.intro)}</p>
     
     <div class="chapter-top-actions">
       <button id="favourite" class="btn secondary ${isBookmarked ? "bookmarked" : ""}" type="button" aria-pressed="${isBookmarked}">
         ${isBookmarked ? "★ Favourited" : "☆ Add to favourites"}
       </button>
       <button id="print-notes" class="btn secondary" type="button" title="Print ink-friendly revision sheets">
         🖨️ Print revision notes
       </button>
       ${questions.length > 0 ? `<button id="hero-practice-btn" class="btn primary" type="button">
         🚀 Practise Questions (${questions.length})
       </button>` : ""}
     </div>
   </header>

   <!-- Quick Jump Navigation -->
   <nav class="chapter-jump-nav" aria-label="Chapter section navigation">
     <span class="jump-title">Jump to:</span>
     <div class="jump-pills">
       <a class="jump-pill" href="#sec-bengali">বাংলায় বুঝুন</a>
       <a class="jump-pill" href="#sec-rules">Core Rules (${(note.rules||[]).length})</a>
       ${note.commonMistakes?.length ? `<a class="jump-pill" href="#sec-mistakes">Common Traps</a>` : ""}
       ${note.examTricks?.length ? `<a class="jump-pill" href="#sec-tricks">Exam Tricks</a>` : ""}
       ${note.memoryTricks?.length ? `<a class="jump-pill" href="#sec-memory">Mnemonics</a>` : ""}
       ${note.revision?.length ? `<a class="jump-pill" href="#sec-revision">Quick Revision</a>` : ""}
       ${note.bookletList?.length ? `<a class="jump-pill highlight" href="#sec-booklet">Exam Directory (${note.bookletList.length})</a>` : ""}
       ${questions.length ? `<a class="jump-pill highlight" href="#sec-actions">Practise Set (${questions.length})</a>` : ""}
     </div>
   </nav>

   <!-- Bengali Explanation Accordion -->
   <section id="sec-bengali" class="bengali-section">
     <details class="bengali-card" ${note.bengali ? "open" : ""}>
       <summary class="bengali-summary">
         <div class="bengali-summary-title">
           <span class="bengali-badge">বাংলায় বুঝুন</span>
           <strong>সহজ বাংলায় ব্যাকরণের নিয়ম ও পরীক্ষার বিশেষ টিপস</strong>
         </div>
         <span class="bengali-toggle-icon">▾</span>
       </summary>
       <div class="bengali-content">
         <p>${esc(note.bengali || "এই অধ্যায়ের বিস্তারিত বাংলা ব্যাখ্যা শীঘ্রই আরও উন্নত করা হবে।")}</p>
       </div>
     </details>
   </section>

   <!-- Rules Section -->
   <section id="sec-rules" class="rules-section">
     <div class="section-header-row">
       <div>
         <span class="section-sub">Systematic Framework</span>
         <h2>Rules, Structures &amp; Examples</h2>
       </div>
       <span class="badge badge-neutral">${(note.rules||[]).length} Foundational Rules</span>
     </div>

     <div class="rules-grid">
       ${(note.rules||[]).map((r, i) => `
         <article class="rule-card">
           <div class="rule-card-header">
             <span class="rule-pill">RULE ${i + 1}</span>
             <h3 class="rule-heading">${esc(r.rule)}</h3>
           </div>
           
           <div class="rule-examples-box">
             <div class="rule-sub-tag positive">
               <span class="icon">✓</span> Standard Exam Examples
             </div>
             <ul class="rule-list">
               ${r.examples.map(e => `<li>${esc(e)}</li>`).join("")}
             </ul>
           </div>

           ${r.exceptions?.length ? `
             <div class="rule-exceptions-box">
               <div class="rule-sub-tag alert">
                 <span class="icon">⚠️</span> Critical Exception &amp; Trap
               </div>
               <ul class="rule-list">
                 ${r.exceptions.map(e => `<li>${esc(e)}</li>`).join("")}
               </ul>
             </div>
           ` : ""}
         </article>
       `).join("")}
     </div>
   </section>

   <!-- Common Mistakes Section -->
   ${note.commonMistakes?.length ? `
     <section id="sec-mistakes" class="note-callout mistakes-callout">
       <div class="callout-head">
         <span class="callout-icon" aria-hidden="true">⚠️</span>
         <div>
           <h2>Common Exam Traps &amp; Frequent Blunders</h2>
           <p class="callout-sub">Where candidates lose marks in WBPSC Clerkship Part-I:</p>
         </div>
       </div>
       <div class="mistakes-grid">
         ${note.commonMistakes.map(formatMistake).join("")}
       </div>
     </section>
   ` : ""}

   <!-- Exam Tricks Section -->
   ${note.examTricks?.length ? `
     <section id="sec-tricks" class="note-callout tricks-callout">
       <div class="callout-head">
         <span class="callout-icon" aria-hidden="true">⚡</span>
         <div>
           <h2>High-Yield Exam Tricks &amp; Elimination Shortcuts</h2>
           <p class="callout-sub">Fast heuristics to identify the right option in 15 seconds:</p>
         </div>
       </div>
       <div class="tricks-list">
         ${note.examTricks.map((t, i) => `
           <div class="trick-item">
             <span class="trick-badge">Trick ${i+1}</span>
             <p>${esc(t)}</p>
           </div>
         `).join("")}
       </div>
     </section>
   ` : ""}

   <!-- Memory Tricks Section -->
   ${note.memoryTricks?.length ? `
     <section id="sec-memory" class="note-callout memory-callout">
       <div class="callout-head">
         <span class="callout-icon" aria-hidden="true">🧠</span>
         <div>
           <h2>Memory Tricks &amp; Visual Mnemonics</h2>
           <p class="callout-sub">Retain complex rules without rote memorization:</p>
         </div>
       </div>
       <div class="memory-grid">
         ${note.memoryTricks.map(m => `
           <div class="memory-chip">
             <span class="chip-bulb">💡</span>
             <span>${esc(m)}</span>
           </div>
         `).join("")}
       </div>
     </section>
   ` : ""}

   <!-- Quick Revision Section -->
   ${note.revision?.length ? `
     <section id="sec-revision" class="note-callout revision-callout">
       <div class="callout-head">
         <span class="callout-icon" aria-hidden="true">📌</span>
         <div>
           <h2>Quick Revision Capsule</h2>
           <p class="callout-sub">Last-minute exam hall takeaways:</p>
         </div>
       </div>
       <ul class="revision-capsule-list">
         ${note.revision.map(x => `
           <li><span class="check-icon">✓</span> <span>${esc(x)}</span></li>
         `).join("")}
       </ul>
     </section>
   ` : ""}

   <!-- Vocabulary Booklet Repository Section (if present) -->
   ${note.bookletList?.length ? `
     <section id="sec-booklet" class="booklet-section card">
       <div class="booklet-header">
         <div>
           <span class="section-sub">Official Booklet Repository</span>
           <h2>${esc(note.bookletTitle || "High-Yield Vocabulary Directory")}</h2>
           <p class="callout-sub">${note.bookletList.length} verified exam items with English and Bengali meanings</p>
         </div>
         <div class="booklet-search-wrap">
           <input type="search" id="booklet-search" placeholder="🔎 Search among ${note.bookletList.length} items (English or বাংলা)..." autocomplete="off">
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
             ${note.bookletList.map((item, idx) => `
               <tr>
                 <td class="b-num">${idx + 1}</td>
                 <td class="b-term"><strong>${esc(item.term)}</strong></td>
                 <td class="b-meaning">${esc(item.meaning)}</td>
                 <td class="b-bengali">${esc(item.bengali)}</td>
               </tr>
             `).join("")}
           </tbody>
         </table>
       </div>
       <div id="booklet-empty" class="hidden" style="text-align:center; padding:1.5rem; color:var(--muted);">No matching entries found.</div>
     </section>
   ` : ""}

   <!-- Chapter Bottom Actions & Quiz Trigger -->
   <section id="sec-actions" class="chapter-bottom-cta card">
     <div class="cta-info">
       <h3>Ready to test your understanding?</h3>
       <p>Solve ${questions.length} chapter practice questions with instant feedback or take a timed test.</p>
     </div>
     <div class="cta-buttons">
       ${questions.length > 0 ? `
         <button id="practice" class="btn primary btn-lg" type="button">
           🎯 Start Practice (${questions.length} Qs)
         </button>
         <a id="chapter-test" class="btn secondary btn-lg" href="test.html?type=chapter&chapter=${encodeURIComponent(chapter.id)}">
           ⏱️ Take Timed Test
         </a>
       ` : `
         <a class="btn primary btn-lg" href="descriptive.html">
           ✍️ Open Descriptive Writing Workspace
         </a>
       `}
     </div>
   </section>

   <section id="quiz-root" class="quiz hidden" aria-live="polite"></section>
  `;

  document.querySelector("#favourite").addEventListener("click", e => {
    const active = WBPSCBookmarks.toggle("chapter-" + chapter.id);
    e.currentTarget.setAttribute("aria-pressed", String(active));
    e.currentTarget.classList.toggle("bookmarked", active);
    e.currentTarget.textContent = active ? "★ Favourited" : "☆ Add to favourites";
  });

  document.querySelector("#print-notes").addEventListener("click", () => window.print());

  const practiceBtn = document.querySelector("#practice");
  if (practiceBtn) practiceBtn.addEventListener("click", () => { renderQuiz(questions, chapter); });

  const heroPracticeBtn = document.querySelector("#hero-practice-btn");
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
      tbody.innerHTML = filtered.map((item, idx) => `
        <tr>
          <td class="b-num">${idx + 1}</td>
          <td class="b-term"><strong>${esc(item.term)}</strong></td>
          <td class="b-meaning">${esc(item.meaning)}</td>
          <td class="b-bengali">${esc(item.bengali)}</td>
        </tr>
      `).join("");
      if (emptyMsg) emptyMsg.classList.toggle("hidden", filtered.length > 0);
    });
  }
 }

 function renderQuiz(questions, chapter){
  const root = document.querySelector("#quiz-root");
  root.classList.remove("hidden");
  let index = 0;

  function showHint(q){
    const el = root.querySelector(".hint");
    el.innerHTML = q.bengaliHint ? `<strong>বাংলায় ইঙ্গিত:</strong> ${esc(q.bengaliHint)}` : "<strong>Hint:</strong> Look for the specific grammar rule in the question sentence.";
    el.classList.remove("hidden");
  }

  function draw(){
   const q = questions[index];
   const isBookmarked = WBPSCBookmarks.has("q-" + q.id);

   root.innerHTML = `
     <div class="quiz-card card">
       <div class="quiz-progress-bar-wrap">
         <div class="quiz-progress-bar" style="width: ${((index + 1) / questions.length) * 100}%;"></div>
       </div>
       <div class="quiz-progress">
         <span class="quiz-step-count">Question ${index + 1} of ${questions.length}</span>
         <span class="meta-row">
           <span class="badge badge-type">${esc(q.type)}</span>
           <span class="badge badge-${q.difficulty}">${esc(q.difficulty)}</span>
           <button class="icon-btn ${isBookmarked ? 'bookmarked' : ''}" id="bookmark-q" type="button" aria-label="Bookmark question" title="Bookmark question">
             ${isBookmarked ? "★" : "☆"}
           </button>
         </span>
       </div>

       <h2 class="quiz-question-title">${esc(q.question)}</h2>

       <div class="question-options">
         ${q.options.map((o, i) => `
           <button class="btn secondary option" type="button" data-index="${i}">
             <span class="option-prefix">${String.fromCharCode(65 + i)}</span>
             <span class="option-text">${esc(o)}</span>
           </button>
         `).join("")}
       </div>

       <p class="hint hidden"></p>
       <div class="feedback hidden"></div>

       <div class="question-actions">
         <button class="btn secondary" id="hint" type="button">💡 Show hint</button>
         <button class="btn primary" id="next" type="button" disabled>
           ${index === questions.length - 1 ? "Finish Practice" : "Next Question →"}
         </button>
       </div>
     </div>
   `;

   const bookmarkBtn = root.querySelector("#bookmark-q");
   if (bookmarkBtn) {
     bookmarkBtn.addEventListener("click", () => {
       const active = WBPSCBookmarks.toggle("q-" + q.id);
       bookmarkBtn.textContent = active ? "★" : "☆";
       bookmarkBtn.classList.toggle("bookmarked", active);
     });
   }

   root.querySelector("#hint").addEventListener("click", () => showHint(q));

   root.querySelectorAll(".option").forEach(button => button.addEventListener("click", () => {
     if (root.dataset.answered === "true") return;
     root.dataset.answered = "true";

     const chosen = Number(button.dataset.index);
     const correct = chosen === q.answer;

     root.querySelectorAll(".option").forEach((b, i) => {
       b.disabled = true;
       if (i === q.answer) b.classList.add("correct");
       if (i === chosen && !correct) b.classList.add("wrong");
     });

     const feedback = root.querySelector(".feedback");
     feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
     feedback.innerHTML = `
       <div class="feedback-title">
         ${correct ? "✓ Correct Answer!" : "✗ Not Quite Right"}
       </div>
       <p class="feedback-exp">${esc(q.explanation)}</p>
       ${q.rule ? `<p class="feedback-rule"><strong>Rule Applied:</strong> ${esc(q.rule)}</p>` : ""}
       ${q.bengaliHint ? `<p class="feedback-hint"><strong>বাংলায়:</strong> ${esc(q.bengaliHint)}</p>` : ""}
     `;

     root.querySelector("#next").disabled = false;

     const attempts = WBPSCStorage.get("wbpsc-attempts", []) || [];
     attempts.push({ id: q.id, chapter: chapter.id, correct, date: new Date().toISOString() });
     WBPSCStorage.set("wbpsc-attempts", attempts);

     if (!correct) {
       const wrong = WBPSCStorage.get("wbpsc-wrong", []) || [];
       if (!wrong.includes(q.id)) {
         wrong.push(q.id);
         WBPSCStorage.set("wbpsc-wrong", wrong);
       }
     }
   }));

   root.dataset.answered = "false";
   root.querySelector("#next").addEventListener("click", () => {
     if (index < questions.length - 1) {
       index++;
       draw();
     } else {
       root.innerHTML = `
         <div class="quiz-card card quiz-complete-card">
           <div class="complete-icon">🎉</div>
           <h2>Practice Complete!</h2>
           <p>You have finished all ${questions.length} practice questions for ${esc(chapter.title)}.</p>
           <div class="complete-actions">
             <button class="btn primary" id="restart" type="button">Practise Again</button>
             <a class="btn secondary" href="test.html?type=chapter&chapter=${encodeURIComponent(chapter.id)}">Take Chapter Timed Test</a>
             <a class="btn secondary" href="question-bank.html?chapter=${encodeURIComponent(chapter.id)}">View in Question Bank</a>
           </div>
         </div>
       `;
       root.querySelector("#restart").addEventListener("click", () => { index = 0; draw(); });
     }
   });

   root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  draw();
 }

 (async()=>{
  try{
   const chapters = await get("data/chapters.json");
   const chapter = chapters.find(c => c.id === id);
   if (!chapter || chapter.status !== "ready") throw new Error("Chapter is not available");
   document.title = `${chapter.title} · WBPSC Clerkship English`;
   
   const note = chapter.notesFile ? await get(chapter.notesFile) : { title: chapter.title, intro: "", rules: [] };
   let questions = [];
   if (chapter.questionsFile) {
     try { questions = await get(chapter.questionsFile); } catch(e){ console.warn(e); }
   }
   
   const practiceQuestions = retryId ? questions.filter(q => q.id === retryId) : questions;
   if (retryId && practiceQuestions.length) {
    main.innerHTML = `<a class="btn secondary" href="chapter.html?id=${encodeURIComponent(chapter.id)}">← Back to chapter</a><section id="quiz-root" class="quiz" aria-live="polite"></section>`;
    renderQuiz(practiceQuestions, chapter);
   } else {
    renderNotes(note, chapter, practiceQuestions);
   }
  } catch(error) {
   main.innerHTML = `<h1>Chapter unavailable</h1><p class="notice">${esc(error.message)}</p><a class="btn secondary" href="grammar.html">Back to Grammar</a>`;
  }
 })();
})();
