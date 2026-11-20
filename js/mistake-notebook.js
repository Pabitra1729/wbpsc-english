(() => {
  const root = document.querySelector("#mistake-root");
  if (!root) return;

  const esc = value => {
    const el = document.createElement("div");
    el.textContent = value ?? "";
    return el.innerHTML;
  };

  let allQuestions = [];

  async function load() {
    try {
      // 1. First try unified all-questions.json for instant performance
      let loaded = false;
      try {
        const resp = await fetch("data/all-questions.json");
        if (resp.ok) {
          allQuestions = await resp.json();
          loaded = true;
        }
      } catch (e) {
        console.warn("Direct all-questions load skipped", e);
      }

      // 2. Fallback to chapter files if all-questions isn't present
      if (!loaded) {
        const chapters = await fetch("data/chapters.json").then(r => r.json());
        const ready = chapters.filter(c => c.status === "ready" && c.questionsFile);
        const promises = ready.map(async c => {
          try {
            const r = await fetch(c.questionsFile);
            if (r.ok) {
              const items = await r.json();
              return items.map(q => ({ ...q, chapterTitle: c.title }));
            }
          } catch (e) {
            console.warn(e);
          }
          return [];
        });
        const results = await Promise.allSettled(promises);
        results.forEach(res => {
          if (res.status === "fulfilled" && Array.isArray(res.value)) {
            allQuestions.push(...res.value);
          }
        });
      }

      render();
    } catch (error) {
      root.innerHTML = `<p class="notice">Could not load questions: ${esc(error.message)}</p>`;
    }
  }

  function render() {
    const wrong = new Set(WBPSCStorage.get("wbpsc-wrong", []) || []);
    const items = allQuestions.filter(q => wrong.has(q.id));

    const mistakeCounter = document.querySelector("#mistake-count");
    if (mistakeCounter) {
      mistakeCounter.textContent = items.length;
    }

    if (!items.length) {
      root.innerHTML = '<p class="notice" style="background:var(--success-soft); border-color:var(--success);">🎉 Great job! Your Mistake Notebook is empty. Whenever you answer a question incorrectly during practice or tests, it will appear here for targeted revision.</p>';
      return;
    }

    root.innerHTML = `
      <div class="chapter-actions" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
        <span><strong>${items.length}</strong> questions needing revision</span>
        <button id="clear-wrong" class="btn secondary" type="button">Clear All Mistakes</button>
      </div>
      <div style="display:grid; gap:1rem;">
        ${items.map(q => `
          <article class="card mistake-item" style="background:var(--bg); border:1px solid var(--border);">
            <div class="meta-row" style="margin-bottom:0.4rem;">
              <span class="badge">${esc(q.chapterTitle || q.chapter)}</span>
              <span class="badge">${esc(q.difficulty)}</span>
              <span class="badge" style="background:var(--danger-soft); color:var(--danger);">Needs Review</span>
            </div>
            <h3 style="font-size:1.1rem; line-height:1.4; margin:0.25rem 0 0.5rem;">${esc(q.question)}</h3>
            <p style="margin:0.25rem 0; font-size:0.95rem;">
              <strong>Correct Answer:</strong> <span style="color:var(--success); font-weight:700;">${esc(q.options[q.answer])}</span>
            </p>
            <div style="background:var(--surface); border-left:3px solid var(--danger); padding:0.6rem 0.8rem; border-radius:6px; margin:0.5rem 0;">
              <p style="margin:0; font-size:0.9rem;"><strong>Explanation:</strong> ${esc(q.explanation)}</p>
              ${q.rule ? `<p style="margin:0.25rem 0 0; font-size:0.85rem; color:var(--muted);"><strong>Rule:</strong> ${esc(q.rule)}</p>` : ""}
            </div>
            <div class="chapter-actions" style="margin-top:0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
              <a class="btn primary" href="chapter.html?id=${encodeURIComponent(q.chapter)}&retry=${encodeURIComponent(q.id)}">Retry this question</a>
              <button class="btn secondary remove-mistake" type="button" data-id="${esc(q.id)}">Mark as mastered</button>
            </div>
          </article>
        `).join("")}
      </div>
    `;

    root.querySelectorAll(".remove-mistake").forEach(button => {
      button.addEventListener("click", () => {
        const ids = (WBPSCStorage.get("wbpsc-wrong", []) || []).filter(id => id !== button.dataset.id);
        WBPSCStorage.set("wbpsc-wrong", ids);
        render();
      });
    });

    const clearBtn = root.querySelector("#clear-wrong");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all questions from the Mistake Notebook?")) {
          WBPSCStorage.set("wbpsc-wrong", []);
          render();
        }
      });
    }
  }

  load();
})();
