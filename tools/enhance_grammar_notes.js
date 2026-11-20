const fs = require('fs');
const path = require('path');

function updateNote(filePath, data) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    const existing = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const merged = {
      ...existing,
      ...data,
      rules: data.rules || existing.rules,
      commonMistakes: data.commonMistakes || existing.commonMistakes,
      examTricks: data.examTricks || existing.examTricks,
      memoryTricks: data.memoryTricks || existing.memoryTricks,
      revision: data.revision || existing.revision
    };
    fs.writeFileSync(fullPath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`Enriched grammar note: ${filePath}`);
  }
}

// 02 Tenses
updateNote('data/notes/grammar/02-tenses.json', {
  intro: "Tense indicates the time of an action (Past, Present, Future) along with its state of completion (Simple, Continuous, Perfect, Perfect Continuous). Mastery of tense consistency is the foundation for solving error detection, fill in the blanks, and voice/narration in WBPSC Clerkship.",
  bengali: "Tense হলো কোনো কাজের সময় এবং তার স্থায়িত্ব বা সমাপ্তির রূপ। বাংলায় 'করি' (Present Simple), 'করিতেছি' (Present Continuous), 'করিয়াছি' (Present Perfect) যেমন ক্রিয়ার কাল নির্দেশ করে, ইংরেজিতেও প্রতিটি Tense-এর নিজস্ব গঠন ও Signal Words (নির্দিষ্ট লক্ষণসূচক শব্দ) রয়েছে। যেমন: 'since/for' থাকলে সচরাচর Perfect Continuous Tense হয়, আবার অতীতে দুটি কাজ পরপর সম্পন্ন হলে আগেরটি Past Perfect এবং পরেরটি Simple Past হয়।",
  rules: [
    {
      rule: "Present Simple expresses habitual actions, universal truths, and scheduled future events.",
      examples: ["The sun rises in the east.", "He goes for a morning walk every day.", "The train departs at 5:00 PM tomorrow."],
      exceptions: ["Do not use continuous tense for stative verbs denoting perception or emotion: 'I understand the rule' (NOT 'I am understanding')."]
    },
    {
      rule: "Present Perfect connects a completed past action with the present moment; use signal words like 'just', 'already', 'recently', 'yet'.",
      examples: ["I have just submitted the application form.", "He has lived in Siliguri for ten years."],
      exceptions: ["Never use Present Perfect with a specific past time marker: say 'He died in 2020' (NOT 'He has died in 2020')."]
    },
    {
      rule: "Past Perfect is used when two actions happened in the past; the earlier action takes Past Perfect (had + V3) and the subsequent action takes Simple Past (V2).",
      examples: ["The train had departed before we reached Howrah station.", "When the doctor arrived, the patient had already expired."],
      exceptions: ["If the time gap between two simultaneous past events is zero, both take Simple Past: 'When she opened the door, the cat jumped out'."]
    },
    {
      rule: "Present Perfect Continuous (has/have been + V-ing) denotes an action that started in the past and is still ongoing; use 'since' for a point of time and 'for' for a period of time.",
      examples: ["It has been raining since 8:00 AM.", "They have been preparing for the clerkship examination for two years."],
      exceptions: ["Stative verbs cannot take -ing form even with 'since/for'; use Present Perfect: 'I have known him since childhood' (NOT 'have been knowing')."]
    },
    {
      rule: "In future conditional clauses, the dependent clause beginning with if/when/as soon as/unless takes Present Simple, not Future Simple.",
      examples: ["If it rains, we will postpone the meeting.", "Unless you work hard, you will not qualify."],
      exceptions: ["Never write 'If it will rain, we will...' (double future in conditional sentences is strictly grammatically incorrect)."]
    }
  ],
  commonMistakes: [
    "Saying 'I am knowing him for years' instead of 'I have known him for years'.",
    "Using past tense after 'did': say 'Did he go?' NOT 'Did he went?'.",
    "Writing 'I have passed the Madhyamik in 2018' instead of 'I passed the Madhyamik in 2018'.",
    "Writing 'Since two hours' instead of 'For two hours' (use 'since' for fixed starting point like 'since 2 PM', 'for' for total duration).",
    "Using double future: 'If you will come, I will help you' (Correct: 'If you come, I will help you')."
  ],
  examTricks: [
    "Signal word rule: 'Yesterday, ago, last night, in 1999' -> Always use Simple Past (V2).",
    "Signal word rule: 'Just, already, yet, so far, recently' -> Always use Present Perfect (has/have + V3).",
    "Before/After rule: 'Past Perfect + BEFORE + Simple Past' vs 'Simple Past + AFTER + Past Perfect'.",
    "Check for 'since/for' + time duration -> Look for 'has/have been + V-ing' in fill-in-the-blank questions."
  ],
  memoryTricks: [
    "P-B-P Formula: Past Perfect happens BEFORE, Simple Past comes AFTER.",
    "POINT = SINCE (Since Monday, Since 1995); PERIOD = FOR (For 5 days, For 3 years)."
  ],
  revision: [
    "Stative verbs (love, know, believe, understand) take simple/perfect tenses, never continuous.",
    "Specific past time adverbials (yesterday, ago) strictly require Simple Past.",
    "Conditional clauses with if, until, unless, as soon as never take 'will' or 'shall'.",
    "Earlier of two past events = had + V3; later event = V2."
  ]
});

