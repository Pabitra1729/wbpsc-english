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

// --------------------------------------------------------------------------
// g01 Parts of Speech (Add 25 to reach 45)
// --------------------------------------------------------------------------
const g01_new = [];
const g01_data = [
  ["He arrived shortly after the meeting began.", "after", ["Preposition", "Conjunction", "Adverb", "Adjective"], 1, "'After' connects two clauses ('He arrived shortly' and 'the meeting began'), functioning as a subordinating conjunction.", "Conjunction connecting clauses", "দুটি clause যুক্ত করায় এটি Conjunction।"],
  ["She walked down the street.", "down", ["Preposition", "Adverb", "Verb", "Noun"], 0, "'Down' shows the relationship between the verb walked and the noun street, functioning as a preposition.", "Preposition showing direction", "রাস্তার দিকে গতি বোঝাতে Preposition হিসেবে ব্যবহৃত।"],
  ["The price of gold has gone down.", "down", ["Preposition", "Adverb", "Adjective", "Noun"], 1, "'Down' modifies the phrasal verb 'has gone', acting as an adverb of direction.", "Adverb modifying verb", "ক্রিয়াকে বিশেষিত করায় এটি Adverb।"],
  ["He is an early riser.", "early", ["Adverb", "Adjective", "Noun", "Pronoun"], 1, "'Early' modifies the noun 'riser', functioning as an attributive adjective.", "Adjective modifying noun", "'Riser' noun-টিকে qualify করায় এটি Adjective।"],
  ["He woke up early.", "early", ["Adverb", "Adjective", "Preposition", "Conjunction"], 0, "'Early' answers when he woke up, functioning as an adverb of time modifying 'woke up'.", "Adverb of time", "কখন উঠেছে বোঝাতে এটি Adverb।"],
  ["Still waters run deep.", "Still", ["Adverb", "Adjective", "Noun", "Conjunction"], 1, "'Still' modifies the plural noun 'waters', meaning calm/motionless.", "Adjective describing noun", "'Waters' noun-টিকে qualify করায় এটি Adjective।"],
  ["He still lives in that village.", "still", ["Adverb", "Adjective", "Preposition", "Verb"], 0, "'Still' modifies the verb 'lives', meaning continuing up to the present.", "Adverb of time/continuity", "বসবাস অব্যাহত থাকা বোঝাতে Adverb।"],
  ["All men are mortal.", "All", ["Pronoun", "Adjective", "Adverb", "Noun"], 1, "'All' modifies the noun 'men', acting as an adjective of quantity/number.", "Adjective of quantity", "'Men' noun-এর সংখ্যা বোঝাতে Adjective।"],
  ["All of us were delighted.", "All", ["Pronoun", "Adjective", "Adverb", "Conjunction"], 0, "'All' functions as the subject pronoun of the prepositional phrase.", "Indefinite Pronoun", "Subject হিসেবে বসায় Pronoun।"],
  ["He was all alone in the room.", "all", ["Adverb", "Adjective", "Pronoun", "Preposition"], 0, "'All' modifies the adjective 'alone', meaning completely/entirely.", "Adverb modifying adjective", "'Alone' adjective-কে qualify করায় Adverb।"],
  ["He ran fast.", "fast", ["Adjective", "Adverb", "Verb", "Noun"], 1, "'Fast' describes how he ran, acting as an adverb of manner.", "Adverb of manner", "দৌড়ানোর ধরন বোঝাতে Adverb।"],
  ["This is a fast train.", "fast", ["Adjective", "Adverb", "Noun", "Verb"], 0, "'Fast' modifies the noun 'train', acting as an adjective.", "Adjective qualifying noun", "'Train' noun-টিকে qualify করায় Adjective।"],
  ["He kept a fast on Monday.", "fast", ["Noun", "Verb", "Adjective", "Adverb"], 0, "'Fast' is preceded by an article ('a fast') and acts as a naming word.", "Noun as naming word", "উপবাস বা রোজা অর্থে Noun।"],
  ["They fast twice a week.", "fast", ["Verb", "Noun", "Adjective", "Adverb"], 0, "'Fast' denotes the action of abstaining from food.", "Action Verb", "উপবাস পালন করার কাজ বোঝাতে Verb।"],
  ["There is much truth in what he said.", "much", ["Adjective", "Adverb", "Noun", "Pronoun"], 0, "'Much' modifies the uncountable abstract noun 'truth'.", "Adjective of quantity", "'Truth' uncountable noun-কে qualify করায় Adjective।"],
  ["He was much distressed by the news.", "much", ["Adverb", "Adjective", "Preposition", "Conjunction"], 0, "'Much' modifies the participial adjective 'distressed'.", "Adverb modifying participle", "'Distressed' participle-কে qualify করায় Adverb।"],
  ["This is the best book on the subject.", "best", ["Adjective", "Adverb", "Noun", "Verb"], 0, "'Best' is the superlative degree adjective modifying 'book'.", "Superlative Adjective", "বইয়ের গুণ প্রকাশ করায় Adjective।"],
  ["He did his best.", "best", ["Noun", "Adjective", "Adverb", "Pronoun"], 0, "'Best' acts as a noun (direct object of 'did') preceded by possessive 'his'.", "Noun as direct object", "সর্বোচ্চ প্রচেষ্টা অর্থে Noun।"],
  ["I like him best.", "best", ["Adverb", "Adjective", "Noun", "Verb"], 0, "'Best' modifies the verb 'like', acting as an adverb of degree.", "Adverb of degree", "পছন্দের মাত্রা বোঝাতে Adverb।"],
  ["The up train is late.", "up", ["Adjective", "Adverb", "Preposition", "Noun"], 0, "'Up' modifies the noun 'train', functioning as an adjective.", "Adjective modifying noun", "ট্রেনের দিক নির্দেশ করায় Adjective।"],
  ["He looked up at the sky.", "up", ["Adverb", "Preposition", "Adjective", "Conjunction"], 0, "'Up' indicates the direction of looking, modifying the verb 'looked'.", "Adverb of direction", "তাকানোর দিক বোঝাতে Adverb।"],
  ["He climbed up the tree.", "up", ["Preposition", "Adverb", "Noun", "Verb"], 0, "'Up' connects the verb climbed to the noun object 'the tree'.", "Preposition governing object", "গাছে ওঠার সম্পর্ক বোঝাতে Preposition।"],
  ["Every 'why' has a 'wherefore'.", "why", ["Noun", "Adverb", "Conjunction", "Pronoun"], 0, "'Why' is enclosed in quotes and preceded by determiner 'Every', functioning as a noun.", "Noun in specialized context", "'কারণ' অর্থে Noun হিসেবে ব্যবহৃত।"],
  ["He gave a round table to the library.", "round", ["Adjective", "Noun", "Preposition", "Adverb"], 0, "'Round' describes the shape of the table.", "Adjective of shape", "টেবিলের আকার বোঝাতে Adjective।"],
  ["The earth moves round the sun.", "round", ["Preposition", "Adverb", "Adjective", "Verb"], 0, "'Round' governs the noun phrase 'the sun', functioning as a preposition.", "Preposition of movement", "চারপাশে ঘোরা বোঝাতে Preposition।"]
];
g01_data.forEach((item, idx) => {
  g01_new.push({
    id: `g01-${String(idx + 21).padStart(3, '0')}`,
    chapter: "g01",
    type: "mcq",
    difficulty: idx % 3 === 0 ? "hard" : (idx % 2 === 0 ? "medium" : "easy"),
    isPYQ: false,
    question: `In '${item[0]}', what part of speech is the word '${item[1]}'?`,
    options: item[2],
    answer: item[3],
    explanation: item[4],
    rule: item[5],
    bengaliHint: item[6]
  });
});
appendQuestions('data/questions/grammar/01-parts-of-speech.json', g01_new);

