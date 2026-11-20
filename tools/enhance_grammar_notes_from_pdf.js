const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. DATA FOR PART A: ACTIVE AND PASSIVE VOICE (g13)
// ============================================================================

const voiceNote = {
  id: "g13",
  title: "Active & Passive Voice Mastery",
  intro: "Comprehensive study notes covering all voice change rules, 9 tenses, modal verbs, imperative sentences, two-object constructions, bare infinitives, prepositional verbs, impersonal passive, and prepositions other than 'by' as per the official WBPSC Clerkship syllabus.",
  bengali: `Active ও Passive Voice সংক্রান্ত সম্পূর্ণ নির্দেশিকা (WBPSC Clerkship স্পেশাল):
1. **ভয়েস পরিবর্তনের মূল ৫টি ধাপ**:
   • ধাপ ১: বাক্যের Subject, Verb এবং Object চিহ্নিত করুন।
   • ধাপ ২: Active-এর Object-কে Passive-এর Subject বানান। Pronoun হলে Subject রূপ দিন (me → I, him → he, them → they)।
   • ধাপ ৩: Tense ও Subject-এর Number/Person অনুযায়ী উপযুক্ত Be-Verb বসান (is/am/are, was/were, being, been, be)।
   • ধাপ ৪: মূল Verb-এর সর্বদা Past Participle (V3) রূপ ব্যবহার করুন।
   • ধাপ ৫: শেষে 'by' + Active-এর Subject (Object রূপে) যোগ করুন, অথবা Doer গৌণ বা অনির্দিষ্ট হলে (someone, people, they) তা বাদ দিন।

2. **Tense পরিবর্তনের নিয়মাবলী**:
   • Simple Present: is / am / are + V3
   • Present Continuous: is / am / are + being + V3
   • Present Perfect: has / have + been + V3
   • Simple Past: was / were + V3
   • Past Continuous: was / were + being + V3
   • Past Perfect: had + been + V3
   • Simple Future: will / shall + be + V3
   • Future Perfect: will / shall + have been + V3
   • Going to (Near Future): is / am / are going to + be + V3
   *(নোট: Present Perfect Continuous, Past Perfect Continuous, Future Continuous এবং Future Perfect Continuous সচরাচর Passive-এ রূপান্তরিত হয় না।)*

3. **বিশেষ ক্ষেত্র ও সাধারণ ফাঁদ (Exam Traps)**:
   • **Wh-Questions**: 'Who' থাকলে Passive শুরু হয় 'By whom' দিয়ে (Who wrote this? → By whom was this written?)। 'Whom' থাকলে Passive শুরু হয় 'Who' দিয়ে (Whom did you meet? → Who was met by you?)।
   • **Imperative Sentences**: আদেশ বোঝালে: Let + object + be + V3 (Let the door be opened) অথবা You are ordered to...। অনুরোধ বোঝালে: You are requested to...। উপদেশ বোঝালে: You are advised to... অথবা Subject + should be + V3। নিষেধ বোঝালে: You are forbidden to... / Let + object + not be + V3।
   • **Bare Infinitive (Make, See, Hear, Watch, Let)**: Active বাক্যে 'to' ছাড়া বসে, কিন্তু Passive করার সময় 'to' যুক্ত করতে হয় (They made him work hard → He was made to work hard by them)।
   • **Prepositional Verbs (Phrasal Verbs)**: Verb-এর সাথে যুক্ত Preposition কখনই বাদ দেওয়া যাবে না (They laughed at him → He was laughed at by them)।
   • **By ছাড়া অন্যান্য Preposition**: কিছু নির্দিষ্ট Verb-এর ক্ষেত্রে 'by'-এর পরিবর্তে অন্য Preposition বসে (surprised at, pleased with, known to, interested in, satisfied with, covered with, filled with, shocked at, annoyed with)।
   • **Intransitive Verbs ও Verbs of State**: যেসকল Verb-এর Object থাকে না (come, go, sleep, arrive, fall, die) এবং যেগুলি স্থিতি বা মালিকানা বোঝায় (resemble, suit, fit, lack, have) তাদের Passive হয় না।`,

  rules: [
    {
      rule: "Five Core Steps & Pronoun Transformations (A1 & A2)",
      examples: [
        "Formula: Subject + Verb + Object → Object + be-verb (as per tense) + V3 + (by + subject).",
        "Active: The boy kicked the ball. → Passive: The ball was kicked by the boy.",
        "Pronoun Shifts: I → me, We → us, You → you, He → him, She → her, It → it, They → them, Who → whom.",
        "Active: She saw him. → Passive: He was seen by her."
      ],
      exceptions: [
        "Drop 'by + agent' when the doer is unknown, obvious or general (someone, people, they, one): Someone has stolen my wallet → My wallet has been stolen.",
        "Retain 'by + agent' when the doer is a specific person of importance: Hamlet was written by Shakespeare."
      ]
    },
    {
      rule: "Voice Across All Tenses & Going-To Form (A3)",
      examples: [
        "Simple Present: She writes a letter. → A letter is written by her (is/am/are + V3).",
        "Present Continuous: She is writing a letter. → A letter is being written by her (is/am/are + being + V3).",
        "Present Perfect: She has written a letter. → A letter has been written by her (has/have + been + V3).",
        "Simple Past: She wrote a letter. → A letter was written by her (was/were + V3).",
        "Past Continuous: She was writing a letter. → A letter was being written by her (was/were + being + V3).",
        "Past Perfect: She had written a letter. → A letter had been written by her (had + been + V3).",
        "Simple Future: She will write a letter. → A letter will be written by her (will/shall + be + V3).",
        "Future Perfect: She will have written a letter. → A letter will have been written by her (will/shall + have been + V3).",
        "Going to (Near Future): She is going to write a letter. → A letter is going to be written by her (is/am/are going to + be + V3)."
      ],
      exceptions: [
        "Present Perfect Continuous, Past Perfect Continuous, Future Continuous, and Future Perfect Continuous are not normally transformed into the passive in standard examination English."
      ]
    },
    {
      rule: "Sentence Structures: Negatives, Questions & Exclamations (A4)",
      examples: [
        "Negative: She did not write the letter. → The letter was not written by her.",
        "Negative with Nobody/No one: Nobody helped me. → I was not helped by anybody.",
        "Negative with No one: No one can solve this problem. → This problem cannot be solved by anyone.",
        "Helping Verb Question: Does he write letters? → Are letters written by him?",
        "Helping Verb Question: Did you see the film? → Was the film seen by you?",
        "Helping Verb Question: Have they finished the work? → Has the work been finished by them?",
        "Negative Interrogative: Didn't he finish the work? → Was the work not finished by him?",
        "Wh-Question (Subject): Who wrote this letter? → By whom was this letter written?",
        "Wh-Question (Subject): Who is teaching you? → By whom are you being taught?",
        "Wh-Question (Object): Whom did you meet? → Who was met by you?",
        "Wh-Question (Object): What do you want? → What is wanted by you?",
        "Wh-Question (Wh + Noun): Which book did you read? → Which book was read by you?",
        "Exclamatory: What a beautiful song she sang! → What a beautiful song was sung by her!",
        "Exclamatory: How well he plays the guitar! → How well the guitar is played by him!"
      ],
      exceptions: [
        "In questions, maintain the interrogative word order: auxiliary verb must precede the new subject (Was the film seen by you? NOT The film was seen by you?)."
      ]
    },
    {
      rule: "Imperative Sentences: Command, Request, Advice, Prohibition & Let (A5)",
      examples: [
        "Command: Open the door. → Let the door be opened. / You are ordered to open the door.",
        "Request: Please help me. → You are requested to help me.",
        "Advice: Do your duty. → You are advised to do your duty. / Your duty should be done.",
        "Prohibition: Do not touch the wire. → Let the wire not be touched. / The wire should not be touched.",
        "Prohibition: Do not tell a lie. → You are forbidden to tell a lie. / A lie should never be told.",
        "Let (Permission): Let him do it. → Let it be done by him.",
        "Let (Permission): Let her sing a song. → Let a song be sung by her."
      ],
      exceptions: [
        "Never use 'by you' in imperative requests like 'You are requested to help me'.",
        "Use 'should be + V3' when expressing general moral advice or duty rather than a strict command."
      ]
    },
    {
      rule: "Modal Verbs & Perfect Modals (A6)",
      examples: [
        "Pattern: modal + be + V3 (e.g., can be, could be, must be, should be, ought to be).",
        "can: He can do this work. → This work can be done by him.",
        "could: She could solve the sum. → The sum could be solved by her.",
        "may: You may borrow this book. → This book may be borrowed by you.",
        "might: He might win the prize. → The prize might be won by him.",
        "must: You must obey the rules. → The rules must be obeyed by you.",
        "should: We should respect elders. → Elders should be respected by us.",
        "would: She would bake a cake. → A cake would be baked by her.",
        "ought to: We ought to help the poor. → The poor ought to be helped by us.",
        "have to / has to: We have to complete the work. → The work has to be completed by us.",
        "used to: He used to beat the dog. → The dog used to be beaten by him.",
        "is to / are to: The Prime Minister is to address the nation. → The nation is to be addressed by the Prime Minister.",
        "should have + V3: You should have finished the work. → The work should have been finished by you.",
        "could have + V3: He could have saved the child. → The child could have been saved by him.",
        "must have + V3: Someone must have stolen it. → It must have been stolen by someone."
      ],
      exceptions: [
        "In perfect modals, ensure 'have been' is used, never 'has been' or 'had been' after a modal (e.g. 'could have been saved', NOT 'could has been')."
      ]
    },
    {
      rule: "Two Objects, Phrasal Verbs & Bare Infinitives (A7, A8, A9)",
      examples: [
        "Two Objects (Person Preferred): She gave me a gift. → I was given a gift by her. (Or: A gift was given to me by her.)",
        "Two Objects: He taught us grammar. → We were taught grammar by him. (Or: Grammar was taught to us by him.)",
        "Two Objects: The teacher showed the students a map. → The students were shown a map by the teacher.",
        "Phrasal Verbs (Keep Preposition): They laughed at him. → He was laughed at by them.",
        "Phrasal Verbs: The doctor looked after the patient. → The patient was looked after by the doctor.",
        "Phrasal Verbs: He turned down the offer. → The offer was turned down by him.",
        "Phrasal Verbs: We must put off the meeting. → The meeting must be put off.",
        "Phrasal Verbs: She looks down upon the poor. → The poor are looked down upon by her.",
        "Phrasal Verbs: The police are looking into the case. → The case is being looked into by the police.",
        "Bare Infinitives (Add 'to' in Passive): They made him work hard. → He was made to work hard by them.",
        "Bare Infinitives: She saw him go out. → He was seen to go out by her.",
        "Bare Infinitives: I heard her sing a song. → She was heard to sing a song by me.",
        "Infinitives: He wants me to write a letter. → He wants a letter to be written by me."
      ],
      exceptions: [
        "After make, see, hear, watch: active takes bare infinitive (without 'to'); passive REQUIRES 'to' (They made him work → He was made to work).",
        "Never drop the preposition attached to a verb in passive voice (He was laughed at, NOT He was laughed)."
      ]
    },
    {
      rule: "Impersonal Passive & Prepositions Other Than 'By' (A10, A11, A12)",
      examples: [
        "Impersonal Passive: People say that he is honest. → It is said that he is honest. / He is said to be honest.",
        "Impersonal Passive: They believe that the thief is hiding in the forest. → It is believed that the thief is hiding in the forest. / The thief is believed to be hiding in the forest.",
        "Impersonal Passive: Everyone knows that she is brilliant. → It is known that she is brilliant. / She is known to be brilliant.",
        "Compound Sentence: She cooked the food and served the guests. → The food was cooked and the guests were served by her.",
        "Prepositions Other Than By: The news surprised me. → I was surprised at the news (NOT by the news).",
        "Prepositions Other Than By: The gift pleased her. → She was pleased with the gift.",
        "Prepositions Other Than By: Snow covered the road. → The road was covered with snow.",
        "Prepositions Other Than By: Everyone knows him. → He is known to everyone (NOT by everyone).",
        "Prepositions Other Than By: Music interests me. → I am interested in music.",
        "Prepositions Other Than By: The result disappointed us. → We were disappointed with the result.",
        "Prepositions Other Than By: His behaviour annoyed me. → I was annoyed with his behaviour.",
        "Prepositions Other Than By: The accident shocked them. → They were shocked at the accident.",
        "Prepositions Other Than By: Water fills the pot. → The pot is filled with water."
      ],
      exceptions: [
        "Known takes 'to' (known to me); surprised, shocked, alarmed take 'at'; pleased, satisfied, annoyed take 'with'; interested, contained take 'in'; covered, filled take 'with'."
      ]
    },
    {
      rule: "Sentences That Cannot Be Changed & Passive-to-Active Conversion (A13 & A14)",
      examples: [
        "Intransitive Verbs (No Object → No Passive): come, go, sleep, arrive, fall, rise, die.",
        "Verbs of State/Possession (No Passive): She resembles her mother. / He has a car.",
        "Non-Passive Verbs: suit, fit, lack, resemble.",
        "Passive to Active: The thief was caught by the police. → The police caught the thief.",
        "Passive to Active: The work has been finished by me. → I have finished the work.",
        "Passive to Active: He is loved by all. → All love him.",
        "Passive to Active: Let the door be closed. → Close the door.",
        "Passive to Active: A new bridge is being built. → They are building a new bridge.",
        "Passive to Active: By whom was this letter written? → Who wrote this letter?"
      ],
      exceptions: [
        "If a passive sentence has no 'by-agent', supply an appropriate logical subject (someone, they, people, police, we) when converting back to active."
      ]
    }
  ],

  commonMistakes: [
    {
      wrong: "He is known by me.",
      right: "He is known to me.",
      note: "The verb 'know' takes the fixed preposition 'to' in the passive voice, never 'by'."
    },
    {
      wrong: "I was surprised by his sudden arrival.",
      right: "I was surprised at his sudden arrival.",
      note: "Verbs expressing mental reaction (surprised, shocked, alarmed, astonished) take 'at' in the passive."
    },
    {
      wrong: "He was made work hard by the master.",
      right: "He was made to work hard by the master.",
      note: "Verbs like make, see, hear take a bare infinitive in active, but REQUIRE 'to + verb' in passive voice."
    },
    {
      wrong: "The patient was looked by the nurse.",
      right: "The patient was looked after by the nurse.",
      note: "In prepositional verbs, the attached preposition must NEVER be dropped in the passive."
    },
    {
      wrong: "Who was this glass broken?",
      right: "By whom was this glass broken? / Who was this glass broken by?",
      note: "When 'who' is the active subject, change it to 'By whom' at the start of the passive interrogative sentence."
    },
    {
      wrong: "Let the door open.",
      right: "Let the door be opened.",
      note: "Imperative passive formula with let requires 'be + V3'."
    }
  ],

  examTricks: [
    "Tense Invariance Law: Voice change NEVER changes the tense of the sentence. If active is in past tense, passive MUST stay in past tense.",
    "Elimination Shortcut: In MCQ options, immediately eliminate options where the tense changed (e.g. present changed to past) or where the main verb is not in V3 form.",
    "Who vs. Whom Shortcut: If active starts with 'Who', passive starts with 'By whom'. If active has 'Whom', passive starts with 'Who'.",
    "Continuous Tense Marker: Continuous active tenses (is writing, was singing) ALWAYS require 'being' in the passive voice.",
    "Perfect Tense Marker: Perfect active tenses (has written, had eaten, will have seen) ALWAYS require 'been' in the passive voice."
  ],

  memoryTricks: [
    "Voice Golden Formula: Object + BE-form + V3 + BY + Subject.",
    "Continuous needs BEING: 'ing' active → 'being' passive.",
    "Perfect needs BEEN: 'has/have/had' active → 'been' passive.",
    "No-By Family: Known TO, Surprised AT, Pleased WITH, Interested IN, Filled WITH."
  ],

  revision: [
    "The tense of the verb must NOT change when voice changes.",
    "Always use the V3 (past participle) form of the main verb after the appropriate be-verb in passive.",
    "Pronoun shifts: I → me, we → us, he → him, she → her, they → them, who → whom.",
    "For questions: 'By whom...?' replaces 'Who...?' when who is the active subject.",
    "Add 'to' after make / see / hear in passive (He was made to work).",
    "Imperative sentences: use 'Let + object + be + V3' or 'You are ordered / requested / advised to + V1'.",
    "Intransitive verbs (go, come, sleep, die) and verbs of state (resemble, lack, fit) have no passive."
  ]
};