// 06 Noun
updateNote('data/notes/grammar/06-noun.json', {
  intro: "A noun is a naming word representing a person, place, thing, substance, collection, quality, or abstract state. In WBPSC Clerkship, exam questions test countable vs uncountable nouns, irregular plurals, collective nouns, and possessive apostrophe rules.",
  bengali: "Noun হলো কোনো ব্যক্তি, স্থান, বস্তু, উপাদান বা গুণের নাম। পরীক্ষায় সবচেয়ে বেশি আসে Uncountable Nouns যেগুলির সাথে 's/es' যোগ হয় না বা 'a/an' বসে না (যেমন: scenery, furniture, advice, information, luggage, poetry)। এছাড়া কিছু Noun দেখতে Plural হলেও Singular Verb নেয় (mathematics, news, physics) এবং কিছু Noun দেখতে Singular হলেও Plural Verb নেয় (cattle, police, people)।",
  rules: [
    {
      rule: "Certain nouns are always uncountable: they never take a/an, never take a plural -s/es ending, and always govern singular verbs.",
      examples: ["The scenery of Darjeeling is breathtaking.", "He gave me some valuable advice.", "All the furniture was polished."],
      exceptions: ["To make them countable, use phrases: 'a piece of advice', 'an article of furniture', 'two items of luggage'."]
    },
    {
      rule: "Nouns ending in -s that look plural but are singular in meaning take singular verbs (subjects, diseases, sports, news).",
      examples: ["Mathematics is an essential scoring subject.", "No news is good news.", "Billiards is played worldwide."],
      exceptions: ["When 'mathematics', 'politics', or 'statistics' refer to individual calculations or political opinions of someone, they take plural verbs: 'His mathematics are weak'."]
    },
    {
      rule: "Certain collective nouns are singular in form but always plural in meaning and take plural verbs (cattle, poultry, police, people, gentry, clergy).",
      examples: ["The cattle are grazing in the meadow.", "The police have arrested the culprit.", "Gentry of the town were invited."],
      exceptions: ["Never add 's' to cattle ('cattles' is incorrect). 'Peoples' means nations/ethnic groups, not the plural of person."]
    },
    {
      rule: "Certain nouns consist of two complementary parts and are always plural in form and verb (scissors, spectacles, trousers, binoculars, tongs, pliers).",
      examples: ["My spectacles are missing.", "The scissors are sharp."],
      exceptions: ["When preceded by 'a pair of', the expression becomes singular: 'A pair of spectacles has been bought'."]
    },
    {
      rule: "Compound nouns form plurals by adding -s to the root/principal word, not to the preposition or appendage.",
      examples: ["commanders-in-chief", "passers-by", "sons-in-law", "lookers-on"],
      exceptions: ["'Maid-servant' becomes 'maid-servants', but 'man-servant' becomes 'men-servants' (both parts pluralized)."]
    },
    {
      rule: "Apostrophe with -s ('s) is used only with living beings, personified objects, and expressions of time/space/weight; non-living objects use 'of'.",
      examples: ["The manager's signature", "A day's leave", "The leg of the table (NOT the table's leg)."],
      exceptions: ["When two nouns jointly own something, put 's on the second noun: 'Ram and Shyam's father'; for separate ownership: 'Ram's and Shyam's books'."]
    }
  ],
  commonMistakes: [
    "Saying 'sceneries' or 'furnitures' (Correct: 'scenery', 'furniture').",
    "Saying 'He gave me an advice' (Correct: 'a piece of advice' or 'some advice').",
    "Writing 'The cattles are grazing' (Correct: 'The cattle are grazing').",
    "Writing 'brothers-in-laws' instead of 'brothers-in-law'.",
    "Writing 'the table's surface' instead of 'the surface of the table'."
  ],
  examTricks: [
    "High-frequency uncountable checklist: Scenery, Furniture, Advice, Information, Luggage, Baggage, Poetry, Machinery, Work, Hair, Bread.",
    "Pair rule: If preceded by 'a pair of', use a singular verb: 'A pair of scissors was kept on the table'.",
    "Hyphenated nouns never take plural form when used as adjectives: 'a five-rupee note' (NOT 'five-rupees note'), 'a three-member committee'."
  ],
  memoryTricks: [
    "Root Plural: Principal word takes -s (Passers-by, NOT passer-bys).",
    "S-F-A-I-L-P Formula: Scenery, Furniture, Advice, Information, Luggage, Poetry are ALWAYS singular uncountable."
  ],
  revision: [
    "Uncountable nouns never take a/an or -s/es.",
    "Cattle, police, clergy, poultry take plural verbs.",
    "Mathematics, news, innings, physics take singular verbs.",
    "Hyphenated compound modifiers stay singular (a ten-mile walk)."
  ]
});