// --------------------------------------------------------------------------
// g02 Tenses (Add 25 to reach 45)
// --------------------------------------------------------------------------
const g02_new = [];
const g02_data = [
  ["I ___ him since last Monday.", ["have not seen", "did not see", "had not seen", "do not see"], 0, "'Since' with point of time indicates an action continuing to the present, requiring Present Perfect.", "Present Perfect with 'since'", "নির্দিষ্ট সময় থেকে আজ পর্যন্ত বোঝাতে Present Perfect বসে।"],
  ["He ___ to the office five minutes ago.", ["went", "has gone", "had gone", "was going"], 0, "'Ago' is a definite past time marker requiring Simple Past tense.", "Simple Past with 'ago'", "'Ago' থাকলে সর্বদা Simple Past বসে।"],
  ["By next December, we ___ in this city for ten years.", ["will live", "will have lived", "are living", "have lived"], 1, "'By + future time' combined with duration ('for ten years') requires Future Perfect tense.", "Future Perfect with 'by + future time'", "ভবিষ্যতে কোনো নির্দিষ্ট সময়ে কাজ সম্পন্ন হওয়া বোঝাতে Future Perfect বসে।"],
  ["The patient had died before the doctor ___.", ["arrived", "had arrived", "arriving", "arrives"], 0, "In past perfect sentences with 'before', the earlier action takes Past Perfect and the later action takes Simple Past.", "Past Perfect with 'before' + Simple Past", "'Before'-এর পরের অংশে Simple Past বসে।"],
  ["The train had left after he ___ at the station.", ["reached", "had reached", "reaches", "was reaching"], 1, "With 'after', the earlier action (which happened first) takes Past Perfect.", "Past Perfect with 'after'", "'After'-এর পরের কাজটি আগে হওয়ায় Past Perfect হয়।"],
  ["She ___ for three hours when her brother finally arrived.", ["had been waiting", "has been waiting", "was waiting", "waited"], 0, "An action continuing in the past up to another past action requires Past Perfect Continuous.", "Past Perfect Continuous with 'when + past'", "অতীতের দুটি ঘটনার মধ্যে দীর্ঘতর চলমান কাজে Past Perfect Continuous বসে।"],
  ["Water ___ at 100 degrees Celsius.", ["boils", "is boiling", "boiled", "will boil"], 0, "Universal scientific truths are stated strictly in Simple Present tense.", "Simple Present for scientific facts", "চিরন্তন সত্য সর্বদা Simple Present হয়।"],
  ["Look! The children ___ in the rain.", ["dance", "are dancing", "danced", "have danced"], 1, "'Look!' indicates an action occurring right at the moment of speech, requiring Present Continuous.", "Present Continuous for action happening now", "বর্তমান মুহূর্তে চলমান কাজে Present Continuous বসে।"],
  ["I ___ my graduation in 2018.", ["completed", "have completed", "had completed", "was completing"], 0, "A specific past year ('in 2018') requires Simple Past tense, not Present Perfect.", "Simple Past with past year marker", "অতীতের নির্দিষ্ট সাল উল্লেখ থাকলে Simple Past বসে।"],
  ["When I reached his house, he ___ breakfast.", ["was having", "had", "has had", "is having"], 0, "An interrupted past activity takes Past Continuous ('was having') when another action occurred.", "Past Continuous for background action", "অতীতের চলমান পটভূমি বোঝাতে Past Continuous বসে।"],
  ["He thanked me for what I ___ for him.", ["did", "had done", "have done", "was doing"], 1, "The act of helping happened before the act of thanking, requiring Past Perfect.", "Past Perfect for earlier past event", "ধন্যবাদ দেওয়ার পূর্বেই সাহায্য করায় Past Perfect বসে।"],
  ["If you heat ice, it ___.", ["melts", "will melt", "melted", "would melt"], 0, "Zero conditional expressing physical law takes Simple Present in both clauses.", "Zero Conditional (Simple Present)", "প্রাকৃতিক নিয়মের শর্তে উভয় অংশে Simple Present হয়।"],
  ["He spoke as if he ___ everything.", ["knew", "knows", "has known", "will know"], 0, "'As if / As though' expressing unreality takes past subjunctive ('knew').", "Subjunctive mood after 'as if'", "'As if'-এর পর অবাস্তব ভাব প্রকাশে Past tense বসে।"],
  ["It is high time we ___ to the police.", ["report", "reported", "have reported", "should report"], 1, "'It is high time' is followed by a subject and a verb in the Simple Past tense.", "'It is high time' + Simple Past", "'It is high time'-এর পর Subject থাকলে Past Tense বসে।"],
  ["I ___ this book for the past two weeks.", ["read", "am reading", "have been reading", "had read"], 2, "'For the past two weeks' shows action starting in past and continuing now -> Present Perfect Continuous.", "Present Perfect Continuous with duration", "অতীত থেকে বর্তমান পর্যন্ত চলছে বোঝাতে Present Perfect Continuous বসে।"],
  ["Hardly had the bell rung when the teacher ___ the room.", ["entered", "had entered", "entering", "enters"], 0, "The correlative 'Hardly had... when' requires Simple Past in the subsequent clause.", "Hardly had... when + Simple Past", "'When'-এর পর Simple Past বসে।"],
  ["She usually ___ coffee in the morning.", ["drinks", "is drinking", "drank", "has drunk"], 0, "Habitual actions signaled by 'usually', 'always', 'often' take Simple Present.", "Simple Present for habitual actions", "প্রাত্যহিক অভ্যাস বোঝাতে Simple Present বসে।"],
  ["They ___ football since 3:00 PM.", ["are playing", "have been playing", "were playing", "play"], 1, "Duration starting at a specific clock point with 'since' takes Present Perfect Continuous.", "Present Perfect Continuous with 'since'", "'Since'-এর সাথে সময় নির্দেশ থাকায় Present Perfect Continuous হবে।"],
  ["The match ___ before we arrived at the stadium.", ["began", "had begun", "has begun", "was beginning"], 1, "Earlier past action before 'before' takes Past Perfect.", "Past Perfect with 'before'", "আগে ঘটে যাওয়া ঘটনায় Past Perfect বসে।"],
  ["He told me that he ___ ill for a week.", ["had been", "was", "has been", "is"], 0, "Indirect speech shifting past simple/present perfect duration into Past Perfect ('had been').", "Sequence of Tenses in Indirect Speech", "অতীতের বর্ণনা Indirect করার সময় Past Perfect হয়।"],
  ["I will call you as soon as I ___ at the station.", ["arrive", "will arrive", "arrived", "am arriving"], 0, "Time clauses with 'as soon as', 'when', 'until' take Simple Present, not future tense.", "Time clause takes Simple Present", "ভবিষ্যতের শর্তসূচক Time clause-এ Simple Present বসে।"],
  ["The sun ___ in the east.", ["rises", "is rising", "rose", "has risen"], 0, "Universal geographic truth takes Simple Present.", "Universal truth in Simple Present", "চিরন্তন সত্যে Simple Present বসে।"],
  ["I have not received any reply ___.", ["yet", "already", "since", "just"], 0, "'Yet' is used in negative present perfect sentences to denote up to now.", "Position of 'yet' in negative perfect", "বর্তমান পর্যন্ত কোনো উত্তর না পাওয়া বোঝাতে 'yet' বসে।"],
  ["He ___ television all evening yesterday.", ["watched", "was watching", "has watched", "had watched"], 1, "Continuous activity over a specific past span takes Past Continuous.", "Past Continuous for ongoing past action", "অতীতের দীর্ঘ সময় ধরে চলা কাজে Past Continuous বসে।"],
  ["By the time you wake up, I ___ for Delhi.", ["will leave", "will have left", "am leaving", "left"], 1, "'By the time + present' indicates an action completed before a future moment -> Future Perfect.", "Future Perfect with 'by the time'", "ভবিষ্যতের নির্দিষ্ট সময়ের আগে সম্পন্ন হওয়া কাজে Future Perfect বসে।"]
];
g02_data.forEach((item, idx) => {
  g02_new.push({
    id: `g02-${String(idx + 21).padStart(3, '0')}`,
    chapter: "g02",
    type: "fill",
    difficulty: idx % 3 === 0 ? "hard" : (idx % 2 === 0 ? "medium" : "easy"),
    isPYQ: false,
    question: `Fill in the blank with the correct tense form: '${item[0]}'`,
    options: item[1],
    answer: item[2],
    explanation: item[3],
    rule: item[4],
    bengaliHint: item[5]
  });
});
appendQuestions('data/questions/grammar/02-tenses.json', g02_new);

