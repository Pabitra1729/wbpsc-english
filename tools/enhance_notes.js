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
    console.log(`Enriched note: ${filePath}`);
  }
}

// 01 Parts of Speech
updateNote('data/notes/grammar/01-parts-of-speech.json', {
  intro: "Every word in the English language is classified into one of eight fundamental parts of speech based on its syntactic function within a sentence. A single word can function as multiple parts of speech depending on its context.",
  bengali: "একটি বাক্যে কোনো শব্দ কী ভূমিকা পালন করছে, তার ওপর ভিত্তি করে Parts of Speech নির্ধারিত হয়। একটি শব্দ একা কোনো নির্দিষ্ট Part of Speech নয়—বাক্যে তার কাজই আসল পরিচয় (যেমন: 'fast' শব্দটি Adjective বা Adverb উভয়ই হতে পারে)।",
  rules: [
    {
      rule: "Nouns function as naming words (persons, places, things, abstract states). Proper nouns always capitalize.",
      examples: ["Kolkata is the cultural capital.", "Integrity is admired by all."],
      exceptions: ["When proper nouns are used as common nouns, they take articles: 'Kalidasa is the Shakespeare of India'."]
    },
    {
      rule: "Pronouns replace nouns to prevent tedious repetition. They must agree in number, gender, and case with their antecedents.",
      examples: ["Rina lost her umbrella, so she bought a new one.", "Everyone must bring their own admit card."],
      exceptions: ["Indefinite pronoun 'one' must strictly be followed by 'one's', never 'his'."]
    },
    {
      rule: "Verbs denote actions, processes, or states of being. Stative/linking verbs connect subjects to adjective complements.",
      examples: ["The clerk verified the files.", "The soup smells delicious."],
      exceptions: ["Verbs of sensation (smell, taste, look) do not take adverbs of manner when functioning as linking verbs."]
    },
    {
      rule: "Adjectives qualify nouns or pronouns by answering: Which one? What kind? How many?",
      examples: ["A diligent aspirant cleared the examination.", "Several applicants were absent."],
      exceptions: ["Some adjectives ending in '-ly' (friendly, lovely, cowardly, scholarly) look like adverbs but are strictly adjectives."]
    },
    {
      rule: "Adverbs modify verbs, adjectives, or other adverbs by answering: How? When? Where? To what extent?",
      examples: ["The train arrived punctually.", "She was extremely tired."],
      exceptions: ["'Fast', 'hard', 'early' have the exact same form as both adjective and adverb ('fastly' does not exist)."]
    },
    {
      rule: "Prepositions establish spatial, temporal, or logical relations between a noun/pronoun and other elements.",
      examples: ["He sat beside his father.", "The examination begins at 10:00 AM."],
      exceptions: ["A preposition is always followed by an objective case pronoun: 'Between you and me'."]
    },
    {
      rule: "Conjunctions join words, phrases, or clauses. Coordinating conjunctions connect grammatically equal units.",
      examples: ["He worked diligently, yet he missed the cut-off by one mark."],
      exceptions: ["Correlative pairs (neither..nor, not only..but also) require strict grammatical parallelism."]
    },
    {
      rule: "Interjections express abrupt emotional states and stand grammatically independent from the main sentence.",
      examples: ["Bravo! You have secured the first rank.", "Alas! The heritage library was gutted by fire."],
      exceptions: ["They do not govern subject-verb agreement or tense."]
    }
  ],
  commonMistakes: [
    "Labelling a word by appearance rather than contextual function (e.g., treating 'fast' in 'he runs fast' as an adjective).",
    "Using an adjective instead of an adverb to modify a dynamic verb (e.g., saying 'he writes good' instead of 'he writes well').",
    "Treating '-ly' words like 'friendly' or 'brotherly' as adverbs; they modify nouns and are adjectives."
  ],
  examTricks: [
    "Always identify the main finite verb first to map out the core subject and object.",
    "Ask 'What kind?' for Adjectives and 'How / When / Where?' for Adverbs.",
    "Remember: Linking verbs (appear, sound, smell, taste, feel) take Adjectives, not Adverbs."
  ],
  memoryTricks: [
    "N-P-V-A-A-P-C-I: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection."
  ],
  revision: [
    "Context decides the part of speech, not isolated dictionary entries.",
    "Adjective qualifies noun/pronoun; Adverb qualifies verb, adjective, or another adverb.",
    "Prepositions govern objective case pronouns (me, him, them, whom)."
  ]
});

