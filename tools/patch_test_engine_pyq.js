const fs = require('fs');

let code = fs.readFileSync('js/test-engine.js', 'utf8');

// Patch loadQuestions to handle pyq
const targetLoad = 'let weakKeys=new Set();';
const newLoad = `    if (type.startsWith("pyq")) {
      try {
        const pyqResp = await fetch("data/pyq/verified-pyq.json");
        if (pyqResp.ok) {
          const pyqs = await pyqResp.json();
          if (Array.isArray(pyqs) && pyqs.length > 0) {
            return pyqs.map(q => ({
              ...q,
              chapterTitle: q.source || "WBPSC Clerkship 2019",
              difficulty: q.difficulty || "medium"
            }));
          }
        }
      } catch(e) {}
    }

    let weakKeys=new Set();`;

code = code.replace(targetLoad, newLoad);

// Patch prepareQuestion
const targetPrep = 'function prepareQuestion(q){';
const newPrep = `function prepareQuestion(q){
    if (type.startsWith("pyq")) {
      return {
        ...q,
        randomOptions: [...q.options],
        optionMap: [0, 1, 2, 3]
      };
    }`;

code = code.replace(targetPrep, newPrep);

// Patch buildTest
const targetBuild = 'const selected=shuffle(pool).slice(0,Math.min(count,pool.length)).map(prepareQuestion);';
const newBuild = 'const selected = type.startsWith("pyq") ? pool.slice(0, Math.min(count || pool.length, pool.length)).map(prepareQuestion) : shuffle(pool).slice(0,Math.min(count,pool.length)).map(prepareQuestion);';

code = code.replace(targetBuild, newBuild);

// Patch test title
const targetTitle = 'document.querySelector("#test-category").textContent=state.category.replace(/-/g," ");';
const newTitle = 'document.querySelector("#test-category").textContent = state.category.startsWith("pyq") ? "Official PYQ Paper (2019 Shift 2)" : state.category.replace(/-/g," ");';

code = code.replace(targetTitle, newTitle);

fs.writeFileSync('js/test-engine.js', code, 'utf8');
console.log('Successfully patched js/test-engine.js for PYQ testing');