// --------------------------------------------------------------------------
// g03 Subject-Verb Agreement (Add 25 to reach 45)
// --------------------------------------------------------------------------
const g03_new = [];
const g03_data = [
  ["The quality of the mangoes ___ not satisfactory.", ["was", "were", "are", "have been"], 0, "The subject is the singular abstract noun 'quality', not the plural 'mangoes'.", "Subject separated by prepositional phrase", "আসল Subject হলো 'quality' (singular)।"],
  ["Bread and butter ___ his favourite breakfast.", ["is", "are", "were", "have been"], 0, "Two nouns expressing a compound idea regarded as a single unit take a singular verb.", "Compound noun as single unit", "দুটি শব্দ মিলে একটি সামগ্রিক ভাব প্রকাশ করায় Singular verb বসে।"],
  ["The horse and carriage ___ at the main entrance.", ["is", "are", "were", "have been"], 0, "Horse and carriage together form a single conveyance unit, taking a singular verb.", "Paired unit subject", "একত্রিত বাহন বোঝাতে Singular verb বসে।"],
  ["Slow and steady ___ the race.", ["wins", "win", "winning", "are winning"], 0, "Famous proverb viewing 'slow and steady' as a unified virtue taking singular verb 'wins'.", "Singular paired subject", "একত্রে একটি গুণ বোঝাতে 'wins' বসে।"],
  ["The minister, accompanied by his secretaries, ___ arrived.", ["has", "have", "are", "were"], 0, "When joined by 'accompanied by', the verb agrees strictly with the first subject ('minister').", "Accompanied by governs first subject", "'Accompanied by' থাকলে প্রথম Subject অনুযায়ী Verb বসে।"],
  ["The captain, as well as the players, ___ praised.", ["was", "were", "are", "have been"], 0, "With 'as well as', the verb agrees with the first subject ('captain').", "As well as agrees with Subject 1", "'As well as' থাকলে প্রথম Subject (captain) অনুযায়ী Verb বসে।"],
  ["Neither praise nor blame ___ to affect him.", ["seems", "seem", "are seeming", "were seeming"], 0, "Both singular subjects connected by 'nor' take a singular verb ('seems').", "Neither... nor with singular subjects", "উভয় subject একবচন হলে Verb-ও একবচন হয়।"],
  ["Either you or he ___ to blame.", ["is", "are", "am", "were"], 0, "Connected by 'or', the verb agrees with the nearer subject ('he' -> 'is').", "Proximity rule with either... or", "'He'-র পাশে বসায় 'is' হবে।"],
  ["Neither the headmaster nor the assistant teachers ___ present.", ["were", "was", "is", "has been"], 0, "Connected by 'nor', the verb agrees with the nearer subject ('assistant teachers' -> 'were').", "Proximity rule with neither... nor", "নিকটবর্তী বহুবচন Subject অনুযায়ী 'were' বসে।"],
  ["Each of these suspected men ___ questioned by the inspector.", ["was", "were", "are", "have been"], 0, "'Each of' is followed by a plural noun but strictly requires a singular verb.", "Each of + plural noun + singular verb", "'Each of'-এর পর সর্বদা Singular verb বসে।"],
  ["Every boy and girl ___ awarded a certificate.", ["was", "were", "are", "have been"], 0, "Nouns qualified by 'every' take a singular verb, even when connected by 'and'.", "Every + singular noun takes singular verb", "'Every' যুক্ত একাধিক noun 'and' দিয়ে যুক্ত হলেও verb singular হয়।"],
  ["Many a passenger ___ stranded at the railway station.", ["was", "were", "are", "have been"], 0, "'Many a' is followed by a singular noun and a strictly singular verb.", "Many a + singular noun + singular verb", "'Many a'-র পর Singular noun ও Singular verb বসে।"],
  ["A great many candidates ___ rejected for improper documentation.", ["were", "was", "is", "has been"], 0, "'A great many' is followed by a plural noun and takes a plural verb.", "A great many takes plural verb", "'A great many'-র পর Plural verb বসে।"],
  ["The number of road accidents ___ decreased this year.", ["has", "have", "are", "were"], 0, "'The number of' denotes a specific count and takes a singular verb ('has').", "The number of takes singular verb", "'The number of' সর্বদা Singular verb গ্রহণ করে।"],
  ["A number of passengers ___ injured in the derailment.", ["were", "was", "is", "has been"], 0, "'A number of' denotes many and takes a plural verb ('were').", "A number of takes plural verb", "'A number of' বহুবচন বোঝায়, তাই Plural verb বসে।"],
  ["Mathematics ___ considered an intriguing subject by scholars.", ["is", "are", "were", "have been"], 0, "Names of subjects ending in -s (Mathematics, Physics, Politics) take a singular verb.", "Academic subjects in -s take singular verb", "বিষয়ের নামে 's' থাকলেও তা Singular verb গ্রহণ করে।"],
  ["His mathematics ___ remarkably weak.", ["are", "is", "was", "has been"], 0, "When preceded by a possessive pronoun ('his'), mathematics refers to calculating abilities and takes a plural verb.", "Possessive + academic subject takes plural verb", "ব্যক্তিগত হিসেব করার দক্ষতা বোঝাতে Plural verb বসে।"],
  ["Fifty thousand rupees ___ an adequate sum for the project.", ["is", "are", "were", "have been"], 0, "Amounts of money regarded as a whole unit take a singular verb.", "Unit amount of money takes singular verb", "টাকার পরিমাণ সামগ্রিক একক হিসেবে Singular হয়।"],
  ["Ten kilometres ___ a strenuous distance to cover on foot.", ["is", "are", "were", "have been"], 0, "Distances regarded as a single unit take a singular verb.", "Unit distance takes singular verb", "দূরত্ব একটি একক হিসেবে Singular verb গ্রহণ করে।"],
  ["The committee ___ unanimous in its decision.", ["was", "were", "are", "have been"], 0, "A collective noun acting as a single cohesive unit takes a singular verb ('was').", "Collective noun as single unit", "কমিটি একমত হলে Singular verb বসে।"],
  ["The committee ___ divided on the disputed proposal.", ["were", "was", "is", "has been"], 0, "A collective noun acting with division of opinions takes a plural verb ('were').", "Noun of multitude takes plural verb", "সদস্যদের মধ্যে মতবিরোধ থাকলে Plural verb বসে।"],
  ["More than one candidate ___ scored full marks.", ["has", "have", "are", "were"], 0, "'More than one' is followed by a singular noun and a singular verb.", "More than one takes singular verb", "'More than one'-এর পর Singular verb বসে।"],
  ["More candidates than one ___ qualified for the interview.", ["have", "has", "is", "was"], 0, "'More + plural noun + than one' takes a plural verb.", "More + plural noun + than one takes plural verb", "Noun-টি বহুবচনে থাকলে Verb Plural হবে।"],
  ["One of my closest friends ___ an administrative officer.", ["is", "are", "were", "have been"], 0, "'One of + plural noun' has 'One' as the grammatical subject, requiring a singular verb.", "One of + plural noun takes singular verb", "আসল Subject হলো 'One', তাই Singular verb বসে।"],
  ["He is one of those men who ___ always ready to assist.", ["are", "is", "was", "has been"], 0, "Relative pronoun 'who' refers to the antecedent plural noun 'men', requiring a plural verb ('are').", "Relative pronoun agrees with plural antecedent", "'Who'-এর পূর্ববর্তী antecedent 'men' (plural), তাই verb plural হবে।"]
];
g03_data.forEach((item, idx) => {
  g03_new.push({
    id: `g03-${String(idx + 21).padStart(3, '0')}`,
    chapter: "g03",
    type: "fill",
    difficulty: idx % 3 === 0 ? "hard" : (idx % 2 === 0 ? "medium" : "easy"),
    isPYQ: false,
    question: `Fill in the blank with the correct verb: '${item[0]}'`,
    options: item[1],
    answer: item[2],
    explanation: item[3],
    rule: item[4],
    bengaliHint: item[5]
  });
});
appendQuestions('data/questions/grammar/03-subject-verb-agreement.json', g03_new);

console.log("Grammar Batch 1 completed!");