// 03 Subject-Verb Agreement
updateNote('data/notes/grammar/03-subject-verb-agreement.json', {
  intro: "Subject–verb agreement requires that a finite verb agree with its real grammatical subject in number (singular/plural) and person (1st/2nd/3rd). The key to WBPSC questions is ignoring intervening prepositional modifiers and identifying the true grammatical head.",
  bengali: "Subject এবং Verb-এর মধ্যে বচন (Number) ও পুরুষ (Person)-এর সামঞ্জস্য বজায় রাখাই হলো Subject-Verb Agreement। বাক্যের আসল Subject-কে চেনা জরুরি, কারণ Subject ও Verb-এর মাঝের অতিরিক্ত শব্দগুচ্ছ (prepositional phrase) কখনোই Verb-কে প্রভাবিত করে না।",
  rules: [
    {
      rule: "Intervening prepositional phrases do not affect the verb: The subject alone controls the verb.",
      examples: [
        "The quality of these mangoes is exceptional (Subject = 'quality', not 'mangoes').",
        "A bouquet of red roses was presented to the guest."
      ],
      exceptions: ["Fractions and percentages of uncountable nouns take singular, while of plural nouns take plural."]
    },
    {
      rule: "When two subjects are joined by 'as well as', 'along with', 'together with', 'in addition to', 'accompanied by', the verb agrees strictly with the FIRST subject.",
      examples: [
        "The teacher, along with his students, has arrived.",
        "The players, as well as the coach, were felicitated."
      ],
      exceptions: ["Do not be tempted by the plural noun nearest to the verb."]
    },
    {
      rule: "When subjects are joined by 'either...or', 'neither...nor', or 'not only...but also', the verb agrees with the NEAREST subject (proximity rule).",
      examples: [
        "Neither the principal nor the teachers were present.",
        "Neither the teachers nor the principal was present."
      ],
      exceptions: ["In interrogative sentences, the verb agrees with the subject immediately following it."]
    },
    {
      rule: "'Each', 'Every', 'Everyone', 'Someone', 'Nobody', 'Either of', 'Neither of' take a strictly SINGULAR verb.",
      examples: [
        "Each of the applicants has submitted the application form.",
        "Neither of the two plans was approved by the board."
      ],
      exceptions: ["When 'each' appears AFTER a plural subject, it takes a plural verb: 'The boys each have a notebook'."]
    },
    {
      rule: "'A number of + plural noun' takes a PLURAL verb; 'The number of + plural noun' takes a SINGULAR verb.",
      examples: [
        "A number of candidates are waiting outside.",
        "The number of candidates appearing is very large."
      ],
      exceptions: ["'A number' denotes many (plural); 'The number' denotes a specific count/figure (singular)."]
    },
    {
      rule: "'More than one + singular noun' takes a SINGULAR verb; 'More than two/three' or 'More + plural noun + than one' takes a PLURAL verb.",
      examples: [
        "More than one passenger was injured.",
        "More passengers than one were injured."
      ],
      exceptions: ["Notice the position of the noun: 'More than one candidate was' vs 'More candidates than one were'."]
    },
    {
      rule: "'Many a + singular noun' takes a SINGULAR verb and singular pronoun.",
      examples: [
        "Many a man has lost his life in the storm.",
        "Many a student fails due to lack of consistency."
      ],
      exceptions: ["'A great many' or 'A good many' takes a plural noun and plural verb."]
    },
    {
      rule: "Nouns expressing fixed amounts of money, periods of time, or distances regarded as a single unit take a SINGULAR verb.",
      examples: [
        "Ten miles is a long distance to walk on foot.",
        "Fifty thousand rupees is a substantial sum."
      ],
      exceptions: ["When considered as individual currency units or separated components, plural verbs are used."]
    }
  ],
  commonMistakes: [
    "Looking at the nearest plural noun inside 'of...' and using a plural verb (Proximity trap).",
    "Using a plural verb after 'Neither of the boys...' ('Neither of' is strictly singular).",
    "Using a plural verb when joining with 'as well as' (verb must agree with the FIRST subject)."
  ],
  examTricks: [
    "Eliminate 'of + noun' phrases mentally to find the isolated real subject.",
    "Formula for 'as well as / along with': Verb = Subject 1.",
    "Formula for 'either..or / neither..nor': Verb = Subject 2 (Nearest)."
  ],
  memoryTricks: [
    "FIRST for As-well-as; NEAREST for Neither-nor."
  ],
  revision: [
    "Neither/Either of + plural noun = SINGULAR verb.",
    "A number of = PLURAL verb; The number of = SINGULAR verb.",
    "Many a + singular noun = SINGULAR verb.",
    "Time, distance, money as single units = SINGULAR verb."
  ]
});

