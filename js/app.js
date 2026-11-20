document.documentElement.dataset.theme=WBPSCStorage.get("wbpsc-theme","light");
const links=[
 ["index.html","Dashboard","⌂"],["grammar.html","Grammar","Aa"],["vocabulary.html","Vocabulary","W"],
 ["reading.html","Reading","≡"],["descriptive.html","Descriptive","✎"],["question-bank.html","Question Bank","?"],
 ["pyq.html","Previous Year","P"],["mock-tests.html","Mock Tests","✓"],["vocab-builder.html","Vocab Builder","F"],
 ["my-space.html","My Space","★"]
];
const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
function linkMarkup(){
 return links.map(([href,label,icon])=>`<a href="${href}" ${path===href?'aria-current="page"':""}><span class="nav-link-icon" aria-hidden="true">${icon}</span><span>${label}</span></a>`).join("");
}
document.querySelector("#nav-root").innerHTML=`<nav class="desktop-nav" aria-label="Primary navigation"><a class="brand" href="index.html"><span class="brand-mark">WB</span><span><strong>WBPSC English</strong><small>Clerkship preparation</small></span></a><div class="nav-links">${linkMarkup()}</div><div class="nav-actions"><button class="btn theme-btn" type="button" aria-label="Toggle dark mode">Dark mode</button></div></nav><nav class="bottom-nav" aria-label="Primary navigation">${links.slice(0,5).map(([href,label,icon])=>`<a href="${href}" ${path===href?'aria-current="page"':""}><span class="nav-link-icon" aria-hidden="true">${icon}</span><span>${label}</span></a>`).join("")}</nav><button class="mobile-theme" type="button" aria-label="Toggle dark mode">◐</button><button class="mobile-search" type="button" aria-label="Open global search">⌕</button>`;
function updateThemeLabel(){
 const dark=document.documentElement.dataset.theme==="dark";
 document.querySelectorAll(".theme-btn").forEach(b=>b.textContent=dark?"Light mode":"Dark mode");
}
document.querySelectorAll(".theme-btn,.mobile-theme").forEach(button=>button.addEventListener("click",()=>{const theme=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=theme;WBPSCStorage.set("wbpsc-theme",theme);updateThemeLabel()}));
updateThemeLabel();

document.body.insertAdjacentHTML("beforeend",`<section id="global-search" class="search-panel" aria-label="Global search" hidden><div class="search-dialog card"><div class="search-top"><label for="global-search-input">Search notes and questions</label><button id="close-search" class="icon-btn" type="button" aria-label="Close search">×</button></div><input id="global-search-input" type="search" autocomplete="off" placeholder="Search…"><div id="search-results" aria-live="polite"></div></div></section>`);
const searchPanel=document.querySelector("#global-search");
const searchInput=document.querySelector("#global-search-input");
const navActions=document.querySelector(".nav-actions");
if(navActions)navActions.insertAdjacentHTML("afterbegin",'<button class="btn theme-btn" id="open-search" type="button">Search</button>');
const openButtons=[document.querySelector("#open-search"),document.querySelector(".mobile-search")].filter(Boolean);
openButtons.forEach(button=>button.addEventListener("click",()=>{searchPanel.hidden=false;searchInput.focus()}));
document.querySelector("#close-search").addEventListener("click",()=>{searchPanel.hidden=true});
searchPanel.addEventListener("click",event=>{if(event.target===searchPanel)searchPanel.hidden=true});
document.addEventListener("keydown",event=>{if(event.key==="Escape")searchPanel.hidden=true;if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();searchPanel.hidden=false;searchInput.focus()}});
let searchIndex=[];
(async()=>{
 try{
  const chapters=await fetch("data/chapters.json").then(r=>r.json());
  // 1. Index chapter notes
  for(const chapter of chapters.filter(c=>c.status==="ready" && c.notesFile)){
   try{
    const note=await fetch(chapter.notesFile).then(r=>r.ok?r.json():null);
    if(note) searchIndex.push({title:note.title,type:"Chapter note",text:[note.intro,note.bengali,...(note.rules||[]).map(r=>r.rule)].join(" "),href:`chapter.html?id=${chapter.id}`});
   }catch(err){}
  }
  // 2. Index all questions fast via all-questions.json
  try{
   const allQ = await fetch("data/all-questions.json").then(r=>r.ok?r.json():null);
   if(Array.isArray(allQ) && allQ.length){
    allQ.forEach(q=>searchIndex.push({title:q.question,type:`Question (${q.section||"practice"})`,text:[q.question,q.explanation,q.rule,q.bengaliHint].filter(Boolean).join(" "),href:`chapter.html?id=${q.chapter}`}));
   }
  }catch(err){}
 }catch(error){console.warn(error)}
})();
searchInput.addEventListener("input",()=>{
 const term=searchInput.value.trim().toLowerCase();
 const results=document.querySelector("#search-results");
 if(!term){results.innerHTML='<p>Enter at least one search term.</p>';return}
 const matches=searchIndex.filter(item=>(item.title+" "+item.text).toLowerCase().includes(term)).slice(0,20);
 results.innerHTML=matches.length?matches.map(item=>`<a class="search-result" href="${item.href}"><span>${item.type}</span><strong>${item.title}</strong></a>`).join(""):'<p>No matching notes or questions found.</p>';
});
