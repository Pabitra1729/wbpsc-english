(()=>{
  const esc=value=>{const el=document.createElement("div");el.textContent=value??"";return el.innerHTML};
  const nav=document.querySelector("#descriptive-nav"),content=document.querySelector("#descriptive-content");
  async function init(){
    try{
      const response=await fetch("data/descriptive.json");
      const items=await response.json();
      nav.innerHTML=items.map((item,index)=>`<button type="button" data-index="${index}"${index===0?' aria-current="page"':""}>${esc(item.title)}</button>`).join("");
      function render(index){
        const item=items[index];
        nav.querySelectorAll("button").forEach((button,i)=>i===index?button.setAttribute("aria-current","page"):button.removeAttribute("aria-current"));
        content.innerHTML=`
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
            <div>
              <p class="eyebrow">Part II Descriptive · Formal Template</p>
              <h1 style="margin:0.25rem 0 0;">${esc(item.title)}</h1>
            </div>
            <a class="btn secondary" href="chapter.html?id=${encodeURIComponent(item.id)}">📖 Read In-Depth Guide &amp; Rules</a>
          </div>
          <h2>Standard Format &amp; Marking Guidelines</h2>
          <p>${esc(item.format)}</p>
          <h2>Official Model Answer</h2>
          <div class="model-answer">${esc(item.modelAnswer)}</div>
          <h2>Practice Topics (WBPSC Pattern)</h2>
          <ul style="line-height:1.8;">${item.practiceTopics.map(topic=>`<li><strong>${esc(topic)}</strong></li>`).join("")}</ul>
          <h2>Live Self-Practice Workspace</h2>
          <label for="writing-area" style="font-weight:600; margin-bottom:0.5rem; display:block;">Draft your original response below (Auto-saves to browser):</label>
          <textarea id="writing-area" rows="12" placeholder="Start drafting your answer here..."></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
            <p style="margin:0;"><strong id="word-count">0 words</strong></p>
            <span style="font-size:0.85rem; color:var(--muted);">💾 Auto-saved in your browser</span>
          </div>
          <h2 style="margin-top:1.5rem;">Self-Assessment Checklist</h2>
          <div class="checklist">${item.checklist.map((entry,i)=>`<label><input type="checkbox" id="check-${i}"> ${esc(entry)}</label>`).join("")}</div>
        `;
        const area=content.querySelector("#writing-area"),count=content.querySelector("#word-count");
        const saved=WBPSCStorage.get("wbpsc-descriptive-"+item.id,"");
        area.value=saved||"";updateCount();
        area.addEventListener("input",()=>{updateCount();WBPSCStorage.set("wbpsc-descriptive-"+item.id,area.value)});
        function updateCount(){const words=area.value.trim()?area.value.trim().split(/\s+/).length:0;count.textContent=words+" "+(words===1?"word":"words")}
      }
      nav.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>render(Number(button.dataset.index))));
      render(0);
    }catch(error){content.innerHTML='<p class="notice">Could not load descriptive content.</p>';console.warn(error)}
  }
  init();
})();