// ============================================================================
// 2. DATA FOR PART B: DIRECT AND INDIRECT SPEECH (NARRATION) (g14)
// ============================================================================

const narrationNote = {
  id: "g14",
  title: "Direct & Indirect Speech (Narration) Mastery",
  intro: "Comprehensive study notes covering the SON pronoun rule, tense backshift, modal changes, exceptions for universal truths and habits, changes in words of time and place, and transformation across all 5 sentence types (Assertive, Interrogative, Imperative, Optative, Exclamatory) as per WBPSC Clerkship syllabus.",
  bengali: `Direct ও Indirect Speech (Narration Change) সম্পূর্ণ নির্দেশিকা (WBPSC Clerkship স্পেশাল):
1. **Narration পরিবর্তনের মূল ৬টি ধাপ**:
   • ধাপ ১: Inverted Commas (\"...\") তুলে দিয়ে বাক্যের ধরন অনুযায়ী সঠিক Conjunction বসান (Assertive-এ that; Yes/No প্রশ্নে if/whether; Wh- প্রশ্নে Wh-শব্দটি নিজে; Imperative-এ to/not to; Optative-এ that; Exclamatory-এ that)।
   • ধাপ ২: Reporting Verb পরিবর্তন করুন (said to → told/asked/ordered/requested/advised/exclaimed/prayed)।
   • ধাপ ৩: Pronoun পরিবর্তন করুন **SON নিয়ম** মেনে:
     - **S (Subject)**: First Person (I, we, my, our) পরিবর্তিত হয় Reporting Verb-এর **Subject** অনুসারে।
     - **O (Object)**: Second Person (you, your) পরিবর্তিত হয় Reporting Verb-এর **Object** অনুসারে।
     - **N (No change)**: Third Person (he, she, it, they, his, her, their, নাম) **অপরিবর্তিত** থাকে।
   • ধাপ ৪: Reporting Verb যদি **Past Tense**-এ থাকে, তবে Reported Speech-এর Tense পরিবর্তন (Backshift) করুন।
   • ধাপ ৫: নিকটবর্তী সময় ও স্থান নির্দেশক শব্দকে দূরবর্তী শব্দে পরিবর্তন করুন (now → then, today → that day, tomorrow → the next day, yesterday → the previous day, here → there, this → that)।
   • ধাপ ৬: বাক্যটিকে সর্বদা Assertive (Statement) আকারে রূপান্তর করুন এবং শেষে পূর্ণচ্ছেদ (.) দিন (প্রশ্নবোধক বা বিস্ময়সূচক চিহ্ন উঠে যাবে)।

2. **যেসব ক্ষেত্রে Tense পরিবর্তন হয় না (গুরুত্বপূর্ণ ব্যতিরেক)**:
   • Reporting Verb যদি Present বা Future Tense-এ থাকে (He says / will say → Tense অপরিবর্তিত)।
   • চিরন্তন সত্য (Universal Truth): The earth moves round the sun.
   • অভ্যাসগত কাজ (Habitual Action / Permanent Fact): I go for a walk every morning.
   • ঐতিহাসিক সত্য (Historical Fact): Akbar was born in 1542.
   • কাল্পনিক শর্ত (Unreal Past / 2nd or 3rd Conditional): If I were rich, I would help you.
   • Past Perfect Tense অপরিবর্তিত থাকে (had met → had met)।

3. **বাক্যের ধরন অনুসারে Reporting Verb ও Conjunction তালিকা**:
   • **Assertive**: said → said, said to → told | Conjunction: that
   • **Interrogative (Yes/No)**: asked / enquired / wanted to know | Conjunction: if / whether
   • **Interrogative (Wh-)**: asked / enquired | Conjunction: Wh-word itself (what, where, why, who, how)
   • **Imperative (Command/Request/Advice)**: ordered / requested / advised / warned / forbade | Conjunction: to + V1 / not to + V1
   • **Suggestion (Let us / Shall we)**: suggested / proposed | that + subject + should + V1
   • **Optative (ইচ্ছা বা প্রার্থনা)**: wished / prayed / blessed / cursed | that + subject + might + V1
   • **Exclamatory**: exclaimed with joy / sorrow / wonder / disgust / applauded | Conjunction: that`,

  rules: [
    {
      rule: "The Core Framework & Pronouns: The SON Rule (B1, B2, B3)",
      examples: [
        "Reporting verb is outside the quotes; Reported speech is inside the quotes: He said (reporting verb), 'I am happy' (reported speech).",
        "S (Subject): First person pronouns match the subject of the reporting verb: He said, 'I am happy.' → He said that he was happy.",
        "O (Object): Second person pronouns match the object of the reporting verb: He said to me, 'You are late.' → He told me that I was late.",
        "N (No Change): Third person pronouns do not change: She said, 'He is tall.' → She said that he was tall.",
        "Second person shift: Ravi said to Mohan, 'You are late.' → Ravi told Mohan that he was late."
      ],
      exceptions: [
        "Said without listener stays 'said'. Said to + listener changes to 'told' + object (never 'told to')."
      ]
    },
    {
      rule: "Tense Backshifts & Modal Changes (B4)",
      examples: [
        "Simple Present → Simple Past: am/is/are, V1 → was/were, V2 (He said, 'I work.' → He said that he worked).",
        "Present Continuous → Past Continuous: am/is/are + V-ing → was/were + V-ing (He said, 'I am reading.' → He said that he was reading).",
        "Present Perfect → Past Perfect: has/have + V3 → had + V3 (She said, 'I have finished.' → She said that she had finished).",
        "Present Perfect Continuous → Past Perfect Continuous: has/have been + V-ing → had been + V-ing.",
        "Simple Past → Past Perfect: V2 → had + V3 (He said, 'I wrote a letter.' → He said that he had written a letter).",
        "Past Continuous → Past Perfect Continuous: was/were + V-ing → had been + V-ing (He said, 'I was writing.' → He said that he had been writing).",
        "Past Perfect → Past Perfect (No change): had + V3 → had + V3 (She said, 'I had seen him.' → She said that she had seen him).",
        "Modals: will → would; shall → would (should for duty/advice); can → could; may → might; must → had to (for necessity) / must (for duty).",
        "No Change for Past Modals: could, would, should, might, ought to, used to stay unchanged."
      ],
      exceptions: [
        "If the reporting verb is in the present (says) or future (will say), the tense inside NEVER changes: He says, 'I am busy' → He says that he is busy."
      ]
    },
    {
      rule: "When the Tense Does NOT Change (B5)",
      examples: [
        "Reporting verb in present/future: He says, 'I am busy.' → He says that he is busy.",
        "Universal truth: The teacher said, 'The earth moves round the sun.' → The teacher said that the earth moves round the sun.",
        "Habitual action / permanent fact: She said, 'I go for a walk every morning.' → She said that she goes for a walk every morning.",
        "Historical fact: The teacher said, 'Akbar was born in 1542.' → The teacher said that Akbar was born in 1542.",
        "Second/third conditional: He said, 'If I were rich, I would help you.' → He said that if he were rich, he would help me.",
        "Past perfect tense: She said, 'I had met him before.' → She said that she had met him before."
      ],
      exceptions: [
        "Even when reporting verb is in the past, scientific truths and geographical facts retain their present tense."
      ]
    },
    {
      rule: "Changes in Words of Time and Place (B6)",
      examples: [
        "now → then",
        "today → that day",
        "tonight → that night",
        "this morning → that morning",
        "tomorrow → the next day / the following day",
        "yesterday → the previous day / the day before",
        "last night → the previous night",
        "last week → the previous week / the week before",
        "next week → the following week / the next week",
        "ago → before",
        "the day before yesterday → two days before",
        "the day after tomorrow → in two days' time",
        "here → there; this → that; these → those",
        "thus → so; hence → thence; come → go; hither → thither"
      ],
      exceptions: [
        "If the speech is reported on the very same day in the same place, 'today' or 'here' may remain unchanged."
      ]
    },
    {
      rule: "Assertive Sentences (Statements) (B8)",
      examples: [
        "He said, 'I am reading a book.' → He said that he was reading a book.",
        "She said to me, 'I will help you.' → She told me that she would help me.",
        "They said, 'We have finished the work.' → They said that they had finished the work.",
        "He said, 'I do not know the answer.' → He said that he did not know the answer.",
        "Ravi said to Mohan, 'I saw you yesterday.' → Ravi told Mohan that he had seen him the day before.",
        "She said, 'I am going to Delhi tomorrow.' → She said that she was going to Delhi the next day."
      ],
      exceptions: [
        "Negative statements remain negative: do not know → did not know."
      ]
    },
    {
      rule: "Interrogative Sentences: Yes/No & Wh- Questions (B9)",
      examples: [
        "Yes/No (Use if/whether + statement order): He said to me, 'Are you ill?' → He asked me if I was ill.",
        "Yes/No: She said to him, 'Do you like tea?' → She asked him whether he liked tea.",
        "Yes/No: The teacher said to the boy, 'Have you finished the work?' → The teacher asked the boy if he had finished the work.",
        "Yes/No: Mother said to me, 'Can you swim?' → Mother asked me if I could swim.",
        "Yes/No: I said to her, 'Did you see the film?' → I asked her if she had seen the film.",
        "Wh-Question (Keep Wh-word + statement order): He said to me, 'Where do you live?' → He asked me where I lived.",
        "Wh-Question: She said to him, 'What is your name?' → She asked him what his name was.",
        "Wh-Question: The teacher said to the girl, 'Why are you crying?' → The teacher asked the girl why she was crying.",
        "Wh-Question: He said, 'Who broke the glass?' → He asked who had broken the glass.",
        "Wh-Question: I said to the boy, 'Whom did you meet yesterday?' → I asked the boy whom he had met the previous day.",
        "Wh-Question: She said to me, 'How are you going to reach there?' → She asked me how I was going to reach there."
      ],
      exceptions: [
        "Remove do/does/did in affirmative indirect questions and use statement order (Subject + Verb), NOT question order (He asked where I lived, NOT where did I live)."
      ]
    },
    {
      rule: "Imperative Sentences: Command, Request, Advice, Prohibition, Suggestion (B10)",
      examples: [
        "Command: The captain said to the soldiers, 'Fire!' → The captain ordered the soldiers to fire.",
        "Command: He said to the servant, 'Bring me a glass of water.' → He ordered the servant to bring him a glass of water.",
        "Request: She said to him, 'Kindly lend me your pen.' → She requested him to lend her his pen.",
        "Request: The boy said to the teacher, 'Please forgive me.' → The boy begged the teacher to forgive him.",
        "Request: He said to me, 'Will you please help me?' → He requested me to help him.",
        "Advice: The doctor said to the patient, 'Avoid oily food.' → The doctor advised the patient to avoid oily food.",
        "Warning: He said to me, 'Beware of dogs.' → He warned me to beware of dogs.",
        "Prohibition: The teacher said to the boys, 'Do not make a noise.' → The teacher forbade the boys to make a noise. / The teacher told the boys not to make a noise.",
        "Invitation: She said to me, 'Come to my party.' → She invited me to her party.",
        "Suggestion (Let us): He said to me, 'Let us go for a walk.' → He suggested that we should go for a walk.",
        "Suggestion (Shall we): She said, 'Shall we go to the park?' → She suggested going to the park. / She proposed that they should go to the park.",
        "Offer (Shall I): He said to her, 'Shall I carry your bag?' → He offered to carry her bag.",
        "Permission (Let me): The prisoner said, 'Let me go.' → The prisoner requested that he should be allowed to go."
      ],
      exceptions: [
        "When using 'forbade', do NOT use 'not' (The teacher forbade the boys to make a noise, NOT forbade not to make a noise)."
      ]
    },
    {
      rule: "Optative, Exclamatory, Greetings & Conversational Phrases (B11, B12, B13)",
      examples: [
        "Optative (Wish/Prayer): He said, 'May you live long!' → He wished that I might live long.",
        "Optative: The mother said to her son, 'May God bless you.' → The mother prayed that God might bless her son.",
        "Optative: The old man said, 'May you prosper!' → The old man blessed him, wishing that he might prosper.",
        "Optative (Wishes): He said, 'Would that I were a king!' → He wished that he were a king.",
        "Optative: She said, 'If only I were rich!' → She wished that she were rich.",
        "Exclamatory (Joy): He said, 'Hurrah! We have won the match.' → He exclaimed with joy that they had won the match.",
        "Exclamatory (Sorrow): She said, 'Alas! I am ruined.' → She exclaimed with sorrow that she was ruined.",
        "Exclamatory (Wonder): He said, 'What a beautiful scene!' → He exclaimed with wonder that it was a very beautiful scene.",
        "Exclamatory: The boy said, 'How foolish I was!' → The boy exclaimed that he had been very foolish.",
        "Exclamatory: The teacher said, 'Bravo! Well done!' → The teacher applauded him, saying that he had done well.",
        "Greetings: He said to me, 'Good morning.' → He greeted me, saying good morning.",
        "Greetings: She said to him, 'Good night.' → She wished him good night.",
        "Short Phrases: He said to her, 'Thank you.' → He thanked her.",
        "Short Phrases: They said to him, 'Congratulations!' → They congratulated him.",
        "Short Phrases: He said, 'Sorry.' → He apologised.",
        "Short Phrases: He said to them, 'Farewell.' → He bade them farewell.",
        "Short Phrases: The host said to the guests, 'Welcome.' → The host welcomed the guests.",
        "Short Phrases: He said, 'Yes, sir.' → He replied in the affirmative.",
        "Short Phrases: He said, 'No.' → He replied in the negative."
      ],
      exceptions: [
        "Always replace exclamation words (Hurrah, Alas, Bravo, Fie, Oh) with the corresponding adverbial phrase (exclaimed with joy/sorrow/disgust) and use 'that'."
      ]
    },
    {
      rule: "Mixed Sentences, Reporting Verbs Catalogue & Special Cases (B14, B15, B16, B17)",
      examples: [
        "Mixed Sentences: She said to me, 'What are you doing? Go home at once.' → She asked me what I was doing and ordered me to go home at once.",
        "Mixed Sentences: He said, 'I am tired. Please let me rest.' → He said that he was tired and requested that he should be allowed to rest.",
        "Mixed Sentences: The teacher said, 'Sit down, Ravi. You are late.' → The teacher told Ravi to sit down and said that he was late.",
        "Promise: He said, 'I will give you a prize.' → He promised to give me a prize.",
        "Denial: She said, 'I did not take the book.' → She denied having taken the book.",
        "Admission: He said, 'I broke the window.' → He confessed that he had broken the window.",
        "Threat: The man said to me, 'I will kill you.' → The man threatened to kill me.",
        "Quotation First: 'I am hungry,' he said. → He said that he was hungry.",
        "Polite Request: She said to him, 'Would you pass the salt?' → She requested him to pass the salt.",
        "Must (Obligation): The teacher said, 'You must obey the rules.' → The teacher said that I must obey the rules.",
        "Must (Necessity): He said, 'I must go now.' → He said that he had to go then.",
        "Indirect to Direct: He asked me where I lived. → He said to me, 'Where do you live?'",
        "Indirect to Direct: She exclaimed with joy that she had passed. → She said, 'Hurrah! I have passed.'"
      ],
      exceptions: [
        "When reversing from indirect to direct, remember to restore the quotation marks, comma, capital letter, and appropriate punctuation mark (?, !)."
      ]
    }
  ],

  commonMistakes: [
    {
      wrong: "He told to me that he was ill.",
      right: "He told me that he was ill. / He said to me that he was ill.",
      note: "'Told' is a transitive verb and takes an object directly without 'to'."
    },
    {
      wrong: "She asked me that where I was going.",
      right: "She asked me where I was going.",
      note: "Never use 'that' before wh-question words (where, what, why, when) in indirect speech."
    },
    {
      wrong: "The teacher asked who was absent yesterday.",
      right: "The teacher asked who had been absent the day before.",
      note: "Simple past ('was') changes to past perfect ('had been'), and 'yesterday' changes to 'the day before'."
    },
    {
      wrong: "He asked me where did I live.",
      right: "He asked me where I lived.",
      note: "Indirect questions use statement word order (Subject + Verb), never question order with auxiliary 'did'."
    },
    {
      wrong: "The officer forbade the soldiers not to fire.",
      right: "The officer forbade the soldiers to fire.",
      note: "'Forbade' already contains a negative meaning. Adding 'not' makes a double negative error."
    },
    {
      wrong: "The teacher said that the earth was round.",
      right: "The teacher said that the earth is round.",
      note: "Universal and scientific truths remain in simple present tense regardless of the reporting verb."
    }
  ],

  examTricks: [
    "SON Rule Shortcut: 1st person → Subject | 2nd person → Object | 3rd person → No Change.",
    "Question Order Elimination: In options for indirect questions, immediately cross out any option where the auxiliary verb is before the subject (e.g. 'where was he going').",
    "Time Word Filter: Check if 'yesterday' became 'the previous day' and 'tomorrow' became 'the next day'; incorrect options often forget this change.",
    "Say vs Tell Rule: 'Said' has no object; 'Told' MUST have an object; 'Told to' is ALWAYS grammatically wrong.",
    "Universal Truth Trap: If the reported clause is a scientific law (oil floats on water, earth revolves), its present tense NEVER changes."
  ],

  memoryTricks: [
    "SON Formula: S = 1st person to Subject, O = 2nd person to Object, N = 3rd person No change.",
    "No-That in Wh-: Never say 'that where' or 'that why'.",
    "Forbade = No Not: Forbade already means prohibited; never add 'not'.",
    "Past + Past = Past Perfect: Simple Past changes to Past Perfect (had + V3)."
  ],

  revision: [
    "Pronouns follow SON: first person → subject, second person → object, third person → no change.",
    "Questions: asked + if / whether (yes / no) or asked + wh-word (wh- questions). Always use statement order.",
    "Commands, requests, advice: ordered / requested / advised + object + to + verb.",
    "Prohibition: forbade or ordered / told + not to (never combine forbade with not).",
    "Let us: suggested / proposed that we/they should.",
    "Wishes & Prayers: wished / prayed that ... might.",
    "Exclamations: exclaimed with joy / sorrow / wonder that ...",
    "No tense change for universal truths, habits, historical facts, or when the reporting verb is in the present or future tense."
  ]
};