// 07 Pronoun
updateNote('data/notes/grammar/07-pronoun.json', {
  intro: "A pronoun replaces a noun to avoid monotonous repetition and maintain fluid syntax. WBPSC Clerkship heavily examines pronoun order (231 vs 123 rule), relative pronouns (who vs whom vs that), distributive pronouns (each/either/neither), and reflexive pronouns.",
  bengali: "Pronoun হলো Noun-এর পরিবর্তে ব্যবহৃত শব্দ। পরীক্ষার সবচেয়ে গুরুত্বপূর্ণ নিয়ম হলো Pronoun-এর ক্রম বা Order: সাধারণ বা ভালো কাজে Second Person (2), Third Person (3), First Person (1) অর্থাৎ 231 ক্রম বসে (যেমন: 'You, he and I cleared the exam')। কিন্তু ভুল স্বীকার বা দোষারোপের ক্ষেত্রে 123 ক্রম বসে ('I, you and he are to blame')। এছাড়াও 'One' থাকলে সর্বত্র 'one's' হয়, 'his' হয় না।",
  rules: [
    {
      rule: "Order of personal pronouns: For general or positive statements, follow 231 (Second person -> Third person -> First person); for admissions of guilt, mistakes, or plural pronouns, follow 123 (First -> Second -> Third).",
      examples: ["You, he and I shall attend the lecture together (231).", "I, you and he committed the mistake (123).", "We, you and they are going on an excursion (Plural: 123)."],
      exceptions: ["If only two pronouns are used, preserve relative order: You and I (2-1), He and I (3-1), You and he (2-3)."]
    },
    {
      rule: "The indefinite pronoun 'one' must strictly be followed by 'one's' and 'oneself', never by 'his', 'her', or 'himself'.",
      examples: ["One must discharge one's duties conscientiously.", "One should respect one's elders."],
      exceptions: ["If the sentence begins with 'Everyone' or 'Anyone', follow standard singular pronoun: 'Everyone should do his/their duty'."]
    },
    {
      rule: "Relative pronoun 'that' is preferred over 'who' or 'which' after: superlatives, all, the same, only, none, any, and the identical antecedent combination of a person + animal/thing.",
      examples: ["This is the best movie that I have ever watched.", "All that glitters is not gold.", "He was the only candidate that qualified."],
      exceptions: ["Do not use 'which' after 'all' when referring to things in general ('All that glitters', NOT 'All which glitters')."]
    },
    {
      rule: "Objective (accusative) case of pronoun must be used after prepositions, 'let', 'between', 'except', and 'but'.",
      examples: ["Between you and me, the decision is final.", "Let him and me complete the audit report.", "Nobody attended except her and me."],
      exceptions: ["After 'than' or 'as' in comparative structures, use subjective case if comparing subjects: 'He is taller than I (am)'."]
    },
    {
      rule: "Certain verbs take reflexive pronouns when used transitively without a direct object: avail of, adapt, absent (as a verb), enjoy, exert, resign, reconcile.",
      examples: ["He absented himself from the office today.", "She availed herself of the promotional opportunity."],
      exceptions: ["Verbs like keep, stop, turn, bathe, shave, hide do NOT take reflexive pronouns: say 'He hid behind the curtain' (NOT 'He hid himself')."]
    }
  ],
  commonMistakes: [
    "Writing 'One must do his duty' instead of 'One must do one's duty'.",
    "Writing 'Between you and I' instead of 'Between you and me'.",
    "Writing 'He enjoyed in the party' instead of 'He enjoyed himself at the party'.",
    "Writing 'I, you and he will go to Kolkata' for a pleasant journey (Correct: 'You, he and I will go').",
    "Using reflexive pronoun as subject: 'Myself is Subhash' (Correct: 'I am Subhash')."
  ],
  examTricks: [
    "Formula: Good deeds / general = 231 (You, he and I); Bad deeds / faults = 123 (I, you and he).",
    "Look out for 'Between' -> always requires objective case: 'Between him and me'.",
    "Look out for 'One' at the start -> quickly scan options for 'one's' to eliminate 'his/her'."
  ],
  memoryTricks: [
    "Polite 231: You first, He second, I last.",
    "Responsible 123: I take the blame first, You second, He third."
  ],
  revision: [
    "One -> one's / oneself (never his/himself).",
    "After 'let', 'between', 'except', use me/him/her/us/them.",
    "After 'all, the same, only, superlative', use 'that' as relative pronoun.",
    "Reflexive pronouns cannot stand alone as sentence subjects."
  ]
});

// 08 Verb
updateNote('data/notes/grammar/08-verb.json', {
  intro: "A verb is the operational engine of every sentence, denoting action, state, or possession. In Clerkship exams, questions center on transitive vs intransitive verbs, confusing pairs (lie/lay, rise/raise), stative non-continuous verbs, and causative verbs.",
  bengali: "Verb হলো ক্রিয়াপদ যা কোনো কাজ করা, হওয়া বা থাকা বোঝায়। পরীক্ষায় বিভ্রান্তিকর জোড় যেমন 'lie' (বিশ্রাম নেওয়া/শুয়ে থাকা: lie-lay-lain) বনাম 'lay' (কোনো কিছু নামিয়ে রাখা: lay-laid-laid) এবং 'rise' (নিজে ওঠা: rise-rose-risen) বনাম 'raise' (কাউকে বা কিছুকে তোলা: raise-raised-raised) থেকে প্রচুর প্রশ্ন আসে। তাছাড়া ইন্দ্রিয় বা মানসিক অনুভূতির ক্রিয়াপদগুলির (smell, hear, know, believe) কখনো Continuous Tense হয় না।",
  rules: [
    {
      rule: "Distinguish between intransitive 'lie' (recline/rest: lie - lay - lain) and transitive 'lay' (place something down: lay - laid - laid).",
      examples: ["The patient lay quietly in bed yesterday (intransitive past of lie).", "Please lay the ledger on the table (transitive present of lay).", "The foundation stone was laid by the Governor."],
      exceptions: ["'Lie' meaning to speak an untruth is regular: lie - lied - lied."]
    },
    {
      rule: "Distinguish between intransitive 'rise' (move upward on its own: rise - rose - risen) and transitive 'raise' (elevate something: raise - raised - raised).",
      examples: ["Prices of essential commodities rose steeply last month.", "The workers raised their voice against injustice."],
      exceptions: ["'Arise' (to occur or emerge) forms arise - arose - arisen: 'A dispute arose between the two parties'."]
    },
    {
      rule: "Stative verbs (verbs of perception, cognition, emotion, possession) do not take continuous/progressive forms.",
      examples: ["This perfume smells floral.", "I hear someone knocking at the door.", "He owns two residential plots."],
      exceptions: ["When used in an active, intentional sense, some can take continuous forms: 'The judge is hearing the petition tomorrow' or 'She is smelling the rose'."]
    },
    {
      rule: "Causative verbs (make, have, get, let) indicate that someone causes someone else to perform an action.",
      examples: ["The supervisor made the clerk retype the letter (make + person + bare infinitive).", "I got the mechanic to repair the printer (get + person + to-infinitive).", "She had her documents verified (have + object + past participle V3)."],
      exceptions: ["In passive voice, 'make' takes full infinitive: 'He was made to clean the corridor'."]
    },
    {
      rule: "Transitive verbs of order, request, and perception are directly followed by the object without an intrusive preposition.",
      examples: ["He ordered a cup of tea (NOT 'ordered for a cup of tea').", "She entered the conference room (NOT 'entered into the room').", "We discussed the budget proposal (NOT 'discussed about the proposal')."],
      exceptions: ["'Enter into' is correct when entering into an agreement, partnership, or contract."]
    }
  ],
  commonMistakes: [
    "Writing 'He laid in bed all morning' instead of 'He lay in bed all morning'.",
    "Writing 'The sun raised in the east' instead of 'The sun rose in the east'.",
    "Saying 'I am loving it' or 'I am remembering your face' in formal English.",
    "Writing 'We discussed about the matter' (Correct: 'We discussed the matter').",
    "Writing 'He ordered for two cups of coffee' (Correct: 'He ordered two cups of coffee')."
  ],
  examTricks: [
    "Direct verb check: Discuss, order, enter, resemble, attack, describe NEVER take a preposition when followed by their direct object.",
    "Lay vs Lie check: If there is a direct object receiving the action, use LAY/LAID. If no object, use LIE/LAY/LAIN.",
    "Passive causative: 'Have/get + something + V3' (e.g. 'I had my car repaired')."
  ],
  memoryTricks: [
    "Lie = I lie down (no object). Lay = I lay the book down (needs object).",
    "No Prep Needed: Don't 'order for' coffee, just 'order' coffee!"
  ],
  revision: [
    "Discuss, describe, order, enter, reach take no prepositions.",
    "Lie (recline) -> lay -> lain; Lay (place) -> laid -> laid.",
    "Rise (intransitive: rose/risen); Raise (transitive: raised/raised).",
    "Make someone do (bare infinitive); Get someone to do (to-infinitive)."
  ]
});

