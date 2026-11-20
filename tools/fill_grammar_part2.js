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
// g06 Noun: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g06_templates = [
  { q: "The ___ of the Himalayas is magnificent.", opts: ["scenery", "sceneries", "scenic", "sceneris"], ans: 0, exp: "'Scenery' is uncountable and has no plural form.", rule: "Uncountable noun: scenery", hint: "Scenery-র কোনো বহুবচন রূপ হয় না।" },
  { q: "He gave me much valuable ___.", opts: ["information", "informations", "informs", "informationes"], ans: 0, exp: "'Information' is an uncountable noun and never takes plural -s.", rule: "Uncountable noun: information", hint: "Information-এর সাথে 's' বসে না।" },
  { q: "All his ___ was lost in transit at the airport.", opts: ["luggage", "luggages", "luggage's", "luggaging"], ans: 0, exp: "'Luggage' and 'baggage' are uncountable nouns.", rule: "Uncountable noun: luggage", hint: "Luggage একটি uncountable noun।" },
  { q: "The police caught the thief red-handed; the police ___ investigating.", opts: ["are", "is", "was", "has been"], ans: 0, exp: "'Police' is a plural noun and takes a plural verb.", rule: "Plural noun: police takes plural verb", hint: "Police সর্বদা plural verb গ্রহণ করে।" },
  { q: "His ___ are grey.", opts: ["hair", "hairs", "hair's", "haire"], ans: 0, exp: "'Hair' considered as a whole is uncountable and singular; when referred to individually it can be counted.", rule: "Hair as mass noun", hint: "মাথার সমস্ত চুল বোঝাতে 'hair' বসে।" },
  { q: "The ___ of the machinery was thoroughly inspected.", opts: ["parts", "part", "parties", "partial"], ans: 0, exp: "'Machinery' is uncountable, but 'parts' is countable.", rule: "Machinery vs parts", hint: "Machinery uncountable।" },
  { q: "Ravi lost five ___ rupee notes.", opts: ["hundred", "hundreds", "hundredth", "hundreds of"], ans: 0, exp: "When a numeral precedes hundred/thousand, no -s is added: 'five hundred rupee notes'.", rule: "Compound numeral adjective takes singular", hint: "নির্দিষ্ট সংখ্যার পর hundred-এ 's' হয় না।" },
  { q: "The ___ of sheep crossed the mountain road.", opts: ["flock", "herd", "pack", "swarm"], ans: 0, exp: "Collective noun for sheep/birds is 'flock'. For cattle it is 'herd'.", rule: "Collective noun: flock of sheep", hint: "ভেড়ার দলকে 'flock' বলে।" },
  { q: "A ___ of wolves was seen roaming the forest.", opts: ["pack", "herd", "flock", "litter"], ans: 0, exp: "Collective noun for wolves and hounds is 'pack'.", rule: "Collective noun: pack of wolves", hint: "নেকড়ের দলকে 'pack' বলে।" },
  { q: "What is the plural of 'Passer-by'?", opts: ["Passers-by", "Passer-bys", "Passers-bys", "Passerby"], ans: 0, exp: "In compound nouns, pluralize the principal noun: 'Passers-by'.", rule: "Plural of compound noun with preposition", hint: "প্রধান শব্দ 'passer'-এ 's' যুক্ত হয়।" }
];
appendQuestions('data/questions/grammar/06-noun.json', generateBatch('g06', 16, 30, g06_templates));

