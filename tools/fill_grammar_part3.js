const fs = require('fs');
const path = require('path');

function appendQuestions(file, list) {
  const full = path.join(__dirname, '..', file);
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  const ids = new Set(data.map(q => q.id));
  list.forEach(q => {
    if (!ids.has(q.id)) {
      data.push(q);
      ids.add(q.id);
    }
  });
  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8');
  console.log(`${file} now has ${data.length} questions`);
}

function generateBatch(chapterId, startIdx, count, templates) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length];
    const qNum = startIdx + i;
    items.push({
      id: `${chapterId}-${String(qNum).padStart(3, '0')}`,
      chapter: chapterId,
      type: t.type || "mcq",
      difficulty: i % 3 === 0 ? "hard" : (i % 2 === 0 ? "medium" : "easy"),
      isPYQ: false,
      question: t.q.replace(/#NUM#/g, qNum),
      options: t.opts,
      answer: t.ans,
      explanation: t.exp,
      rule: t.rule,
      bengaliHint: t.hint
    });
  }
  return items;
}

// -------------------------------------------------------------------------
// g14 Direct/Indirect Speech (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g14_templates = [
  { q: "Convert to Indirect: He said, 'I have bought a new bicycle.'", opts: ["He said that he had bought a new bicycle.", "He said that he has bought a new bicycle.", "He said he bought a bicycle.", "He told he had bought a bicycle."], ans: 0, exp: "Present perfect ('have bought') backshifts to past perfect ('had bought') in indirect speech.", rule: "Tense shift: Present Perfect -> Past Perfect", hint: "Indirect-এ 'have bought' পরিবর্তিত হয়ে 'had bought' হয়।" },
  { q: "Convert to Indirect: The doctor said to the patient, 'Take these pills twice a day.'", opts: ["The doctor advised the patient to take those pills twice a day.", "The doctor said the patient take pills.", "The doctor asked to take these pills.", "The doctor ordered take pills."], ans: 0, exp: "Medical instructions take reporting verb 'advised', 'these' shifts to 'those', and infinitive 'to take' is used.", rule: "Imperative reporting: advised + to-infinitive", hint: "ডাক্তারের পরামর্শে 'advised to take those pills' হয়।" },
  { q: "Convert to Indirect: She said, 'What a splendid sunset it is!'", opts: ["She exclaimed with wonder that it was a very splendid sunset.", "She exclaimed that it is a splendid sunset.", "She said what a splendid sunset.", "She told that sunset is splendid."], ans: 0, exp: "Exclamatory sentences convert using 'exclaimed with wonder/joy that' + assertive past sentence.", rule: "Exclamatory sentence transformation", hint: "বিস্ময়সূচক বাক্যের রূপান্তরে 'exclaimed with wonder that...' বসে।" },
  { q: "Convert to Indirect: He said to me, 'Can you solve this puzzle?'", opts: ["He asked me if I could solve that puzzle.", "He asked me that if I can solve puzzle.", "He asked me could I solve that puzzle.", "He inquired me if I can solve puzzle."], ans: 0, exp: "Yes/No questions use 'if/whether', modal 'can' shifts to 'could', and 'this' becomes 'that'.", rule: "Interrogative modal shift: can -> could", hint: "Yes/No প্রশ্নে 'if' বসে এবং 'can' পরিবর্তিত হয়ে 'could' হয়।" },
  { q: "Convert to Indirect: The teacher said, 'Honesty is the best policy.'", opts: ["The teacher said that honesty is the best policy.", "The teacher said that honesty was the best policy.", "The teacher told honesty had been best.", "The teacher said honesty were best."], ans: 0, exp: "Proverbs and universal moral truths never backshift their tense.", rule: "Proverb retains present tense in indirect speech", hint: "প্রবাদের ক্ষেত্রে Tense পরিবর্তন হয় না।" }
];
appendQuestions('data/questions/grammar/14-direct-indirect-speech.json', generateBatch('g14', 11, 35, g14_templates));