// 04 Articles
updateNote('data/notes/grammar/04-articles.json', {
  intro: "Articles (A, An, The) function as demonstrative adjectives. 'A' and 'An' are indefinite articles used before singular countable nouns, while 'The' is the definite article used to point out specific persons or things.",
  bengali: "Article দুই প্রকার: Indefinite (A, An) এবং Definite (The)। মনে রাখবেন, 'A' এবং 'An'-এর ব্যবহার পুরোপুরি উচ্চারণের শব্দের (vowel sound) ওপর নির্ভর করে, বানানের প্রথম অক্ষরের ওপর নয়।",
  rules: [
    {
      rule: "Choice between 'A' and 'An' is determined solely by SOUND, not spelling. 'An' precedes vowel sounds; 'A' precedes consonant sounds.",
      examples: [
        "An honest officer (silent 'h', begins with 'o' vowel sound).",
        "A European tourist (begins with consonant 'yu' sound).",
        "A university professor (begins with 'yu' consonant sound).",
        "An hour, an heir, an honorable person."
      ],
      exceptions: ["Abbreviations: An MP, an MLA, an FIR, an SP, an SDO (all start with vowel phoneme /e/)."]
    },
    {
      rule: "'The' is used before singular nouns representing an entire class or species.",
      examples: ["The cow is a useful animal.", "The banyan is a sacred tree."],
      exceptions: ["'Man' and 'Woman' representing humanity take NO article: 'Man is mortal'."]
    },
    {
      rule: "'The' is mandatory before names of rivers, mountain ranges, oceans, gulfs, sacred books, and unique natural objects.",
      examples: ["The Ganges, the Himalayas, the Indian Ocean, the Gita, the Sun."],
      exceptions: ["Single mountain peaks (Mount Everest, Kanchenjunga) and single islands take NO article."]
    },
    {
      rule: "Parallel comparison uses double 'The': 'The + comparative..., the + comparative...'.",
      examples: [
        "The higher you climb, the colder it gets.",
        "The more you read, the more you learn."
      ],
      exceptions: ["Both clauses must have symmetrical comparative structures."]
    },
    {
      rule: "Omission of Articles (Zero Article): No article is used before abstract nouns, materials, meals, languages, and games in general statements.",
      examples: [
        "Gold is a precious metal.",
        "Honesty is the best policy.",
        "She speaks English fluently.",
        "They had dinner together."
      ],
      exceptions: ["When made specific by 'of', use 'The': 'The gold of South Africa', 'The dinner we had yesterday'."]
    }
  ],
  commonMistakes: [
    "Writing 'an university' or 'an European' by looking at the vowel letter instead of the consonant sound /ju:/.",
    "Writing 'a MP' or 'a FIR' (pronounced /em-pee/ and /ef-aye-ar/, requiring 'an').",
    "Putting 'the' before individual mountain peaks like 'The Mount Everest' (incorrect)."
  ],
  examTricks: [
    "Sound Test: Pronounce the word aloud in Bengali—if it starts with অ, আ, এ, ও, use 'An'. If it starts with 'ইউ' (Yu) or 'ওয়া' (Wa), use 'A'.",
    "Remember: A one-rupee note, a university, a union, a unique book (all take 'A').",
    "Abbreviation test: M, N, F, L, S, H, R, X all start with vowel sounds (/e/) -> take 'An'."
  ],
  memoryTricks: [
    "Vowel Letter != Vowel Sound: Trust your ears, not your eyes."
  ],
  revision: [
    "A European, a university, a one-eyed man.",
    "An honest man, an hour, an MLA, an MP, an FIR.",
    "The Ganges, The Himalayas (ranges); but Mount Everest (peak, no 'The').",
    "The higher..., the cooler... (double comparative)."
  ]
});

