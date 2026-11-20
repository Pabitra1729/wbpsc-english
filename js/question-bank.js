(() => {
  const root = document.querySelector("#bank-root");
  if (!root) return;

  const escape = value => {
    const el = document.createElement("div");
    el.textContent = value ?? "";
    return el.innerHTML;
  };

  const state = {
    keyword: "",
    section: "all",
    chapter: "all",
    type: "all",
    difficulty: "all",
    group: "all"
  };

  let chapters = [];
  let questions = [];

  async function load() {
    try {
      // 1. Load chapters index
      try {
        const chaptersResponse = await fetch("data/chapters.json");
        if (chaptersResponse.ok) {
          chapters = await chaptersResponse.json();
        }
      } catch (err) {
        console.warn("Could not load chapters.json directly", err);
      }

      // 2. Try loading pre-aggregated all-questions.json first for instant speed
      let loadedDirectly = false;
      try {
        const directResp = await fetch("data/all-questions.json");
        if (directResp.ok) {
          const directData = await directResp.json();
          if (Array.isArray(directData) && directData.length > 0) {
            questions = directData;
            loadedDirectly = true;
          }
        }
      } catch (err) {
        console.warn("Direct all-questions.json load skipped, trying chapter files", err);
      }

      // 3. Fallback: Fetch each chapter's questions in parallel using allSettled
      if (!loadedDirectly && chapters.length > 0) {
        const readyChapters = chapters.filter(c => c.status === "ready" && c.questionsFile);
        const fetchPromises = readyChapters.map(async c => {
          try {
            const resp = await fetch(c.questionsFile);
            if (resp.ok) {
              const items = await resp.json();
              if (Array.isArray(items)) {
                return items.map(q => ({
                  ...q,
                  section: c.section,
                  chapterTitle: c.title,
                  chapterOrder: c.order
                }));
              }
            }
          } catch (e) {
            console.warn("Failed fetching", c.questionsFile, e);
          }
          return [];
        });

        const results = await Promise.allSettled(fetchPromises);
        results.forEach(res => {
          if (res.status === "fulfilled" && Array.isArray(res.value)) {
            questions.push(...res.value);
          }
        });
      }

      if (questions.length === 0) {
        root.innerHTML = '<p class="notice">No questions are currently loaded. Please check your data connection or run via a local server.</p>';
        return;
      }

      populateFilters();
      render();
    } catch (error) {
      console.error("Question Bank load error:", error);
      root.innerHTML = `<p class="notice">Could not load the question bank: ${escape(error.message)}. Please run a local web server (e.g. <code>python -m http.server</code> or <code>npx serve</code>).</p>`;
    }
  }

  function populateFilters() {
    const chapterSelect = document.querySelector("#chapter-filter");
    if (chapterSelect) {
      chapterSelect.innerHTML = '<option value="all">All chapters</option>';
      const uniqueChapters = new Map();
      questions.forEach(q => {
        if (q.chapter && !uniqueChapters.has(q.chapter)) {
          uniqueChapters.set(q.chapter, q.chapterTitle || q.chapter);
        }
      });
      uniqueChapters.forEach((title, id) => {
        chapterSelect.add(new Option(title, id));
      });
    }

    const typeSelect = document.querySelector("#type-filter");
    if (typeSelect) {
      typeSelect.innerHTML = '<option value="all">All types</option>';
      const types = [...new Set(questions.map(q => q.type).filter(Boolean))].sort();
      types.forEach(val => typeSelect.add(new Option(val.toUpperCase(), val)));
    }
  }

  function isBookmarked(qId) {
    return (
      (window.WBPSCBookmarks && (WBPSCBookmarks.has("q-" + qId) || WBPSCBookmarks.has(qId))) ||
      (WBPSCStorage.get("wbpsc-question-bookmarks", []) || []).includes(qId)
    );
  }

  function toggleBookmark(qId) {
    if (window.WBPSCBookmarks) {
      WBPSCBookmarks.toggle("q-" + qId);
    }
    let qBookmarks = WBPSCStorage.get("wbpsc-question-bookmarks", []) || [];
    if (qBookmarks.includes(qId)) {
      qBookmarks = qBookmarks.filter(id => id !== qId);
    } else {
      qBookmarks.push(qId);
    }
    WBPSCStorage.set("wbpsc-question-bookmarks", qBookmarks);
  }

  function render() {
    const attempted = new Set((WBPSCStorage.get("wbpsc-attempts", []) || []).map(a => a.id));
    const wrong = new Set(WBPSCStorage.get("wbpsc-wrong", []) || []);

    const kw = state.keyword.trim().toLowerCase();

    const filtered = questions.filter(q => {
      if (state.section !== "all" && q.section !== state.section) return false;
      if (state.chapter !== "all" && q.chapter !== state.chapter) return false;
      if (state.type !== "all" && q.type !== state.type) return false;
      if (state.difficulty !== "all" && q.difficulty !== state.difficulty) return false;

      const bookmarked = isBookmarked(q.id);
      if (state.group === "bookmarked" && !bookmarked) return false;
      if (state.group === "wrong" && !wrong.has(q.id)) return false;
      if (state.group === "unattempted" && attempted.has(q.id)) return false;

      if (kw) {
        const haystack = `${q.question} ${q.explanation || ""} ${q.rule || ""} ${q.bengaliHint || ""}`.toLowerCase();
        if (!haystack.includes(kw)) return false;
      }

      return true;
    });

    const countEl = document.querySelector("#bank-count");
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${questions.length} questions`;
    }

    if (!filtered.length) {
      root.innerHTML = '<p class="notice">No questions match these filters. Try resetting the filters or clearing the search box.</p>';
      return;
    }

    root.innerHTML = filtered.map(q => {
      const saved = isBookmarked(q.id);
      const isAttempted = attempted.has(q.id);
      const isWrong = wrong.has(q.id);

      let statusBadge = "";
      if (isWrong) {
        statusBadge = '<span class="badge" style="background:var(--danger-soft);color:var(--danger);">Needs Revision</span>';
      } else if (isAttempted) {
        statusBadge = '<span class="badge" style="background:var(--success-soft);color:var(--success);">Attempted</span>';
      }

      return `
        <article class="card bank-item" style="margin-bottom: 1.25rem;">
          <div class="meta-row" style="margin-bottom: 0.6rem;">
            <span class="badge" style="text-transform:capitalize;">${escape(q.section || "General")}</span>
            <span class="badge">${escape(q.chapterTitle || q.chapter)}</span>
            <span class="badge" style="text-transform:uppercase;">${escape(q.type)}</span>
            <span class="badge">${escape(q.difficulty)}</span>
            ${statusBadge}
          </div>
          <h2 style="font-size:1.15rem; line-height:1.4; margin-top:0.25rem;">${escape(q.question)}</h2>
          <ol class="bank-options" type="A" style="margin: 0.75rem 0; padding-left: 1.5rem; display: grid; gap: 0.35rem;">
            ${(q.options || []).map((option, i) => `
              <li class="${i === q.answer ? "bank-answer" : ""}" style="${i === q.answer ? "font-weight:700; color:var(--success);" : ""}">
                ${escape(option)} ${i === q.answer ? "✓" : ""}
              </li>
            `).join("")}
          </ol>
          <div style="background:var(--bg); padding:0.75rem 1rem; border-radius:8px; margin:0.75rem 0;">
            <p style="margin:0 0 0.25rem;"><strong>Explanation:</strong> ${escape(q.explanation)}</p>
            ${q.rule ? `<p style="margin:0; font-size:0.9rem; color:var(--muted);"><strong>Rule:</strong> ${escape(q.rule)}</p>` : ""}
            ${q.bengaliHint ? `<p style="margin:0.25rem 0 0; font-size:0.9rem; color:var(--primary);"><strong>বাংলায় ইঙ্গিত:</strong> ${escape(q.bengaliHint)}</p>` : ""}
          </div>
          <div class="chapter-actions" style="margin-top:0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a class="btn secondary" href="chapter.html?id=${encodeURIComponent(q.chapter)}">Open chapter notes</a>
            <button class="btn secondary bank-bookmark" type="button" data-id="${escape(q.id)}" aria-pressed="${saved}">
              ${saved ? "★ Bookmarked" : "☆ Bookmark"}
            </button>
          </div>
        </article>
      `;
    }).join("");

    root.querySelectorAll(".bank-bookmark").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        toggleBookmark(id);
        render();
      });
    });
  }

  // Filter change events
  document.querySelectorAll("[data-filter]").forEach(control => {
    control.addEventListener("change", () => {
      state[control.dataset.filter] = control.value;
      render();
    });
  });

  const searchInput = document.querySelector("#keyword-filter");
  if (searchInput) {
    let debounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.keyword = searchInput.value;
        render();
      }, 200);
    });
  }

  load();
})();
