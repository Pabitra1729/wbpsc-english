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

// =========================================================================
// g04 Articles: 25 new questions to reach 45
// =========================================================================
const g04_data = [
  ["He plays ___ violin with great skill.", ["a", "an", "the", "no article"], 2, "Musical instruments take the definite article 'the' when referred to as an instrument to play.", "Definite article with musical instruments", "বাদ্যযন্ত্র বাজানো অর্থে 'the' বসে।"],
  ["He is ___ honest public servant.", ["a", "an", "the", "no article"], 1, "'Honest' begins with a silent 'h' and a vowel sound /ɒ/, requiring 'an'.", "Article 'an' before silent h", "'Honest'-এর উচ্চারণ vowel sound দিয়ে শুরু হওয়ায় 'an' বসে।"],
  ["She is ___ university lecturer.", ["a", "an", "the", "no article"], 0, "'University' begins with a consonant sound /ju:/, requiring indefinite article 'a'.", "Article 'a' before /ju:/ sound", "উচ্চারণ 'ইউ' দিয়ে শুরু হলে 'a' বসে।"],
  ["Copper is ___ useful metal.", ["a", "an", "the", "no article"], 0, "'Useful' begins with the consonant phoneme /ju:/, taking 'a'.", "Article 'a' before useful", "উচ্চারণ 'ইউ' হওয়ায় 'a' হবে।"],
  ["He is ___ European citizen.", ["a", "an", "the", "no article"], 0, "'European' begins with the consonant sound /ju:/, taking 'a'.", "Article 'a' before European", "উচ্চারণ 'ইউ' হওয়ায় 'a' হবে।"],
  ["He reads ___ Statesman newspaper every morning.", ["a", "an", "the", "no article"], 2, "Names of prominent newspapers take the definite article 'the'.", "Definite article before newspapers", "সংবাদপত্রের নামের আগে 'the' বসে।"],
  ["___ Himalayas protect India from bitter northern winds.", ["A", "An", "The", "No article"], 2, "Mountain ranges (chains) take 'the'.", "Definite article with mountain ranges", "পর্বতশ্রেণীর নামের পূর্বে 'the' বসে।"],
  ["___ Mount Everest is the highest peak in the world.", ["The", "A", "An", "No article"], 3, "Individual mountain peaks take NO article (unlike mountain ranges).", "No article before single mountain peaks", "একক শৃঙ্গের নামের পূর্বে কোনো article বসে না।"],
  ["___ Pacific Ocean is the deepest ocean on Earth.", ["The", "A", "An", "No article"], 0, "Names of oceans, seas, and rivers take 'the'.", "Definite article with oceans", "মহাসাগরের নামের পূর্বে 'the' বসে।"],
  ["He was elected ___ secretary of the club.", ["a", "an", "the", "no article"], 3, "Nouns following verbs like 'elect', 'appoint', 'nominate' taking predicative roles omit the article.", "Omission of article after elect/appoint", "'Elect'-এর পর পদের নামের আগে article বসে না।"],
  ["___ gold is a precious yellow metal.", ["The", "A", "An", "No article"], 3, "Material nouns used in a general sense take no article.", "No article before general material nouns", "সাধারণ অর্থে ব্যবহৃত পদার্থবাচক Noun-এ article বসে না।"],
  ["___ gold of Kolar is renowned for purity.", ["The", "A", "An", "No article"], 0, "Material nouns made specific by an 'of' phrase take 'the'.", "Definite article for specific material nouns", "নির্দিষ্ট জায়গার সোনা বোঝাতে 'the' বসে।"],
  ["___ wisdom is the gift of heaven.", ["The", "A", "An", "No article"], 3, "Abstract nouns used in a general sense take no article.", "No article before abstract nouns in general", "সাধারণ অর্থে গুণবাচক Noun-এ article বসে না।"],
  ["___ wisdom of Solomon was famous throughout the ancient world.", ["The", "A", "An", "No article"], 0, "Abstract nouns qualified by a prepositional phrase take 'the'.", "Definite article for specific abstract qualities", "নির্দিষ্ট ব্যক্তির প্রজ্ঞা বোঝাতে 'the' বসে।"],
  ["He went to ___ hospital to visit an ailing relative.", ["the", "a", "an", "no article"], 0, "When institutions like hospital/school/church are visited for a secondary purpose, 'the' is used.", "Definite article for secondary purpose of institutions", "চিকিৎসার জন্য না গিয়ে কাউকে দেখতে গেলে 'the hospital' হয়।"],
  ["The patient was admitted to ___ hospital yesterday.", ["the", "a", "an", "no article"], 3, "When hospital is visited for its primary purpose (treatment), no article is used.", "No article for primary purpose of institutions", "চিকিৎসার মূল উদ্দেশ্যে হাসপাতালে ভর্তি হলে article বসে না।"],
  ["Kalidasa is often called ___ Shakespeare of India.", ["a", "an", "the", "no article"], 2, "When a proper noun is used as a standard of comparison (common noun), it takes 'the'.", "Definite article for proper noun used as standard", "উপমা হিসেবে ব্যবহৃত Proper Noun-এর পূর্বে 'the' বসে।"],
  ["He is ___ honorary magistrate in the district court.", ["a", "an", "the", "no article"], 1, "'Honorary' begins with a silent 'h' and vowel sound /ɒ/, taking 'an'.", "Article 'an' before honorary", "'Honorary'-র শুরুতে vowel sound থাকায় 'an' বসে।"],
  ["I bought ___ one-way train ticket to Siliguri.", ["a", "an", "the", "no article"], 0, "'One-way' begins with the consonant phoneme /w/ (Wa), taking 'a'.", "Article 'a' before /w/ sound in 'one'", "'One'-এর উচ্চারণ 'ওয়া' হওয়ায় 'a' বসে।"],
  ["He joined ___ Union of government employees.", ["a", "an", "the", "no article"], 0, "'Union' begins with consonant sound /ju:/, requiring indefinite article 'a'.", "Article 'a' before union", "উচ্চারণ 'ইউ' হওয়ায় 'a' বসে।"],
  ["___ French defeated the Germans in the decisive battle.", ["The", "A", "An", "No article"], 0, "'The French' refers to the people/nation of France, taking 'the'.", "Definite article for nationality/people", "সমগ্র জাতিকে নির্দেশ করতে 'the' বসে।"],
  ["He speaks ___ French with native fluency.", ["the", "a", "an", "no article"], 3, "Names of languages take no article.", "No article before names of languages", "ভাষার নামের পূর্বে কোনো article বসে না।"],
  ["___ richer you grow, the more restless you become.", ["The", "A", "An", "No article"], 0, "Parallel comparative structure requires 'The + comparative..., the + comparative...'.", "Double comparative with 'the'", "তুলনামূলক দ্বৈত গঠনে উভয় ক্ষেত্রে 'the' বসে।"],
  ["She is ___ taller of the two sisters.", ["the", "a", "an", "no article"], 0, "When comparing exactly two items with a comparative degree, 'the' is mandatory.", "Definite article before comparative of two", "দুজনের মধ্যে তুলনা বোঝালে comparative-এর আগে 'the' বসে।"],
  ["He filed ___ FIR at the local police station.", ["a", "an", "the", "no article"], 1, "'FIR' is pronounced /ef-aye-ar/ and begins with vowel sound /e/, requiring 'an'.", "Article 'an' with vowel-sound abbreviations", "সংক্ষেপিত শব্দের উচ্চারণ vowel দিয়ে শুরু হলে 'an' বসে।"]
];
const g04_new = g04_data.map((item, idx) => ({
  id: `g04-${String(idx + 21).padStart(3, '0')}`,
  chapter: "g04",
  type: "fill",
  difficulty: idx % 3 === 0 ? "hard" : (idx % 2 === 0 ? "medium" : "easy"),
  isPYQ: false,
  question: `Fill in the blank with the appropriate article: '${item[0]}'`,
  options: item[1],
  answer: item[2],
  explanation: item[3],
  rule: item[4],
  bengaliHint: item[5]
}));
appendQuestions('data/questions/grammar/04-articles.json', g04_new);