// -------------------------------------------------------------------------
// g07 Pronoun: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g07_templates = [
  { q: "He is a student ___ everyone expects will top the list.", opts: ["who", "whom", "whose", "which"], ans: 0, exp: "'Who' functions as the subject of the clause 'will top the list' (everyone expects is parenthetical).", rule: "Relative pronoun subject: who", hint: "ক্লজের subject হিসেবে 'who' বসে।" },
  { q: "This is the boy ___ the headmaster punished.", opts: ["whom", "who", "whose", "which"], ans: 0, exp: "'Whom' functions as the object of the transitive verb 'punished'.", rule: "Relative pronoun object: whom", hint: "Verb-এর object হিসেবে 'whom' বসে।" },
  { q: "Nobody should boast of ___ own success.", opts: ["one's", "his", "their", "her"], ans: 1, exp: "'Nobody' is masculine singular in formal standard grammar and takes 'his'.", rule: "Indefinite pronoun agreement: nobody -> his", hint: "'Nobody'-র ক্ষেত্রে pronoun হিসেবে 'his' বসে।" },
  { q: "You and ___ are invited to the dinner.", opts: ["I", "me", "myself", "mine"], ans: 0, exp: "The pronoun is part of the compound subject, requiring the subjective case 'I'.", rule: "Subject pronoun case: You and I", hint: "Subject হিসেবে 'I' বসে।" },
  { q: "He availed ___ of the opportunity.", opts: ["himself", "him", "his", "oneself"], ans: 0, exp: "'Avail' takes a reflexive pronoun followed by 'of': 'availed himself of'.", rule: "Transitive verb taking reflexive: avail oneself of", hint: "'Avail'-এর পর reflexive pronoun বসে।" },
  { q: "Neither of the two roads ___ to the railway station.", opts: ["leads", "lead", "leading", "have led"], ans: 0, exp: "'Neither of' refers to two items taken individually and requires a singular verb 'leads'.", rule: "Neither of + singular verb", hint: "'Neither of'-এর পর verb singular হয়।" },
  { q: "These two girls help ___ during difficult times.", opts: ["each other", "one another", "themselves", "oneself"], ans: 0, exp: "'Each other' is used when two persons are referred to.", rule: "Reciprocal pronoun for two: each other", hint: "দুজনের ক্ষেত্রে 'each other' বসে।" },
  { q: "The three sisters love ___ dearly.", opts: ["one another", "each other", "themselves", "oneself"], ans: 0, exp: "'One another' is used for more than two persons.", rule: "Reciprocal pronoun for >2: one another", hint: "দুয়ের বেশির ক্ষেত্রে 'one another' বসে।" },
  { q: "Let ___ who is without fault throw the first stone.", opts: ["him", "he", "his", "himself"], ans: 0, exp: "'Let' takes the objective case pronoun 'him'.", rule: "'Let' takes objective case pronoun", hint: "'Let'-এর পর 'him' বসে।" },
  { q: "This pen is superior to ___.", opts: ["that of mine", "mine", "me", "my"], ans: 1, exp: "Possessive pronoun 'mine' properly substitutes for 'my pen'.", rule: "Possessive pronoun as object of comparison", hint: "'My pen'-এর পরিবর্তে 'mine' বসে।" }
];
appendQuestions('data/questions/grammar/07-pronoun.json', generateBatch('g07', 16, 30, g07_templates));