// 09 Adjective
updateNote('data/notes/grammar/09-adjective.json', {
  intro: "An adjective describes or limits a noun or pronoun by specifying quality, quantity, size, number, or condition. Competitive exams focus on comparative degrees, Latin adjectives ending in -ior, 'preferable', and quantifiers (little/few).",
  bengali: "Adjective হলো Noun বা Pronoun-এর দোষ, গুণ, অবস্থা, পরিমাণ ইত্যাদি নির্দেশক শব্দ। পরীক্ষায় প্রায়শই যেসব নিয়ম আসে: Latin Comparatives (senior, junior, superior, inferior, prior) এদের পর 'than' বসে না, সর্বদা 'to' বসে এবং এদের আগে 'more' বসে না। এছাড়া 'preferable'-এর পরেও 'to' বসে। 'Little/a little/the little' ব্যবহৃত হয় Uncountable Noun-এর সাথে এবং 'Few/a few/the few' ব্যবহৃত হয় Countable Noun-এর সাথে।",
  rules: [
    {
      rule: "Latin comparative adjectives ending in -ior (senior, junior, superior, inferior, prior, anterior, posterior) are followed by 'to', never 'than', and cannot be modified by 'more'.",
      examples: ["Mr. Sen is senior to Mr. Roy by two years.", "This imported fabric is superior to that domestic one.", "Prior to his transfer, he cleared all pending files."],
      exceptions: ["Do not say 'more senior to' or 'senior than'; both are common double-comparative exam traps."]
    },
    {
      rule: "The adjective 'preferable' itself contains a comparative meaning and must be followed by 'to', never 'than', and must never be preceded by 'more'.",
      examples: ["Milk is preferable to tea for breakfast.", "A peaceful compromise is preferable to litigation."],
      exceptions: ["Do not write 'more preferable' or 'preferable than'."]
    },
    {
      rule: "Distinguish between 'little / a little / the little' (uncountable quantity) and 'few / a few / the few' (countable numbers).",
      examples: ["He has little hope of recovery (almost none, negative).", "A little knowledge is a dangerous thing (some, positive).", "The little money he possessed was stolen (all of that small amount).", "Few candidates cleared the preliminary screening (hardly any).", "A few friends visited him in the hospital."],
      exceptions: ["'Less' is used for uncountable quantities, while 'fewer' is used for countable nouns: 'fewer applicants', 'less expenditure'."]
    },
    {
      rule: "When comparing two qualities of the SAME person or thing, use 'more + positive degree', never the '-er' comparative ending.",
      examples: ["He is more wise than brave (comparing two virtues of the same person).", "The river is more broad than deep."],
      exceptions: ["If comparing two different entities, the normal '-er' ending applies: 'He is wiser than his brother'."]
    },
    {
      rule: "Double comparatives and double superlatives must be avoided in standard formal English.",
      examples: ["He is taller than his cousin (NOT 'more taller').", "Mount Everest is the highest peak (NOT 'the most highest')."],
      exceptions: ["Parallel progressive structures correctly use two comparatives: 'The higher you climb, the colder it gets'."]
    }
  ],
  commonMistakes: [
    "Writing 'He is senior than me' instead of 'He is senior to me'.",
    "Writing 'Tea is more preferable than coffee' instead of 'Tea is preferable to coffee'.",
    "Writing 'There are less students in the class' instead of 'There are fewer students'.",
    "Writing 'He is wiser than brave' instead of 'He is more wise than brave'.",
    "Writing 'He is the most cleverest boy' (Correct: 'the cleverest boy')."
  ],
  examTricks: [
    "The '-ior' Rule: Any adjective ending in -ior (senior, junior, superior, inferior, prior) takes 'to', never 'than'.",
    "Prefer / Preferable Rule: Always pairs with 'to'. Never accept 'than' or 'more'.",
    "Quantity check: Use 'fewer' for items you can count on fingers; use 'less' for volume/mass."
  ],
  memoryTricks: [
    "LATIN = TO: Senior to, Junior to, Prior to, Superior to.",
    "LITTLE = LIQUID (uncountable mass); FEW = FINGERS (countable items)."
  ],
  revision: [
    "Latin adjectives (-ior) take 'to', not 'than'.",
    "Preferable takes 'to', never 'more' or 'than'.",
    "Comparing two qualities of one person -> more + positive degree.",
    "Fewer for countable plural; less for uncountable singular."
  ]
});

