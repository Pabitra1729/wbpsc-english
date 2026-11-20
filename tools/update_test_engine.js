const fs = require('fs');

let s = fs.readFileSync('js/test-engine.js', 'utf8');

const oldPart = `    if (state.category.startsWith("pyq")) {
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
    }
    document.querySelector("#test-title").textContent=state.chapter?"Chapter test":"English mock test";`;

const newPart = `    if (state.category.startsWith("pyq")) {
      if (state.category.includes("2023-s1-full")) {
        document.querySelector("#test-category").textContent = "Official 2023 Shift 1 Full Paper (100 Qs)";
        document.querySelector("#test-title").textContent = "Part I: English (1-30), Part II: General Studies & Arithmetic (31-100)";
      } else if (state.category.includes("2023-s1")) {
        document.querySelector("#test-category").textContent = "Official 2023 Shift 1 English Paper (30 Qs)";
        document.querySelector("#test-title").textContent = "WBPSC Clerkship Preliminary Part-I English";
      } else if (state.category.includes("s1-full")) {
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

const normS = s.replace(/\r\n/g, '\n');
const normOld = oldPart.replace(/\r\n/g, '\n');
const normNew = newPart.replace(/\r\n/g, '\n');

if (normS.includes(normOld)) {
  const updated = normS.replace(normOld, normNew);
  fs.writeFileSync('js/test-engine.js', updated.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully updated js/test-engine.js');
} else {
  console.error('Could not find match in js/test-engine.js');
  process.exit(1);
}
