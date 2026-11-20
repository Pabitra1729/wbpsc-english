(()=>{
  const params=new URLSearchParams(location.search);
  const type=params.get("type")||"mixed";
  const countParam=Number(params.get("count"));
  const chapterParam=params.get("chapter");
  let config={defaultQuestionCount:30,defaultDurationMinutes:30,negativeMarking:0.25,correctMarks:1,dailyQuestionCount:10,weeklyQuestionCount:30};
  let questions=[],current=0,timerId=null;
  const stateKey="wbpsc-active-test";

  const esc=value=>{const el=document.createElement("div");el.textContent=value??"";return el.innerHTML};
  function shuffle(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
  async function loadJson(url){const response=await fetch(url);if(!response.ok)throw new Error("Could not load "+url);return response.json()}

  async function loadQuestions(){
    let all = [];
    try {
      const resp = await fetch("data/all-questions.json");
      if (resp.ok) all = await resp.json();
    } catch(e) {}

    if (!Array.isArray(all) || all.length === 0) {
      const chapters=await loadJson("data/chapters.json");
      for(const chapter of chapters.filter(c=>c.status==="ready"&&c.questionsFile)){
        try {
          const response=await fetch(chapter.questionsFile);
          if(response.ok){
            const items=await response.json();
            items.forEach(q=>all.push({...q,chapterTitle:chapter.title,section:chapter.section}));
          }
        } catch(e) {}
      }
    }

        if (type.startsWith("pyq")) {
      try {
        let pyqs = [];
        if (type === "pyq-2023-s1-full") {
          config.defaultDurationMinutes = 90;
          config.negativeMarking = 0.33;
          const r = await fetch("data/pyq/2023-shift1-100.json");
          if (r.ok) pyqs = await r.json();
        } else if (type === "pyq-2019-s1-full") {
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
            if (type === "pyq-2023-s1") {
              pyqs = all.filter(q => q.year === "2023-s1" && (q.section === "english" || q.qNum <= 30));
            } else if (type === "pyq-2019-s1") {
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
            chapterTitle: q.subject || q.source || "WBPSC Clerkship Official",
            difficulty: q.difficulty || "medium"
          }));
        }
      } catch(e) {
        console.warn("Could not load PYQs", e);
      }
    }

    let weakKeys=new Set();
    if(type==="weak-topic"){
      const previous=WBPSCStorage.get("wbpsc-test-results",[])||[];
      previous.forEach(result=>Object.entries(result.byTopic||{}).forEach(([key,topic])=>{
        if(topic.total&&topic.correct/topic.total<0.6)weakKeys.add(key);
      }));
    }

    const pool = all.filter(q => {
      if(chapterParam && q.chapter !== chapterParam) return false;
      if(type==="grammar" && q.section !== "grammar") return false;
      if(type==="vocabulary" && q.section !== "vocabulary") return false;
      if(type==="reading" && q.section !== "reading") return false;
      if(type==="weak-topic" && weakKeys.size > 0 && !weakKeys.has(q.chapter) && !weakKeys.has(q.chapterTitle)) return false;
      return true;
    });
    return pool.length > 0 ? pool : all;
  }

  function prepareQuestion(q){
    if (type.startsWith("pyq")) {
      return {
        ...q,
        randomOptions: [...q.options],
        optionMap: [0, 1, 2, 3]
      };
    }
    const indexed=q.options.map((text,index)=>({text,index}));
    const randomised=shuffle(indexed);
    return {...q,randomOptions:randomised.map(x=>x.text),optionMap:randomised.map(x=>x.index)};
  }

  function buildTest(pool,count){
    const selected = type.startsWith("pyq") ? pool.slice(0, Math.min(count || pool.length, pool.length)).map(prepareQuestion) : shuffle(pool).slice(0,Math.min(count,pool.length)).map(prepareQuestion);
    return {testId:"test-"+Date.now(),category:type,chapter:chapterParam,startedAt:Date.now(),remainingSeconds:config.defaultDurationMinutes*60,questions:selected,answers:Array(selected.length).fill(null),marked:Array(selected.length).fill(false),current:0};
  }

  function renderPalette(state){
    const palette=document.querySelector("#palette");
    palette.innerHTML=state.questions.map((q,index)=>{
      let status="";
      if(state.answers[index]!=null)status+=" answered";
      if(state.marked[index])status+=" marked";
      if(index===state.current)status+=" current";
      return `<button class="palette-item${status}" type="button" data-index="${index}" aria-label="Question ${index+1}${status}">${index+1}</button>`;
    }).join("");
    palette.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{state.current=Number(button.dataset.index);save();render();}));
  }

  function render(){
    const state=WBPSCStorage.get(stateKey);
    if(!state||state.questions.length===0){
      document.querySelector("#question-area").innerHTML='<p class="notice">No questions are available for this test category yet. Complete a few practice tests or choose another category.</p>';
      return;
    }
    if (state.category.startsWith("pyq")) {
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
    }
    const q=state.questions[state.current];
    const area=document.querySelector("#question-area");
    area.innerHTML=`<div class="question-heading"><div class="meta-row"><span class="badge">${esc(q.chapterTitle)}</span><span class="badge">${esc(q.difficulty)}</span></div><span>Question ${state.current+1} of ${state.questions.length}</span></div><h2>${esc(q.question)}</h2><div class="test-options">${q.randomOptions.map((option,index)=>`<button class="btn secondary test-option${state.answers[state.current]===index?" selected":""}" type="button" data-index="${index}">${String.fromCharCode(65+index)}. ${esc(option)}</button>`).join("")}</div><div class="test-actions"><button id="mark-review" class="btn secondary" type="button" aria-pressed="${state.marked[state.current]}">${state.marked[state.current]?"Marked for review":"Mark for review"}</button><div><button id="previous-question" class="btn secondary" type="button"${state.current===0?" disabled":""}>Previous</button><button id="next-question" class="btn primary" type="button"${state.current===state.questions.length-1?" disabled":""}>Next</button></div></div>`;
    area.querySelectorAll(".test-option").forEach(button=>button.addEventListener("click",()=>{
      state.answers[state.current]=Number(button.dataset.index);save();render();
    }));
    area.querySelector("#mark-review").addEventListener("click",event=>{
      state.marked[state.current]=!state.marked[state.current];event.currentTarget.setAttribute("aria-pressed",String(state.marked[state.current]));save();renderPalette(state);
    });
    area.querySelector("#previous-question").addEventListener("click",()=>{if(state.current>0){state.current--;save();render()}});
    area.querySelector("#next-question").addEventListener("click",()=>{if(state.current<state.questions.length-1){state.current++;save();render()}});
    renderPalette(state);
  }

  function save(){
    const state=WBPSCStorage.get(stateKey);
    if(state)WBPSCStorage.set(stateKey,state);
  }

  function updateTimer(){
    const state=WBPSCStorage.get(stateKey);
    if(!state)return;
    const elapsed=Math.floor((Date.now()-state.startedAt)/1000);
    const remaining=Math.max(0,state.remainingSeconds-elapsed);
    const minutes=Math.floor(remaining/60),seconds=remaining%60;
    document.querySelector("#timer").textContent=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    if(remaining===0){submitTest(true)}
  }

  function submitTest(auto=false){
    if(timerId){clearInterval(timerId);timerId=null}
    const state=WBPSCStorage.get(stateKey);
    if(!state)return;
    let correct=0,wrong=0,skipped=0,score=0;
    const topic={};
    const wrongIds=[],revisitIds=[];
    state.questions.forEach((q,index)=>{
      const answerIndex=state.answers[index];
      const selectedOriginal=answerIndex===null?null:q.optionMap[answerIndex];
      const isCorrect=selectedOriginal===q.answer;
      const key=q.chapter||q.chapterTitle||"Uncategorised";
      if(!topic[key])topic[key]={correct:0,total:0,title:q.chapterTitle||key};
      topic[key].total++;
      if(answerIndex===null){skipped++;revisitIds.push(q.id)}
      else if(isCorrect){correct++;score+=config.correctMarks;topic[key].correct++}
      else{wrong++;score-=config.negativeMarking;wrongIds.push(q.id);revisitIds.push(q.id)}
    });
    const elapsed=Math.max(0,Math.floor((Date.now()-state.startedAt)/1000));
    const result={testId:state.testId,date:new Date().toISOString(),category:state.category,total:state.questions.length,correct,wrong,skipped,timeSec:elapsed,score:Number(score.toFixed(2)),accuracy:state.questions.length?Number((correct/state.questions.length*100).toFixed(1)):0,byTopic:topic,wrongIds,revisitIds,autoSubmitted:auto,questions:state.questions,answers:state.answers};
    const results=WBPSCStorage.get("wbpsc-test-results",[])||[];
    results.push(result);WBPSCStorage.set("wbpsc-test-results",results);
    const mistake=(WBPSCStorage.get("wbpsc-wrong",[])||[]);wrongIds.forEach(id=>{if(!mistake.includes(id))mistake.push(id)});WBPSCStorage.set("wbpsc-wrong",mistake);
    WBPSCStorage.remove(stateKey);
    WBPSCStorage.set("wbpsc-last-result",result);
    location.href="result.html";
  }

  (async()=>{
    try{
      config={...config,...await loadJson("data/test-config.json")};
      let state=WBPSCStorage.get(stateKey);
      if(!state){
        let count=countParam||config.defaultQuestionCount;
        if(type==="daily")count=config.dailyQuestionCount;
        if(type==="weekly")count=config.weeklyQuestionCount;
        if(type==="weak-topic"){
          const results=WBPSCStorage.get("wbpsc-test-results",[])||[];
          const weak=[];
          results.forEach(result=>Object.entries(result.byTopic||{}).forEach(([key,topic])=>{if(topic.total&&topic.correct/topic.total<0.6)weak.push(key)}));
          count=10;
        }
        const pool=await loadQuestions();
        state=buildTest(pool,count);
        WBPSCStorage.set(stateKey,state);
      }
      render();
      updateTimer();
      timerId=setInterval(updateTimer,1000);
      document.querySelector("#submit-test").addEventListener("click",()=>{if(confirm("Submit this test now?"))submitTest(false)});
    }catch(error){
      document.querySelector("#question-area").innerHTML=`<p class="notice">${esc(error.message)}</p>`;
    }
  })();
})();