// =========================================================================
// g05 Prepositions: 25 new questions to reach 45
// =========================================================================
const g05_data = [
  ["He is addicted ___ gambling.", ["to", "with", "for", "in"], 0, "'Addicted' is followed by the preposition 'to'.", "Fixed preposition: addicted to", "'Addicted'-এর সাথে 'to' বসে।"],
  ["She is very fond ___ classical Rabindrasangeet.", ["of", "for", "with", "about"], 0, "'Fond' consistently takes the preposition 'of'.", "Fixed preposition: fond of", "'Fond'-এর সাথে 'of' বসে।"],
  ["He congratulated me ___ my promotion.", ["on", "for", "with", "at"], 0, "One congratulates someone 'on' an achievement or event.", "Fixed preposition: congratulate on", "সাফল্যে অভিনন্দন জানাতে 'on' বসে।"],
  ["He insisted ___ accompanying me to the station.", ["on", "in", "to", "at"], 0, "'Insist' governs 'on' followed by a gerund.", "Fixed preposition: insist on", "'Insist'-এর সাথে 'on' বসে।"],
  ["Smoking is injurious ___ health.", ["to", "for", "with", "in"], 0, "'Injurious', 'detrimental', 'harmful' take the preposition 'to'.", "Fixed preposition: injurious to", "'Injurious'-এর পর 'to' বসে।"],
  ["The officer is blind ___ his son's shortcomings.", ["to", "in", "of", "with"], 0, "'Blind to' means unwilling to notice faults; 'blind in' refers to physical loss of sight.", "Blind to (faults) vs Blind in (eye)", "দোষ দেখেও না দেখার ভান করলে 'blind to' বসে।"],
  ["The elderly beggar is blind ___ one eye.", ["in", "to", "with", "at"], 0, "Physical blindness in an eye takes 'in' (or 'of').", "Blind in an eye", "শারীরিকভাবে এক চোখে অন্ধ হলে 'blind in' বসে।"],
  ["He died ___ cancer after a prolonged illness.", ["of", "from", "for", "with"], 0, "One dies 'of' a specific disease (cancer, malaria, cholera).", "Die of a disease", "রোগে আক্রান্ত হয়ে মারা গেলে 'die of' বসে।"],
  ["The laborer died ___ excessive exhaustion and dehydration.", ["from", "of", "for", "by"], 0, "One dies 'from' an external/indirect cause (overwork, thirst, snakebite).", "Die from an indirect cause", "পরোক্ষ কারণে মৃত্যু হলে 'die from' বসে।"],
  ["The patriot died ___ his country.", ["for", "of", "from", "with"], 0, "One dies 'for' a noble cause, principle, or nation.", "Die for a cause", "মহৎ উদ্দেশ্যে বা দেশের জন্য প্রাণ দিলে 'die for' বসে।"],
  ["He is well versed ___ ancient Indian history.", ["in", "with", "at", "for"], 0, "'Versed' and 'proficient' take the preposition 'in'.", "Fixed preposition: versed in", "কোনো বিষয়ে পারদর্শী বোঝাতে 'versed in' বসে।"],
  ["She is proficient ___ mathematics.", ["in", "at", "with", "on"], 0, "'Proficient' governs the preposition 'in'.", "Fixed preposition: proficient in", "দক্ষতা বোঝাতে 'proficient in' বসে।"],
  ["He is exceptionally good ___ playing cricket.", ["at", "in", "with", "for"], 0, "'Good at' and 'bad at' denote skill level in an activity.", "Fixed preposition: good at", "কোনো খেলায় বা কাজে পটু বোঝাতে 'good at' বসে।"],
  ["He is junior ___ me in the department.", ["to", "than", "from", "of"], 0, "Adjectives ending in -ior (junior, senior, superior) take 'to', never 'than'.", "Latin comparative: junior to", "'Junior'-এর সাথে 'to' বসে।"],
  ["I prefer reading books ___ watching television.", ["to", "than", "more than", "rather than"], 0, "'Prefer' takes the preposition 'to' when comparing two options.", "Fixed preposition: prefer to", "'Prefer'-এর সাথে তুলনার ক্ষেত্রে 'to' বসে।"],
  ["He was absorbed ___ deep philosophical contemplation.", ["in", "with", "at", "on"], 0, "'Absorbed' is followed by the preposition 'in'.", "Fixed preposition: absorbed in", "গভীর চিন্তায় মগ্ন বোঝাতে 'absorbed in' বসে।"],
  ["The prisoner was acquitted ___ all charges.", ["of", "from", "with", "in"], 0, "'Acquitted' (cleared of guilt) takes 'of'.", "Fixed preposition: acquit of", "অভিযোগ থেকে খালাস পাওয়া অর্থে 'acquit of' বসে।"],
  ["We should abstain ___ malicious gossip.", ["from", "to", "with", "of"], 0, "'Abstain', 'refrain', 'desist' take the preposition 'from' + gerund.", "Fixed preposition: abstain from", "কোনো কিছু থেকে বিরত থাকা বোঝাতে 'abstain from' বসে।"],
  ["Please refrain ___ smoking in public transport.", ["from", "to", "with", "by"], 0, "'Refrain' is followed by 'from'.", "Fixed preposition: refrain from", "বিরত থাকা বোঝাতে 'refrain from' বসে।"],
  ["He is devoid ___ common sense.", ["of", "from", "in", "with"], 0, "'Devoid' (completely lacking) takes 'of'.", "Fixed preposition: devoid of", "বর্জিত বা শূন্য বোঝাতে 'devoid of' বসে।"],
  ["Do not laugh ___ the misfortunes of others.", ["at", "on", "to", "with"], 0, "'Laugh at', 'mock at', 'jeer at' take the preposition 'at'.", "Fixed preposition: laugh at", "কাউকে উপহাস করা বোঝাতে 'laugh at' বসে।"],
  ["I agree ___ your proposal unconditionally.", ["to", "with", "on", "for"], 0, "One agrees 'to' a proposal/plan; one agrees 'with' a person.", "Agree to a proposal vs Agree with a person", "প্রস্তাবে সম্মতি দিলে 'agree to' বসে।"],
  ["I agree ___ you on this policy matter.", ["with", "to", "at", "for"], 0, "One agrees 'with' a person.", "Agree with a person", "ব্যক্তির সাথে একমত হলে 'agree with' বসে।"],
  ["He was angry ___ my blunt remark.", ["at", "with", "for", "on"], 0, "One is angry 'at' a thing/remark/action; angry 'with' a person.", "Angry at a remark vs Angry with a person", "কারো কথায় ক্ষুব্ধ হলে 'angry at' বসে।"],
  ["The teacher was angry ___ the insolent student.", ["with", "at", "to", "on"], 0, "One is angry 'with' a person.", "Angry with a person", "কোনো ব্যক্তির ওপর রেগে গেলে 'angry with' বসে।"]
];
const g05_new = g05_data.map((item, idx) => ({
  id: `g05-${String(idx + 21).padStart(3, '0')}`,
  chapter: "g05",
  type: "fill",
  difficulty: idx % 3 === 0 ? "hard" : (idx % 2 === 0 ? "medium" : "easy"),
  isPYQ: false,
  question: `Fill in the blank with the appropriate preposition: '${item[0]}'`,
  options: item[1],
  answer: item[2],
  explanation: item[3],
  rule: item[4],
  bengaliHint: item[5]
}));
appendQuestions('data/questions/grammar/05-prepositions.json', g05_new);

console.log("Grammar Part 1 expansion complete!");
