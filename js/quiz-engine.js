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
  let showPalette = true;
  // Track answers during this practice session: index -> { chosen: number, correct: boolean }
  const sessionAnswers = {};

  function showHint(q){
    const el = root.querySelector(".hint");
    if (!el) return;
    el.innerHTML = q.bengaliHint ? `<strong>বাংলায় ইঙ্গিত:</strong> ${esc(q.bengaliHint)}` : "<strong>Hint:</strong> Look for the specific grammar rule in the question sentence.";
    el.classList.remove("hidden");
  }

  function draw(){
   if (!questions || !questions.length) return;
   if (index < 0) index = 0;
   if (index >= questions.length) index = questions.length - 1;

   const q = questions[index];
   const isBookmarked = WBPSCBookmarks.has("q-" + q.id);
   const existingAns = sessionAnswers[index];
   const answeredCount = Object.keys(sessionAnswers).length;

   root.innerHTML = `
     <div class="quiz-card card">
       <div class="quiz-progress-bar-wrap">
         <div class="quiz-progress-bar" style="width: ${((index + 1) / questions.length) * 100}%;"></div>
       </div>
       <div class="quiz-progress">
         <div>
           <span class="quiz-step-count">Question ${index + 1} of ${questions.length}</span>
           <span style="font-size:0.82rem; color:var(--muted); margin-left:0.5rem;">(${answeredCount}/${questions.length} answered)</span>
         </div>
         <span class="meta-row">
           <span class="badge badge-type">${esc(q.type || "MCQ")}</span>
           <span class="badge badge-${q.difficulty || "medium"}">${esc(q.difficulty || "medium")}</span>
           <button class="btn secondary" id="toggle-quiz-pal" type="button" style="padding:0.25rem 0.65rem; font-size:0.8rem;" title="Toggle question palette">
             🔢 Jump to Q ▾
           </button>
           <button class="icon-btn ${isBookmarked ? 'bookmarked' : ''}" id="bookmark-q" type="button" aria-label="Bookmark question" title="Bookmark question">
             ${isBookmarked ? "★" : "☆"}
           </button>
         </span>
       </div>

       <!-- Question Palette Jump Bar -->
       <div id="quiz-palette-box" class="quiz-palette-wrap ${showPalette ? "" : "hidden"}">
         <div class="quiz-palette-header">
           <span>Question Quick Switcher (Click any number to jump):</span>
           <span>${answeredCount} answered</span>
         </div>
         <div class="quiz-palette-grid">
           ${questions.map((_, i) => {
             const ans = sessionAnswers[i];
             let cls = "quiz-pal-btn";
             if (i === index) cls += " current";
             if (ans) cls += ans.correct ? " correct" : " wrong";
             return `<button class="${cls}" type="button" data-idx="${i}" aria-label="Jump to question ${i+1}">${i+1}</button>`;
           }).join("")}
         </div>
       </div>

       <h2 class="quiz-question-title">${esc(q.question)}</h2>

       <div class="question-options">
         ${q.options.map((o, i) => {
           let optClass = "btn secondary option";
           let optDisabled = "";
           if (existingAns) {
             optDisabled = "disabled";
             if (i === q.answer) optClass += " correct";
             if (i === existingAns.chosen && !existingAns.correct) optClass += " wrong";
             if (i === existingAns.chosen) optClass += " selected";
           }
           return `
             <button class="${optClass}" type="button" data-index="${i}" ${optDisabled}>
               <span class="option-prefix">${String.fromCharCode(65 + i)}</span>
               <span class="option-text">${esc(o)}</span>
             </button>
           `;
         }).join("")}
       </div>

       <p class="hint hidden"></p>
       <div class="feedback ${existingAns ? (existingAns.correct ? "correct" : "wrong") : "hidden"}">
         ${existingAns ? `
           <div class="feedback-title">
             ${existingAns.correct ? "✓ Correct Answer!" : "✗ Not Quite Right"}
           </div>
           <p class="feedback-exp">${esc(q.explanation)}</p>
           ${q.rule ? `<p class="feedback-rule"><strong>Rule Applied:</strong> ${esc(q.rule)}</p>` : ""}
           ${q.bengaliHint ? `<p class="feedback-hint"><strong>বাংলায়:</strong> ${esc(q.bengaliHint)}</p>` : ""}
         ` : ""}
       </div>

       <div class="question-actions">
         <button class="btn secondary" id="prev" type="button" ${index === 0 ? "disabled" : ""}>
           ← Previous Question
         </button>
         <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
           <button class="btn secondary" id="hint" type="button">💡 Show hint</button>
           <button class="btn primary" id="next" type="button">
             ${index === questions.length - 1 ? "Finish Practice" : "Next Question →"}
           </button>
         </div>
       </div>
     </div>
   `;

   // Toggle Palette
   const palToggle = root.querySelector("#toggle-quiz-pal");
   if (palToggle) {
     palToggle.addEventListener("click", () => {
       showPalette = !showPalette;
       const box = root.querySelector("#quiz-palette-box");
       if (box) box.classList.toggle("hidden", !showPalette);
     });
   }

   // Palette jump buttons
   root.querySelectorAll(".quiz-pal-btn").forEach(btn => {
     btn.addEventListener("click", () => {
       const target = Number(btn.dataset.idx);
       if (!isNaN(target) && target >= 0 && target < questions.length) {
         index = target;
         draw();
       }
     });
   });

   // Bookmark
   const bookmarkBtn = root.querySelector("#bookmark-q");
   if (bookmarkBtn) {
     bookmarkBtn.addEventListener("click", () => {
       const active = WBPSCBookmarks.toggle("q-" + q.id);
       bookmarkBtn.textContent = active ? "★" : "☆";
       bookmarkBtn.classList.toggle("bookmarked", active);
     });
   }

   // Hint
   const hintBtn = root.querySelector("#hint");
   if (hintBtn) {
     hintBtn.addEventListener("click", () => showHint(q));
   }

   // Options selection
   if (!existingAns) {
     root.querySelectorAll(".option").forEach(button => button.addEventListener("click", () => {
       if (sessionAnswers[index]) return;
       const chosen = Number(button.dataset.index);
       const correct = chosen === q.answer;
       sessionAnswers[index] = { chosen, correct };

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
       feedback.classList.remove("hidden");

       // Update palette button visually
       const palBtn = root.querySelector(`.quiz-pal-btn[data-idx="${index}"]`);
       if (palBtn) {
         palBtn.classList.add(correct ? "correct" : "wrong");
       }

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
   }

   // Previous Question
   const prevBtn = root.querySelector("#prev");
   if (prevBtn) {
     prevBtn.addEventListener("click", () => {
       if (index > 0) {
         index--;
         draw();
       }
     });
   }

   // Next Question / Finish
   const nextBtn = root.querySelector("#next");
   if (nextBtn) {
     nextBtn.addEventListener("click", () => {
       if (index < questions.length - 1) {
         index++;
         draw();
       } else {
         // Render Completion screen
         const total = questions.length;
         const answered = Object.keys(sessionAnswers).length;
         const correctCount = Object.values(sessionAnswers).filter(a => a.correct).length;
         const wrongCount = answered - correctCount;
         const skipped = total - answered;
         const accuracy = answered > 0 ? Math.round((correctCount / answered) * 100) : 0;

         root.innerHTML = `
           <div class="quiz-card card quiz-complete-card">
             <div class="complete-icon">🎉</div>
             <h2>Practice Complete!</h2>
             <p>You have finished the practice session for <strong>${esc(chapter.title)}</strong>.</p>
             
             <div style="display:flex; justify-content:center; gap:1.25rem; flex-wrap:wrap; margin:1.5rem 0;">
               <div class="card" style="padding:1rem 1.5rem; text-align:center; min-width:110px;">
                 <div style="font-size:1.6rem; font-weight:800; color:var(--primary);">${answered}/${total}</div>
                 <div style="font-size:0.85rem; color:var(--muted);">Attempted</div>
               </div>
               <div class="card" style="padding:1rem 1.5rem; text-align:center; min-width:110px;">
                 <div style="font-size:1.6rem; font-weight:800; color:var(--success);">${correctCount}</div>
                 <div style="font-size:0.85rem; color:var(--muted);">Correct</div>
               </div>
               <div class="card" style="padding:1rem 1.5rem; text-align:center; min-width:110px;">
                 <div style="font-size:1.6rem; font-weight:800; color:var(--danger);">${wrongCount}</div>
                 <div style="font-size:0.85rem; color:var(--muted);">Incorrect</div>
               </div>
               <div class="card" style="padding:1rem 1.5rem; text-align:center; min-width:110px;">
                 <div style="font-size:1.6rem; font-weight:800; color:var(--warning);">${accuracy}%</div>
                 <div style="font-size:0.85rem; color:var(--muted);">Accuracy</div>
               </div>
             </div>

             <div class="complete-actions">
               <button class="btn primary" id="restart" type="button">🔄 Practise Again</button>
               <a class="btn secondary" href="test.html?type=chapter&chapter=${encodeURIComponent(chapter.id)}">⏱️ Take Timed Test</a>
               <a class="btn secondary" href="question-bank.html?chapter=${encodeURIComponent(chapter.id)}">📚 Question Bank</a>
               <a class="btn secondary" href="#chapter-content" id="back-notes-btn">📖 Review Notes</a>
             </div>
           </div>
         `;
         root.querySelector("#restart").addEventListener("click", () => {
           index = 0;
           for (let k in sessionAnswers) delete sessionAnswers[k];
           draw();
         });
         const backNotes = root.querySelector("#back-notes-btn");
         if (backNotes) {
           backNotes.addEventListener("click", () => {
             window.scrollTo({ top: 0, behavior: "smooth" });
           });
         }
       }
     });
   }

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
