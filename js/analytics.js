window.WBPSCAnalytics={
 renderDashboard(){
  const answers=WBPSCStorage.get("wbpsc-attempts",[]);
  const correct=answers.filter(a=>a.correct).length;
  const accuracy=answers.length?Math.round(correct/answers.length*100)+"%":"—";
  const dates=[...new Set(answers.map(answer=>String(answer.date||"").slice(0,10)).filter(Boolean))].sort();
  let streak=0;
  if(dates.length){
   const cursor=new Date(dates.at(-1)+"T12:00:00");
   const set=new Set(dates);
   while(set.has(cursor.toISOString().slice(0,10))){
    streak++;
    cursor.setDate(cursor.getDate()-1);
   }
  }
  const els=[["streak-value",streak+" "+(streak===1?"day":"days")],["accuracy-value",accuracy],["answered-value",answers.length]];
  els.forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=value});
 }
};