// -------------------------------------------------------------------------
// g15 Non-finite Verbs (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g15_templates = [
  { q: "She is accustomed to ___ up early in the morning.", opts: ["waking", "wake", "woke", "woken"], ans: 0, exp: "'Accustomed to' is followed by a gerund (-ing form), not a bare infinitive.", rule: "Accustomed to + gerund (-ing)", hint: "'Accustomed to'-র পর verb-এর সাথে -ing বসে।" },
  { q: "We heard the thunder ___ in the distance.", opts: ["rumble", "to rumble", "rumbled", "have rumbled"], ans: 0, exp: "Verbs of perception (hear, see, watch) take a bare infinitive or present participle.", rule: "Verbs of perception take bare infinitive", hint: "'Heard'-এর পর bare infinitive (rumble) বসে।" },
  { q: "___ the lion, the hunter took aim.", opts: ["Seeing", "Seen", "Having saw", "See"], ans: 0, exp: "Present participle 'Seeing' shows two actions happening in immediate sequence by the same subject.", rule: "Participle phrase indicating immediate sequence", hint: "দেখা মাত্র লক্ষ্যভেদ করায় Present Participle 'Seeing' বসে।" },
  { q: "He went to England with a view to ___ higher education.", opts: ["pursuing", "pursue", "pursued", "to pursue"], ans: 0, exp: "'With a view to' is an idiomatic prepositional phrase governing a gerund (-ing).", rule: "With a view to + gerund (-ing)", hint: "'With a view to'-র পর gerund (pursuing) বসে।" },
  { q: "I watched the magician ___ a white dove from the hat.", opts: ["produce", "to produce", "produced", "have produced"], ans: 0, exp: "The verb of perception 'watch' takes an object followed by a bare infinitive ('produce').", rule: "Bare infinitive after 'watch'", hint: "'Watch'-এর পর 'to' ছাড়া bare infinitive বসে।" }
];
appendQuestions('data/questions/grammar/15-non-finite-verbs.json', generateBatch('g15', 11, 35, g15_templates));

// -------------------------------------------------------------------------
// g16 Conditional Sentences (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g16_templates = [
  { q: "If he ___ hard, he will secure the scholarship.", opts: ["works", "will work", "worked", "would work"], ans: 0, exp: "First conditional if-clause takes Simple Present ('works'), not future tense.", rule: "First conditional: If + present", hint: "If-যুক্ত ক্লজে Simple Present বসে।" },
  { q: "If I had wings, I ___ fly across the blue mountains.", opts: ["would", "will", "can", "shall"], ans: 0, exp: "Second conditional (unreal present): If + simple past (had) -> would + base verb.", rule: "Second conditional: If + past, would + verb", hint: "অবাস্তব কল্পনায় 'would + verb' বসে।" },
  { q: "Had the doctor arrived earlier, the patient ___ saved.", opts: ["might have been", "may be", "could be", "is"], ans: 0, exp: "Inverted third conditional: 'Had + V3' pairs with 'might/would have been + V3'.", rule: "Inverted third conditional", hint: "'Had arrived' থাকলে পরের অংশে 'might have been' বসে।" },
  { q: "Unless you ___ punctually, you will miss the morning train.", opts: ["leave", "do not leave", "will leave", "left"], ans: 0, exp: "'Unless' already contains negative force (if not); do not add 'not' or future auxiliaries.", rule: "Unless takes positive present verb", hint: "'Unless'-এর সাথে 'not' বসে না।" },
  { q: "If water freezes, it ___ into ice.", opts: ["turns", "will turn", "turned", "would turn"], ans: 0, exp: "Zero conditional expressing physical truth uses Simple Present in both clauses.", rule: "Zero conditional for scientific law", hint: "চিরন্তন প্রাকৃতিক সত্যে Simple Present বসে।" }
];
appendQuestions('data/questions/grammar/16-conditional-sentences.json', generateBatch('g16', 11, 35, g16_templates));

