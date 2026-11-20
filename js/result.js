(()=>{
  const result=WBPSCStorage.get("wbpsc-last-result");
  if(!result){
    document.querySelector("#result-summary").innerHTML='<article class="card"><p>No recent result found.</p><a class="btn primary" href="mock-tests.html">Open mock tests</a></article>';
    return;
  }
  const esc=value=>{const el=document.createElement("div");el.textContent=value??"";return el.innerHTML};
  document.querySelector("#result-summary").innerHTML=`
    <article class="card metric"><span>Score</span><strong>${result.score}</strong></article>
    <article class="card metric"><span>Accuracy</span><strong>${result.accuracy}%</strong></article>
    <article class="card metric"><span>Correct</span><strong>${result.correct}</strong></article>
    <article class="card metric"><span>Wrong</span><strong>${result.wrong}</strong></article>
    <article class="card metric"><span>Unattempted</span><strong>${result.skipped}</strong></article>
    <article class="card metric"><span>Time</span><strong>${Math.floor(result.timeSec/60)}m ${result.timeSec%60}s</strong></article>`;
  const topics=Object.values(result.byTopic||{});
  document.querySelector("#topic-performance").innerHTML=topics.length?topics.map(topic=>{
    const accuracy=topic.total?Math.round(topic.correct/topic.total*100):0;
    return `<div class="topic-row"><div><strong>${esc(topic.title)}</strong><span>${topic.correct}/${topic.total} correct</span></div><div class="progress"><i style="width:${accuracy}%"></i></div><b>${accuracy}%</b></div>`;
  }).join(""):'<p>No topic data available.</p>';
  const weak=topics.filter(topic=>topic.total&&topic.correct/topic.total<0.6);
  document.querySelector("#weak-topics").innerHTML=weak.length?weak.map(topic=>`<span class="badge">${esc(topic.title)}</span>`).join(" "):"<p>No weak topics based on this test.</p>";
  document.querySelector("#revisit-questions").innerHTML=result.revisitIds?.length?result.revisitIds.map(id=>`<span class="badge">${esc(id)}</span>`).join(" "):"<p>None. Every question was answered correctly.</p>";
  document.querySelector("#solution-review").innerHTML=result.questions.map((q,index)=>{
    const answerIndex=result.answers[index];
    const originalAnswer=answerIndex===null||answerIndex===undefined?null:q.optionMap[answerIndex];
    const status=answerIndex===null||answerIndex===undefined?"Unattempted":originalAnswer===q.answer?"Correct":"Wrong";
    return `<article class="solution-item ${status.toLowerCase()}"><div class="meta-row"><span class="badge">${esc(status)}</span><span class="badge">${esc(q.chapterTitle)}</span></div><h3>${esc(q.question)}</h3><p><strong>Correct answer:</strong> ${esc(q.options[q.answer])}</p><p><strong>Explanation:</strong> ${esc(q.explanation)}</p><p><strong>Rule:</strong> ${esc(q.rule)}</p></article>`;
  }).join("");
})();