// 10 Adverb
updateNote('data/notes/grammar/10-adverb.json', {
  intro: "An adverb modifies a verb, an adjective, or another adverb by indicating manner, place, time, frequency, degree, or reason. Key exam focal points are the position of adverbs (MPT rule), negative inversion (Hardly/Scarcely/No sooner), and confusing adjective-adverb pairs.",
  bengali: "Adverb হলো সেই শব্দ যা কোনো Verb, Adjective বা অন্য কোনো Adverb-এর বৈশিষ্ট্য বা অবস্থা প্রকাশ করে। বাক্যে Adverb বসার সাধারণ নিয়ম হলো MPT (Manner -> Place -> Time)। যেমন: 'She sang beautifully (Manner) in the hall (Place) yesterday (Time)'। নেতিবাচক শব্দ (Hardly, Scarcely, Seldom, Never, No sooner) দিয়ে বাক্য শুরু হলে Subject-এর আগে Auxiliary Verb বসে, যাকে 'Inversion' বলে।",
  rules: [
    {
      rule: "Order of adverbs: When multiple adverbs modify the same verb, follow the M-P-T rule (Manner -> Place -> Time).",
      examples: ["He performed brilliantly (Manner) at the audition (Place) yesterday (Time).", "She studied quietly in her room last night."],
      exceptions: ["With verbs of movement (go, come, arrive), place precedes manner: 'He arrived at the venue promptly'."]
    },
    {
      rule: "Negative adverbial inversion: When a sentence begins with a negative or restrictive adverb (Hardly, Scarcely, Barely, Seldom, Never, No sooner), the auxiliary verb precedes the subject.",
      examples: ["Hardly had he entered the room when the telephone rang.", "No sooner did the bell ring than the students dispersed.", "Seldom have I witnessed such administrative dedication."],
      exceptions: ["'Hardly/Scarcely' pairs strictly with 'when/before', while 'No sooner' pairs strictly with 'than'."]
    },
    {
      rule: "Distinguish between 'very' (modifies positive degree adjectives and present participles -ing) and 'much' (modifies comparative degree adjectives and past participles -ed).",
      examples: ["She is very intelligent.", "This book is very interesting.", "He is much wiser than his colleagues.", "I was much grieved by the news."],
      exceptions: ["Certain past participles indicating state take 'very': very tired, very pleased, very limited."]
    },
    {
      rule: "Words ending in -ly like friendly, cowardly, brotherly, miserly, scholarly are ADJECTIVES, not adverbs; to use them as adverbs, use phrases like 'in a friendly manner'.",
      examples: ["He behaved in a cowardly manner (NOT 'He behaved cowardly').", "She spoke to the newcomers in a friendly way."],
      exceptions: ["'Fast', 'hard', 'straight', 'late', 'daily' function as both adjectives and adverbs with no spelling change."]
    },
    {
      rule: "'Too ... to' carries a negative implication (so excessive that something cannot occur); do not combine 'too' with positive affirmations where 'very' is intended.",
      examples: ["He is too frail to walk unassisted (meaning: he is so frail that he cannot walk).", "I am very happy to meet you (NOT 'I am too happy to meet you', unless expressing overwhelm)."],
      exceptions: ["'Too ... to' transformed into complex sentence becomes 'so ... that ... cannot'."]
    }
  ],
  commonMistakes: [
    "Writing 'Hardly had I reached when than the train left' (Hardly takes 'when', not 'than').",
    "Writing 'No sooner did he saw the police' (After 'did', use V1: 'did he see').",
    "Writing 'He ran fastly' (The word 'fastly' does not exist in English; use 'fast').",
    "Writing 'He is very taller than me' instead of 'much taller'.",
    "Writing 'He treated us friendly' instead of 'in a friendly manner'."
  ],
  examTricks: [
    "Inversion Check: Negative adverb at start -> AUXILIARY + SUBJECT (e.g. 'Hardly had he', NOT 'Hardly he had').",
    "Conjunction Pairing: No sooner ... THAN; Hardly/Scarcely ... WHEN.",
    "Fast/Hard rule: 'Fast' and 'hard' are both adjective and adverb. 'Fastly' is always an error!"
  ],
  memoryTricks: [
    "M-P-T = Manner, Place, Time in order.",
    "NO SOONER has an 'O', so it goes with THAN (has an 'A'); HARDLY goes with WHEN."
  ],
  revision: [
    "Hardly / Scarcely take 'when'; No sooner takes 'than'.",
    "Negative words at sentence start trigger auxiliary-subject inversion.",
    "Very + positive degree / V-ing; Much + comparative degree / V-ed.",
    "Adjectives in -ly (friendly, cowardly) require 'in a ... manner' for adverbial use."
  ]
});