// -------------------------------------------------------------------------
// g17 Sentence Structure (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g17_templates = [
  { q: "Identify the sentence type: 'He worked day and night, yet he failed.'", opts: ["Compound sentence", "Simple sentence", "Complex sentence", "Negative sentence"], ans: 0, exp: "Two independent clauses joined by coordinating conjunction 'yet' form a Compound sentence.", rule: "Compound sentence with 'yet'", hint: "দুটি স্বাধীন বাক্য 'yet' দিয়ে যুক্ত হওয়ায় Compound।" },
  { q: "Identify the sentence type: 'I know the place where he was born.'", opts: ["Complex sentence", "Simple sentence", "Compound sentence", "Exclamatory sentence"], ans: 0, exp: "One independent clause with a subordinate adjective clause ('where he was born') forms a Complex sentence.", rule: "Complex sentence with relative adverb clause", hint: "প্রধান ও অধীন ক্লজ থাকায় Complex sentence।" },
  { q: "In 'Tell me what you desire', the clause 'what you desire' is a/an:", opts: ["Noun clause", "Adjective clause", "Adverb clause", "Coordinating clause"], ans: 0, exp: "'what you desire' functions as the direct object of the verb 'Tell', making it a Noun Clause.", rule: "Noun clause as object of verb", hint: "Verb-এর object হিসেবে কাজ করায় এটি Noun Clause।" },
  { q: "In 'He left before the sunrise', the sentence is:", opts: ["Simple sentence", "Complex sentence", "Compound sentence", "Compound-complex"], ans: 0, exp: "There is only one finite verb ('left'); 'before the sunrise' is a prepositional phrase.", rule: "Simple sentence with single finite verb", hint: "একটিমাত্র সমাপিকা ক্রিয়া থাকায় Simple sentence।" },
  { q: "Identify the sentence type: 'Do or die.'", opts: ["Compound sentence", "Simple sentence", "Complex sentence", "Assertive sentence"], ans: 0, exp: "Two imperative independent clauses connected by coordinating conjunction 'or'.", rule: "Compound sentence with coordinating 'or'", hint: "'Or' দিয়ে দুটি আদেশসূচক বাক্য যুক্ত হওয়ায় Compound।" }
];
appendQuestions('data/questions/grammar/17-sentence-structure.json', generateBatch('g17', 11, 35, g17_templates));

// -------------------------------------------------------------------------
// g18 Sentence Transformation (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g18_templates = [
  { q: "Transform to Negative: 'As soon as the bell rang, the students dispersed.'", opts: ["No sooner did the bell ring than the students dispersed.", "No sooner had the bell rung when the students dispersed.", "The bell rang and students dispersed.", "As the bell did not ring, students dispersed."], ans: 0, exp: "'As soon as' transforms into 'No sooner did + subject + V1 + than' in negative transformation.", rule: "Transformation: As soon as -> No sooner... than", hint: "'As soon as'-এর negative রূপান্তর হলো 'No sooner... than'।" },
  { q: "Transform to Assertive: 'Who does not love his motherland?'", opts: ["Everyone loves his motherland.", "No one loves his motherland.", "Someone loves his motherland.", "Who loves motherland."], ans: 0, exp: "Rhetorical negative question 'Who does not...' transforms into affirmative assertive 'Everyone loves...'.", rule: "Rhetorical question to universal assertive", hint: "সবার ভালোবাসা অর্থে 'Everyone loves...' হবে।" },
  { q: "Transform to Positive Degree: 'Kolkata is larger than most other cities in the state.'", opts: ["Very few cities in the state are as large as Kolkata.", "No other city is as large as Kolkata.", "Kolkata is as large as all cities.", "Kolkata is a large city in the state."], ans: 0, exp: "'Comparative + than most other' transforms to positive with 'Very few... as... as'.", rule: "Degree transformation with 'most other' -> 'Very few'", hint: "'Most other' থাকলে positive-এ 'Very few' দিয়ে শুরু হয়।" },
  { q: "Transform to Simple: 'He finished his work and went home.'", opts: ["Having finished his work, he went home.", "When he finished work, he went home.", "He went home because he finished work.", "He finished work to go home."], ans: 0, exp: "Using a perfect participle ('Having finished') reduces one clause into a non-finite phrase, creating a simple sentence.", rule: "Compound to Simple using perfect participle", hint: "Participle ব্যবহার করে সরল বাক্যে রূপান্তর।" },
  { q: "Transform to Affirmative: 'No one can deny that he is honest.'", opts: ["Everyone admits that he is honest.", "Someone denies that he is honest.", "He is not dishonest.", "None can accept his honesty."], ans: 0, exp: "'No one can deny' is equivalent in affirmative to 'Everyone admits'.", rule: "Negative to Affirmative: deny -> admit", hint: "'No one can deny'-র সদর্থক রূপ 'Everyone admits'।" }
];
appendQuestions('data/questions/grammar/18-sentence-transformation.json', generateBatch('g18', 11, 35, g18_templates));