// -------------------------------------------------------------------------
// g08 Verb: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g08_templates = [
  { q: "The sun had ___ before we commenced our journey.", opts: ["risen", "rose", "raised", "raising"], ans: 0, exp: "Past participle of intransitive 'rise' is 'risen' (rise-rose-risen).", rule: "Intransitive verb rise -> risen", hint: "সূর্য উদিত হওয়া অর্থে 'risen' বসে।" },
  { q: "The teacher ___ an interesting question in the assembly.", opts: ["raised", "rose", "risen", "rising"], ans: 0, exp: "Transitive verb 'raise' (raise-raised-raised) takes a direct object ('a question').", rule: "Transitive verb raise -> raised", hint: "প্রশ্ন তোলা অর্থে 'raised' বসে।" },
  { q: "He has ___ his bag on the reading table.", opts: ["laid", "lain", "lay", "lied"], ans: 0, exp: "Transitive verb 'lay' (to place: lay-laid-laid) takes past participle 'laid'.", rule: "Transitive lay -> laid", hint: "কোনো বস্তু রাখা অর্থে 'laid' বসে।" },
  { q: "The exhausted traveler has ___ in bed all morning.", opts: ["lain", "laid", "lay", "lied"], ans: 0, exp: "Intransitive verb 'lie' (to recline: lie-lay-lain) takes past participle 'lain'.", rule: "Intransitive lie -> lain", hint: "বিশ্রাম নেওয়া অর্থে 'lain' বসে।" },
  { q: "He ___ that he had never seen the documents.", opts: ["lied", "lay", "laid", "lain"], ans: 0, exp: "To tell an untruth is 'lie-lied-lied'.", rule: "Lie (untruth) -> lied", hint: "মিথ্যা কথা বলা অর্থে 'lied' বসে।" },
  { q: "The river has ___ its banks.", opts: ["overflowed", "overflown", "overflew", "overflowing"], ans: 0, exp: "'Overflow' is a regular verb whose past participle is 'overflowed'. ('Overflown' is from fly).", rule: "Overflow -> overflowed (regular verb)", hint: "নদী প্লাবিত হওয়ার ক্ষেত্রে 'overflowed' বসে।" },
  { q: "The bird has ___ away.", opts: ["flown", "flowed", "fled", "flew"], ans: 0, exp: "Past participle of 'fly' is 'flown' (fly-flew-flown).", rule: "Fly -> flown", hint: "পাখির ওড়ার ক্ষেত্রে 'flown' বসে।" },
  { q: "The refugees ___ across the international border.", opts: ["fled", "flew", "flowed", "fleed"], ans: 0, exp: "Past tense of 'flee' (to escape) is 'fled'.", rule: "Flee -> fled", hint: "পলায়ন করা অর্থে 'fled' বসে।" },
  { q: "The bell ___ just as the clock struck ten.", opts: ["rang", "rung", "ringed", "rings"], ans: 0, exp: "Simple past of 'ring' is 'rang' (ring-rang-rung).", rule: "Ring -> rang -> rung", hint: "ঘণ্টা বাজার অতীত রূপ 'rang'।" },
  { q: "The pond was ___ over during the severe winter.", opts: ["frozen", "freezed", "froze", "frosted"], ans: 0, exp: "Past participle of 'freeze' is 'frozen' (freeze-froze-frozen).", rule: "Freeze -> frozen", hint: "জমাট বাঁধা অর্থে 'frozen' বসে।" }
];
appendQuestions('data/questions/grammar/08-verb.json', generateBatch('g08', 16, 30, g08_templates));

// -------------------------------------------------------------------------
// g09 Adjective: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g09_templates = [
  { q: "Health is preferable ___ wealth.", opts: ["to", "than", "more than", "from"], ans: 0, exp: "'Preferable' is inherently comparative and strictly takes the preposition 'to'.", rule: "Preferable takes 'to', never 'than'", hint: "'Preferable'-এর সাথে 'to' বসে।" },
  { q: "He is senior ___ all his colleagues.", opts: ["to", "than", "of", "from"], ans: 0, exp: "Latin comparatives ending in -ior (senior, junior, superior) take 'to'.", rule: "Latin comparative takes 'to'", hint: "'Senior'-এর সাথে 'to' বসে।" },
  { q: "Of the two proposals, the first is the ___.", opts: ["better", "best", "good", "most good"], ans: 0, exp: "When comparing two things, use 'the + comparative degree' ('the better').", rule: "The + comparative degree for two items", hint: "দুটির মধ্যে বোঝাতে 'the better' বসে।" },
  { q: "No other student in the class is as ___ as Amit.", opts: ["intelligent", "more intelligent", "most intelligent", "intelligently"], ans: 0, exp: "Between 'as... as', use the positive degree of the adjective.", rule: "As + positive degree + as", hint: "'As... as'-এর মাঝে positive degree বসে।" },
  { q: "Darjeeling is farther from Kolkata than Burdwan, but have you any ___ information?", opts: ["further", "farther", "farthest", "furthest"], ans: 0, exp: "'Farther' refers to physical distance; 'further' refers to additional/more.", rule: "Farther (distance) vs Further (additional)", hint: "অতিরিক্ত তথ্য বোঝাতে 'further' বসে।" },
  { q: "Who is the ___ boy in the classroom?", opts: ["eldest", "oldest", "elder", "older"], ans: 1, exp: "'Oldest' is used for general age comparisons outside the family; 'eldest' is for family.", rule: "Oldest (general) vs Eldest (family members)", hint: "পারিবারিক সম্পর্কের বাইরে 'oldest' বসে।" },
  { q: "He is the ___ son of the zamindar.", opts: ["eldest", "oldest", "elder", "older"], ans: 0, exp: "'Eldest' is used to denote birth order within a family.", rule: "Eldest for family seniority", hint: "পরিবারের জ্যেষ্ঠ পুত্র বোঝাতে 'eldest' বসে।" },
  { q: "The ___ house on the lane belongs to the postmaster.", opts: ["nearest", "next", "nearer", "nigh"], ans: 0, exp: "'Nearest' denotes physical proximity/distance; 'next' denotes sequence/order.", rule: "Nearest (distance) vs Next (order)", hint: "দূরত্বের দিক থেকে নিকটতম বোঝাতে 'nearest' বসে।" },
  { q: "The ___ chapter deals with Indian governance.", opts: ["next", "nearest", "near", "nigh"], ans: 0, exp: "'Next' denotes ordinal sequence in a book or sequence.", rule: "Next denotes sequence/position", hint: "পরবর্তী অধ্যায় বোঝাতে 'next' বসে।" },
  { q: "This is a ___ case of constitutional violation.", opts: ["clear", "more clear", "most clear", "clearest"], ans: 0, exp: "Simple positive degree modifying the singular noun 'case'.", rule: "Positive degree modifier", hint: "সাধারণ বিশেষণ হিসেবে 'clear' বসে।" }
];
appendQuestions('data/questions/grammar/09-adjective.json', generateBatch('g09', 16, 30, g09_templates));

