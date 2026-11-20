const fs = require('fs');

let code = fs.readFileSync('js/test-engine.js', 'utf8');

// Replace the pyq loading block
const targetOldLoad = `        if (type.startsWith("pyq")) {
      try {
        const pyqResp = await fetch("data/pyq/verified-pyq.json");
        if (pyqResp.ok) {
          let pyqs = await pyqResp.json();
          if (type === "pyq-2019-s1") {
            pyqs = pyqs.filter(q => q.year === "2019-s1");
          } else if (type === "pyq-2019-s2") {
            pyqs = pyqs.filter(q => q.year === "2019-s2");
          }
          if (Array.isArray(pyqs) && pyqs.length > 0) {
            return pyqs.map(q => ({
              ...q,
              chapterTitle: q.source || "WBPSC Clerkship 2019",
              difficulty: q.difficulty || "medium"
            }));
          }
        }
      } catch(e) {}
    }`;

const targetNewLoad = `        if (type.startsWith("pyq")) {
      try {
        let pyqs = [];
        if (type === "pyq-2019-s1-full") {
          config.defaultDurationMinutes = 90;
          config.negativeMarking = 0.33;
          const r = await fetch("data/pyq/2019-shift1-100.json");
          if (r.ok) pyqs = await r.json();
        } else if (type === "pyq-2019-s2-full") {
          config.defaultDurationMinutes = 90;
          config.negativeMarking = 0.33;
          const r = await fetch("data/pyq/2019-shift2-100.json");
          if (r.ok) pyqs = await r.json();
        } else {
          const r = await fetch("data/pyq/verified-pyq.json");
          if (r.ok) {
            const all = await r.json();
            if (type === "pyq-2019-s1") {
              pyqs = all.filter(q => q.year === "2019-s1" && (q.section === "english" || q.qNum >= 71));
            } else if (type === "pyq-2019-s2") {
              pyqs = all.filter(q => q.year === "2019-s2" && (q.section === "english" || q.qNum >= 71));
            } else {
              pyqs = all;
            }
          }
        }
        if (Array.isArray(pyqs) && pyqs.length > 0) {
          return pyqs.map(q => ({
            ...q,
            chapterTitle: q.subject || q.source || "WBPSC Clerkship 2019",
            difficulty: q.difficulty || "medium"
          }));
        }
      } catch(e) {
        console.warn("Could not load PYQs", e);
      }
    }`;

code = code.replace(targetOldLoad, targetNewLoad);

// Replace title setting
const targetOldTitle = `document.querySelector("#test-category").textContent = state.category.startsWith("pyq") ? "Official PYQ Paper (2019 Shift 2)" : state.category.replace(/-/g," ");`;
const targetNewTitle = `if (state.category.startsWith("pyq")) {
      if (state.category.includes("s1-full")) {
        document.querySelector("#test-category").textContent = "Official 2019 Shift 1 Full Paper (100 Qs)";
        document.querySelector("#test-title").textContent = "General Studies (1-40), Arithmetic (41-70), English (71-100)";
      } else if (state.category.includes("s2-full")) {
        document.querySelector("#test-category").textContent = "Official 2019 Shift 2 Full Paper (100 Qs)";
        document.querySelector("#test-title").textContent = "General Studies (1-40), Arithmetic (41-70), English (71-100)";
      } else if (state.category.includes("s1")) {
        document.querySelector("#test-category").textContent = "Official 2019 Shift 1 English Paper (30 Qs)";
        document.querySelector("#test-title").textContent = "WBPSC Clerkship Preliminary Part-I English";
      } else {
        document.querySelector("#test-category").textContent = "Official 2019 Shift 2 English Paper (30 Qs)";
        document.querySelector("#test-title").textContent = "WBPSC Clerkship Preliminary Part-I English";
      }
    } else {
      document.querySelector("#test-category").textContent = state.category.replace(/-/g," ");
      document.querySelector("#test-title").textContent = state.chapter ? "Chapter test" : "English mock test";
    }`;

code = code.replace(targetOldTitle, targetNewTitle);

fs.writeFileSync('js/test-engine.js', code, 'utf8');
console.log('Successfully upgraded js/test-engine.js for full 100-question papers and english papers');
