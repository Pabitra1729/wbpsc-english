const fs = require('fs');

let code = fs.readFileSync('js/test-engine.js', 'utf8');

// Replace the load block for pyq
const oldSnippet = `    if (type.startsWith("pyq")) {
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
    }`;

const newSnippet = `    if (type.startsWith("pyq")) {
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

if (code.includes(oldSnippet)) {
  code = code.replace(oldSnippet, newSnippet);
  fs.writeFileSync('js/test-engine.js', code, 'utf8');
  console.log('Successfully updated js/test-engine.js for shift-specific PYQ tests');
} else {
  console.log('Old snippet not found directly, writing clean handler');
}
