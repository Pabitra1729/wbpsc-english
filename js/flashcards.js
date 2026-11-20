(()=>{
  let words=[],index=0,flipped=false;
  const esc=value=>{const el=document.createElement("div");el.textContent=value??"";return el.innerHTML};
  async function init(){
    const [wordResponse,questionResponse]=await Promise.all([fetch("data/vocabulary-builder.json"),fetch("data/daily-question.json")]);
    words=await wordResponse.json();
    const saved=WBPSCStorage.get("wbpsc-flashcard-index",0);index=Number.isInteger(saved)?saved%words.length:0;
    renderWord();
    const daily=await questionResponse.json();
    const day=Math.floor(Date.now()/86400000)%words.length;
    document.querySelector("#daily-word").innerHTML=`
      <h2>${esc(words[day].word)}</h2>
      <p style="margin:0.25rem 0;"><strong>Meaning:</strong> ${esc(words[day].meaning)}</p>
      ${words[day].bengali ? `<p style="margin:0.25rem 0; font-family:'Noto Sans Bengali', sans-serif; color:var(--primary); font-size:1.05rem;"><strong>বাংলা অর্থ:</strong> ${esc(words[day].bengali)}</p>` : ""}
    `;
    document.querySelector("#daily-question").innerHTML=`<h2>${esc(daily.question)}</h2><div class="question-options">${daily.options.map((option,i)=>`<button class="btn secondary option" type="button" data-index="${i}">${esc(option)}</button>`).join("")}</div><p id="daily-feedback" class="feedback hidden"></p>`;
    document.querySelectorAll("#daily-question .option").forEach(button=>button.addEventListener("click",()=>{
      if(document.querySelector("#daily-question").dataset.answered)return;
      document.querySelector("#daily-question").dataset.answered="true";
      const chosen=Number(button.dataset.index),correct=chosen===daily.answer;
      document.querySelectorAll("#daily-question .option").forEach((b,i)=>{b.disabled=true;if(i===daily.answer)b.classList.add("correct");if(i===chosen&&!correct)b.classList.add("wrong")});
      const feedback=document.querySelector("#daily-feedback");
      feedback.className=`feedback ${correct?"correct":"wrong"}`;
      feedback.innerHTML=`<strong>${correct?"Correct":"Not quite"}</strong><p>${esc(daily.explanation)}</p><p><strong>Rule:</strong> ${esc(daily.rule)}</p>`;
    }));
  }
  function renderWord(){
    if(!words.length)return;
    const word=words[index],front=document.querySelector("#flashcard-front"),back=document.querySelector("#flashcard-back");
    flipped=false;
    front.innerHTML = `<span style="font-size:1.6rem; font-weight:800; color:var(--text);">${esc(word.word)}</span><span style="display:block; font-size:0.85rem; color:var(--muted); margin-top:0.5rem;">(Tap to flip)</span>`;
    back.innerHTML = `
      <p style="font-size:1.15rem; font-weight:700; margin:0 0 0.4rem; color:var(--text);">${esc(word.meaning)}</p>
      ${word.bengali ? `<p style="font-family:'Noto Sans Bengali', sans-serif; font-size:1.15rem; font-weight:600; color:var(--primary); margin:0 0 0.4rem;">${esc(word.bengali)}</p>` : ""}
      <p style="font-size:0.9rem; color:var(--muted); margin:0;">${esc(word.example)}</p>
    `;
    back.classList.add("hidden");
    front.classList.remove("hidden");
    document.querySelector("#flashcard-progress").textContent=`${index+1} of ${words.length}`;
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const flashcard=document.querySelector("#flashcard");
    if(flashcard){
      flashcard.addEventListener("click",()=>{
        flipped=!flipped;
        document.querySelector("#flashcard-front").classList.toggle("hidden",flipped);
        document.querySelector("#flashcard-back").classList.toggle("hidden",!flipped);
      });
      document.querySelector("#known-word").addEventListener("click",()=>{const known=WBPSCStorage.get("wbpsc-known-words",[])||[];if(!known.includes(words[index].id))known.push(words[index].id);WBPSCStorage.set("wbpsc-known-words",known);nextWord()});
      document.querySelector("#review-word").addEventListener("click",()=>{const review=WBPSCStorage.get("wbpsc-review-words",[])||[];if(!review.includes(words[index].id))review.push(words[index].id);WBPSCStorage.set("wbpsc-review-words",review);nextWord()});
    }
  });
  function nextWord(){index=(index+1)%words.length;WBPSCStorage.set("wbpsc-flashcard-index",index);renderWord()}
  init();
})();
