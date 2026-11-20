const fs = require('fs');

const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vocabulary · WBPSC Clerkship English</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/theme.css">
  <link rel="stylesheet" href="css/components.css">
  <script>
    try {
      document.documentElement.dataset.theme = JSON.parse(localStorage.getItem("wbpsc-theme") || '"light"');
    } catch(e) {
      document.documentElement.dataset.theme = "light";
    }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="nav-root"></div>
  <main id="main" class="page">
    <header class="page-header">
      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.4rem;">
        <span class="badge badge-section">WBPSC CLERKSHIP EXAMINATION</span>
        <span class="badge badge-count">750 Booklet Items</span>
        <span class="badge badge-success">405 Practice Questions</span>
      </div>
      <h1>English Vocabulary Hub</h1>
      <p>Official 750-item vocabulary booklet (Phrasal Verbs, Idioms, High-Yield Words) with English &amp; Bengali meanings, alongside 9 structured study chapters and practice sets.</p>
    </header>

    <!-- FEATURED VOCABULARY BOOKLET EXPLORER (750 ITEMS) -->
    <section class="card booklet-explorer" id="booklet-explorer" style="margin-bottom:2.5rem; padding:1.75rem 2rem;">
      <div class="booklet-top-row" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
        <div>
          <span class="section-sub">Official Study Booklet</span>
          <h2 style="font-size:1.45rem; font-weight:800; margin:0.25rem 0 0.4rem;">English Vocabulary Booklet</h2>
          <p style="margin:0; color:var(--text-secondary); font-size:0.95rem;">
            250 Phrasal Verbs • 250 Idioms &amp; Phrases • 250 Vocabulary Words (English &amp; Bengali meanings)
          </p>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button id="print-booklet-btn" class="btn secondary" type="button">🖨️ Print Booklet</button>
          <a class="btn primary" href="vocab-builder.html">🃏 Flashcards Mode</a>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="booklet-tabs" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem;">
        <button class="btn primary booklet-tab active" data-category="all" type="button">All Items (750)</button>
        <button class="btn secondary booklet-tab" data-category="phrasal" type="button">250 Phrasal Verbs</button>
        <button class="btn secondary booklet-tab" data-category="idioms" type="button">250 Idioms &amp; Phrases</button>
        <button class="btn secondary booklet-tab" data-category="words" type="button">250 Vocabulary Words</button>
      </div>

      <!-- Search & Status Bar -->
      <div class="booklet-controls" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
        <input type="search" id="booklet-search-input" placeholder="🔎 Search by word, English meaning, or বাংলা অর্থ..." style="flex:1; min-width:280px; padding:0.65rem 1.15rem; border-radius:var(--radius-pill); border:1.5px solid var(--border); background:var(--surface); color:var(--text); font-size:0.95rem;" autocomplete="off">
        <span id="booklet-item-count" style="font-size:0.88rem; font-weight:700; color:var(--muted);">Showing 750 items</span>
      </div>

      <!-- Table View -->
      <div class="booklet-table-wrap" style="max-height:560px; overflow-y:auto; border:1px solid var(--border); border-radius:var(--radius-md);">
        <table class="booklet-table" style="width:100%; border-collapse:collapse; font-size:0.95rem; text-align:left;">
          <thead style="position:sticky; top:0; background:var(--surface-subtle); z-index:5;">
            <tr>
              <th style="padding:0.75rem 1rem; width:60px; border-bottom:1px solid var(--border); color:var(--muted); font-size:0.8rem; text-transform:uppercase;">#</th>
              <th style="padding:0.75rem 1rem; width:130px; border-bottom:1px solid var(--border); color:var(--muted); font-size:0.8rem; text-transform:uppercase;">Category</th>
              <th style="padding:0.75rem 1rem; width:220px; border-bottom:1px solid var(--border); color:var(--muted); font-size:0.8rem; text-transform:uppercase;">Word / Phrase</th>
              <th style="padding:0.75rem 1rem; border-bottom:1px solid var(--border); color:var(--muted); font-size:0.8rem; text-transform:uppercase;">English Meaning</th>
              <th style="padding:0.75rem 1rem; width:260px; border-bottom:1px solid var(--border); color:var(--muted); font-size:0.8rem; text-transform:uppercase;">বাংলা অর্থ</th>
            </tr>
          </thead>
          <tbody id="booklet-table-body">
            <tr><td colspan="5" style="text-align:center; padding:2rem;">Loading booklet dataset...</td></tr>
          </tbody>
        </table>
      </div>
      <div id="booklet-no-results" class="hidden" style="text-align:center; padding:2rem; color:var(--muted); font-size:1rem;">
        No matching vocabulary entries found. Try a different keyword or category.
      </div>
    </section>

    <!-- CHAPTER PRACTICE SETS (9 TOPICS) -->
    <section class="vocab-chapters-section">
      <div class="section-header-row" style="margin-bottom:1.25rem;">
        <div>
          <span class="section-sub">Syllabus Chapters</span>
          <h2>Vocabulary Topics &amp; Practice Sets</h2>
        </div>
        <span class="badge badge-neutral">9 Chapters · 405 Practice Qs</span>
      </div>
      <div id="vocab-list" class="chapter-list"></div>
    </section>
  </main>

  <script src="js/storage.js"></script>
  <script src="js/bookmarks.js"></script>
  <script src="js/app.js"></script>
  <script>
    // 1. Load Chapter Cards
    fetch("data/chapters.json")
      .then(r => r.json())
      .then(chapters => {
        const list = document.querySelector("#vocab-list");
        const vocabChapters = chapters.filter(c => c.section === "vocabulary");
        list.innerHTML = vocabChapters.map(c => \`
          <article class="chapter-card card">
            <div class="chapter-card-main">
              <div class="chapter-badge-row">
                <span class="chapter-order-pill">Topic \${String(c.order).padStart(2, "0")}</span>
                <span class="badge badge-success">45 Practice Qs</span>
                <span class="badge badge-neutral">বাংলায় নোটস</span>
                \${WBPSCBookmarks.has("chapter-" + c.id) ? '<span class="badge badge-warning">★ Favourited</span>' : ''}
              </div>
              <h2>\${c.title}</h2>
              <p>High-frequency word lists, root-word strategies, contextual clues, and Bengali meanings.</p>
            </div>
            <div class="chapter-card-actions">
              <a class="btn secondary" href="chapter.html?id=\${encodeURIComponent(c.id)}">Read Notes</a>
              <a class="btn primary" href="chapter.html?id=\${encodeURIComponent(c.id)}#sec-actions">Practise Set</a>
            </div>
          </article>
        \`).join("");
      })
      .catch(() => {
        document.querySelector("#vocab-list").innerHTML = '<p class="notice">Could not load vocabulary chapters.</p>';
      });

    // 2. Load and Control the 750-Item Vocabulary Booklet Explorer
    (async () => {
      try {
        const booklet = await fetch("data/booklet/clerkship-booklet.json").then(r => r.json());
        
        // Build unified list of 750 items
        const allItems = [
          ...booklet.phrasalVerbs.map(p => ({ ...p, category: "Phrasal Verb", catKey: "phrasal", term: p.phrase })),
          ...booklet.idioms.map(i => ({ ...i, category: "Idiom / Phrase", catKey: "idioms", term: i.idiom })),
          ...booklet.words.map(w => ({ ...w, category: "Vocabulary Word", catKey: "words", term: w.word }))
        ];

        let currentCategory = "all";
        let searchKeyword = "";

        const tbody = document.querySelector("#booklet-table-body");
        const countEl = document.querySelector("#booklet-item-count");
        const noResults = document.querySelector("#booklet-no-results");
        const searchInput = document.querySelector("#booklet-search-input");
        const tabs = document.querySelectorAll(".booklet-tab");

        function renderBooklet() {
          const q = searchKeyword.toLowerCase();
          const filtered = allItems.filter(item => {
            if (currentCategory !== "all" && item.catKey !== currentCategory) return false;
            if (!q) return true;
            return item.term.toLowerCase().includes(q) ||
                   item.meaning.toLowerCase().includes(q) ||
                   item.bengali.toLowerCase().includes(q);
          });

          countEl.textContent = \`Showing \${filtered.length} of \${allItems.length} items\`;

          if (filtered.length === 0) {
            tbody.innerHTML = "";
            noResults.classList.remove("hidden");
            return;
          }

          noResults.classList.add("hidden");
          tbody.innerHTML = filtered.map((item, idx) => \`
            <tr style="border-bottom:1px solid var(--border-subtle); transition:background 0.15s ease;">
              <td style="padding:0.75rem 1rem; color:var(--muted); font-weight:700;">\${item.num}</td>
              <td style="padding:0.75rem 1rem;"><span class="badge badge-neutral" style="font-size:0.72rem;">\${item.category}</span></td>
              <td style="padding:0.75rem 1rem; color:var(--primary); font-weight:700;">\${item.term}</td>
              <td style="padding:0.75rem 1rem; color:var(--text); line-height:1.5;">\${item.meaning}</td>
              <td style="padding:0.75rem 1rem; font-family:'Noto Sans Bengali', sans-serif; font-size:1rem; color:var(--text); line-height:1.6;">\${item.bengali}</td>
            </tr>
          \`).join("");
        }

        // Search event listener
        searchInput.addEventListener("input", () => {
          searchKeyword = searchInput.value.trim();
          renderBooklet();
        });

        // Tab click listeners
        tabs.forEach(tab => {
          tab.addEventListener("click", () => {
            tabs.forEach(t => { t.className = "btn secondary booklet-tab"; });
            tab.className = "btn primary booklet-tab active";
            currentCategory = tab.dataset.category;
            renderBooklet();
          });
        });

        // Print booklet button
        const printBtn = document.querySelector("#print-booklet-btn");
        if (printBtn) {
          printBtn.addEventListener("click", () => window.print());
        }

        // Initial render
        renderBooklet();

      } catch (err) {
        console.warn("Could not load booklet explorer", err);
        document.querySelector("#booklet-table-body").innerHTML = \`
          <tr><td colspan="5" style="text-align:center; padding:1.5rem; color:var(--danger);">Could not load booklet data.</td></tr>
        \`;
      }
    })();
  </script>
</body>
</html>`;

fs.writeFileSync('vocabulary.html', htmlContent, 'utf8');
console.log('Successfully upgraded vocabulary.html with the 750-item Vocabulary Booklet Explorer!');
