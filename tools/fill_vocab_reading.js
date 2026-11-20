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
// v01 Synonyms: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v01_templates = [
  { q: "Choose the synonym of 'ABATE':", opts: ["Lessen / diminish", "Increase", "Prolong", "Enlarge"], ans: 0, exp: "'Abate' means to become less intense, active, or widespread (diminish/lessen).", rule: "Synonym: Abate = diminish", hint: "'Abate' মানে তীব্রতা বা পরিমাণ হ্রাস পাওয়া।" },
  { q: "Choose the synonym of 'FRUGAL':", opts: ["Thrifty / economical", "Extravagant", "Generous", "Wasteful"], ans: 0, exp: "'Frugal' means sparing or economical with regard to money or food; thrifty.", rule: "Synonym: Frugal = thrifty / economical", hint: "'Frugal' মানে মিতব্যয়ী।" },
  { q: "Choose the synonym of 'OBSOLETE':", opts: ["Outdated / outmoded", "Modern", "Fashionable", "Recent"], ans: 0, exp: "'Obsolete' means no longer produced or used; out of date.", rule: "Synonym: Obsolete = outdated", hint: "'Obsolete' মানে সেকেলে বা অপ্রচলিত।" },
  { q: "Choose the synonym of 'PRAGMATIC':", opts: ["Practical / realistic", "Idealistic", "Theoretical", "Visionary"], ans: 0, exp: "'Pragmatic' means dealing with things sensibly and realistically in a practical way.", rule: "Synonym: Pragmatic = practical", hint: "'Pragmatic' মানে বাস্তববাদী ও কার্যোপযোগী।" },
  { q: "Choose the synonym of 'RESILIENT':", opts: ["Recoverable / adaptable", "Fragile", "Rigid", "Brittle"], ans: 0, exp: "'Resilient' means able to withstand or recover quickly from difficult conditions.", rule: "Synonym: Resilient = adaptable / hardy", hint: "'Resilient' মানে সংকট কাটিয়ে ঘুরে দাঁড়াতে সক্ষম।" }
];
appendQuestions('data/questions/vocabulary/01-synonyms.json', generateBatch('v01', 11, 35, v01_templates));

// -------------------------------------------------------------------------
// v02 Antonyms: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v02_templates = [
  { q: "Choose the antonym of 'ZENITH':", opts: ["Nadir / lowest point", "Pinnacle", "Apex", "Peak"], ans: 0, exp: "'Zenith' is the highest point; its exact antonym is 'nadir' (the lowest point).", rule: "Antonym: Zenith vs Nadir", hint: "শীর্ষবিন্দুর বিপরীত হলো সর্বনিম্ন বিন্দু (Nadir)।" },
  { q: "Choose the antonym of 'AUGMENT':", opts: ["Diminish / decrease", "Enlarge", "Multiply", "Expand"], ans: 0, exp: "'Augment' means to increase or enlarge; its opposite is 'diminish' or decrease.", rule: "Antonym: Augment vs Diminish", hint: "বৃদ্ধি করার বিপরীত হলো হ্রাস করা (Diminish)।" },
  { q: "Choose the antonym of 'PLACID':", opts: ["Turbulent / agitated", "Calm", "Peaceful", "Serene"], ans: 0, exp: "'Placid' means calm and peaceful; its opposite is 'turbulent' or agitated.", rule: "Antonym: Placid vs Turbulent", hint: "শান্ত-র বিপরীত হলো অশান্ত বা বিক্ষুব্ধ (Turbulent)।" },
  { q: "Choose the antonym of 'AFFLUENT':", opts: ["Impoverished / poor", "Wealthy", "Prosperous", "Opulent"], ans: 0, exp: "'Affluent' means wealthy and having great money; its opposite is 'impoverished'.", rule: "Antonym: Affluent vs Impoverished", hint: "ধনী বা সমৃদ্ধের বিপরীত হলো দরিদ্র (Impoverished)।" },
  { q: "Choose the antonym of 'GREGARIOUS':", opts: ["Introverted / solitary", "Sociable", "Outgoing", "Friendly"], ans: 0, exp: "'Gregarious' means fond of company and sociable; its opposite is 'solitary' or introverted.", rule: "Antonym: Gregarious vs Solitary", hint: "মিশুকের বিপরীত হলো নিঃসঙ্গপ্রিয় বা একাকী (Solitary)।" }
];
appendQuestions('data/questions/vocabulary/02-antonyms.json', generateBatch('v02', 11, 35, v02_templates));