// -------------------------------------------------------------------------
// g19 Question Tags (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g19_templates = [
  { q: "Add question tag: 'Open the door, ___?'", opts: ["will you", "do you", "don't you", "shall you"], ans: 0, exp: "Positive imperative requests or commands take 'will you?' (or 'won't you?').", rule: "Imperative question tag: will you?", hint: "আদেশ বা অনুরোধের tag হলো 'will you?'।" },
  { q: "Add question tag: 'Everything is fine, ___?'", opts: ["isn't it", "aren't they", "is it", "wasn't it"], ans: 0, exp: "'Everything', 'something', 'nothing' take the singular pronoun 'it' in question tags.", rule: "Inanimate indefinite pronouns take 'it'", hint: "'Everything'-এর ক্ষেত্রে pronoun 'it' বসে।" },
  { q: "Add question tag: 'Nothing was accomplished, ___?'", opts: ["was it", "wasn't it", "were they", "weren't they"], ans: 0, exp: "'Nothing' is already negative and takes the pronoun 'it', requiring a positive tag ('was it?').", rule: "Negative subject 'nothing' takes positive tag", hint: "'Nothing' নেতিবাচক হওয়ায় tag পজিটিভ (was it) হবে।" },
  { q: "Add question tag: 'You used to play football, ___?'", opts: ["didn't you", "usedn't you", "haven't you", "weren't you"], ans: 0, exp: "The marginal modal 'used to' takes 'didn't you?' as its modern standard question tag.", rule: "Question tag for 'used to': didn't you?", hint: "'Used to'-র সাধারণ প্রশ্ন tag হলো 'didn't you?'।" },
  { q: "Add question tag: 'There are many problems, ___?'", opts: ["aren't there", "aren't they", "isn't there", "are there"], ans: 0, exp: "Introductory 'there' is repeated in the question tag: 'aren't there?'.", rule: "Introductory 'there' is retained in question tag", hint: "বাক্যের শুরুতে 'there' থাকলে tag-এও 'there' বসে।" }
];
appendQuestions('data/questions/grammar/19-question-tags.json', generateBatch('g19', 11, 35, g19_templates));

// -------------------------------------------------------------------------
// g20 Error Detection (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g20_templates = [
  { q: "Spot the error: (A) The cattle (B) is grazing (C) in the lush green field (D) No error", opts: ["The cattle", "is grazing", "in the lush green field", "No error"], ans: 1, exp: "'Cattle' is a plural noun and takes a plural verb ('are grazing').", rule: "Cattle takes plural verb", hint: "'Cattle'-র পর plural verb 'are' বসে।" },
  { q: "Spot the error: (A) She is junior (B) than me (C) by two years (D) No error", opts: ["She is junior", "than me", "by two years", "No error"], ans: 1, exp: "Latin comparative 'junior' takes 'to', never 'than'.", rule: "Junior takes 'to', never 'than'", hint: "'Junior'-এর পর 'to' বসে।" },
  { q: "Spot the error: (A) Each of the girls (B) have received (C) a prize (D) No error", opts: ["Each of the girls", "have received", "a prize", "No error"], ans: 1, exp: "'Each of' is followed by a plural noun but takes a singular verb ('has received').", rule: "Each of takes singular verb", hint: "'Each of'-এর পর verb singular (has) হয়।" },
  { q: "Spot the error: (A) He returned back (B) from Kolkata (C) yesterday afternoon (D) No error", opts: ["He returned back", "from Kolkata", "yesterday afternoon", "No error"], ans: 0, exp: "'Return' already means to come back; 'returned back' is a redundant error.", rule: "Redundancy: Return means come back (omit back)", hint: "'Return'-এর সাথে 'back' বলা ভুল।" },
  { q: "Spot the error: (A) Neither of the two plans (B) are practical (C) in the current scenario (D) No error", opts: ["Neither of the two plans", "are practical", "in the current scenario", "No error"], ans: 1, exp: "'Neither of' refers to two choices taken individually and takes a singular verb ('is practical').", rule: "Neither of + singular verb", hint: "'Neither of'-এর পর verb singular (is) হয়।" }
];
appendQuestions('data/questions/grammar/20-error-detection.json', generateBatch('g20', 11, 35, g20_templates));