// 11 Conjunction
updateNote('data/notes/grammar/11-conjunction.json', {
  intro: "Conjunctions are connectors that link words, phrases, or clauses. Competitive examinations thoroughly assess correlative conjunction pairs, grammatical parallelism, and avoiding double conjunction errors.",
  bengali: "Conjunction হলো সংযোজক অব্যয় যা শব্দ বা বাক্যকে যুক্ত করে। পরীক্ষায় সবচেয়ে বেশি আসে Correlative Conjunctions (জোড়া শব্দ) যেমন: 'not only ... but also', 'neither ... nor', 'either ... or', 'both ... and', 'scarcely ... when', 'lest ... should'। এই জোড়াগুলির ক্ষেত্রে দুটি অংশেই ব্যাকরণগত সমতা বা Parallelism বজায় রাখতে হয়। এছাড়া 'Although/Though'-এর সাথে কখনো 'but' বসে না, 'yet' বসে বা কেবল কমা (,) বসে।",
  rules: [
    {
      rule: "Correlative conjunctions must be positioned to maintain strict grammatical parallelism (both elements must precede identical parts of speech).",
      examples: ["He not only lost his wallet but also misplaced his passport (Verb + Verb).", "She is both an accomplished author and a talented musician (Noun + Noun)."],
      exceptions: ["Do not say 'He not only visited Kolkata but Delhi as well' -> write 'He visited not only Kolkata but also Delhi'."]
    },
    {
      rule: "The conjunction 'lest' means 'for fear that' or 'in order that not' and is strictly followed by 'should' (or subjunctive bare infinitive), never 'not' or 'would/will'.",
      examples: ["Walk carefully lest you should stumble.", "Revise your formulas lest you should forget them in the examination hall."],
      exceptions: ["Never add 'not' after 'lest' because 'lest' itself is inherently negative."]
    },
    {
      rule: "'Although' or 'Though' is followed by 'yet' or a simple comma, but NEVER by 'but'.",
      examples: ["Although he worked diligently, yet he failed to achieve the top rank.", "Though it was pouring rain, he went out on duty."],
      exceptions: ["Writing 'Although he was poor, but he was honest' is a very common double-conjunction blunder."]
    },
    {
      rule: "Strict fixed correlative pairings: 'Neither ... nor', 'Either ... or', 'Both ... and', 'Between ... and', 'From ... to'.",
      examples: ["Both Sourav and Rahul attended the meeting (NOT 'Both Sourav as well as Rahul').", "The bank remains open between 10:00 AM and 4:00 PM (NOT 'between 10 AM to 4 PM')."],
      exceptions: ["Do not use 'as well as' after 'both'; 'both' strictly governs 'and'."]
    },
    {
      rule: "'Unless' means 'if not' (condition), while 'Until' means 'up to the time when' (time); neither clause can contain a negative word like 'not'.",
      examples: ["You cannot succeed unless you persevere.", "Wait here until the supervisor returns."],
      exceptions: ["Do not write 'Unless you do not hurry' -> write 'Unless you hurry'."]
    }
  ],
  commonMistakes: [
    "Writing 'Although he was ill, but he attended office' (Correct: 'Although he was ill, he attended...').",
    "Writing 'Work hard lest you will fail' (Correct: 'lest you should fail').",
    "Writing 'Work hard lest you should not fail' (Lest is negative, omit 'not').",
    "Writing 'Both Mohan as well as Sohan came' (Correct: 'Both Mohan and Sohan').",
    "Writing 'Between 2 PM to 5 PM' (Correct: 'Between 2 PM and 5 PM')."
  ],
  examTricks: [
    "Lest Trap: Whenever you see 'lest', immediately check if the following verb has 'should' and make sure there is NO 'not'.",
    "Both Trap: 'Both' must pair with 'and', never 'as well as'.",
    "Between Trap: 'Between' takes 'and' (From takes 'to')."
  ],
  memoryTricks: [
    "Lest = Should (Lest You Should).",
    "Both + And (Never As Well As).",
    "Between + And; From + To."
  ],
  revision: [
    "Parallelism: 'Not only A but also B' must attach to the same part of speech.",
    "Lest is always followed by 'should' and never takes 'not'.",
    "Although/Though takes 'yet' or comma, never 'but'.",
    "Unless expresses condition; Until expresses time."
  ]
});

// 12 Modal Verbs
updateNote('data/notes/grammar/12-modal-verbs.json', {
  intro: "Modal auxiliary verbs (can, could, may, might, shall, should, will, would, must, ought to, used to, need, dare) express modality: permission, ability, obligation, probability, or necessity. In WBPSC Clerkship, key questions test semi-modals (need/dare), past unfulfilled actions (should have / must have), and conditional deductions.",
  bengali: "Modal Verbs হলো এমন সহায়ক ক্রিয়াপদ যা ক্ষমতা (can/could), সম্ভাবনা (may/might), বাধ্যবাধকতা (must/ought to), বা উপদেশ (should) প্রকাশ করে। Modals-এর পর সর্বদা ক্রিয়ার Base Form বা V1 বসে। তবে 'Need' এবং 'Dare' যখন Negative বা Interrogative বাক্যে Semi-modal হিসেবে বসে, তখন এদের পর 'to' বসে না ('You need not go'); কিন্তু Affirmative বাক্যে মূল ক্রিয়া হলে 'to' বসে ('He needs to go')।",
  rules: [
    {
      rule: "Modal verbs are always followed directly by the base form of the main verb (bare infinitive V1), without 'to' (except ought to and used to).",
      examples: ["She can draft administrative notices efficiently.", "You must submit the application before 5:00 PM.", "Candidates should carry their original identity proof."],
      exceptions: ["'Ought to' and 'used to' inherently incorporate 'to': 'We ought to respect our mentors'."]
    },
    {
      rule: "'Need' and 'Dare' function as semi-modals (marginal modals): in negative sentences and questions, they take a bare infinitive without 'to' and do not add -s for third-person singular.",
      examples: ["You need not worry about the documentation (modal: bare infinitive).", "Dare he question the official order?", "He needs to consult an advocate (main verb: takes 'to' and -s)."],
      exceptions: ["Do not write 'He needs not go' -> write 'He need not go'."]
    },
    {
      rule: "Expressing unfulfilled past obligations and actions: use 'Modal + have + V3'.",
      examples: ["You should have informed the station master earlier (obligation not fulfilled).", "He could have cleared the examination with better preparation (unrealized capability).", "The train must have reached Sealdah by now (strong past deduction)."],
      exceptions: ["'Need not have + V3' means an action was performed unnecessarily: 'You need not have purchased extra stamps'."]
    },
    {
      rule: "Distinguish between 'May' (factual possibility, formal permission) and 'Might' (weaker remote possibility, hypothetical situations).",
      examples: ["It may rain this afternoon (fair probability).", "If he practiced harder, he might qualify (remote probability).", "May I inspect the ledger, sir? (formal permission)."],
      exceptions: ["'Can' denotes ability/informal permission; 'May' denotes formal polite request."]
    },
    {
      rule: "'Used to' expresses discontinued past habits; 'Be/get used to + V-ing' expresses being accustomed to a condition.",
      examples: ["He used to commute by tram during his college days (past habit).", "He is used to working under administrative pressure (accustomed to)."],
      exceptions: ["When preceded by 'be' (is/are/was/were), 'used to' requires a gerund (-ing): 'I am used to waking up early'."]
    }
  ],
  commonMistakes: [
    "Writing 'You need not to worry' instead of 'You need not worry'.",
    "Writing 'He dares not to oppose him' instead of 'He dare not oppose him'.",
    "Writing 'He can be able to do this' (Redundant: 'can' and 'be able to' mean the exact same thing; use one).",
    "Writing 'We ought obey the law' instead of 'We ought to obey the law'.",
    "Writing 'He must to go' instead of 'He must go'."
  ],
  examTricks: [
    "Redundancy Trap: Never combine 'can/could' with 'be able to'.",
    "Semi-modal check: Look for 'need not' or 'dare not' -> ensure NO '-s' and NO 'to'.",
    "Past regret formula: 'Should have + V3' signifies an unperformed past duty."
  ],
  memoryTricks: [
    "Need NOT / Dare NOT = NO 's', NO 'to'.",
    "Can = Ability; May = Permission/Possibility."
  ],
  revision: [
    "Modals take bare infinitive (V1), never -ing or -ed directly.",
    "Need not and dare not do not take 'to' or third-person -s.",
    "Should have + V3 indicates an action that ought to have occurred in the past.",
    "Be used to + V-ing signifies being accustomed to something."
  ]
});