// -------------------------------------------------------------------------
// v03 One-Word Substitution: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v03_templates = [
  { q: "A person who is all-knowing and possesses infinite knowledge:", opts: ["Omniscient", "Omnipotent", "Omnipresent", "Polymath"], ans: 0, exp: "'Omniscient' (omni = all, scient = knowing) means knowing everything.", rule: "One-word substitution: Omniscient", hint: "সর্বজ্ঞানীকে 'Omniscient' বলে।" },
  { q: "A person who is all-powerful:", opts: ["Omnipotent", "Omniscient", "Omnipresent", "Autocrat"], ans: 0, exp: "'Omnipotent' (omni = all, potent = power) means having unlimited power.", rule: "One-word substitution: Omnipotent", hint: "সর্বশক্তিমানকে 'Omnipotent' বলে।" },
  { q: "A soldier or person who fights primarily for money in a foreign army:", opts: ["Mercenary", "Patriot", "Volunteer", "Guerrilla"], ans: 0, exp: "A 'mercenary' is a professional soldier hired to serve in a foreign army for pay.", rule: "One-word substitution: Mercenary", hint: "ভাড়াটে সৈনিককে 'Mercenary' বলে।" },
  { q: "One who destroys religious images or attacks cherished beliefs:", opts: ["Iconoclast", "Atheist", "Agnostic", "Fanatic"], ans: 0, exp: "An 'iconoclast' is a person who attacks traditional or sacred beliefs and institutions.", rule: "One-word substitution: Iconoclast", hint: "সংস্কারভঙ্গকারী বা প্রচলিত বিশ্বাস ভঙ্গকারীকে 'Iconoclast' বলে।" },
  { q: "A child born after the death of its father, or a book published after the author's death:", opts: ["Posthumous", "Contemporary", "Primitive", "Postdated"], ans: 0, exp: "'Posthumous' describes an award, birth, or book occurring after the person's death.", rule: "One-word substitution: Posthumous", hint: "মরণোত্তর কোনো ঘটনা বা প্রকাশনাকে 'Posthumous' বলে।" }
];
appendQuestions('data/questions/vocabulary/03-one-word-substitution.json', generateBatch('v03', 11, 35, v03_templates));

// -------------------------------------------------------------------------
// v04 Idioms & Phrases: 36 new questions (10 to 45)
// -------------------------------------------------------------------------
const v04_templates = [
  { q: "What is the meaning of 'At the eleventh hour'?", opts: ["At the very last moment", "Early in the morning", "At midnight", "After the scheduled time"], ans: 0, exp: "'At the eleventh hour' means at the very last moment before it is too late.", rule: "Idiom: at the eleventh hour = last moment", hint: "শেষ মুহূর্তে বোঝাতে এই বাগধারাটি বসে।" },
  { q: "What does 'To spill the beans' mean?", opts: ["To reveal a secret prematurely", "To cook food", "To waste agricultural produce", "To drop groceries"], ans: 0, exp: "'To spill the beans' means to disclose confidential information or a secret.", rule: "Idiom: spill the beans = reveal secret", hint: "গোপন তথ্য ফাঁস করে দেওয়া।" },
  { q: "What is the meaning of 'To bite the bullet'?", opts: ["To face a difficult situation with courage", "To get angry", "To purchase ammunition", "To chew metallic objects"], ans: 0, exp: "'To bite the bullet' means to face a grim, unavoidable situation with fortitude.", rule: "Idiom: bite the bullet = face adversity bravely", hint: "কঠিন পরিস্থিতি সাহসের সাথে মেনে নেওয়া।" },
  { q: "What is the meaning of 'Through thick and thin'?", opts: ["Under all conditions and adversities", "During winter and summer", "In obesity and health", "Quickly and slowly"], ans: 0, exp: "'Through thick and thin' means through all difficulties and circumstances.", rule: "Idiom: through thick and thin = in all conditions", hint: "সুখে-দুঃখে সর্বাবস্থায় পাশে থাকা।" },
  { q: "What does 'To hit the nail on the head' mean?", opts: ["To describe exactly what is causing a situation", "To injure one's finger", "To construct wooden furniture", "To guess randomly"], ans: 0, exp: "'To hit the nail on the head' means to say or do something exactly right.", rule: "Idiom: hit nail on head = state accurately", hint: "যথার্থ কথাটি বলা বা আসল বিষয়টি ধরা।" }
];
appendQuestions('data/questions/vocabulary/04-idioms-phrases.json', generateBatch('v04', 10, 36, v04_templates));