// ============================================================================
// 3. DATA FOR PART C & D: PREPOSITIONS & FIXED PREPOSITIONS (g05)
// ============================================================================

const prepositionsNotePath = 'data/notes/grammar/05-prepositions.json';
const prepExisting = JSON.parse(fs.readFileSync(prepositionsNotePath, 'utf8'));

// Build comprehensive fixed prepositions directory (350+ entries) from PDF Parts C & D
const fixedPrepositionsList = [
  // C1: Crime and Law Words
  { term: "accused of", meaning: "accused of murder / crime", bengali: "অভিযুক্ত" },
  { term: "acquitted of", meaning: "acquitted of the charge", bengali: "অভিযোগ থেকে খালাসপ্রাপ্ত" },
  { term: "appeal against / to / for", meaning: "appeal against the verdict; appeal to the judge; appeal for help", bengali: "আবেদন করা (রায়ের বিরুদ্ধে / ব্যক্তির কাছে / সাহায্যের জন্য)" },
  { term: "arrested for", meaning: "arrested for theft", bengali: "গ্রেপ্তার হওয়া" },
  { term: "assault on / upon", meaning: "an assault on the guard", bengali: "আক্রমণ করা" },
  { term: "attack on", meaning: "an attack on the bank", bengali: "হামলা বা আক্রমণ" },
  { term: "case against", meaning: "a case against the company", bengali: "কারও বিরুদ্ধে মামলা" },
  { term: "charged with", meaning: "charged with fraud", bengali: "অভিযোগে অভিযুক্ত" },
  { term: "complaint against", meaning: "a complaint against the officer", bengali: "কারও বিরুদ্ধে অভিযোগ" },
  { term: "conspiracy against", meaning: "a conspiracy against the king", bengali: "ষড়যন্ত্র" },
  { term: "convicted of", meaning: "convicted of robbery", bengali: "দোষী সাব্যস্ত হওয়া" },
  { term: "evidence of / against", meaning: "evidence against the accused", bengali: "সাক্ষ্যপ্রমাণ" },
  { term: "fined for", meaning: "fined for speeding", bengali: "জরিমানা হওয়া" },
  { term: "guilty of", meaning: "guilty of murder", bengali: "দোষী" },
  { term: "imprisoned for", meaning: "imprisoned for life", bengali: "কারাদণ্ড প্রাপ্ত" },
  { term: "innocent of", meaning: "innocent of the crime", bengali: "নির্দোষ" },
  { term: "murder of", meaning: "the murder of the judge", bengali: "হত্যাকাণ্ড" },
  { term: "plead guilty to / for", meaning: "pleaded guilty to the charge; plead for mercy", bengali: "দোষ স্বীকার করা / দয়ার আবেদন করা" },
  { term: "plot against", meaning: "a plot against the government", bengali: "ষড়যন্ত্র করা" },
  { term: "prosecuted for", meaning: "prosecuted for corruption", bengali: "মামলা দায়ের হওয়া" },
  { term: "punishment for", meaning: "punishment for crime", bengali: "শাস্তি" },
  { term: "robbery of / at", meaning: "the robbery of the bank", bengali: "ডাকাতি" },
  { term: "sentenced to", meaning: "sentenced to death / imprisonment", bengali: "দণ্ডাদেশ দেওয়া (যেমন মৃত্যুদণ্ড)" },
  { term: "suspected of", meaning: "suspected of theft", bengali: "সন্দেহভাজন" },
  { term: "theft of", meaning: "the theft of a car", bengali: "চুরি" },
  { term: "tried for", meaning: "tried for murder", bengali: "বিচার হওয়া" },
  { term: "victim of", meaning: "a victim of fraud", bengali: "শিকার / ক্ষতিগ্রস্ত ব্যক্তি" },
  { term: "witness to", meaning: "a witness to the crime", bengali: "সাক্ষী" },

  // C2: Adjectives and Participles + Preposition (Selected High-Yield from 115)
  { term: "absorbed in", meaning: "absorbed in study", bengali: "মগ্ন" },
  { term: "abundant in", meaning: "abundant in minerals", bengali: "প্রাচুর্যপূর্ণ" },
  { term: "accustomed to", meaning: "accustomed to hard work", bengali: "অভ্যস্ত" },
  { term: "acquainted with", meaning: "acquainted with the facts", bengali: "পরিচিত / অবগত" },
  { term: "addicted to", meaning: "addicted to games / drugs", bengali: "আসক্ত" },
  { term: "afraid of", meaning: "afraid of dogs", bengali: "ভীত" },
  { term: "angry with / at", meaning: "angry with him (person); angry at the delay (thing)", bengali: "রাগান্বিত (ব্যক্তির উপর with, বিষয়ের উপর at)" },
  { term: "anxious about / for", meaning: "anxious about results (worry); anxious for success (desire)", bengali: "উদ্বিগ্ন / উদগ্রীব" },
  { term: "ashamed of", meaning: "ashamed of his conduct", bengali: "লজ্জিত" },
  { term: "aware of", meaning: "aware of the danger", bengali: "সচেতন" },
  { term: "bad at", meaning: "bad at maths", bengali: "কাঁচা / অদক্ষ" },
  { term: "blind to", meaning: "blind to his faults", bengali: "দেখেও না দেখার ভান করা / অন্ধ" },
  { term: "busy with / in", meaning: "busy with work; busy in reading", bengali: "ব্যস্ত" },
  { term: "capable of", meaning: "capable of leading", bengali: "সক্ষম" },
  { term: "careful of / about", meaning: "careful of his health", bengali: "যত্নশীল" },
  { term: "certain of", meaning: "certain of success", bengali: "নিশ্চিত" },
  { term: "characteristic of", meaning: "characteristic of him", bengali: "চরিত্রসুলভ বৈশিষ্ট্য" },
  { term: "clever at", meaning: "clever at drawing", bengali: "দক্ষ / চতুর" },
  { term: "concerned with / about", meaning: "concerned about safety", bengali: "উদ্বিগ্ন / সংশ্লিষ্ট" },
  { term: "conscious of", meaning: "conscious of his guilt", bengali: "সচেতন" },
  { term: "contrary to", meaning: "contrary to expectation", bengali: "বিপরীত" },
  { term: "convenient to / for", meaning: "convenient for all", bengali: "সুবিধাজনক" },
  { term: "covetous of", meaning: "covetous of wealth", bengali: "লোভী" },
  { term: "crowded with", meaning: "crowded with tourists", bengali: "জনাকীর্ণ / পরিপূর্ণ" },
  { term: "deaf to", meaning: "deaf to all appeals", bengali: "কর্ণপাত না করা" },
  { term: "dear to", meaning: "dear to everyone", bengali: "প্রিয়" },
  { term: "deficient in", meaning: "deficient in vitamins", bengali: "ঘাটতিযুক্ত" },
  { term: "delighted at / with", meaning: "delighted with the gift", bengali: "আনন্দিত" },
  { term: "dependent on", meaning: "dependent on parents", bengali: "নির্ভরশীল" },
  { term: "deprived of", meaning: "deprived of his rights", bengali: "বঞ্চিত" },
  { term: "desirous of", meaning: "desirous of fame", bengali: "ইচ্ছুক" },
  { term: "destitute of", meaning: "destitute of hope", bengali: "নিঃস্ব" },
  { term: "devoid of", meaning: "devoid of feeling", bengali: "বর্জিত / শূন্য" },
  { term: "different from", meaning: "different from others", bengali: "ভিন্ন / পৃথক" },
  { term: "disappointed with / at", meaning: "disappointed with the result", bengali: "হতাশ" },
  { term: "disgusted with / at", meaning: "disgusted with his rudeness", bengali: "বিরক্ত" },
  { term: "dissatisfied with", meaning: "dissatisfied with the service", bengali: "অসন্তুষ্ট" },
  { term: "distinct from", meaning: "distinct from the rest", bengali: "স্বতন্ত্র" },
  { term: "doubtful of / about", meaning: "doubtful of success", bengali: "সন্দিগ্ধ" },
  { term: "eager for", meaning: "eager for knowledge", bengali: "আগ্রহী" },
  { term: "envious of", meaning: "envious of his success", bengali: "ঈর্ষান্বিত" },
  { term: "equal to", meaning: "equal to the task", bengali: "সমকক্ষ" },
  { term: "essential to / for", meaning: "essential for health", bengali: "অপরিহার্য" },
  { term: "exempt from", meaning: "exempt from tax", bengali: "রেহাইপ্রাপ্ত / মুক্ত" },
  { term: "expert in / at", meaning: "expert in chess / drawing", bengali: "দক্ষ" },
  { term: "faithful to", meaning: "faithful to his master", bengali: "বিশ্বস্ত" },
  { term: "familiar with / to", meaning: "familiar with the rules (thing); familiar to me (person)", bengali: "পরিচিত" },
  { term: "famous for", meaning: "famous for its temples", bengali: "বিখ্যাত" },
  { term: "fit for", meaning: "fit for the job", bengali: "উপযুক্ত" },
  { term: "fond of", meaning: "fond of music", bengali: "অনুরাগী / ভক্ত" },
  { term: "free from", meaning: "free from care", bengali: "মুক্ত" },
  { term: "friendly to / with", meaning: "friendly with everyone", bengali: "বন্ধুত্বপূর্ণ" },
  { term: "full of", meaning: "full of joy", bengali: "পরিপূর্ণ" },
  { term: "furious with / at", meaning: "furious with him (person); furious at his delay", bengali: "ক্ষিপ্ত" },
  { term: "good at / for / to", meaning: "good at sums (skill); good for health; good to others (kind)", bengali: "দক্ষ / উপকারী / সদয়" },
  { term: "grateful to / for", meaning: "grateful to you (person) for your help (thing)", bengali: "কৃতজ্ঞ" },
  { term: "guilty of", meaning: "guilty of theft", bengali: "দোষী" },
  { term: "harmful to", meaning: "harmful to health", bengali: "ক্ষতিকর" },
  { term: "hopeful of", meaning: "hopeful of success", bengali: "আশাবাদী" },
  { term: "hostile to", meaning: "hostile to strangers", bengali: "শত্রুভাবাপন্ন" },
  { term: "identical with", meaning: "identical with mine", bengali: "অভিন্ন" },
  { term: "ignorant of", meaning: "ignorant of the law", bengali: "অজ্ঞ" },
  { term: "immune to / from", meaning: "immune to disease", bengali: "প্রতিরোধক্ষম" },
  { term: "impatient of / with", meaning: "impatient of delay", bengali: "অধৈর্য" },
  { term: "incapable of", meaning: "incapable of lying", bengali: "অক্ষম" },
  { term: "indebted to", meaning: "indebted to him", bengali: "ঋণী" },
  { term: "independent of", meaning: "independent of help", bengali: "স্বাধীন / নিরপেক্ষ" },
  { term: "indifferent to", meaning: "indifferent to praise", bengali: "উদাসীন" },
  { term: "indignant at / with", meaning: "indignant at the insult", bengali: "ক্ষুব্ধ" },
  { term: "inferior to", meaning: "inferior to others", bengali: "নিকৃষ্টতর" },
  { term: "intent on", meaning: "intent on winning", bengali: "দৃঢ়সংকল্পবদ্ধ" },
  { term: "interested in", meaning: "interested in music", bengali: "আগ্রহী" },
  { term: "jealous of", meaning: "jealous of his friend", bengali: "ঈর্ষান্বিত" },
  { term: "keen on / at", meaning: "keen on sports", bengali: "উৎসাহী" },
  { term: "kind to", meaning: "kind to animals", bengali: "দয়ালু" },
  { term: "known to / for / as", meaning: "known to me (person); known for honesty; known as a poet", bengali: "পরিচিত / খ্যাত" },
  { term: "lacking in", meaning: "lacking in courage", bengali: "ঘাটতিযুক্ত" },
  { term: "liable to / for", meaning: "liable to error; liable for damages", bengali: "দায়ী / প্রবণ" },
  { term: "loyal to", meaning: "loyal to the country", bengali: "আনুগত্যশীল" },
  { term: "made of / from", meaning: "made of wood (material unchanged); made from grapes (processed)", bengali: "নির্মিত" },
  { term: "married to", meaning: "married to a doctor", bengali: "বিবাহিত" },
  { term: "mindful of", meaning: "mindful of his duty", bengali: "সচেতন / মনোযোগী" },
  { term: "necessary for", meaning: "necessary for life", bengali: "প্রয়োজনীয়" },
  { term: "negligent of / in", meaning: "negligent of his duty", bengali: "উদাসীন / অবহেলাকারী" },
  { term: "noted for", meaning: "noted for kindness", bengali: "খ্যাত" },
  { term: "obedient to", meaning: "obedient to his parents", bengali: "বাধ্য" },
  { term: "obliged to", meaning: "obliged to you", bengali: "বাধিত / কৃতজ্ঞ" },
  { term: "opposed to", meaning: "opposed to the plan", bengali: "বিরোধী" },
  { term: "partial to", meaning: "partial to sweets", bengali: "পক্ষপাতী" },
  { term: "peculiar to", meaning: "peculiar to him", bengali: "স্বভাবসিদ্ধ / অদ্ভুত" },
  { term: "polite to", meaning: "polite to elders", bengali: "ভদ্র / বিনয়ী" },
  { term: "popular with / among", meaning: "popular with students", bengali: "জনপ্রিয়" },
  { term: "proficient in", meaning: "proficient in English", bengali: "দক্ষ" },
  { term: "proud of", meaning: "proud of his son", bengali: "গর্বিত" },
  { term: "qualified for", meaning: "qualified for the post", bengali: "যোগ্য" },
  { term: "quick at / in", meaning: "quick at learning", bengali: "চটপটে" },
  { term: "ready for", meaning: "ready for the exam", bengali: "প্রস্তুত" },
  { term: "related to", meaning: "related to the owner", bengali: "সম্পর্কিত" },
  { term: "relevant to", meaning: "relevant to the topic", bengali: "প্রাসঙ্গিক" },
  { term: "remarkable for", meaning: "remarkable for courage", bengali: "উল্লেখযোগ্য" },
  { term: "renowned for", meaning: "renowned for wisdom", bengali: "সুখ্যাত" },
  { term: "responsible for / to", meaning: "responsible for the loss (thing); responsible to the manager (person)", bengali: "দায়ী" },
  { term: "satisfied with", meaning: "satisfied with the result", bengali: "সন্তুষ্ট" },
  { term: "scared of", meaning: "scared of ghosts", bengali: "ভীত" },
  { term: "senior to", meaning: "senior to me", bengali: "জ্যেষ্ঠ" },
  { term: "short of", meaning: "short of money", bengali: "ঘাটতি" },
  { term: "sick of", meaning: "sick of excuses", bengali: "বিরক্ত" },
  { term: "similar to", meaning: "similar to yours", bengali: "সদৃশ" },
  { term: "skilful in / at", meaning: "skilful in carpentry", bengali: "দক্ষ" },
  { term: "slow in / at", meaning: "slow at learning", bengali: "ধীরগতির" },
  { term: "sorry for / about", meaning: "sorry for his loss", bengali: "দুঃখিত" },
  { term: "subject to", meaning: "subject to change", bengali: "অধীন / সাপেক্ষ" },
  { term: "successful in", meaning: "successful in the exam", bengali: "সফল" },
  { term: "suitable for / to", meaning: "suitable for the job", bengali: "উপযুক্ত" },
  { term: "superior to", meaning: "superior to others", bengali: "উৎকৃষ্টতর" },
  { term: "sure of", meaning: "sure of success", bengali: "নিশ্চিত" },
  { term: "surprised at", meaning: "surprised at the news", bengali: "বিস্মিত" },
  { term: "suspicious of", meaning: "suspicious of strangers", bengali: "সন্দিগ্ধ" },
  { term: "sympathetic to / towards", meaning: "sympathetic to the poor", bengali: "সহানুভূতিশীল" },
  { term: "tired of", meaning: "tired of waiting", bengali: "ক্লান্ত / বিরক্ত" },
  { term: "true to", meaning: "true to his word", bengali: "অটল / বিশ্বস্ত" },
  { term: "typical of", meaning: "typical of him", bengali: "বৈশিষ্ট্যপূর্ণ" },
  { term: "unaware of", meaning: "unaware of the danger", bengali: "অজ্ঞাত" },
  { term: "used to", meaning: "used to hard work", bengali: "অভ্যস্ত" },
  { term: "useful for / to", meaning: "useful for students", bengali: "উপকারী" },
  { term: "vain of", meaning: "vain of his looks", bengali: "অহংকারী" },
  { term: "versed in", meaning: "well versed in law", bengali: "পণ্ডিত / অভিজ্ঞ" },
  { term: "weak in / at", meaning: "weak in English", bengali: "দুর্বল / কাঁচা" },
  { term: "worthy of", meaning: "worthy of praise", bengali: "যোগ্য" },

  // C3: Verbs + Preposition (Selected High-Yield from 110)
  { term: "abstain from", meaning: "abstain from smoking", bengali: "বিরত থাকা" },
  { term: "adhere to", meaning: "adhere to the rules", bengali: "মেনে চলা / লেগে থাকা" },
  { term: "agree to / with / on", meaning: "agree to the plan; agree with him; agree on the price", bengali: "সম্মত হওয়া (প্রস্তাবে to, ব্যক্তির সাথে with, বিষয়ে on)" },
  { term: "aim at", meaning: "aim at the target", bengali: "লক্ষ্য স্থির করা" },
  { term: "allude to", meaning: "allude to the incident", bengali: "ইঙ্গিত করা" },
  { term: "apologise to / for", meaning: "apologise to her for the delay", bengali: "ক্ষমা চাওয়া" },
  { term: "apply to / for", meaning: "apply to the principal for leave", bengali: "আবেদন করা" },
  { term: "approve of", meaning: "approve of the plan", bengali: "অনুমোদন করা" },
  { term: "argue with / about", meaning: "argue with him about money", bengali: "তর্ক করা" },
  { term: "arrive at / in", meaning: "arrive at the station (small); arrive in Delhi (city)", bengali: "পৌঁছানো" },
  { term: "ask for", meaning: "ask for help", bengali: "চাওয়া" },
  { term: "attend to", meaning: "attend to the customer / business", bengali: "মনোযোগ দেওয়া / দেখাশোনা করা" },
  { term: "attribute to", meaning: "attribute success to hard work", bengali: "গুণ বা কারণ হিসেবে আরোপ করা" },
  { term: "beg for", meaning: "beg for food", bengali: "ভিক্ষা চাওয়া" },
  { term: "believe in", meaning: "believe in God / hard work", bengali: "বিশ্বাস রাখা" },
  { term: "belong to", meaning: "belong to the club", bengali: "অধীনস্থ বা সদস্য হওয়া" },
  { term: "benefit from", meaning: "benefit from the scheme", bengali: "উপকৃত হওয়া" },
  { term: "blame for", meaning: "blame him for the loss", bengali: "দোষারোপ করা" },
  { term: "boast of / about", meaning: "boast of his wealth", bengali: "দম্ভ করা" },
  { term: "borrow from", meaning: "borrow a book from him", bengali: "ধার নেওয়া" },
  { term: "call at / on", meaning: "call at his house (place); call on the doctor (person)", bengali: "দেখা করা বা যাওয়া" },
  { term: "care for / about", meaning: "care for tea (like); care about others (concern)", bengali: "পছন্দ করা / যত্ন নেওয়া" },
  { term: "cheat of / out of", meaning: "cheat him of his money", bengali: "প্রতারণা করে নেওয়া" },
  { term: "comment on", meaning: "comment on the report", bengali: "মন্তব্য করা" },
  { term: "compare to / with", meaning: "compare life to a dream (dissimilar); compare Kolkata with Delhi (similar)", bengali: "তুলনা করা" },
  { term: "compensate for", meaning: "compensate for the loss", bengali: "ক্ষতিপূরণ দেওয়া" },
  { term: "complain of / about / to", meaning: "complain of pain; complain about noise; complain to the police", bengali: "অভিযোগ করা" },
  { term: "comply with", meaning: "comply with the rules", bengali: "মেনে চলা" },
  { term: "concentrate on", meaning: "concentrate on studies", bengali: "মনোযোগ দেওয়া" },
  { term: "confess to", meaning: "confess to the crime", bengali: "দোষ স্বীকার করা" },
  { term: "confide in", meaning: "confide in a friend", bengali: "গোপন কথা বিশ্বাস করে বলা" },
  { term: "congratulate on", meaning: "congratulate him on his success", bengali: "অভিনন্দন জানানো" },
  { term: "consent to", meaning: "consent to the proposal", bengali: "সম্মতি দেওয়া" },
  { term: "consist of / in", meaning: "consist of five members (parts); consist in virtue (nature)", bengali: "গঠিত হওয়া / নিহিত থাকা" },
  { term: "contribute to", meaning: "contribute to charity", bengali: "দান বা অবদান রাখা" },
  { term: "convert to / into", meaning: "convert into cash", bengali: "রূপান্তরিত করা" },
  { term: "convince of", meaning: "convince him of the truth", bengali: "বিশ্বাস করানো" },
  { term: "cope with", meaning: "cope with stress", bengali: "মানিয়ে চলা (কখনও cope up with নয়)" },
  { term: "correspond to / with", meaning: "correspond with a friend (write); correspond to facts (match)", bengali: "চিঠি আদান-প্রদান করা / মিলে যাওয়া" },
  { term: "count on / upon", meaning: "count on his help", bengali: "ভরসা করা" },
  { term: "cure of", meaning: "cure him of the disease", bengali: "রোগমুক্ত করা" },
  { term: "deal in / with", meaning: "deal in cloth (trade); deal with the problem (manage)", bengali: "ব্যবসা করা (in) / আচরণ বা সমাধান করা (with)" },
  { term: "decide on / upon", meaning: "decide on a date", bengali: "সিদ্ধান্ত নেওয়া" },
  { term: "depend on / upon", meaning: "depend on your efforts", bengali: "নির্ভর করা" },
  { term: "derive from", meaning: "derive pleasure from music", bengali: "উৎস থেকে লাভ করা" },
  { term: "die of / from / for", meaning: "die of cholera (disease); die from injury; die for the country (noble cause)", bengali: "মারা যাওয়া (রোগে of, কারণে from, আত্মত্যাগে for)" },
  { term: "differ from / with", meaning: "differ from others (unlike); differ with him (disagree)", bengali: "ভিন্ন হওয়া / মতপার্থক্য হওয়া" },
  { term: "discourage from", meaning: "discourage him from going", bengali: "নিরুৎসাহিত করা" },
  { term: "dispose of", meaning: "dispose of the waste", bengali: "ফেলে দেওয়া / নিষ্পত্তি করা (single 'f')" },
  { term: "dissuade from", meaning: "dissuade him from leaving", bengali: "পরামর্শ দিয়ে বিরত রাখা" },
  { term: "distinguish between / from", meaning: "distinguish right from wrong", bengali: "পার্থক্য করা" },
  { term: "divide between / among / into", meaning: "divide between two; divide among three or more", bengali: "ভাগ করা" },
  { term: "dwell on / in", meaning: "dwell on the past (think); dwell in a hut (live)", bengali: "ভেবে সময় নষ্ট করা / বাস করা" },
  { term: "engage in", meaning: "engage in trade", bengali: "লিপ্ত থাকা" },
  { term: "escape from", meaning: "escape from prison", bengali: "পালিয়ে যাওয়া" },
  { term: "excel in / at", meaning: "excel in sports", bengali: "অসাধারণ দক্ষতা দেখানো" },
  { term: "exchange for / with", meaning: "exchange it for a new one", bengali: "বিনিময় করা" },
  { term: "explain to", meaning: "explain the rule to him", bengali: "ব্যাখ্যা করা" },
  { term: "fail in / to", meaning: "fail in maths; fail to understand", bengali: "ব্যর্থ হওয়া" },
  { term: "feed on / with", meaning: "cows feed on grass", bengali: "খেয়ে বেঁচে থাকা" },
  { term: "fight with / against / for", meaning: "fight for freedom; fight against injustice", bengali: "লড়াই করা" },
  { term: "forgive for", meaning: "forgive him for his mistake", bengali: "ক্ষমা করা" },
  { term: "guard against", meaning: "guard against danger", bengali: "সতর্ক থাকা" },
  { term: "hear of / from", meaning: "hear of his death (news); hear from him (letter)", bengali: "খবর পাওয়া" },
  { term: "hint at", meaning: "hint at a problem", bengali: "ইঙ্গিত করা" },
  { term: "hope for", meaning: "hope for the best", bengali: "আশা করা" },
  { term: "hunt for", meaning: "hunt for a job", bengali: "অনুসন্ধান করা" },
  { term: "impose on / upon", meaning: "impose a fine on him", bengali: "ধার্য করা" },
  { term: "indulge in", meaning: "indulge in gossip", bengali: "প্রশ্রয় দেওয়া / লিপ্ত হওয়া" },
  { term: "inform of / about", meaning: "inform him of the result", bengali: "জানানো" },
  { term: "insist on / upon", meaning: "insist on payment", bengali: "জেদ করা" },
  { term: "insure against", meaning: "insure against fire", bengali: "বীমা করা" },
  { term: "interfere in / with", meaning: "interfere in his affairs", bengali: "হস্তক্ষেপ করা" },
  { term: "intrude on / upon", meaning: "intrude on his privacy", bengali: "অনধিকার প্রবেশ করা" },
  { term: "invest in", meaning: "invest in shares", bengali: "বিনিয়োগ করা" },
  { term: "invite to", meaning: "invite him to dinner", bengali: "আমন্ত্রণ জানানো" },
  { term: "involve in", meaning: "involved in a scandal", bengali: "জড়িত থাকা" },
  { term: "jeer at", meaning: "jeer at the beggar", bengali: "উপহাস করা" },
  { term: "knock at / on", meaning: "knock at the door", bengali: "টোকা দেওয়া" },
  { term: "laugh at", meaning: "laugh at his mistakes", bengali: "উপহাস করা" },
  { term: "lean on / against", meaning: "lean on the wall", bengali: "হেলান দেওয়া" },
  { term: "listen to", meaning: "listen to the teacher", bengali: "মনোযোগ দিয়ে শোনা" },
  { term: "live on / in / at", meaning: "live on rice (food); live in Kolkata (city)", bengali: "খেয়ে বেঁচে থাকা / বাস করা" },
  { term: "long for", meaning: "long for freedom", bengali: "তীব্র আকাঙ্ক্ষা করা" },
  { term: "look at / for / after / into", meaning: "look at (see); look for (search); look after (care); look into (investigate)", bengali: "তাকানো / খোঁজা / যত্ন নেওয়া / তদন্ত করা" },
  { term: "meddle in / with", meaning: "meddle in his affairs", bengali: "নাক গলানো" },
  { term: "mix with", meaning: "mix water with milk", bengali: "মিশ্রিত করা" },
  { term: "mourn for / over", meaning: "mourn for the dead", bengali: "শোক করা" },
  { term: "object to", meaning: "object to the proposal", bengali: "আপত্তি করা" },
  { term: "occur to", meaning: "an idea occurred to me", bengali: "মনে উদয় হওয়া" },
  { term: "operate on", meaning: "operate on the patient", bengali: "অস্ত্রোপচার করা" },
  { term: "participate in", meaning: "participate in the debate", bengali: "অংশগ্রহণ করা" },
  { term: "pay for / to", meaning: "pay for the goods", bengali: "মূল্য পরিশোধ করা" },
  { term: "persist in", meaning: "persist in his efforts", bengali: "অধ্যবসায়ের সাথে চালিয়ে যাওয়া" },
  { term: "plead with / for", meaning: "plead for mercy", bengali: "অনুনয় করা" },
  { term: "pray to / for", meaning: "pray to God for help", bengali: "প্রার্থনা করা" },
  { term: "prefer X to Y", meaning: "prefer tea to coffee", bengali: "অধিকতর পছন্দ করা (than নয়)" },
  { term: "prevent from", meaning: "prevent him from going", bengali: "বাধা দেওয়া / বিরত রাখা" },
  { term: "prohibit from", meaning: "prohibit him from entering", bengali: "নিষিদ্ধ করা" },
  { term: "protect from / against", meaning: "protect from the sun", bengali: "রক্ষা করা" },
  { term: "provide with / for", meaning: "provide him with food", bengali: "সরবরাহ করা" },
  { term: "punish for", meaning: "punish him for lying", bengali: "শাস্তি দেওয়া" },
  { term: "quarrel with / over / about", meaning: "quarrel with him over money", bengali: "ঝগড়া করা" },
  { term: "recover from", meaning: "recover from illness", bengali: "সুস্থ হয়ে ওঠা" },
  { term: "refer to", meaning: "refer to the dictionary", bengali: "উল্লেখ বা পরামর্শ করা" },
  { term: "refrain from", meaning: "refrain from smoking", bengali: "বিরত থাকা" },
  { term: "rejoice at / in", meaning: "rejoice at the news", bengali: "আনন্দ প্রকাশ করা" },
  { term: "rely on / upon", meaning: "rely on your friends", bengali: "ভরসা করা" },
  { term: "remind of / about", meaning: "remind him of his promise", bengali: "স্মরণ করিয়ে দেওয়া" },
  { term: "reply to", meaning: "reply to a letter", bengali: "উত্তর দেওয়া" },
  { term: "resort to", meaning: "resort to force", bengali: "আশ্রয় নেওয়া" },
  { term: "respond to", meaning: "respond to the call", bengali: "সাড়া দেওয়া" },
  { term: "result in / from", meaning: "result in failure (cause); result from carelessness (origin)", bengali: "পরিণতি হওয়া" },
  { term: "retire from", meaning: "retire from service", bengali: "অবসর নেওয়া" },
  { term: "rid of", meaning: "rid the house of rats", bengali: "মুক্ত হওয়া" },
  { term: "rob of", meaning: "rob him of his purse", bengali: "ছিনতাই বা ডাকাতি করা" },
  { term: "search for", meaning: "search for the key", bengali: "খোঁজা" },
  { term: "see to", meaning: "see to the arrangements", bengali: "ব্যবস্থা করা" },
  { term: "send for", meaning: "send for the doctor", bengali: "ডেকে পাঠানো" },
  { term: "shout at / to", meaning: "shout at the boy (angrily); shout to him (call from distance)", bengali: "চিৎকার করা" },
  { term: "smile at", meaning: "smile at her", bengali: "মুচকি হাসা" },
  { term: "speak to / with / of", meaning: "speak to the manager", bengali: "কথা বলা" },
  { term: "stare at", meaning: "stare at the stranger", bengali: "একদৃষ্টে তাকিয়ে থাকা" },
  { term: "stick to", meaning: "stick to the plan", bengali: "লেগে থাকা" },
  { term: "subscribe to", meaning: "subscribe to a magazine", bengali: "গ্রাহক হওয়া" },
  { term: "succeed in / to", meaning: "succeed in the exam (achieve); succeed to the throne (inherit)", bengali: "সফল হওয়া / সিংহাসনে বসা" },
  { term: "suffer from", meaning: "suffer from fever", bengali: "ভোগা" },
  { term: "suspect of", meaning: "suspect him of theft", bengali: "সন্দেহ করা" },
  { term: "sympathise with", meaning: "sympathise with the poor", bengali: "সহানুভূতি দেখানো" },
  { term: "take after / care of", meaning: "take after his father (resemble); take care of health", bengali: "সদৃশ হওয়া / যত্ন নেওয়া" },
  { term: "talk to / with / about", meaning: "talk to the teacher", bengali: "কথা বলা" },
  { term: "think of / about", meaning: "think of a plan", bengali: "ভাবা / চিন্তা করা" },
  { term: "threaten with", meaning: "threaten him with dismissal", bengali: "হুমকি দেওয়া" },
  { term: "throw at / to", meaning: "throw a stone at the dog (to hurt); throw the ball to him (to catch)", bengali: "নিক্ষেপ করা" },
  { term: "translate into / from", meaning: "translate into Bengali", bengali: "অনুবাদ করা" },
  { term: "trust in / to", meaning: "trust in God", bengali: "বিশ্বাস বা ভরসা রাখা" },
  { term: "turn to / into / down", meaning: "turn down the offer (reject)", bengali: "প্রত্যাখ্যান করা / ঘুরে দাঁড়ানো" },
  { term: "wait for / on", meaning: "wait for the bus; wait on a customer (serve)", bengali: "অপেক্ষা করা / সেবা দেওয়া" },
  { term: "warn of / against", meaning: "warn him against danger", bengali: "সতর্ক করা" },
  { term: "wish for", meaning: "wish for peace", bengali: "প্রার্থনা বা আকাঙ্ক্ষা করা" },
  { term: "wonder at", meaning: "wonder at his courage", bengali: "বিস্মিত হওয়া" },
  { term: "worry about", meaning: "worry about the result", bengali: "চিন্তিত হওয়া" },
  { term: "yearn for", meaning: "yearn for home", bengali: "ব্যাকুল আকাঙ্ক্ষা করা" },

  // C4: Nouns + Preposition (Selected High-Yield from 80)
  { term: "admiration for", meaning: "admiration for her courage", bengali: "শ্রদ্ধা বা প্রশংসা" },
  { term: "advantage of / over", meaning: "advantage over rivals", bengali: "সুবিধা" },
  { term: "affection for / towards", meaning: "affection for children", bengali: "স্নেহ বা মায়া" },
  { term: "anxiety about / for", meaning: "anxiety about the result", bengali: "উদ্বেগ" },
  { term: "apology for / to", meaning: "an apology for the delay", bengali: "ক্ষমা প্রার্থনা" },
  { term: "application for / to", meaning: "application for leave; application to the principal", bengali: "আবেদন" },
  { term: "approval of", meaning: "approval of the plan", bengali: "অনুমোদন" },
  { term: "aversion to", meaning: "an aversion to noise", bengali: "বিতৃষ্ণা" },
  { term: "belief in", meaning: "belief in God", bengali: "বিশ্বাস" },
  { term: "cause of", meaning: "the cause of the fire", bengali: "কারণ" },
  { term: "choice between / of", meaning: "a choice between two", bengali: "পছন্দ" },
  { term: "confidence in", meaning: "confidence in him", bengali: "আত্মবিশ্বাস বা আস্থা" },
  { term: "contempt for", meaning: "contempt for cowards", bengali: "ঘৃণা বা তাচ্ছিল্য" },
  { term: "contribution to", meaning: "a contribution to science", bengali: "অবদান" },
  { term: "control over", meaning: "control over the class", bengali: "নিয়ন্ত্রণ" },
  { term: "cruelty to", meaning: "cruelty to animals", bengali: "নিষ্ঠুরতা" },
  { term: "cure for", meaning: "a cure for cancer", bengali: "উপশম বা আরোগ্য" },
  { term: "danger of / to", meaning: "danger of fire (risk); danger to life (harm)", bengali: "বিপদ" },
  { term: "demand for", meaning: "demand for jobs", bengali: "চাহিদা" },
  { term: "desire for", meaning: "desire for fame", bengali: "আকাঙ্ক্ষা" },
  { term: "difference between / in", meaning: "difference between the two", bengali: "পার্থক্য" },
  { term: "faith in", meaning: "faith in God", bengali: "বিশ্বাস" },
  { term: "fear of", meaning: "fear of failure", bengali: "ভয়" },
  { term: "habit of", meaning: "the habit of reading", bengali: "অভ্যাস" },
  { term: "hope of / for", meaning: "hope of success", bengali: "আশা" },
  { term: "increase in", meaning: "an increase in prices", bengali: "বৃদ্ধি" },
  { term: "insistence on", meaning: "insistence on payment", bengali: "জেদ" },
  { term: "invitation to", meaning: "an invitation to dinner", bengali: "আমন্ত্রণ" },
  { term: "knowledge of", meaning: "knowledge of law", bengali: "জ্ঞান" },
  { term: "lack of", meaning: "lack of money", bengali: "ঘাটতি বা অভাব" },
  { term: "need for / of", meaning: "need for rest", bengali: "প্রয়োজন" },
  { term: "objection to", meaning: "objection to the plan", bengali: "আপত্তি" },
  { term: "obstacle to", meaning: "an obstacle to progress", bengali: "বাধা" },
  { term: "pity for / on", meaning: "pity for the poor", bengali: "করুণা" },
  { term: "pride in", meaning: "pride in his work", bengali: "গর্ব (take pride in)" },
  { term: "reason for", meaning: "the reason for the delay", bengali: "কারণ" },
  { term: "remedy for / against", meaning: "a remedy for fever", bengali: "প্রতিকার" },
  { term: "respect for", meaning: "respect for teachers", bengali: "শ্রদ্ধা" },
  { term: "thirst for", meaning: "thirst for knowledge", bengali: "পিপাসা বা তীব্র আকাঙ্ক্ষা" },
  { term: "trust in", meaning: "trust in friends", bengali: "বিশ্বাস" },
  { term: "victory over", meaning: "victory over the enemy", bengali: "বিজয়" },

  // C5: Verbs That Take NO Preposition
  { term: "approach [NO prep]", meaning: "approach the teacher (NOT approach to)", bengali: "কাছে যাওয়া (কোনো Preposition বসে না)" },
  { term: "attend [NO prep]", meaning: "attend a meeting (NOT attend to a meeting)", bengali: "উপস্থিত থাকা (কোনো Preposition বসে না)" },
  { term: "contact [NO prep]", meaning: "contact the manager (NOT contact with)", bengali: "যোগাযোগ করা (কোনো Preposition বসে না)" },
  { term: "describe [NO prep]", meaning: "describe the scene (NOT describe about)", bengali: "বর্ণনা করা (কোনো Preposition বসে না)" },
  { term: "discuss [NO prep]", meaning: "discuss the matter (NOT discuss about)", bengali: "আলোচনা করা (discuss-এর পর about বসে না)" },
  { term: "enter [NO prep]", meaning: "enter the room (NOT enter into the room)", bengali: "প্রবেশ করা (স্থানে প্রবেশে enter-এর পর into বসে না)" },
  { term: "marry [NO prep]", meaning: "marry her (NOT marry with)", bengali: "বিবাহ করা (Active-এ marry-র পর Preposition বসে না)" },
  { term: "mention [NO prep]", meaning: "mention the fact (NOT mention about)", bengali: "উল্লেখ করা (mention-এর পর about বসে না)" },
  { term: "reach [NO prep]", meaning: "reach Kolkata (NOT reach to)", bengali: "পৌঁছানো (reach-এর পর to বসে না)" },
  { term: "resemble [NO prep]", meaning: "resemble his father (NOT resemble to/with)", bengali: "সদৃশ হওয়া (resemble-এর পর to বা with বসে না)" },

  // C6: Same Word, Different Preposition, Different Meaning
  { term: "agree to / with / on", meaning: "to a plan (accept); with a person; on a matter (settle)", bengali: "প্রস্তাবে agree to; ব্যক্তির সাথে agree with; বিষয়ে agree on" },
  { term: "angry with / at", meaning: "with a person; at a thing or event", bengali: "ব্যক্তির উপর angry with; আচরণের উপর angry at" },
  { term: "anxious about / for", meaning: "anxious about (worried); anxious for (eager to get)", bengali: "দুশ্চিন্তায় anxious about; কামনায় anxious for" },
  { term: "appeal to / for / against", meaning: "to a person; for help; against a decision", bengali: "ব্যক্তির কাছে appeal to; সাহায্যের appeal for; রায়ের বিরুদ্ধে appeal against" },
  { term: "compare to / with", meaning: "to (point out likeness in dissimilar things); with (compare similar things)", bengali: "অসম বস্তুর সাথে compare to; সমজাতীয় জিনিসে compare with" },
  { term: "die of / from / for", meaning: "of a disease; from a wound/overwork; for a noble cause", bengali: "রোগে die of; আঘাতে die from; দেশের জন্য die for" },
  { term: "differ from / with", meaning: "from (be unlike in appearance); with (disagree in opinion)", bengali: "গঠনে differ from; মতপার্থক্যে differ with" },
  { term: "good at / for / to", meaning: "good at a skill; good for health; good to others (kind)", bengali: "দক্ষতায় good at; স্বাস্থ্যে good for; ব্যবহারে good to" },
  { term: "part with / from", meaning: "part with a thing (give up); part from a person (leave)", bengali: "জিনিস ত্যাগ করতে part with; ব্যক্তির সাথে বিচ্ছেদে part from" },
  { term: "throw at / to", meaning: "throw at (to hit/hurt); throw to (so that it can be caught)", bengali: "আঘাত করতে throw at; ক্যাচ ধরার জন্য throw to" },
  { term: "wait for / on", meaning: "wait for a person or bus; wait on a customer (serve)", bengali: "অপেক্ষায় wait for; সেবায় wait on / upon" },

  // D2: Tested Preposition Pairs
  { term: "at / on / in (time)", meaning: "at for exact times (at 5 p.m.); on for days/dates (on Monday, on 15 August); in for months/years/seasons (in May, in 2026)", bengali: "নির্দিষ্ট সময়ে at; বার ও তারিখে on; মাস, বছর ও ঋতুতে in" },
  { term: "at / on / in (place)", meaning: "at for a point (at the door); on for a surface (on the table); in for an enclosed space/city (in the room, in India)", bengali: "বিন্দুতে at; তলে on; বড় স্থান বা ঘেরা জায়গায় in" },
  { term: "between / among", meaning: "between for two persons/things; among for three or more (a group)", bengali: "দুজনের মধ্যে between; অনেকের মধ্যে among" },
  { term: "since / for", meaning: "since with a starting point (since 2020, since Monday); for with a duration (for six years, for two hours)", bengali: "নির্দিষ্ট সূচনায় since (Point of time); সময়কালে for (Period of time)" },
  { term: "by / with", meaning: "by for the doer/means (written by him, go by bus); with for the instrument (cut with a knife)", bengali: "কর্তা বা মাধ্যমে by; যন্ত্র বা হাতিয়ারে with" },
  { term: "beside / besides", meaning: "beside means next to; besides means in addition to", bengali: "পাশে বোঝাতে beside; ছাড়াও/অতিরিক্ত বোঝাতে besides" },
  { term: "in / into", meaning: "in shows position inside (in the room); into shows movement towards inside (walk into the room)", bengali: "ভেতরে স্থিতিতে in; ভেতরে গতিশীলতায় into" },
  { term: "on / onto", meaning: "on shows position on a surface; onto shows movement to a surface (jump onto the floor)", bengali: "তলে স্থিতিতে on; তলের উপর গতিশীলতায় onto" },
  { term: "to / till (until)", meaning: "to for destination (go to school); till/until for time (wait till five)", bengali: "গন্তব্যে to; সময়ে till / until" },
  { term: "by / until (deadline)", meaning: "by means not later than (finish by Friday); until means continuing up to that time (stay until Friday)", bengali: "সর্বশেষ সময়সীমায় by; সেই সময় পর্যন্ত চলতে থাকা বোঝাতে until" },
  { term: "during / for", meaning: "during names a period (during the war); for gives its duration (for three years)", bengali: "কোনো ঘটনা চলাকালীন during; মোট স্থিতিকালে for" },
  { term: "over / above", meaning: "above is higher without touching; over can also mean covering or crossing (a bridge over the river)", bengali: "স্পর্শ ছাড়া উপরে above; আচ্ছাদন বা পারাপারে over" },
  { term: "under / below", meaning: "under is directly beneath or covered by; below is lower than, not necessarily directly under", bengali: "সরাসরি নিচে বা ঢাকা অবস্থায় under; তুলনায় নিচু স্তরে below" },
  { term: "in front of / opposite", meaning: "in front of is before something in the same line; opposite is facing it across a space", bengali: "একই লাইনে সামনে in front of; সামনাসামনি মুখোমুখি opposite" },
  { term: "travel prepositions", meaning: "by bus, by train, by air (general); on foot; in a car or taxi; on a bus or train (when inside moving)", bengali: "যাতায়াত বাহনে by bus/train; পায়ে হেঁটে on foot; গাড়ি/ট্যাক্সিতে in a car; বাস/ট্রেনের ভেতরে on a bus" }
];