// 13 Active and Passive Voice
updateNote('data/notes/grammar/13-active-passive-voice.json', {
  intro: "Voice indicates whether the subject performs the action (Active) or receives the action (Passive). In government exams, transformations involving imperative sentences, interrogative structures, prepositional verbs, and quasi-passive verbs are tested regularly.",
  bengali: "Active Voice-এ Subject নিজে সরাসরি কাজটি সম্পন্ন করে, আর Passive Voice-এ Subject-এর ওপর কাজের প্রভাব পড়ে। পরীক্ষায় বিশেষ করে Imperative Sentence (যেমন: 'Do this' -> 'Let this be done'), Prepositional Verbs (যেমন: 'laugh at' থাকলে Passive-এ 'at' বাদ দেওয়া যায় না: 'He was laughed at by them'), এবং নির্দিষ্ট Verbs যেগুলি 'by'-এর পরিবর্তে অন্য Preposition নেয় (যেমন: 'known to', 'surprised at', 'pleased with') তা থেকে প্রশ্ন আসে।",
  rules: [
    {
      rule: "Fundamental transformation rule: The object of the active sentence becomes the subject of the passive sentence; verb changes to 'appropriate form of be + past participle (V3)'.",
      examples: ["Active: The collector signed the warrant. -> Passive: The warrant was signed by the collector.", "Active: They are constructing a flyover. -> Passive: A flyover is being constructed by them."],
      exceptions: ["Intransitive verbs (verbs without objects like die, arrive, sleep, occur) cannot normally be converted into passive voice."]
    },
    {
      rule: "Imperative sentences expressing order take 'Let + object + be + V3'; expressing advice take 'Object + should be + V3'.",
      examples: ["Active: Close the dispensary doors immediately. -> Passive: Let the dispensary doors be closed immediately.", "Active: Respect your elders. -> Passive: Your elders should be respected.", "Active: Do not insult the needy. -> Passive: Let the needy not be insulted."],
      exceptions: ["Intransitive imperatives change using 'You are ordered/requested/advised to + V1': 'Please sit down' -> 'You are requested to sit down'."]
    },
    {
      rule: "Certain verbs take fixed prepositions other than 'by' in passive voice.",
      examples: ["Known to: I know him. -> He is known to me.", "Surprised at: His conduct surprised me. -> I was surprised at his conduct.", "Pleased with: Her reply pleased the officer. -> The officer was pleased with her reply.", "Contained in: This jar contains honey. -> Honey is contained in this jar."],
      exceptions: ["Do not use 'by' with know, surprise, please, satisfy, astonish, contain, embody."]
    },
    {
      rule: "Prepositional verbs (phrasal verbs) retain their fixed prepositions in passive voice; do not drop the preposition.",
      examples: ["Active: The villagers laughed at the eccentric stranger. -> Passive: The eccentric stranger was laughed at by the villagers.", "Active: We must look into the complaint. -> Passive: The complaint must be looked into by us."],
      exceptions: ["Dropping the preposition 'at' or 'into' is a standard examiner trap in multiple-choice options."]
    },
    {
      rule: "Interrogative transformations: Questions beginning with 'Who' change to 'By whom' or 'Who ... by?'; 'Whom' changes to 'Who'.",
      examples: ["Active: Who authored Gitanjali? -> Passive: By whom was Gitanjali authored?", "Active: Whom did you invite to the seminar? -> Passive: Who was invited by you to the seminar?"],
      exceptions: ["Maintain auxiliary inversion in questions: 'By whom was the window broken?' (NOT 'By whom the window was broken')."]
    }
  ],
  commonMistakes: [
    "Writing 'He is known by me' instead of 'He is known to me'.",
    "Writing 'I was surprised by the news' instead of 'surprised at the news'.",
    "Dropping the preposition: 'He was laughed by them' instead of 'laughed at by them'.",
    "Writing 'Let the work is done' instead of 'Let the work be done'.",
    "Using passive voice for intransitive verbs: 'He was died in an accident' (Incorrect; say 'He died in an accident')."
  ],
  examTricks: [
    "Preposition match: Known -> TO; Surprised/Shocked -> AT; Pleased/Satisfied -> WITH; Contained -> IN.",
    "Imperative check: Look for 'Let + Obj + BE + V3'.",
    "Continuous tense passive always contains 'BEING' (is being done, was being written)."
  ],
  memoryTricks: [
    "Passive Be-Formula: Tense form of BE + V3 is the hallmark of every passive verb.",
    "Fixed Passive Prepositions: Known TO, Pleased WITH, Surprised AT, Contained IN."
  ],
  revision: [
    "Continuous tenses take 'being + V3' in the passive voice.",
    "Perfect tenses take 'been + V3' in the passive voice.",
    "Phrasal verbs retain their dependent prepositions in passive constructions.",
    "Imperative orders: Let + Object + be + V3."
  ]
});