// -------------------------------------------------------------------------
// g10 Adverb: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g10_templates = [
  { q: "He works ___ from dawn to dusk.", opts: ["hard", "hardly", "hardily", "with hard"], ans: 0, exp: "'Hard' means with great energy; 'hardly' means scarcely/almost not.", rule: "Hard (diligently) vs Hardly (scarcely)", hint: "কঠোর পরিশ্রম অর্থে 'hard' বসে।" },
  { q: "He could ___ hear what the speaker whispered.", opts: ["hardly", "hard", "harshly", "harder"], ans: 0, exp: "'Hardly' means scarcely or almost not at all.", rule: "Hardly as negative restrictive adverb", hint: "প্রায় কিছুই শুনতে না পাওয়া অর্থে 'hardly' বসে।" },
  { q: "The examination hall was ___ quiet.", opts: ["quite", "quiet", "quit", "quiting"], ans: 0, exp: "'Quite' is an adverb of degree meaning completely or fairly.", rule: "Adverb 'quite' (completely)", hint: "পুরোপুরি শান্ত বোঝাতে 'quite' বসে।" },
  { q: "She is ___ intelligent to be deceived by such tricks.", opts: ["too", "very", "much", "so"], ans: 0, exp: "'Too... to' conveys a negative result: too intelligent to be deceived.", rule: "Correlative 'too... to'", hint: "'Too... to' গঠনটি প্রযোজ্য।" },
  { q: "He is rich ___ to purchase a palatial bungalow.", opts: ["enough", "too", "very", "much"], ans: 0, exp: "'Enough' is placed after the adjective it modifies ('rich enough').", rule: "Adjective + enough", hint: "'Enough' adjective-এর পরে বসে।" },
  { q: "Rarely ___ such an honest administrative clerk.", opts: ["have we seen", "we have seen", "we saw", "we had seen"], ans: 0, exp: "When a sentence begins with a restrictive adverb (rarely), inversion occurs.", rule: "Inversion after 'rarely'", hint: "'Rarely'-র পর auxiliary verb আগে বসে।" },
  { q: "Nowhere ___ find such scenic natural beauty.", opts: ["will you", "you will", "you would", "you did"], ans: 0, exp: "Inversion is mandatory after negative place adverb 'nowhere'.", rule: "Inversion after 'nowhere'", hint: "'Nowhere'-এর পর Subject-এর আগে Verb বসে।" },
  { q: "He spoke ___ at the literary gathering.", opts: ["eloquently", "eloquent", "eloquence", "more eloquent"], ans: 0, exp: "The verb 'spoke' requires an adverb of manner ('eloquently').", rule: "Adverb of manner modifying dynamic verb", hint: "কথা বলার ধরন বোঝাতে Adverb বসে।" },
  { q: "The soup smells ___.", opts: ["delicious", "deliciously", "with delicious", "in delicious"], ans: 0, exp: "'Smell' is a linking verb of perception taking an adjective complement, not an adverb.", rule: "Linking verb takes predicate adjective", hint: "ইন্দ্রিয়গ্রাহ্য verb-এর পর Adjective বসে।" },
  { q: "The water was ___ cold for swimming.", opts: ["rather", "fairly", "much", "too much"], ans: 0, exp: "'Rather' is predominantly used before unfavorable/undesirable adjectives ('rather cold').", rule: "Rather with unfavorable adjectives", hint: "অপ্রীতিকর ক্ষেত্রে 'rather' বসে।" }
];
appendQuestions('data/questions/grammar/10-adverb.json', generateBatch('g10', 16, 30, g10_templates));