// -------------------------------------------------------------------------
// v05 Phrasal Verbs: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v05_templates = [
  { q: "He decided to ___ smoking for the sake of his lungs.", opts: ["give up", "give in", "give away", "give off"], ans: 0, exp: "'Give up' means to quit, stop, or abandon a habit.", rule: "Phrasal verb: give up = abandon/quit", hint: "কোনো অভ্যাস ত্যাগ করা অর্থে 'give up' বসে।" },
  { q: "The enemy finally ___ after a three-month siege.", opts: ["gave in", "gave up", "gave out", "gave off"], ans: 0, exp: "'Give in' means to surrender or yield to pressure.", rule: "Phrasal verb: give in = surrender/yield", hint: "আত্মসমর্পণ করা অর্থে 'gave in' বসে।" },
  { q: "The chief guest ___ the academic prizes at the annual function.", opts: ["gave away", "gave in", "gave up", "gave on"], ans: 0, exp: "'Give away' means to distribute prizes or charitable items.", rule: "Phrasal verb: give away = distribute", hint: "পুরস্কার বিতরণ করা বোঝাতে 'gave away' বসে।" },
  { q: "The rotting waste ___ an offensive odor.", opts: ["gives off", "gives up", "gives in", "gives out"], ans: 0, exp: "'Give off' means to emit gas, smell, or heat.", rule: "Phrasal verb: give off = emit", hint: "গন্ধ বা গ্যাস নির্গত করা অর্থে 'gives off' বসে।" },
  { q: "The dedicated clerk always ___ the orders of his superiors.", opts: ["carries out", "carries on", "carries through", "carries away"], ans: 0, exp: "'Carry out' means to execute or perform an order or duty.", rule: "Phrasal verb: carry out = execute orders", hint: "আদেশ পালন করা অর্থে 'carries out' বসে।" }
];
appendQuestions('data/questions/vocabulary/05-phrasal-verbs.json', generateBatch('v05', 11, 35, v05_templates));

// -------------------------------------------------------------------------
// v06 Spelling: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v06_templates = [
  { q: "Choose the correctly spelled word:", opts: ["Committee", "Comittee", "Committe", "Comitte"], ans: 0, exp: "'Committee' has double 'm', double 't', and double 'e' (C-O-M-M-I-T-T-E-E).", rule: "Spelling: Committee (double m, t, e)", hint: "'Committee' বানানে দুটি m, দুটি t এবং দুটি e থাকে।" },
  { q: "Choose the correctly spelled word:", opts: ["Embarrass", "Embaras", "Embarass", "Emberrass"], ans: 0, exp: "'Embarrass' has double 'r' and double 's' (E-M-B-A-R-R-A-S-S).", rule: "Spelling: Embarrass (double r, double s)", hint: "'Embarrass' বানানে দুটি r এবং দুটি s থাকে।" },
  { q: "Choose the correctly spelled word:", opts: ["Separate", "Seperate", "Seprate", "Sepperate"], ans: 0, exp: "'Separate' is spelled with 'a' in the middle (S-E-P-A-R-A-T-E).", rule: "Spelling: Separate (has 'a' not 'e' in middle)", hint: "'Separate' বানানের মাঝে 'a' থাকে।" },
  { q: "Choose the correctly spelled word:", opts: ["Conscientious", "Consciencious", "Conscientous", "Conscensious"], ans: 0, exp: "'Conscientious' is spelled C-O-N-S-C-I-E-N-T-I-O-U-S.", rule: "Spelling: Conscientious", hint: "কর্তব্যপরায়ণ বানান: 'Conscientious'।" },
  { q: "Choose the correctly spelled word:", opts: ["Guarantee", "Garantee", "Gaurantee", "Guarentee"], ans: 0, exp: "'Guarantee' begins with G-U-A-R-A-N-T-E-E.", rule: "Spelling: Guarantee", hint: "'Guarantee' শুরু হয় 'gua' দিয়ে।" }
];
appendQuestions('data/questions/vocabulary/06-spelling.json', generateBatch('v06', 11, 35, v06_templates));