// 14 Direct and Indirect Speech
updateNote('data/notes/grammar/14-direct-indirect-speech.json', {
  intro: "Narration (Direct and Indirect Speech) involves reporting words spoken by someone. Master the rules of tense backshifting, changes in pronouns, modal shift, shifts in time/place adverbs, and reporting interrogative/imperative/exclamatory sentences.",
  bengali: "Narration-এ Reporting Verb যদি Past Tense-এ থাকে (যেমন: 'said'), তবে Reported Speech-এর Tense সাধারণত পরিবর্তিত হয় (Present Simple -> Past Simple, Present Continuous -> Past Continuous, Present Perfect -> Past Perfect, Simple Past -> Past Perfect)। তবে চিরন্তন সত্য (Universal Truth) বা প্রবাদ বাক্যের ক্ষেত্রে Tense-এর কোনো পরিবর্তন হয় না। প্রশ্নবোধক বাক্যে 'if/whether' বা Wh-word বসে এবং বাক্যটি সাধারণ বর্ণনামূলক (Assertive) রূপ নেয়।",
  rules: [
    {
      rule: "Tense shift rule: If the reporting verb is in the past tense ('said'), the reported speech shifts backward in time.",
      examples: [
        "Direct: He said, 'I write official notes.' -> Indirect: He said that he wrote official notes.",
        "Direct: She said, 'I have cleared the preliminary stage.' -> Indirect: She said that she had cleared the preliminary stage.",
        "Direct: Rahul said, 'I saw him yesterday.' -> Indirect: Rahul said that he had seen him the previous day."
      ],
      exceptions: ["If the reporting verb is in Present or Future tense ('says', 'will say'), the tense of the reported speech does NOT change: 'He says, I am ready' -> 'He says that he is ready'."]
    },
    {
      rule: "Universal truth / scientific fact / historical fact / habitual action exception: No tense shift occurs regardless of past reporting verb.",
      examples: [
        "Direct: The teacher said, 'The Earth rotates on its axis.' -> Indirect: The teacher said that the Earth rotates on its axis.",
        "Direct: He said, 'Honesty is the best policy.' -> Indirect: He said that honesty is the best policy."
      ],
      exceptions: ["Do not backshift 'rotates' to 'rotated' or 'is' to 'was' in universal maxims."]
    },
    {
      rule: "Interrogative sentences: Change reporting verb to 'asked/inquired'; use 'if' or 'whether' for yes/no questions; use the wh-word itself for wh-questions; convert question structure to assertive word order (Subject + Verb).",
      examples: [
        "Direct: He said to me, 'Are you attending the lecture?' -> Indirect: He asked me if I was attending the lecture.",
        "Direct: She said to the clerk, 'Where is the counter?' -> Indirect: She asked the clerk where the counter was."
      ],
      exceptions: ["Never retain the interrogative inversion in indirect speech: say 'where he was', NOT 'where was he'."]
    },
    {
      rule: "Imperative sentences: Change reporting verb to ordered, requested, advised, warned, or commanded; connect using 'to + V1' (or 'not to + V1' for negative imperatives).",
      examples: [
        "Direct: The inspector said to the constables, 'Cordon off the entrance.' -> Indirect: The inspector ordered the constables to cordon off the entrance.",
        "Direct: The doctor said to him, 'Do not skip your dosage.' -> Indirect: The doctor advised him not to skip his dosage."
      ],
      exceptions: ["'Forbade' itself means 'ordered not to'; do not use 'not' with forbade: 'The officer forbade the visitors to take photographs'."]
    },
    {
      rule: "Shift in time and place adverbials when reporting in past context: now -> then, today -> that day, yesterday -> the previous day / the day before, tomorrow -> the next day / the following day, here -> there, this -> that, ago -> before.",
      examples: ["Direct: He said, 'I will inspect the site tomorrow.' -> Indirect: He said that he would inspect the site the following day."],
      exceptions: ["If the action is reported in the same place/day, shifts are omitted."]
    }
  ],
  commonMistakes: [
    "Writing 'He asked me where did I live' instead of 'where I lived'.",
    "Writing 'The teacher said that water boiled at 100°C' instead of 'boils at 100°C' (universal truth).",
    "Writing 'He said to me that...' instead of 'He told me that...' ('said to' becomes 'told').",
    "Writing 'He told that...' ('told' requires a person object: 'told me that...').",
    "Using double negative: 'He forbade me not to go' (Correct: 'He forbade me to go')."
  ],
  examTricks: [
    "Question transformation trick: In indirect speech, the question mark is ALWAYS dropped and the word order is SUBJECT + VERB.",
    "Say vs Tell check: 'Said to + person' becomes 'told + person'. Never write 'told that' without an object.",
    "Forbade trick: 'Forbade' already contains 'not', so use positive 'to + V1'."
  ],
  memoryTricks: [
    "Question to Statement: Indirect questions always end with a period (.), never a question mark (?).",
    "Universal Truth Stays True: The sun never 'rotated' in the past; it always 'rotates'."
  ],
  revision: [
    "Simple Past -> Past Perfect; Present Perfect -> Past Perfect.",
    "Yes/No questions take if/whether; Wh-questions retain the Wh-word.",
    "Imperatives connect with 'to + V1' or 'not to + V1'.",
    "Yesterday -> the day before; Tomorrow -> the following day; Now -> then."
  ]
});

console.log("Grammar enhancement part 1 complete!");