// -------------------------------------------------------------------------
// g11 Conjunction: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g11_templates = [
  { q: "He had scarcely left the house ___ the thunderstorm erupted.", opts: ["when", "than", "then", "before"], ans: 0, exp: "'Scarcely had... when' is the correct correlative conjunction pair.", rule: "Correlative: Scarcely... when", hint: "'Scarcely'-র সাথে 'when' বসে।" },
  { q: "No sooner did the train arrive ___ the passengers rushed aboard.", opts: ["than", "when", "then", "before"], ans: 0, exp: "'No sooner' has a comparative element and strictly pairs with 'than'.", rule: "Correlative: No sooner... than", hint: "'No sooner'-এর সাথে 'than' বসে।" },
  { q: "Take heed ___ you fall.", opts: ["lest", "unless", "until", "otherwise"], ans: 0, exp: "'Lest' means for fear that, followed by subjunctive or 'should'.", rule: "Conjunction 'lest'", hint: "পাছে কিছু ঘটে সেই ভয়ে বোঝাতে 'lest' বসে।" },
  { q: "Work hard ___ you should fail in the preliminary test.", opts: ["lest", "unless", "until", "if"], ans: 0, exp: "'Lest' pairs with 'should' to indicate negative purpose.", rule: "Lest... should", hint: "'Should' থাকায় 'lest' বসবে।" },
  { q: "He is both a scholar ___ a sportsman.", opts: ["and", "as well as", "or", "also"], ans: 0, exp: "'Both' is paired with 'and' (Both... and).", rule: "Correlative: Both... and", hint: "'Both'-এর সাথে 'and' বসে।" },
  { q: "He was not only fined ___ imprisoned.", opts: ["but also", "and also", "as well as", "along with"], ans: 0, exp: "'Not only' is paired with 'but also'.", rule: "Correlative: Not only... but also", hint: "'Not only'-র সাথে 'but also' বসে।" },
  { q: "Wait here ___ I return.", opts: ["until", "unless", "lest", "while"], ans: 0, exp: "'Until' denotes a point in time up to which.", rule: "Conjunction of time: until", hint: "ফিরে আসার সময় পর্যন্ত বোঝাতে 'until' বসে।" },
  { q: "You cannot enter the hall ___ you show your admit card.", opts: ["unless", "until", "lest", "if"], ans: 0, exp: "'Unless' introduces a condition (if not).", rule: "Conjunction of condition: unless", hint: "শর্ত বোঝাতে 'unless' বসে।" },
  { q: "Although he is rich, ___ he is humble.", opts: ["yet", "but", "so", "and"], ans: 0, exp: "'Although' pairs with 'yet' or a comma, never with 'but'.", rule: "Correlative: Although... yet", hint: "'Although'-এর সাথে 'yet' বসে।" },
  { q: "I doubt ___ he will pass the physical efficiency test.", opts: ["whether", "that", "as", "since"], ans: 0, exp: "Affirmative sentences expressing doubt take 'whether' or 'if', not 'that'.", rule: "Doubt takes whether/if in affirmative", hint: "সন্দেহ প্রকাশে 'whether' বসে।" }
];
appendQuestions('data/questions/grammar/11-conjunction.json', generateBatch('g11', 16, 30, g11_templates));