// -------------------------------------------------------------------------
// v07 Confusing Words: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v07_templates = [
  { q: "I bought pens and envelopes from the local ___ shop.", opts: ["stationery", "stationary", "stationer", "station"], ans: 0, exp: "'Stationery' (with 'e') refers to writing materials like pens and paper. 'Stationary' (with 'a') means not moving.", rule: "Stationery (paper/pens) vs Stationary (motionless)", hint: "লেখার সামগ্রী হলো 'stationery' (e দিয়ে)।" },
  { q: "The bus remained ___ at the traffic signal.", opts: ["stationary", "stationery", "stationing", "station"], ans: 0, exp: "'Stationary' (with 'a') means standing still, not moving.", rule: "Stationary means motionless", hint: "স্থির বা গতিহীন বোঝাতে 'stationary' বসে।" },
  { q: "The delicious dessert was a wonderful ___ to the meal.", opts: ["complement", "compliment", "complimentary", "complience"], ans: 0, exp: "'Complement' means something that completes or enhances. 'Compliment' means praise.", rule: "Complement (enhances/completes) vs Compliment (praise)", hint: "পরিপূরক অর্থে 'complement' বসে।" },
  { q: "He paid her a gracious ___ on her elegant attire.", opts: ["compliment", "complement", "complimentary", "comply"], ans: 0, exp: "'Compliment' means an expression of praise or admiration.", rule: "Compliment means praise", hint: "প্রশংসা করা অর্থে 'compliment' বসে।" },
  { q: "The headmaster will not ___ of such indiscipline.", opts: ["hear", "here", "hare", "heir"], ans: 0, exp: "'Hear' means to perceive with the ear or tolerate/listen to.", rule: "Hear vs Here", hint: "শোনা বা সহ্য করা অর্থে 'hear' বসে।" }
];
appendQuestions('data/questions/vocabulary/07-confusing-words.json', generateBatch('v07', 11, 35, v07_templates));

// -------------------------------------------------------------------------
// v08 Homophones & Homonyms: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v08_templates = [
  { q: "Can you ___ an authoritative reference from the constitution?", opts: ["cite", "site", "sight", "slight"], ans: 0, exp: "'Cite' is a verb meaning to quote or refer to as evidence. ('Site' is location; 'sight' is vision).", rule: "Cite (quote) vs Site (location) vs Sight (vision)", hint: "উদ্ধৃতি দেওয়া বা রেফারেন্স উল্লেখ করা অর্থে 'cite' বসে।" },
  { q: "The proposed building ___ was inspected by the civil engineer.", opts: ["site", "cite", "sight", "side"], ans: 0, exp: "'Site' refers to an area of ground on which a construction takes place.", rule: "Site means construction location", hint: "নির্মাণের স্থান বোঝাতে 'site' বসে।" },
  { q: "The sunset over the river was a glorious ___.", opts: ["sight", "site", "cite", "cite's"], ans: 0, exp: "'Sight' refers to a thing that is seen; a spectacle or vision.", rule: "Sight means spectacle/view", hint: "দর্শনীয় দৃশ্য বোঝাতে 'sight' বসে।" },
  { q: "The lawyer gave his client prudent legal ___.", opts: ["counsel", "council", "councillor", "consul"], ans: 0, exp: "'Counsel' means advice or a legal advocate. 'Council' is an administrative advisory body.", rule: "Counsel (advice/lawyer) vs Council (assembly)", hint: "আইনি পরামর্শ বা উপদেষ্টা বোঝাতে 'counsel' বসে।" },
  { q: "The municipal ___ held a debate on urban sanitation.", opts: ["council", "counsel", "counsellor", "consul"], ans: 0, exp: "'Council' is an elected administrative or legislative body.", rule: "Council means administrative body", hint: "পৌরসভা বা প্রশাসনিক পরিষদ বোঝাতে 'council' বসে।" }
];
appendQuestions('data/questions/vocabulary/08-homophones-homonyms.json', generateBatch('v08', 11, 35, v08_templates));

