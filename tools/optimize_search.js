const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');

const target = `let searchIndex=[];
(async()=>{
 try{
  const chapters=await fetch("data/chapters.json").then(r=>r.json());
  for(const chapter of chapters.filter(c=>c.status==="ready")){
   if(chapter.notesFile){try{const note=await fetch(chapter.notesFile).then(r=>r.ok?r.json():null);if(note)searchIndex.push({title:note.title,type:"Chapter note",text:[note.intro,note.bengali,...(note.rules||[]).map(r=>r.rule)].join(" "),href:\`chapter.html?id=\${chapter.id}\`})}catch(error){console.warn(error)}}
   if(chapter.questionsFile){try{const questions=await fetch(chapter.questionsFile).then(r=>r.ok?r.json():[]);questions.forEach(question=>searchIndex.push({title:question.question,type:"Question",text:[question.question,question.explanation,question.rule].join(" "),href:\`chapter.html?id=\${chapter.id}\`}))}catch(error){console.warn(error)}}
  }
 }catch(error){console.warn(error)}
})();`;

const replacement = `let searchIndex=[];
(async()=>{
 try{
  const chapters=await fetch("data/chapters.json").then(r=>r.json());
  // 1. Index chapter notes
  for(const chapter of chapters.filter(c=>c.status==="ready" && c.notesFile)){
   try{
    const note=await fetch(chapter.notesFile).then(r=>r.ok?r.json():null);
    if(note) searchIndex.push({title:note.title,type:"Chapter note",text:[note.intro,note.bengali,...(note.rules||[]).map(r=>r.rule)].join(" "),href:\`chapter.html?id=\${chapter.id}\`});
   }catch(err){}
  }
  // 2. Index all questions fast via all-questions.json
  try{
   const allQ = await fetch("data/all-questions.json").then(r=>r.ok?r.json():null);
   if(Array.isArray(allQ) && allQ.length){
    allQ.forEach(q=>searchIndex.push({title:q.question,type:\`Question (\${q.section||"practice"})\`,text:[q.question,q.explanation,q.rule,q.bengaliHint].filter(Boolean).join(" "),href:\`chapter.html?id=\${q.chapter}\`}));
   }
  }catch(err){}
 }catch(error){console.warn(error)}
})();`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('js/app.js', code, 'utf8');
  console.log('Successfully optimized search index in js/app.js');
} else {
  console.log('Target block not matched exactly, checking normalized version...');
  // Normalized line breaks
  const normCode = code.replace(/\r\n/g, '\n');
  const normTarget = target.replace(/\r\n/g, '\n');
  if (normCode.includes(normTarget)) {
    const updated = normCode.replace(normTarget, replacement.replace(/\r\n/g, '\n'));
    fs.writeFileSync('js/app.js', updated, 'utf8');
    console.log('Successfully optimized search index in js/app.js (normalized)');
  } else {
    console.warn('Could not find match for searchIndex block');
  }
}