// Enrich g05 rules with Part C and D details
const enrichedPrepRules = [
  {
    rule: "Time, Place & Movement Prepositions (D1 & D2)",
    examples: [
      "Time: at for exact time (at 5 p.m.); on for days and dates (on Monday, on 15 August); in for months, years, seasons and parts of the day (in May, in 2026, in the morning).",
      "Place: at for a specific point (at the door, at the station); on for a surface (on the table); in for an enclosed space or large city/country (in the room, in India).",
      "Movement: into shows movement entering inside (He jumped into the pond); onto shows movement landing on a surface (The cat jumped onto the sofa).",
      "Destination vs. Duration: to for destination (She walked to school); towards for direction (He ran towards the gate); till/until for time (Wait until he comes)."
    ],
    exceptions: [
      "Do NOT use 'at' for morning/evening without 'the': use 'in the morning', but 'at night', 'at noon', 'at dawn'."
    ]
  },
  {
    rule: "Between vs. Among, Since vs. For, By vs. With (D2)",
    examples: [
      "Between: used strictly for two persons or things (Divide the sweets between the two boys).",
      "Among: used for three or more in a group (She sat among the guests; divide among the students).",
      "Since: used for a specific starting point in time (I have waited since morning; since 2020).",
      "For: used for a duration or period of time (I have lived here for ten years; for two hours).",
      "By (Doer / Means): The book was written by Tagore; He goes to office by bus.",
      "With (Instrument): He wrote the letter with a pen; She cut the apple with a knife."
    ],
    exceptions: [
      "Between can be used for more than two when expressing a clear mutual reciprocal relationship (e.g., A treaty between three countries)."
    ]
  },
  {
    rule: "Beside vs. Besides, Over vs. Above, Under vs. Below (D2)",
    examples: [
      "Beside (by the side of): He sat beside me during the lecture.",
      "Besides (in addition to): Besides English, he speaks Bengali and Hindi fluently.",
      "Above: higher level without contact (The fan is above the bed; temperature above zero).",
      "Over: covering, direct vertical alignment, or crossing across (A plane flew over the city; a bridge over the river).",
      "Under: directly beneath or covered by something (The dog is under the table).",
      "Below: lower in degree, rank, scale, or elevation (The temperature fell below zero; his score was below average)."
    ],
    exceptions: [
      "Never confuse 'beside' (পাশে) with 'besides' (তাছাড়া/অতিরিক্ত)."
    ]
  },
  {
    rule: "Verbs That Take NO Preposition (C5 - High-Yield Exam Trap)",
    examples: [
      "approach: The student approached the teacher. (NOT approach to)",
      "attend: We attended the meeting. (NOT attend to the meeting)",
      "contact: Please contact the manager immediately. (NOT contact with)",
      "describe: He described the scene in detail. (NOT describe about)",
      "discuss: They discussed the matter yesterday. (NOT discuss about)",
      "enter: She entered the room quietly. (NOT enter into the room)",
      "marry: He married her in 2022. (NOT marry with her in active voice)",
      "mention: She mentioned the incident earlier. (NOT mention about)",
      "reach: We reached Kolkata at midnight. (NOT reach to Kolkata)",
      "resemble: The boy resembles his father closely. (NOT resemble to/with)"
    ],
    exceptions: [
      "Enter takes 'into' ONLY in an idiomatic sense of beginning an agreement or investigation (e.g., 'He entered into an agreement / partnership'), but NEVER for entering physical rooms or places."
    ]
  },
  {
    rule: "Same Word, Different Preposition, Completely Different Meaning (C6)",
    examples: [
      "agree: agree TO a proposal/plan; agree WITH a person; agree ON a settled price.",
      "angry: angry WITH a person (angry with him); angry AT a thing or behaviour (angry at the delay).",
      "anxious: anxious ABOUT results (worried); anxious FOR success (eager to attain).",
      "appeal: appeal TO a judge (person); appeal FOR help; appeal AGAINST a verdict (decision).",
      "compare: compare TO (likening dissimilar things: compare life to a dream); compare WITH (similar things: compare Kolkata with Delhi).",
      "die: die OF cholera/malaria (a disease); die FROM overwork/wound; die FOR the nation (noble sacrifice).",
      "differ: differ FROM others (unlike in nature/looks); differ WITH him (disagree in opinion).",
      "good: good AT mathematics (skill); good FOR health (beneficial); good TO the poor (kind).",
      "look: look AT (view); look FOR (search); look AFTER (care); look INTO (investigate); look DOWN ON (despise); look UP TO (respect).",
      "part: part WITH a possession/money (relinquish); part FROM a friend/person (depart from).",
      "throw: throw a stone AT a dog (to hit/harm); throw the ball TO a player (to catch).",
      "wait: wait FOR a train (await); wait ON/UPON a guest (serve/attend)."
    ],
    exceptions: [
      "Die of disease (He died OF cancer, NOT from cancer); Die from cause (He died FROM snakebite / loss of blood)."
    ]
  },
  {
    rule: "Fixed Prepositions in Crime, Law, Adjectives & Verbs (C1, C2, C3, C4)",
    examples: [
      "Crime & Law: accused of, acquitted of, convicted of, guilty of, sentenced to death, suspected of, charged with fraud.",
      "Adjectives + To: senior to, junior to, superior to, inferior to, prior to, prefer to, harmful to, deaf to, polite to, married to, addicted to, true to.",
      "Adjectives + Of: aware of, beware of, proud of, fond of, capable of, guilty of, worthy of, afraid of, conscious of, devoid of, deprived of, confident of.",
      "Verbs + From: abstain from, refrain from, prevent from, prohibit from, recover from, differ from, escape from, suffer from.",
      "Verbs + In / On: believe in, persist in, succeed in, indulge in, insist on, rely on, count on, congratulate on his success."
    ],
    exceptions: [
      "Latin adjectives ending in -ior (senior, junior, superior, inferior, prior) always take 'to', never 'than' (He is senior to me, NOT than me)."
    ]
  }
];