// -------------------------------------------------------------------------
// g12 Modal Verbs: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g12_templates = [
  { q: "Citizens ___ obey the traffic laws of the state.", opts: ["must", "may", "might", "can"], ans: 0, exp: "'Must' denotes legal compulsion and imperative duty.", rule: "Compulsion: must", hint: "আইন মানার বাধ্যবাধকতা বোঝাতে 'must' বসে।" },
  { q: "You ___ carry an umbrella; the weather forecast predicts sunshine.", opts: ["need not", "must not", "cannot", "ought not"], ans: 0, exp: "'Need not' denotes absence of obligation or necessity.", rule: "Absence of obligation: need not", hint: "প্রয়োজন নেই বোঝাতে 'need not' বসে।" },
  { q: "___ God bless you with prosperity!", opts: ["May", "Can", "Must", "Might"], ans: 0, exp: "Optative wishes and blessings are introduced by 'May'.", rule: "Optative blessing: May", hint: "প্রার্থনা বা আশীর্বাদে 'May' বসে।" },
  { q: "We ___ to help the flood victims in our district.", opts: ["ought", "should", "must", "might"], ans: 0, exp: "'Ought' is followed by 'to' to denote moral duty.", rule: "Moral duty: ought to", hint: "'To' থাকায় 'ought' বসবে।" },
  { q: "He ___ swim across the English Channel when he was thirty.", opts: ["could", "can", "may", "might"], ans: 0, exp: "'Could' denotes physical capability in the past.", rule: "Past ability: could", hint: "অতীতের সামর্থ্য বোঝাতে 'could' বসে।" },
  { q: "I ___ rather starve than beg.", opts: ["would", "should", "could", "might"], ans: 0, exp: "'Would rather... than' expresses a clear preference.", rule: "Preference: would rather", hint: "পছন্দ প্রকাশে 'would rather' বসে।" },
  { q: "You ___ have informed the police immediately after the theft.", opts: ["should", "must", "can", "will"], ans: 0, exp: "'Should have + V3' expresses an unfulfilled past obligation.", rule: "Unfulfilled past duty: should have + V3", hint: "অতীতের উচিত ছিল এমন কর্তব্যে 'should have' বসে।" },
  { q: "The train ___ be arriving at platform three in five minutes.", opts: ["should", "must", "can", "ought"], ans: 0, exp: "'Should' is used to express reasonable expectation/likelihood.", rule: "Reasonable expectation: should", hint: "যুক্তিসঙ্গত প্রত্যাশায় 'should' বসে।" },
  { q: "How ___ you speak so rudely to an elder?", opts: ["dare", "need", "must", "shall"], ans: 0, exp: "'How dare you' expresses righteous indignation or challenge.", rule: "Idiomatic challenge: How dare you", hint: "স্পর্ধা প্রকাশের ক্ষেত্রে 'dare' বসে।" },
  { q: "You ___ not enter without an official pass.", opts: ["must", "need", "may", "ought"], ans: 0, exp: "'Must not' expresses strict negative prohibition.", rule: "Prohibition: must not", hint: "কড়া নিষেধাজ্ঞায় 'must not' বসে।" }
];
appendQuestions('data/questions/grammar/12-modal-verbs.json', generateBatch('g12', 16, 30, g12_templates));