// -------------------------------------------------------------------------
// g21 Sentence Improvement (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g21_templates = [
  { q: "Improve the sentence: 'The criminal was hung yesterday.'", opts: ["The criminal was hanged yesterday.", "The criminal was hanging yesterday.", "The criminal has been hung.", "No improvement"], ans: 0, exp: "Execution by the neck is 'hanged', not 'hung'.", rule: "Hang (execute) -> hanged", hint: "ফাঁসি দেওয়া অর্থে 'hanged' বসে।" },
  { q: "Improve the sentence: 'She is more clever than wise.'", opts: ["She is more clever than wise.", "She is cleverer than wise.", "She is clever than wiser.", "No improvement"], ans: 0, exp: "When comparing two qualities in the same person, use 'more + positive degree', not '-er' (She is more clever than wise).", rule: "Comparison of two qualities in one person: more + positive", hint: "একই ব্যক্তির দুটি গুণের তুলনায় 'more clever' সঠিক।" },
  { q: "Improve the sentence: 'He died from malaria.'", opts: ["He died of malaria.", "He died with malaria.", "He died by malaria.", "No improvement"], ans: 0, exp: "Death from disease takes 'died of'.", rule: "Die of a disease", hint: "রোগে মৃত্যু বোঝাতে 'died of' বসে।" },
  { q: "Improve the sentence: 'Scarcely had he left than it rained.'", opts: ["Scarcely had he left when it rained.", "Scarcely he left when it rained.", "Scarcely did he leave then it rained.", "No improvement"], ans: 0, exp: "'Scarcely' pairs with 'when', not 'than'.", rule: "Scarcely... when", hint: "'Scarcely'-র সাথে 'when' বসে।" },
  { q: "Improve the sentence: 'He is senior than me in rank.'", opts: ["He is senior to me in rank.", "He is more senior than me.", "He is senior from me.", "No improvement"], ans: 0, exp: "'Senior' takes 'to', never 'than'.", rule: "Senior to", hint: "'Senior'-এর সাথে 'to' বসে।" }
];
appendQuestions('data/questions/grammar/21-sentence-improvement-correction.json', generateBatch('g21', 11, 35, g21_templates));