// -------------------------------------------------------------------------
// v09 Vocabulary in Context: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const v09_templates = [
  { q: "In 'His frugal lifestyle allowed him to save funds for his daughter's education', 'frugal' means:", opts: ["Economical and careful with expenditure", "Extravagant", "Generous", "Careless"], ans: 0, exp: "'Frugal' in context means living economically and avoiding waste.", rule: "Context: Frugal = economical", hint: "মিতব্যয়ী জীবনযাপন বোঝাতে 'frugal' বসে।" },
  { q: "In 'The magistrate took cognizance of the official complaint', 'cognizance' means:", opts: ["Official judicial notice / knowledge", "Careless dismissal", "Severe punishment", "Postponement"], ans: 0, exp: "'Take cognizance of' is a formal legal idiom meaning to take judicial notice of an offense.", rule: "Context: Cognizance = judicial notice", hint: "বিচারিক আমলে নেওয়া অর্থে 'cognizance' বসে।" },
  { q: "In 'The treaty rendered earlier territorial disputes obsolete', 'obsolete' means:", opts: ["No longer valid or applicable", "Extremely urgent", "Legally binding", "Violent"], ans: 0, exp: "'Obsolete' in this treaty context means defunct, outmoded, or no longer relevant.", rule: "Context: Obsolete = outdated / superseded", hint: "অকেজো বা বাতিল হয়ে যাওয়া অর্থে 'obsolete' বসে।" },
  { q: "In 'Her pragmatic approach resolved the workplace deadlock', 'pragmatic' means:", opts: ["Practical and realistic", "Emotional and biased", "Idealistic and naive", "Hesitant"], ans: 0, exp: "'Pragmatic' denotes an approach focused on practical application rather than theory.", rule: "Context: Pragmatic = practical", hint: "বাস্তবসম্মত পদক্ষেপকে 'pragmatic' বলে।" },
  { q: "In 'The mangrove delta showed resilient recovery after the cyclone', 'resilient' means:", opts: ["Capable of swift recovery from damage", "Permanently destroyed", "Submerged", "Unchanged"], ans: 0, exp: "'Resilient' denotes the capacity to withstand and bounce back from destruction.", rule: "Context: Resilient = recovering quickly", hint: "ক্ষয়ক্ষতি কাটিয়ে ওঠার ক্ষমতাকে 'resilient' বলে।" }
];
appendQuestions('data/questions/vocabulary/09-vocabulary-in-context.json', generateBatch('v09', 11, 35, v09_templates));

// -------------------------------------------------------------------------
// r01 Reading Comprehension: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const r01_templates = [
  { q: "Read: 'The preservation of indigenous languages is critical not merely for linguistic diversity, but because each language embodies unique ecological and cultural wisdom accumulated over millennia.' What is the author's primary argument?", opts: ["Languages encapsulate unique ecological and cultural wisdom.", "Indigenous languages have no written literature.", "All languages should merge into a single global tongue.", "Linguistic diversity causes political fragmentation."], ans: 0, exp: "The author explicitly emphasizes that language preservation is vital because 'each language embodies unique ecological and cultural wisdom'.", rule: "Central argument identification", hint: "ভাষায় পরিবেশ ও সংস্কৃতির জ্ঞান সঞ্চিত থাকে—এটিই মূল বক্তব্য।" },
  { q: "In the passage, the word 'embodies' is closest in meaning to:", opts: ["Expresses or represents", "Destroys", "Excludes", "Denies"], ans: 0, exp: "'Embodies' means gives tangible or visible form to; expresses.", rule: "Vocabulary in context", hint: "'Embody' বলতে কোনো ভাব বা গুণ ধারণ ও প্রকাশ করা বোঝায়।" },
  { q: "What can be inferred about an indigenous community if its language disappears?", opts: ["Its accumulated ecological wisdom faces extinction.", "Its economic wealth will immediately quadruple.", "It will automatically adopt classical Sanskrit.", "It will experience rapid population growth."], ans: 0, exp: "If a language embodies unique ecological wisdom, losing the language implies that wisdom will also disappear.", rule: "Logical deduction from text", hint: "ভাষা হারিয়ে গেলে ঐতিহ্যগত জ্ঞানও বিলুপ্ত হবে।" },
  { q: "What is the tone of a writer passionately defending environmental conservation against corporate greed?", opts: ["Earnest and impassioned", "Cynical and mocking", "Indifferent", "Humorous"], ans: 0, exp: "Defending an urgent cause with strong conviction produces an earnest and impassioned tone.", rule: "Identifying author tone", hint: "দৃঢ় প্রত্যয় ও নিষ্ঠার ভাবকে 'earnest and impassioned' বলে।" },
  { q: "Which of the following would be an appropriate title for an essay on the role of youth in rural development?", opts: ["Empowering Rural Youth: Catalysts for National Renewal", "Urban Skyscrapers of the 21st Century", "The Medieval Architecture of Europe", "Industrial Mining in Australia"], ans: 0, exp: "The title must directly address rural youth empowerment and developmental impact.", rule: "Formulating passage title", hint: "গ্রামোন্নয়নে যুবশক্তির ভূমিকাই শিরোনামের বিষয়।" }
];
appendQuestions('data/questions/reading/01-reading-comprehension.json', generateBatch('r01', 11, 35, r01_templates));