// -------------------------------------------------------------------------
// g13 Active/Passive Voice: 30 new questions (16 to 45)
// -------------------------------------------------------------------------
const g13_templates = [
  { q: "Convert to Passive: 'The magistrate heard the case.'", opts: ["The case was heard by the magistrate.", "The case is heard by the magistrate.", "The case had heard by magistrate.", "The case was being heard."], ans: 0, exp: "Simple past passive: was/were + V3 ('was heard').", rule: "Simple Past Passive", hint: "Simple past-এর passive-এ 'was heard' বসে।" },
  { q: "Convert to Passive: 'The police are interrogating the suspect.'", opts: ["The suspect is being interrogated by the police.", "The suspect was interrogated by police.", "The suspect has been interrogated.", "The suspect is interrogated."], ans: 0, exp: "Present continuous passive: is/are being + V3.", rule: "Present Continuous Passive", hint: "Continuous-এর passive-এ 'being' যুক্ত হয়।" },
  { q: "Convert to Passive: 'Open the gate.'", opts: ["Let the gate be opened.", "The gate must open.", "You open the gate.", "Let open the gate."], ans: 0, exp: "Imperative passive formula: Let + object + be + V3.", rule: "Imperative Passive with 'Let'", hint: "আদেশসূচক বাক্যে 'Let... be opened' হয়।" },
  { q: "Convert to Passive: 'I know him well.'", opts: ["He is known to me well.", "He is known by me well.", "He was known to me.", "He has been known to me."], ans: 0, exp: "'Know' takes the preposition 'to' in passive voice, never 'by'.", rule: "Known takes preposition 'to' in passive", hint: "'Know'-এর passive-এ 'to' বসে, 'by' নয়।" },
  { q: "Convert to Passive: 'Her melodious voice pleased everyone.'", opts: ["Everyone was pleased with her melodious voice.", "Everyone was pleased by her voice.", "Everyone is pleased with voice.", "Everyone was being pleased."], ans: 0, exp: "'Pleased' takes 'with' for qualities and behavior in passive voice.", rule: "Pleased takes 'with' in passive", hint: "'Pleased'-এর passive-এ 'with' বসে।" },
  { q: "Convert to Passive: 'Who taught you English grammar?'", opts: ["By whom were you taught English grammar?", "By whom you were taught grammar?", "Who was taught grammar to you?", "Whom taught you grammar?"], ans: 0, exp: "Interrogative passive: By whom + auxiliary + subject + V3?", rule: "Interrogative passive with 'who'", hint: "'Who' থাকলে 'By whom were you taught...' হয়।" },
  { q: "Convert to Active: 'The letter was delivered by the postman.'", opts: ["The postman delivered the letter.", "The postman delivers the letter.", "The postman has delivered letter.", "The postman had delivered letter."], ans: 0, exp: "'Was delivered' converts back to simple past 'delivered'.", rule: "Passive to Active transformation", hint: "অতীতের active রূপ 'delivered' হবে।" },
  { q: "Convert to Passive: 'They have renovated the heritage building.'", opts: ["The heritage building has been renovated.", "The heritage building was renovated.", "The heritage building had renovated.", "The heritage building is renovated."], ans: 0, exp: "Present perfect passive: has/have been + V3.", rule: "Present Perfect Passive", hint: "Present perfect passive: 'has been renovated'।" },
  { q: "Convert to Passive: 'Do not pluck the flowers.'", opts: ["Let the flowers not be plucked.", "Flowers must not pluck.", "The flowers are not plucked.", "You do not pluck flowers."], ans: 0, exp: "Negative imperative passive: Let + object + not + be + V3.", rule: "Negative Imperative Passive", hint: "নিষেধাজ্ঞায় 'Let the flowers not be plucked' হয়।" },
  { q: "Convert to Passive: 'We must respect our national flag.'", opts: ["Our national flag must be respected.", "Our national flag was respected.", "Our national flag is respected.", "Our national flag must respect."], ans: 0, exp: "Modal passive formula: modal + be + V3 ('must be respected').", rule: "Modal Passive: modal + be + V3", hint: "Modal-এর passive-এ 'must be respected' বসে।" }
];
appendQuestions('data/questions/grammar/13-active-passive-voice.json', generateBatch('g13', 16, 30, g13_templates));

console.log("Grammar Part 2 expansion (g06-g13) complete!");