// 05 Prepositions
updateNote('data/notes/grammar/05-prepositions.json', [
  {
    intro: "Prepositions show relationships of time, place, direction, and agency. WBPSC examinations heavily test 'Appropriate / Fixed Prepositions' where verbs, adjectives, and nouns require specific idiomatic pairings.",
    bengali: "Preposition বাক্যে Noun বা Pronoun-এর অবস্থান ও পারস্পরিক সম্পর্ক বোঝায়। PSC পরীক্ষায় সবচেয়ে বেশি প্রশ্ন আসে 'Appropriate Preposition' (নির্দিষ্ট শব্দের সাথে নির্দিষ্ট Preposition) থেকে, যার নিয়ম মুখস্থ রাখা আবশ্যক।",
    rules: [
      {
        rule: "Time prepositions: 'At' for specific clock time/moments; 'On' for days and dates; 'In' for months, years, and seasons.",
        examples: ["At 5:00 PM, at dawn, at night.", "On Monday, on 15th August.", "In July, in 1947, in winter."],
        exceptions: ["'In the morning / afternoon', but 'at dawn / at dusk / at night'."]
      },
      {
        rule: "'Since' denotes a specific point in time in perfect tenses; 'For' denotes a duration or period of time.",
        examples: ["He has been studying since 6:00 AM.", "He has lived here for ten years."],
        exceptions: ["In simple past or future, 'from' is used for starting points instead of 'since'."]
      },
      {
        rule: "'Beside' means by the side of (adjacent); 'Besides' means in addition to.",
        examples: ["She sat beside her mother.", "Besides English, he speaks Bengali fluently."],
        exceptions: ["Never mix the 's': beside = adjacent; besides = also."]
      },
      {
        rule: "Fixed Prepositions with Adjectives & Verbs:",
        examples: [
          "Senior to, junior to, superior to, inferior to, prior to (take 'to', never 'than').",
          "Abstain from, refrain from, prohibit from, prevent from (take 'from' + gerund).",
          "Accused of, guilty of, convicted of; but charged WITH.",
          "Good at mathematics, proficient in drafting, fond of sweets, proud of achievements."
        ],
        exceptions: ["'Agree with' a person; 'Agree to' a proposal."]
      },
      {
        rule: "No Preposition is used after transitive verbs like 'enter' (a room), 'discuss', 'describe', 'reach', 'order' (food), 'resemble'.",
        examples: ["He entered the classroom (NOT entered into).", "We discussed the matter (NOT discussed about)."],
        exceptions: ["'Enter into' is correct for entering an agreement, treaty, or alliance."]
      }
    ],
    commonMistakes: [
      "Using 'than' with senior, junior, prefer (always use 'to').",
      "Writing 'entered into the room' (say 'entered the room').",
      "Confusing 'beside' (next to) and 'besides' (in addition to)."
    ],
    examTricks: [
      "Agree WITH a person; Agree TO a proposal.",
      "Die OF a disease (cholera/cancer); Die FROM an indirect cause (overwork/snakebite); Die FOR a noble cause.",
      "Angry WITH a person; Angry AT an action or remark."
    ],
    memoryTricks: [
      "Latin comparatives (ending in -ior) always love 'TO'."
    ],
    revision: [
      "Senior to, superior to, prefer to.",
      "Suffer from, abstain from, prevent from + V-ing.",
      "Fond of, aware of, accused of; Charged with.",
      "No preposition after: reach, enter (physical), discuss, order."
    ]
  }
]);

console.log('Core notes enhanced successfully!');