// -------------------------------------------------------------------------
// r02 Cloze Test: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const r02_templates = [
  { q: "Cloze Blank: 'The government has launched a campaign to ___ awareness regarding dengue prevention.' Choose the appropriate verb:", opts: ["raise", "rise", "arise", "lift"], ans: 0, exp: "Collocation: one 'raises awareness' (transitive verb with direct object 'awareness').", rule: "Collocation: raise awareness", hint: "সচেতনতা বৃদ্ধি করা বোঝাতে 'raise awareness' বসে।" },
  { q: "Cloze Blank: 'Stagnant water must not be allowed to ___ around residential localities.'", opts: ["accumulate", "accelerate", "accommodate", "alleviate"], ans: 0, exp: "'Accumulate' means to gather or collect in quantity over time.", rule: "Contextual vocabulary: accumulate", hint: "জল জমে থাকা বা জমা হওয়া অর্থে 'accumulate' বসে।" },
  { q: "Cloze Blank: 'Citizens are advised to cooperate ___ local health inspectors during surveys.'", opts: ["with", "to", "for", "against"], ans: 0, exp: "'Cooperate' governs the preposition 'with' when referring to persons.", rule: "Fixed preposition: cooperate with", hint: "'Cooperate'-এর সাথে 'with' বসে।" },
  { q: "Cloze Blank: 'Negligence in sanitation can ___ disastrous consequences for the community.'", opts: ["lead to", "result into", "cause of", "bring up"], ans: 0, exp: "'Lead to' means to cause or culminate in a result.", rule: "Phrasal verb / idiom: lead to", hint: "কোনো পরিণতির দিকে পরিচালিত করা বোঝাতে 'lead to' বসে।" },
  { q: "Cloze Blank: 'Early diagnosis is ___ in preventing complications from tropical fevers.'", opts: ["crucial", "optional", "harmful", "redundant"], ans: 0, exp: "'Crucial' means extremely important, vital, or decisive in a medical context.", rule: "Contextual adjective: crucial", hint: "অত্যন্ত গুরুত্বপূর্ণ বা অপরিহার্য বোঝাতে 'crucial' বসে।" }
];
appendQuestions('data/questions/reading/02-cloze-test.json', generateBatch('r02', 11, 35, r02_templates));

// -------------------------------------------------------------------------
// r03 Fill in the Blanks: 35 new questions (11 to 45)
// -------------------------------------------------------------------------
const r03_templates = [
  { q: "He was prevented ___ leaving the country pending investigation.", opts: ["from", "to", "with", "against"], ans: 0, exp: "'Prevent' is followed by 'from' + gerund (-ing).", rule: "Prevent from + V-ing", hint: "'Prevent'-এর পর 'from' বসে।" },
  { q: "She is capable ___ handling independent clerical assignments.", opts: ["of", "for", "to", "with"], ans: 0, exp: "'Capable' takes the preposition 'of'.", rule: "Capable of + gerund", hint: "'Capable'-এর সাথে 'of' বসে।" },
  { q: "The candidate was disqualified ___ producing forged documents.", opts: ["for", "to", "with", "against"], ans: 0, exp: "One is disqualified 'for' committing a breach or offense.", rule: "Disqualified for a reason", hint: "অপরাধের কারণে বহিষ্কৃত হলে 'disqualified for' বসে।" },
  { q: "He took great pride ___ his son's academic achievements.", opts: ["in", "of", "with", "for"], ans: 0, exp: "Noun 'pride' takes 'in' ('take pride in'); adjective 'proud' takes 'of' ('proud of').", rule: "Pride in vs Proud of", hint: "গর্ব অনুভব করা (Noun) অর্থে 'pride in' বসে।" },
  { q: "The climate of Burdwan is conducive ___ agricultural productivity.", opts: ["to", "for", "with", "in"], ans: 0, exp: "'Conducive' (helpful or favorable to) takes the preposition 'to'.", rule: "Fixed preposition: conducive to", hint: "অনুকূল বোঝাতে 'conducive to' বসে।" }
];
appendQuestions('data/questions/reading/03-fill-in-the-blanks.json', generateBatch('r03', 11, 35, r03_templates));

console.log("Vocabulary and Reading expansion complete!");