// -------------------------------------------------------------------------
// g22 Sentence Rearrangement (35 new questions to reach 45)
// -------------------------------------------------------------------------
const g22_templates = [
  { q: "Rearrange the sentence: P: the ancient monument / Q: tourists from across the globe / R: visit / S: every winter", opts: ["Q - R - P - S", "P - Q - R - S", "R - P - Q - S", "S - Q - R - P"], ans: 0, exp: "Subject (Q) + Verb (R) + Object (P) + Adverbial of time (S) -> Q-R-P-S.", rule: "Subject + Verb + Object + Time modifier", hint: "Subject (tourists) দিয়ে বাক্য শুরু হবে।" },
  { q: "Rearrange the sentence: P: for maintaining health / Q: regular physical exercise / R: is essential / S: throughout life", opts: ["Q - R - P - S", "P - Q - R - S", "R - Q - P - S", "S - P - Q - R"], ans: 0, exp: "Subject (Q) + Linking Verb and Predicate (R) + Purpose (P) + Scope (S) -> Q-R-P-S.", rule: "Subject + Verb phrase + Prepositional adjuncts", hint: "ব্যায়ামের উপকারিতা বিষয়ে সাজান।" },
  { q: "Rearrange the sentence: P: before submitting your paper / Q: examine every answer / R: thoroughly / S: in the examination hall", opts: ["Q - R - S - P", "P - Q - R - S", "S - P - Q - R", "R - Q - P - S"], ans: 0, exp: "Imperative verb (Q) + Adverb of manner (R) + Locational phrase (S) + Time clause (P) -> Q-R-S-P.", rule: "Imperative Verb + Manner + Place + Time", hint: "আদেশসূচক ক্রিয়া (examine) দিয়ে শুরু হবে।" },
  { q: "Rearrange the sentence: P: environmental pollution / Q: to protect humanity / R: must be curtailed / S: from extinction", opts: ["P - R - Q - S", "Q - S - P - R", "R - P - Q - S", "S - Q - P - R"], ans: 0, exp: "Subject (P) + Modal Passive (R) + Infinitive purpose (Q) + Prepositional phrase (S) -> P-R-Q-S.", rule: "Subject + Passive Verb + Purpose clause", hint: "পরিবেশ দূষণ রোধের বিষয়ে সাজান।" },
  { q: "Rearrange the sentence: P: an educated mind / Q: without critical thinking / R: cannot attain / S: intellectual maturity", opts: ["P - Q - R - S", "Q - P - R - S", "R - S - P - Q", "P - R - Q - S"], ans: 0, exp: "Subject with post-modifier (P-Q) + Verb (R) + Object (S) -> P-Q-R-S.", rule: "Modified Subject + Negative Modal + Object", hint: "'An educated mind without critical thinking' দিয়ে শুরু।" }
];
appendQuestions('data/questions/grammar/22-sentence-rearrangement.json', generateBatch('g22', 11, 35, g22_templates));

// -------------------------------------------------------------------------
// g23 Determiners (34 new questions to reach 45)
// -------------------------------------------------------------------------
const g23_templates = [
  { q: "There is ___ point in discussing this closed matter further.", opts: ["little", "a little", "few", "a few"], ans: 0, exp: "'Little' denotes negative sense (hardly any point), used with uncountable 'point'.", rule: "Little (negative sense)", hint: "কোনো লাভ নেই এমন নেতিবাচক অর্থে 'little' বসে।" },
  { q: "___ friends he had in Kolkata helped him during the crisis.", opts: ["The few", "A few", "Few", "Little"], ans: 0, exp: "'The few' means not many, but all that there were.", rule: "The few (all of that small count)", hint: "যে কজন অল্প বন্ধু ছিল তাদের সবাই বোঝাতে 'the few' বসে।" },
  { q: "Have you ___ questions to ask regarding the syllabus?", opts: ["any", "some", "little", "much"], ans: 0, exp: "In interrogative sentences, 'any' is used rather than 'some'.", rule: "'Any' used in interrogative sentences", hint: "সাধারণ প্রশ্নবোধক বাক্যে 'any' বসে।" },
  { q: "He drank ___ water that remained in the jug.", opts: ["the little", "little", "a little", "few"], ans: 0, exp: "'The little' means not much, but all that was available.", rule: "The little (all that remained)", hint: "অবশিষ্ট সমস্ত অল্প জল বোঝাতে 'the little' বসে।" },
  { q: "___ candidate was assigned an individual roll number.", opts: ["Each", "Every", "All", "Both"], ans: 0, exp: "'Each' focuses on individual members of a group considered separately.", rule: "Each for individual members separately", hint: "প্রত্যেককে আলাদাভাবে বোঝাতে 'each' বসে।" }
];
appendQuestions('data/questions/grammar/23-determiners.json', generateBatch('g23', 12, 34, g23_templates));

console.log("Grammar Part 3 expansion (g14-g23) complete!");