const enrichedPrepositionsNote = {
  ...prepExisting,
  title: "Prepositions & Fixed Preposition Mastery",
  intro: "Comprehensive guide to English prepositions for WBPSC Clerkship: spatial and temporal rules, preposition pairs, Latin adjectives, verbs taking NO preposition, polysemous preposition shifts, and an official 350+ fixed prepositions repository.",
  rules: enrichedPrepRules,
  bookletTitle: "WBPSC Official Appropriate Prepositions Directory",
  bookletList: fixedPrepositionsList,
  revision: [
    "At for exact point and time; On for surface, days and dates; In for enclosed spaces, months, years and cities.",
    "Between is for two; Among is for three or more.",
    "Since marks a starting point (point of time); For measures duration (period of time).",
    "By is for doer or transport; With is for instrument (cut with a knife).",
    "Beside means next to; Besides means in addition to.",
    "Into and onto denote dynamic movement; In and on denote stationary position.",
    "Verbs taking NO preposition: discuss (not about), enter (not into a room), resemble (not to), marry (not with), reach (not to), contact (not with), approach (not to).",
    "Latin comparatives (senior, junior, superior, inferior, prior, prefer) take 'to', never 'than'.",
    "Die OF a disease (cholera, cancer); Die FROM a cause/injury; Die FOR the country.",
    "Angry with a person; Angry at a thing or conduct."
  ]
};

// ============================================================================
// 4. WRITE UPDATED FILES & BOOKLET REPOSITORY
// ============================================================================

fs.writeFileSync('data/notes/grammar/13-active-passive-voice.json', JSON.stringify(voiceNote, null, 2), 'utf8');
console.log('Successfully updated data/notes/grammar/13-active-passive-voice.json');

fs.writeFileSync('data/notes/grammar/14-direct-indirect-speech.json', JSON.stringify(narrationNote, null, 2), 'utf8');
console.log('Successfully updated data/notes/grammar/14-direct-indirect-speech.json');

fs.writeFileSync('data/notes/grammar/05-prepositions.json', JSON.stringify(enrichedPrepositionsNote, null, 2), 'utf8');
console.log('Successfully updated data/notes/grammar/05-prepositions.json with rules and 350+ item bookletList');

// Also save standalone fixed prepositions booklet
fs.writeFileSync('data/booklet/fixed-prepositions.json', JSON.stringify(fixedPrepositionsList, null, 2), 'utf8');
console.log('Successfully saved data/booklet/fixed-prepositions.json');
