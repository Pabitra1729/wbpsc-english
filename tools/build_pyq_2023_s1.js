const fs = require('fs');
const path = require('path');

const rawQuestions2023S1 = [
  {
    qNum: 1,
    sec: "english",
    topic: "prepositions",
    subject: "English Language",
    q: "Complete the sentence with the correct preposition: The customs were searching ______ drugs at the airport.",
    opts: ["for", "on", "in", "at"],
    ans: 0,
    expl: "To 'search for' means to look carefully in order to find something.",
    hint: "সঠিক Preposition নির্বাচন (Appropriate Preposition: search for something)"
  },
  {
    qNum: 2,
    sec: "english",
    topic: "prepositions",
    subject: "English Language",
    q: "Insert the correct preposition in the following sentence: He acceded ______ my request.",
    opts: ["for", "of", "on", "to"],
    ans: 3,
    expl: "'Accede to' is the standard prepositional collocation meaning to agree to a demand or request.",
    hint: "নির্দিষ্ট Preposition (Appropriate Preposition: accede to a request)"
  },
  {
    qNum: 3,
    sec: "english",
    topic: "synonyms",
    subject: "English Language",
    q: "A synonym of the word 'Equivocal' is",
    opts: ["Ambiguous", "Equal", "Clear", "Vocal"],
    ans: 0,
    expl: "'Equivocal' means open to more than one interpretation; ambiguous or uncertain.",
    hint: "সমার্থক শব্দ (Equivocal = দ্ব্যর্থক / অস্পষ্ট = Ambiguous)"
  },
  {
    qNum: 4,
    sec: "english",
    topic: "partsOfSpeech",
    subject: "English Language",
    q: "They are men of like build and stature. In this sentence 'like' has been used as a/an",
    opts: ["Adjective", "Noun", "Preposition", "Adverb"],
    ans: 0,
    expl: "Here, 'like' modifies the nouns 'build and stature', meaning 'similar', functioning as an Adjective.",
    hint: "Part of Speech সনাক্তকরণ: Noun-কে বিশেষিত করায় 'like' Adjective"
  },
  {
    qNum: 5,
    sec: "english",
    topic: "confusingWords",
    subject: "English Language",
    q: "Fill in the blank: He could not ______ to see his brother in any kind of distress.",
    opts: ["bare", "beer", "bore", "bear"],
    ans: 3,
    expl: "'Bear' means to endure or tolerate pain or suffering.",
    hint: "Confusing Words: Bear = সহ্য করা (cannot bear to see)"
  },
  {
    qNum: 6,
    sec: "english",
    topic: "grammar",
    subject: "English Language",
    q: "Which of the responses is correct for the statement? \"I like ice-cream.\"",
    opts: ["So am I.", "So do I.", "So I do.", "I also like."],
    ans: 1,
    expl: "Present simple affirmative statements take 'So + do/does + subject' to express agreement.",
    hint: "বাক্য গঠন ও সম্মতি প্রকাশ: Simple Present-এ সম্মতি জানাতে 'So do I' ব্যবহৃত হয়"
  },
  {
    qNum: 7,
    sec: "english",
    topic: "nouns",
    subject: "English Language",
    q: "A ______ of wolves.",
    opts: ["herd", "colony", "drove", "pack"],
    ans: 3,
    expl: "The collective noun for wolves or hounds is a 'pack'.",
    hint: "Collective Noun: নেকড়ে বা শিকারী কুকুরের দলকে 'pack' বলা হয়"
  },
  {
    qNum: 8,
    sec: "english",
    topic: "pronouns",
    subject: "English Language",
    q: "Study the following sentence: Come and meet me in my office. What part of speech is 'me'?",
    opts: ["noun", "adverb", "pronoun", "modal verb"],
    ans: 2,
    expl: "'Me' is a first-person singular objective personal pronoun.",
    hint: "Part of Speech: 'Me' হল Personal Pronoun-এর Objective রূপ"
  },
  {
    qNum: 9,
    sec: "english",
    topic: "gender",
    subject: "English Language",
    q: "The feminine gender of Drone is",
    opts: ["Duck", "Bee", "Filly", "Doe"],
    ans: 1,
    expl: "A drone is a male bee; the feminine counterpart is 'Bee' (or Queen bee).",
    hint: "Gender: Drone (পুরুষ মৌমাছি) - এর Feminine হল Bee / Queen Bee"
  },
  {
    qNum: 10,
    sec: "english",
    topic: "idioms",
    subject: "English Language",
    q: "Replace the underlined portion with an idiom from the list provided below: I begged him to reconsider his decision but he refused to yield.",
    opts: ["took to his heels", "put his foot down", "turned his head", "took to heart"],
    ans: 1,
    expl: "'Put one's foot down' means to adopt a firm policy when faced with opposition or refusal to yield.",
    hint: "Idiom: 'Put one's foot down' = দৃঢ় অবস্থান নেওয়া বা নতি স্বীকার না করা"
  },
  {
    qNum: 11,
    sec: "english",
    topic: "voiceChange",
    subject: "English Language",
    q: "What is the most appropriate passive form of the following sentence: The mason is building the wall.",
    opts: [
      "The wall is being built by the mason.",
      "The wall is been build by the mason.",
      "The mason build wall.",
      "The mason is built by the wall."
    ],
    ans: 0,
    expl: "Present continuous active (is + V-ing) changes to passive as (is + being + V3).",
    hint: "Voice Change: Present Continuous Passive = is/are + being + V3"
  },
  {
    qNum: 12,
    sec: "english",
    topic: "antonyms",
    subject: "English Language",
    q: "An antonym of the word 'Magnanimous' is",
    opts: ["Selfish", "Generous", "Courageous", "Ignoramus"],
    ans: 0,
    expl: "'Magnanimous' means generous, noble, or forgiving; its direct opposite is 'Selfish' or petty.",
    hint: "বিপরীত শব্দ: Magnanimous (মহানুভব/উদার) এর বিপরীত Selfish (স্বার্থপর)"
  },
  {
    qNum: 13,
    sec: "english",
    topic: "sentenceTypes",
    subject: "English Language",
    q: "He replied that he worked whenever he liked. This is a/an",
    opts: ["Simple sentence", "Compound sentence", "Complex sentence", "Exclamatory sentence"],
    ans: 2,
    expl: "Contains one main clause ('He replied') and two subordinate clauses ('that he worked', 'whenever he liked'), making it a Complex sentence.",
    hint: "Sentence Type: Principal Clause ও Subordinate Clause যুক্ত বাক্য হল Complex Sentence"
  },
  {
    qNum: 14,
    sec: "english",
    topic: "phrasalVerbs",
    subject: "English Language",
    q: "Replace the underlined verb with the appropriate phrasal verb from those given below: The building was demolished last year.",
    opts: ["pulled down", "turned down", "gone down", "made down"],
    ans: 0,
    expl: "'Pull down' means to demolish, dismantle, or destroy a building.",
    hint: "Phrasal Verb: Pull down = ভেঙে ফেলা (demolish)"
  },
  {
    qNum: 15,
    sec: "english",
    topic: "transformationOfSentences",
    subject: "English Language",
    q: "Change the following sentence into an Affirmative one: This story is incomplete.",
    opts: [
      "This story is not incomplete.",
      "This story is complete.",
      "Completeness is there in this story.",
      "This story is totally complete."
    ],
    ans: 1,
    expl: "Grammatical transformation from negative-meaning adjective ('incomplete') to affirmative sentence ('This story is complete').",
    hint: "Transformation: Affirmative রূপ 'This story is complete'"
  },
  {
    qNum: 16,
    sec: "english",
    topic: "phrasalVerbs",
    subject: "English Language",
    q: "Replace the underlined verb with the appropriate phrasal verb from those given below: The plan did not succeed.",
    opts: ["come on", "come in", "come along", "come off"],
    ans: 3,
    expl: "'Come off' means to succeed or happen as planned.",
    hint: "Phrasal Verb: Come off = সফল হওয়া (succeed)"
  },
  {
    qNum: 17,
    sec: "english",
    topic: "voiceChange",
    subject: "English Language",
    q: "Change the voice: The guard refused him admittance.",
    opts: [
      "The guard refused to let him in.",
      "Admission was not granted to him by the guard.",
      "He was not admitted by the guard.",
      "He was refused admittance by the guard."
    ],
    ans: 3,
    expl: "Simple past passive retaining indirect object as subject: 'He was refused admittance by the guard.'",
    hint: "Voice Change: Double object-যুক্ত বাক্যে indirect object subject হয়"
  },
  {
    qNum: 18,
    sec: "english",
    topic: "idioms",
    subject: "English Language",
    q: "Replace the underlined word with the appropriate idiom from those given below: He listened when his boss spoke.",
    opts: ["heard carefully", "paid his ears", "gave his ears", "was all ears"],
    ans: 3,
    expl: "'To be all ears' is an English idiom meaning to listen eagerly and attentively.",
    hint: "Idiom: 'All ears' = খুব মনোযোগ দিয়ে শোনা"
  },
  {
    qNum: 19,
    sec: "english",
    topic: "oneWordSubstitution",
    subject: "English Language",
    q: "An ophthalmologist deals with",
    opts: [
      "matters of the brain.",
      "diseases related to the respiratory system.",
      "diseases of the eye.",
      "a particular skin disease."
    ],
    ans: 2,
    expl: "Ophthalmology is the medical branch dealing with the diagnosis and treatment of disorders and diseases of the eye.",
    hint: "One Word Substitution: Ophthalmologist = চোখের রোগ বিশেষজ্ঞ"
  },
  {
    qNum: 20,
    sec: "english",
    topic: "fillers",
    subject: "English Language",
    q: "Fill in the blanks in the following sentence with the appropriate words: A man ______ live ______ satisfactorily ______ he does at present ______ half his present income.",
    opts: [
      "could, very, as, by",
      "can, as, as, on",
      "would, as, like, with",
      "will, very, since, by"
    ],
    ans: 1,
    expl: "Forms the idiomatic comparative structure 'as satisfactorily as' and collocation 'live on [an income]'.",
    hint: "Sentence Completion: 'as ... as' তুলনা এবং 'live on income' গঠন"
  },
  {
    qNum: 21,
    sec: "english",
    topic: "idioms",
    subject: "English Language",
    q: "Replace the underlined portion with an idiom from the list below: He got himself into trouble by interfering in his neighbour's affairs.",
    opts: ["strained every nerve", "took to heart", "out of spirits", "burnt his fingers"],
    ans: 3,
    expl: "'Burn one's fingers' means to suffer harmful or unpleasant consequences as a result of meddling or foolish actions.",
    hint: "Idiom: 'Burn one's fingers' = অন্যের ব্যাপারে নাক গলিয়ে বিপদে পড়া"
  },
  {
    qNum: 22,
    sec: "english",
    topic: "modals",
    subject: "English Language",
    q: "Fill in the blank with the correct modal verb: The online store informed that we ______ cancel the order we placed, if we wish.",
    opts: ["shall", "would", "will", "can"],
    ans: 3,
    expl: "'Can' is used here to indicate possibility, permission, or options available to the buyer.",
    hint: "Modal Verb: সুযোগ বা অনুমতি বোঝাতে 'can' বসে"
  },
  {
    qNum: 23,
    sec: "english",
    topic: "phrasalVerbs",
    subject: "English Language",
    q: "Replace the underlined verb with the appropriate phrasal verb from those given below: I have stopped smoking.",
    opts: ["given in to", "given to", "given up", "given on"],
    ans: 2,
    expl: "'Give up' means to stop or discontinue a habit.",
    hint: "Phrasal Verb: Give up = ত্যাগ করা (stop a habit)"
  },
  {
    qNum: 24,
    sec: "english",
    topic: "sentenceTypes",
    subject: "English Language",
    q: "What kind of a sentence is the following? The moon was bright and we could see our way.",
    opts: ["Complex sentence", "Simple sentence", "Compound sentence", "Exclamatory sentence"],
    ans: 2,
    expl: "Consists of two independent coordinate clauses connected by the coordinating conjunction 'and', forming a Compound sentence.",
    hint: "Sentence Type: Coordinating Conjunction 'and' দ্বারা যুক্ত দুটি Principal Clause = Compound Sentence"
  },
  {
    qNum: 25,
    sec: "english",
    topic: "wordFormation",
    subject: "English Language",
    q: "The adjective form of the word 'Glory' is",
    opts: ["Gloried", "Glorious", "Glorification", "Gloriously"],
    ans: 1,
    expl: "'Glorious' is the correct adjective form derived from the noun 'glory'.",
    hint: "Word Formation: Noun 'Glory' থেকে Adjective 'Glorious' (গৌরবময়)"
  },
  {
    qNum: 26,
    sec: "english",
    topic: "modals",
    subject: "English Language",
    q: "Choose the correct alternative: The car broke down and we ______ get a taxi.",
    opts: ["have to", "had to", "must", "got to"],
    ans: 1,
    expl: "Past tense in the first clause ('broke down') requires the past obligation modal 'had to'.",
    hint: "Tense & Modals: অতীত ঘটনার বাধ্যবাধকতা প্রকাশ করতে 'had to' ব্যবহৃত হয়"
  },
  {
    qNum: 27,
    sec: "english",
    topic: "phrasalVerbs",
    subject: "English Language",
    q: "Replace the underlined verb with the appropriate phrasal verb from those given below: He has quarrelled with her.",
    opts: ["fallen in", "fallen out", "fallen over", "fallen down"],
    ans: 1,
    expl: "'Fall out' (with someone) means to have an argument or dispute.",
    hint: "Phrasal Verb: Fall out = বিবাদে জড়ানো / কলহ করা"
  },
  {
    qNum: 28,
    sec: "english",
    topic: "confusingWords",
    subject: "English Language",
    q: "Fill in the blank: The ______ half of the play was uninteresting.",
    opts: ["later", "latter", "latest", "late"],
    ans: 1,
    expl: "'Latter' refers to the second of two things mentioned (the second half of a play).",
    hint: "Confusing Words: Latter = দুটির মধ্যে দ্বিতীয়টি (latter half)"
  },
  {
    qNum: 29,
    sec: "english",
    topic: "voiceChange",
    subject: "English Language",
    q: "Change the voice: All his friends laughed at him.",
    opts: [
      "He was laughed at by all his friends.",
      "His friends laughed at him.",
      "His friends were laughing at him.",
      "He laughed at all his friends."
    ],
    ans: 0,
    expl: "The prepositional verb 'laughed at' retains its preposition in passive: 'He was laughed at by all his friends.'",
    hint: "Voice Change: Prepositional Verb-এর preposition টি Passive Voice-এ অক্ষুণ্ণ থাকে"
  },
  {
    qNum: 30,
    sec: "english",
    topic: "figuresOfSpeech",
    subject: "English Language",
    q: "Life is as tedious as a twice-told tale — The figures of speech used in the sentence are:",
    opts: [
      "Metaphor and Alliteration",
      "Apostrophe and Hyperbole",
      "Simile and Alliteration",
      "Alliteration and Personification"
    ],
    ans: 2,
    expl: "'As tedious as' is an explicit comparison (Simile); the repetition of initial consonant 't' in 'tedious... twice-told tale' is Alliteration.",
    hint: "Figure of Speech: 'as ... as' থাকায় Simile এবং 't' ধ্বনির পুনরাবৃত্তিতে Alliteration"
  },

  // PART II: GENERAL STUDIES & ARITHMETIC (Q31 to Q100)
  {
    qNum: 31,
    sec: "arithmetic",
    topic: "timeAndWork",
    subject: "Arithmetic",
    q: "10 men can complete a piece of work in 15 days and 15 women can complete the same work in 12 days. If all the 10 men and 15 women work together, in how many days will the work get completed?",
    opts: ["6 days", "6 1/3 days", "6 2/3 days", "7 2/3 days"],
    ans: 2,
    expl: "10 men's 1-day work = 1/15. 15 women's 1-day work = 1/12. Together 1-day work = 1/15 + 1/12 = 9/60 = 3/20. Total time required = 20/3 = 6 2/3 days.",
    hint: "ঐকিক নিয়ম / সময় ও কার্য: ১ দিনের কাজ = ১/১৫ + ১/১২ = ৩/২০ অংশ। মোট সময় = ২০/৩ = ৬ ২/৩ দিন।"
  },
  {
    qNum: 32,
    sec: "arithmetic",
    topic: "speedDistanceTime",
    subject: "Arithmetic",
    q: "The ratio between the speeds of two trains is 7:8. If the second train runs 400 kms in 4 hrs, then the speed of the first train is",
    opts: ["70 km/hr", "75 km/hr", "84 km/hr", "87.5 km/hr"],
    ans: 3,
    expl: "Speed of 2nd train = 400 / 4 = 100 km/hr. Since ratio is 7 : 8, Speed of 1st train = (7 / 8) × 100 = 87.5 km/hr.",
    hint: "গতিবেগ অনুপাত: ২য় ট্রেনের বেগ = ৪০০/৪ = ১০০ কিমি/ঘণ্টা। ১ম ট্রেনের বেগ = (৭/৮) × ১০০ = ৮৭.৫ কিমি/ঘণ্টা।"
  },
  {
    qNum: 33,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Rajaji Raghati Biosphere Reserve is located in which State of India?",
    opts: ["Uttarakhand", "Himachal Pradesh", "Maharashtra", "Karnataka"],
    ans: 0,
    expl: "Located in the Shivalik foothills of Uttarakhand (encompassing the Rajaji National Park area).",
    hint: "ভারতের ভূগোল: উত্তরাখণ্ডের শিবালিক পর্বতের পাদদেশে অবস্থিত।"
  },
  {
    qNum: 34,
    sec: "arithmetic",
    topic: "numberSystem",
    subject: "Arithmetic",
    q: "The prime numbers dividing 143 and leaving a remainder of 3 in each case are",
    opts: ["2 and 11", "11 and 13", "3 and 7", "5 and 7"],
    ans: 3,
    expl: "143 - 3 = 140. Divisors must be greater than remainder 3. Prime factorization of 140 = 2² × 5 × 7. The prime divisors > 3 are 5 and 7.",
    hint: "সংখ্যা তত্ত্ব: ১৪৩ - ৩ = ১৪০। ১৪০ এর মৌলিক উৎপাদক যা ৩ এর থেকে বড় = ৫ এবং ৭।"
  },
  {
    qNum: 35,
    sec: "arithmetic",
    topic: "hcfLcm",
    subject: "Arithmetic",
    q: "The greatest number which can divide 1356, 1868 and 2764 leaving the same remainder 12 in each case is",
    opts: ["64", "124", "156", "260"],
    ans: 0,
    expl: "Subtract remainder 12: 1356-12=1344, 1868-12=1856, 2764-12=2752. HCF(1344, 1856, 2752) = 64.",
    hint: "গসাগু (HCF): ১৩৪৪, ১৮৫৬ এবং ২৭৫২-এর গসাগু = ৬৪।"
  },
  {
    qNum: 36,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Which is the highest peak in Andaman and Nicobar Island?",
    opts: ["Mount Koya", "Mount Diavolo", "Saddle Peak", "Mount Thullier"],
    ans: 2,
    expl: "Saddle Peak (732 m) situated in North Andaman is the highest peak of the Andaman and Nicobar archipelago.",
    hint: "আন্দামান ও নিকোবর দ্বীপপুঞ্জের সর্বোচ্চ শৃঙ্গ স্যাডল পিক (উচ্চতা ৭৩২ মিটার)।"
  },
  {
    qNum: 37,
    sec: "arithmetic",
    topic: "clocks",
    subject: "Arithmetic",
    q: "At what time between 9 and 10 o'clock will the hands of a watch be together?",
    opts: ["45 min. past 9", "50 min. past 9", "49 1/11 min. past 9", "48 2/11 min. past 9"],
    ans: 2,
    expl: "At 9 o'clock, the minute hand is 45 minute spaces behind. Time taken to gain 45 spaces = 45 × (12/11) = 540/11 = 49 1/11 min past 9.",
    hint: "ঘড়ির অঙ্ক: ৯ টা বেজে (৪৫ × ১২/১১) = ৫৪০/১১ = ৪৯ ১/১১ মিনিট।"
  },
  {
    qNum: 38,
    sec: "arithmetic",
    topic: "simpleInterest",
    subject: "Arithmetic",
    q: "At what rate per cent of simple interest will a sum of money double itself in 12 years?",
    opts: ["8 1/4%", "8 1/3%", "8 1/2%", "9 1/2%"],
    ans: 1,
    expl: "If sum doubles, SI = Principal. R = (100 × SI)/(P × T) = (100 × 1)/(1 × 12) = 25/3 = 8 1/3% per annum.",
    hint: "সরল সুদ: বার্ষিক সুদের হার = ১০০ / ১২ = ২৫ / ৩ = ৮ ১/৩%।"
  },
  {
    qNum: 39,
    sec: "arithmetic",
    topic: "speedDistanceTime",
    subject: "Arithmetic",
    q: "A motor car starts with speed of 70 km/hr with its speed increasing every two hours by 10 km/hr. In how many hours will it cover 345 kms?",
    opts: ["2 1/4 hrs", "4 hrs 5 min", "4 1/2 hrs", "None of the above"],
    ans: 2,
    expl: "First 2 hrs: 70 × 2 = 140 km. Next 2 hrs at 80 km/hr: 80 × 2 = 160 km. Total in 4 hrs = 300 km. Remaining 45 km at 90 km/hr takes 45/90 = 0.5 hr. Total time = 4.5 hrs (4 1/2 hrs).",
    hint: "সময় ও দূরত্ব: প্রথম ৪ ঘণ্টায় দূরত্ব = ১৪০ + ১৬০ = ৩০০ কিমি। বাকি ৪৫ কিমি যেতে সময় = ৪৫/৯০ = ১/২ ঘণ্টা। মোট সময় = ৪ ১/২ ঘণ্টা।"
  },
  {
    qNum: 40,
    sec: "generalStudies",
    topic: "history",
    subject: "General Studies",
    q: "Who founded the University of Nalanda?",
    opts: ["Samudragupta", "Chandragupta I", "Skandagupta", "Kumargupta I"],
    ans: 3,
    expl: "Gupta emperor Kumaragupta I founded the famous ancient Nalanda Mahavihara in the 5th century CE.",
    hint: "প্রাচীন ভারতীয় ইতিহাস: ৫ম শতাব্দীতে গুপ্ত সম্রাট ১ম কুমারগুপ্ত নালন্দা বিশ্ববিদ্যালয় প্রতিষ্ঠা করেন।"
  },
  {
    qNum: 41,
    sec: "arithmetic",
    topic: "fractions",
    subject: "Arithmetic",
    q: "In a class, 3/5th of the students are girls and rest are boys. If 2/9th of the girls and 1/4th of the boys are absent, what part of the total number of students is present?",
    opts: ["17/25", "18/49", "23/30", "23/36"],
    ans: 2,
    expl: "Present girls = (1 - 2/9) × 3/5 = (7/9) × 3/5 = 7/15. Present boys = (1 - 1/4) × 2/5 = (3/4) × 2/5 = 3/10. Total present = 7/15 + 3/10 = (14 + 9)/30 = 23/30.",
    hint: "ভগ্নাংশের হিসাব: মোট উপস্থিত অংশ = (৭/১৫) + (৩/১০) = ২৩/৩০ অংশ।"
  },
  {
    qNum: 42,
    sec: "generalStudies",
    topic: "history",
    subject: "General Studies",
    q: "Market Control Policy had been first introduced in medieval India by",
    opts: ["Iltutmish", "Giyas Uddin Balban", "Alauddin Khilji", "Feroz Shah Tughluq"],
    ans: 2,
    expl: "Sultan Alauddin Khilji implemented comprehensive market regulation and price control policies in medieval India.",
    hint: "মধ্যযুগীয় ভারত: সুলতান আলাউদ্দিন খিলজি কঠোর বাজার নিয়ন্ত্রণ ও মূল্য নিয়ন্ত্রণ নীতি চালু করেন।"
  },
  {
    qNum: 43,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Which is the smallest country in the world, with an area of only 0.49 square kilometer?",
    opts: ["Monaco", "Vatican", "Andorra", "Casablanca"],
    ans: 1,
    expl: "Vatican City is the smallest independent sovereign state in the world by area (0.49 sq km) and population.",
    hint: "বিশ্ব ভূগোল: মাত্র ০.৪৯ বর্গকিমি আয়তনের ভ্যাটিকান সিটি বিশ্বের ক্ষুদ্রতম স্বাধীন রাষ্ট্র।"
  },
  {
    qNum: 44,
    sec: "arithmetic",
    topic: "hcfLcm",
    subject: "Arithmetic",
    q: "The HCF of two numbers is 8. Which one of the following can never be their LCM?",
    opts: ["24", "48", "56", "60"],
    ans: 3,
    expl: "The LCM of any two numbers must always be an exact integer multiple of their HCF. 60 is not divisible by 8.",
    hint: "লসাগু ও গসাগু: লসাগু সর্বদা গসাগু দ্বারা সম্পূর্ণরূপে বিভাজ্য হতে হয়। ৬০ সংখ্যাটি ৮ দ্বারা বিভাজ্য নয়।"
  },
  {
    qNum: 45,
    sec: "arithmetic",
    topic: "percentage",
    subject: "Arithmetic",
    q: "A shopkeeper has a certain number of eggs of which 5% are found to be broken. He sells 93% of the remainder and still has 266 eggs left. How many eggs did he originally have?",
    opts: ["3800", "4000", "4200", "None of the above"],
    ans: 1,
    expl: "Unbroken eggs = 95%. Unsold remainder = 7% of 95% = 0.0665. Original eggs = 266 / 0.0665 = 4000.",
    hint: "শতকরা: মোট ডিমের ০.০৬৬৫ অংশ = ২৬৬, সুতরাং মোট ডিম = ২৬৬ / ০.০৬৬৫ = ৪০০০।"
  },
  {
    qNum: 46,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Which State does not share border with Myanmar?",
    opts: ["Assam", "Nagaland", "Manipur", "Mizoram"],
    ans: 0,
    expl: "Arunachal Pradesh, Nagaland, Manipur, and Mizoram share international borders with Myanmar; Assam does not.",
    hint: "ভারতের সীমানা: মায়ানমারের সাথে সীমানা রয়েছে অরুণাচল, নাগাল্যান্ড, মণিপুর ও মিজোরামের; অসমের কোনো সীমানা নেই।"
  },
  {
    qNum: 47,
    sec: "generalStudies",
    topic: "polity",
    subject: "General Studies",
    q: "Which State adopted the Three-tier Panchayati Raj system for the first time?",
    opts: ["Rajasthan", "Andhra Pradesh", "Bihar", "Karnataka"],
    ans: 0,
    expl: "The three-tier Panchayati Raj was first inaugurated in Nagaur district, Rajasthan on October 2, 1959.",
    hint: "ভারতীয় সংবিধান ও শাসনব্যবস্থা: ১৯৫৯ সালের ২ অক্টোবর রাজস্থানের নাগৌরে প্রথম ত্রিস্তরীয় পঞ্চায়েতি রাজ চালু হয়।"
  },
  {
    qNum: 48,
    sec: "generalStudies",
    topic: "economy",
    subject: "General Studies",
    q: "Which of the following best describes a 'bear market'?",
    opts: [
      "A market in which prices are rising",
      "A market in which prices are falling",
      "A market with stagnant prices",
      "A market with high trading volumes"
    ],
    ans: 1,
    expl: "A bear market is characterized by falling share prices (typically 20% or more) and widespread market pessimism.",
    hint: "অর্থনীতি: বিয়ার মার্কেট (Bear Market) বলতে শেয়ার বাজারে শেয়ারের দাম একটানা নিম্নমুখী হওয়াকে বোঝায়।"
  },
  {
    qNum: 49,
    sec: "arithmetic",
    topic: "numberSystem",
    subject: "Arithmetic",
    q: "A positive number, which when added to 1000, gives a sum which is greater than when it is multiplied by 1000. This positive number is",
    opts: ["1", "3", "5", "7"],
    ans: 0,
    expl: "For x = 1: 1000 + 1 = 1001, whereas 1000 × 1 = 1000. 1001 > 1000.",
    hint: "সংখ্যার ধর্ম: ১ এর ক্ষেত্রে ১০০০ + ১ = ১০০১ > ১০০০ × ১ = ১০০০।"
  },
  {
    qNum: 50,
    sec: "generalStudies",
    topic: "history",
    subject: "General Studies",
    q: "Who is considered the founder of Renaissance Art?",
    opts: ["Donatello", "Giotto", "Masaccio", "Leonardo da Vinci"],
    ans: 1,
    expl: "Giotto di Bondone broke away from medieval Byzantine stylization and pioneered naturalistic Renaissance painting.",
    hint: "শিল্পকলার ইতিহাস: জিয়োত্তো (Giotto)-কে রেনেসাঁ চিত্রকলার জনক হিসেবে গণ্য করা হয়।"
  },
  {
    qNum: 51,
    sec: "arithmetic",
    topic: "ratioAndProportion",
    subject: "Arithmetic",
    q: "A sum of ₹750 is distributed among A, B, C and D in such a manner that A gets as much as B and C together, B gets ₹125 more than C and D gets as much as C. What is A's share?",
    opts: ["₹100", "₹225", "₹275", "₹325"],
    ans: 3,
    expl: "Let C = x, D = x, B = x + 125, A = B + C = 2x + 125. Sum: 5x + 250 = 750 => 5x = 500 => x = 100. A's share = 2(100) + 125 = ₹325.",
    hint: "বীজগণিত ও ভাগাভাগি: C = ১০০ টাকা হলে A = ২(১০০) + ১২৫ = ৩২৫ টাকা।"
  },
  {
    qNum: 52,
    sec: "arithmetic",
    topic: "boatsAndStreams",
    subject: "Arithmetic",
    q: "The speed of a boat in still water is 10 km/hr. If it can travel 26 km downstream and 14 km upstream in the same time, the speed of the stream is",
    opts: ["2 km/hr", "2.5 km/hr", "3 km/hr", "4 km/hr"],
    ans: 2,
    expl: "26 / (10 + s) = 14 / (10 - s) => 260 - 26s = 140 + 14s => 40s = 120 => s = 3 km/hr.",
    hint: "নৌকা ও স্রোত: ২৬/(১০ + s) = ১৪/(১০ - s) => ৪০s = ১২০ => স্রোতের বেগ = ৩ কিমি/ঘণ্টা।"
  },
  {
    qNum: 53,
    sec: "generalStudies",
    topic: "artAndCulture",
    subject: "General Studies",
    q: "Jamini Roy was a famous",
    opts: ["Producer", "Painter", "Dancer", "Actor"],
    ans: 1,
    expl: "Jamini Roy was a celebrated Indian painter who pioneered modern folk-style painting and was awarded the Padma Bhushan.",
    hint: "ভারতীয় সংস্কৃতি: যামিনী রায় ছিলেন একজন জগৎখ্যাত আধুনিক চিত্রশিল্পী।"
  },
  {
    qNum: 54,
    sec: "generalStudies",
    topic: "history",
    subject: "General Studies",
    q: "Numismatics is the study of-",
    opts: ["Stones and Coins", "Terracotta", "Coins", "Inscriptions"],
    ans: 2,
    expl: "Numismatics is the scientific study or collection of coins, currency, tokens, and related objects.",
    hint: "ঐতিহাসিক গবেষণা: নিউমিসম্যাটিক্স (Numismatics) হল মুদ্রা বিষয়ক বিদ্যা।"
  },
  {
    qNum: 55,
    sec: "arithmetic",
    topic: "ratioAndProportion",
    subject: "Arithmetic",
    q: "A group of 1200 persons consisting of captains and soldiers is travelling in a train. If for every 15 soldiers there is one captain, then the number of captains in the group is",
    opts: ["70", "75", "80", "82"],
    ans: 1,
    expl: "Each unit has 15 soldiers + 1 captain = 16 persons. Number of captains = 1200 / 16 = 75 captains.",
    hint: "অনুপাত: প্রতি ইউনিটে ব্যক্তি সংখ্যা = ১৫ + ১ = ১৬ জন। ক্যাপ্টেনের সংখ্যা = ১২০০ / ১৬ = ৭৫ জন।"
  },
  {
    qNum: 56,
    sec: "arithmetic",
    topic: "ratioAndProportion",
    subject: "Arithmetic",
    q: "A man distributes ₹1,65,000 among his daughter, wife and son in such a manner that 1/2 of the daughter's share, 1/4th of the wife's share and 1/5th of the son's share are equal. Find the daughter's share.",
    opts: ["₹15,000", "₹30,000", "₹45,000", "₹60,000"],
    ans: 1,
    expl: "Ratio D : W : S = 2 : 4 : 5. Total parts = 11. Daughter's share = (2/11) × 1,65,000 = ₹30,000.",
    hint: "অনুপাত: অনুপাত = ২ : ৪ : ৫ (মোট ১১ ভাগ)। মেয়ের অংশ = (২/১১) × ১,৬৫,০০০ = ৩০,০০০ টাকা।"
  },
  {
    qNum: 57,
    sec: "generalStudies",
    topic: "economy",
    subject: "General Studies",
    q: "The concept of 'Gig Economy' is characterized by",
    opts: [
      "Full-time employment with benefits.",
      "Short-term contracts or freelance work.",
      "Government jobs.",
      "Traditional economy."
    ],
    ans: 1,
    expl: "A gig economy is a labor market dominated by short-term contracts, temporary positions, or freelance independent work.",
    hint: "অর্থনীতি: গিগ ইকোনমি (Gig Economy) বলতে অস্থায়ী বা ফ্রিল্যান্সিং ভিত্তিক কাজকে বোঝায়।"
  },
  {
    qNum: 58,
    sec: "generalStudies",
    topic: "westBengalGK",
    subject: "General Studies",
    q: "Which State has recently introduced a comprehensive social welfare scheme named 'Yogyasree'?",
    opts: ["Bihar", "Jharkhand", "West Bengal", "Madhya Pradesh"],
    ans: 2,
    expl: "West Bengal launched the 'Yogyasree' scheme to provide free competitive exam training for SC and ST students.",
    hint: "পশ্চিমবঙ্গ সরকারের প্রকল্প: তপশিলি জাতি ও উপজাতি শিক্ষার্থীদের জন্য বিনামূল্যে প্রশিক্ষণ প্রকল্প 'যোগ্যশ্রী'।"
  },
  {
    qNum: 59,
    sec: "generalStudies",
    topic: "currentAffairs",
    subject: "General Studies",
    q: "Which institution has released guidelines for livestock telemedicine in India?",
    opts: ["AIIMS", "National Institution for Telemedicine", "NITI Aayog", "National Dairy Development Board"],
    ans: 2,
    expl: "NITI Aayog released national guidelines for veterinary and livestock telemedicine in India.",
    hint: "সাম্প্রতিক ঘটনাবলী: নীতি আয়োগ (NITI Aayog) গৃহপালিত পশুদের টেলিমেডিসিন সংক্রান্ত নির্দেশিকা প্রকাশ করেছে।"
  },
  {
    qNum: 60,
    sec: "generalStudies",
    topic: "currentAffairs",
    subject: "General Studies",
    q: "Who among the following is the winner of Bharat Ratna in 2024?",
    opts: ["Karpoori Thakur", "APJ Abdul Kalam", "Pandit Ravi Shankar", "Shah Vikram Sarabhai"],
    ans: 0,
    expl: "Former Bihar Chief Minister and social justice leader Karpoori Thakur was awarded the Bharat Ratna posthumously in 2024.",
    hint: "পুরস্কার ও সম্মাননা: ২০২৪ সালে সমাজতান্ত্রিক জননেতা কর্পূরী ঠাকুরকে মরণোত্তর ভারতরত্ন প্রদান করা হয়।"
  },
  {
    qNum: 61,
    sec: "generalStudies",
    topic: "artAndCulture",
    subject: "General Studies",
    q: "The dance form called 'Mohiniyattam' is associated with which State of India?",
    opts: ["Kerala", "Telangana", "Tamil Nadu", "Karnataka"],
    ans: 0,
    expl: "Mohiniyattam is a classical dance form that originated in Kerala.",
    hint: "ভারতীয় শাস্ত্রীয় নৃত্য: মোহিনীআট্টম কেরালার বিখ্যাত ধ্রুপদী নৃত্যধারা।"
  },
  {
    qNum: 62,
    sec: "generalStudies",
    topic: "polity",
    subject: "General Studies",
    q: "Which of the following Amendments allows a constitutional status to the Panchayat Raj system?",
    opts: ["71st Amendment", "72nd Amendment", "73rd Amendment", "74th Amendment"],
    ans: 2,
    expl: "The 73rd Constitutional Amendment Act of 1992 granted constitutional recognition and status to Panchayati Raj (Part IX).",
    hint: "ভারতীয় সংবিধান: ৭৩তম সংবিধান সংশোধনীর (১৯৯২) মাধ্যমে পঞ্চায়েতি রাজ সাংবিধানিক মর্যাদা লাভ করে।"
  },
  {
    qNum: 63,
    sec: "arithmetic",
    topic: "mixtures",
    subject: "Arithmetic",
    q: "In a mixture of a milk and water, the proportion of water by weight was 75%. If in the 60gm mixture 15gm of water was added, what would be the percentage of water?",
    opts: ["75%", "88%", "90%", "80%"],
    ans: 3,
    expl: "Initial water = 75% of 60 = 45g. New water = 45 + 15 = 60g. New total mixture = 60 + 15 = 75g. Water % = (60 / 75) × 100 = 80%.",
    hint: "মিশ্রণ: শুরুতে জল = ৪৫ গ্রাম। ১৫ গ্রাম জল যোগ করলে জল হয় ৬০ গ্রাম ও মোট মিশ্রণ ৭৫ গ্রাম। নতুন শতকরা = (৬০/৭৫) × ১০০ = ৮০%।"
  },
  {
    qNum: 64,
    sec: "generalStudies",
    topic: "science",
    subject: "General Studies",
    q: "How much time does sunlight take to reach the Earth?",
    opts: ["8 minutes", "2 minutes", "4 minutes", "16 minutes"],
    ans: 0,
    expl: "Sunlight takes approximately 8 minutes and 20 seconds (around 500 seconds) to travel across the ~150 million km distance to Earth.",
    hint: "সাধারণ বিজ্ঞান: সূর্য থেকে পৃথিবীতে আলো পৌঁছাতে প্রায় ৮ মিনিট ২০ সেকেন্ড সময় লাগে।"
  },
  {
    qNum: 65,
    sec: "generalStudies",
    topic: "currentAffairs",
    subject: "General Studies",
    q: "Recently which Indian shuttler won the title of the Bonn International Tournament?",
    opts: ["Aakarshi Kashyap", "Ashmita Chaliha", "P.V. Sindhu", "Tanvi Sharma"],
    ans: 3,
    expl: "Young Indian shuttler Tanvi Sharma clinched the Bonn International badminton title in 2024.",
    hint: "ক্রীড়া জগৎ: ভারতীয় শাটলার তন্বী শর্মা ২০২৪ বন আন্তর্জাতিক ব্যাডমিন্টন শিরোপা জেতেন।"
  },
  {
    qNum: 66,
    sec: "arithmetic",
    topic: "speedDistanceTime",
    subject: "Arithmetic",
    q: "A man in a train notices that he can count 21 telephone posts in one minute. If they are known to be 50 metres apart, then at what speed is the train travelling?",
    opts: ["55 km/hr", "57 km/hr", "60 km/hr", "63 km/hr"],
    ans: 2,
    expl: "21 posts mean 20 intervals. Total distance = 20 × 50 m = 1000 m = 1 km. Time = 1 minute = 1/60 hr. Speed = 1 / (1/60) = 60 km/hr.",
    hint: "দূরত্ব ও সময়: ২১টি পোস্টের মধ্যে ব্যবধান ২০টি। দূরত্ব = ২০ × ৫০ = ১০০০ মি = ১ কিমি। ১ মিনিটে ১ কিমি = ৬০ কিমি/ঘণ্টা।"
  },
  {
    qNum: 67,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "The Lonar Lake is located in-",
    opts: ["Tamil Nadu", "Maharashtra", "Uttar Pradesh", "Odisha"],
    ans: 1,
    expl: "Lonar Lake is an ancient meteor-crater saline soda lake situated in Buldhana district, Maharashtra.",
    hint: "ভারতের ভূগোল: উল্কাপিণ্ডের পতনে সৃষ্ট বিখ্যাত লোনার হ্রদ মহারাষ্ট্রের বুলধানা জেলায় অবস্থিত।"
  },
  {
    qNum: 68,
    sec: "arithmetic",
    topic: "fractions",
    subject: "Arithmetic",
    q: "5/12 of which sum is equal to 3 3/4 of 100?",
    opts: ["₹750", "₹800", "₹900", "₹1000"],
    ans: 2,
    expl: "3 3/4 of 100 = (15/4) × 100 = 375. (5/12) × x = 375 => x = (375 × 12) / 5 = ₹900.",
    hint: "ভগ্নাংশ: ৩ ৩/৪ × ১০০ = ৩৭৫। (৫/১২) × x = ৩৭৫ => x = (৩৭৫ × ১২)/৫ = ৯০০ টাকা।"
  },
  {
    qNum: 69,
    sec: "generalStudies",
    topic: "sports",
    subject: "General Studies",
    q: "Which of the following sports is related to the Ezra Cup?",
    opts: ["Polo", "Tennis", "Lawn Tennis", "Cricket"],
    ans: 0,
    expl: "Instituted in 1880 by the Calcutta Polo Club, the Ezra Cup is the oldest polo trophy in the world.",
    hint: "ক্রীড়া জগৎ: এজরা কাপ পোলো (Polo) খেলার একটি ঐতিহ্যবাহী ঐতিহাসিক ট্রফি।"
  },
  {
    qNum: 70,
    sec: "arithmetic",
    topic: "profitAndLoss",
    subject: "Arithmetic",
    q: "An article was sold for ₹144. If the percentage of profit was numerically equal to the cost price, then find the cost of the article.",
    opts: ["₹72", "₹80", "₹90", "₹100"],
    ans: 1,
    expl: "CP + (CP × CP)/100 = 144. For CP = 80: 80 + (80 × 80)/100 = 80 + 64 = ₹144.",
    hint: "লাভ ও ক্ষতি: ক্রয়মূল্য ৮০ টাকা হলে লাভ ৮০% = ৬৪ টাকা। বিক্রয়মূল্য = ৮০ + ৬৪ = ১৪৪ টাকা।"
  },
  {
    qNum: 71,
    sec: "generalStudies",
    topic: "sports",
    subject: "General Studies",
    q: "The 2026 ICC Men's T-20 World Cup will be jointly hosted by",
    opts: [
      "India and Bangladesh",
      "India and Sri Lanka",
      "India and Pakistan",
      "Bangladesh and Sri Lanka"
    ],
    ans: 1,
    expl: "The ICC has confirmed that India and Sri Lanka will jointly host the 2026 Men's T20 World Cup.",
    hint: "ক্রিকেট: ২০২৬ সালের আইসিসি পুরুষ টি-টোয়েন্টি বিশ্বকাপ ভারত ও শ্রীলঙ্কা যৌথভাবে আয়োজন করবে।"
  },
  {
    qNum: 72,
    sec: "arithmetic",
    topic: "calendar",
    subject: "Arithmetic",
    q: "If in a calendar-year, January starts with Monday, how many Wednesday do you have in January?",
    opts: ["6", "4", "3", "5"],
    ans: 3,
    expl: "Jan 1 = Mon, Jan 2 = Tue, Jan 3 = Wed. Further Wednesdays fall on Jan 10, 17, 24, 31 (Total = 5 Wednesdays).",
    hint: "ক্যালেন্ডার: জানুয়ারি ১ সোমবার হলে ৩, ১০, ১৭, ২৪ ও ৩১ তারিখ বুধবার হয়, মোট ৫টি বুধবার।"
  },
  {
    qNum: 73,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Anasagar Lake is located in which one of the following States?",
    opts: ["Gujarat", "Rajasthan", "Uttarakhand", "Karnataka"],
    ans: 1,
    expl: "Ana Sagar Lake is an artificial lake situated in Ajmer, Rajasthan, built by King Arnoraja.",
    hint: "ভারতের ভূগোল: ঐতিহাসিক আনা সাগর হ্রদ রাজস্থানের আজমীরে অবস্থিত।"
  },
  {
    qNum: 74,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "The term 'Orographic rainfall' is associated with:",
    opts: [
      "rainfall caused by cyclones.",
      "rainfall caused by warm air masses.",
      "rainfall caused by mountains.",
      "rainfall caused by convection currents."
    ],
    ans: 2,
    expl: "Orographic precipitation (relief rain) occurs when moist air masses are lifted over elevated mountain terrain.",
    hint: "ভৌগোলিক পরিভাষা: শৈলোৎক্ষেপ বৃষ্টিপাত (Orographic rainfall) পর্বত বা পাহাড়ে বাধা পেয়ে ঘটে থাকে।"
  },
  {
    qNum: 75,
    sec: "generalStudies",
    topic: "polity",
    subject: "General Studies",
    q: "Goods and Service Tax council (GST) of India is headed by",
    opts: ["Prime Minister", "Finance Minister", "Finance Secretary", "Speaker of Lok Sabha"],
    ans: 1,
    expl: "Under Article 279A of the Indian Constitution, the Union Finance Minister acts as the Chairperson of the GST Council.",
    hint: "সংবিধান ও অর্থব্যবস্থা: সংবিধানের ২৭৯এ অনুচ্ছেদ অনুযায়ী কেন্দ্রীয় অর্থমন্ত্রী জিএসটি কাউন্সিলের প্রধান।"
  },
  {
    qNum: 76,
    sec: "generalStudies",
    topic: "polity",
    subject: "General Studies",
    q: "How many Fundamental Duties are mentioned in the Indian Constitution?",
    opts: ["Five", "Seven", "Nine", "Eleven"],
    ans: 3,
    expl: "Article 51A of Part IV-A currently lists 11 Fundamental Duties (the 11th duty was added by the 86th Amendment in 2002).",
    hint: "মৌলিক কর্তব্য: ভারতীয় সংবিধানের ৫১এ ধারায় বর্তমানে মোট ১১টি মৌলিক কর্তব্য রয়েছে।"
  },
  {
    qNum: 77,
    sec: "arithmetic",
    topic: "partnership",
    subject: "Arithmetic",
    q: "A and B invest in a business in the ratio 3:2. If 5% of the total profit goes to charity and A's share is ₹855, the total profit is",
    opts: ["₹1,425", "₹1,500", "₹1,573.50", "₹1,575"],
    ans: 1,
    expl: "Distributed profit = 95% of P. A's share = (3/5) × 0.95P = 0.57P = 855 => P = 855 / 0.57 = ₹1,500.",
    hint: "অংশীদারি কারবার: A-এর অংশ = মোট লাভের ০.৫৭ অংশ = ৮৫৫ টাকা। সুতরাং মোট লাভ = ৮৫৫ / ০.৫৭ = ১৫০০ টাকা।"
  },
  {
    qNum: 78,
    sec: "arithmetic",
    topic: "average",
    subject: "Arithmetic",
    q: "The average of ten numbers is 7. If each number is multiplied by 12, then the average of the new set of numbers is",
    opts: ["7", "19", "82", "84"],
    ans: 3,
    expl: "When all values are multiplied by a constant k, the new mean is multiplied by k: 7 × 12 = 84.",
    hint: "গড়ের নিয়ম: প্রতিটি সংখ্যাকে ১২ দিয়ে গুণ করলে নতুন গড় হবে মূল গড় × ১২ = ৭ × ১২ = ৮৪।"
  },
  {
    qNum: 79,
    sec: "generalStudies",
    topic: "staticGK",
    subject: "General Studies",
    q: "What is Argentina's currency?",
    opts: ["Dollar", "Kroon", "Peso", "Sol"],
    ans: 2,
    expl: "The official national currency of Argentina is the Argentine Peso (ARS).",
    hint: "আন্তর্জাতিক মুদ্রা: আর্জেন্টিনার সরকারি মুদ্রা হল পেসো (Peso)।"
  },
  {
    qNum: 80,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Bhitarkanika National Park is located in which State?",
    opts: ["West Bengal", "Bihar", "Odisha", "Uttar Pradesh"],
    ans: 2,
    expl: "Bhitarkanika National Park is located in Kendrapara district of Odisha, known for salt-water crocodiles and rich mangroves.",
    hint: "জাতীয় উদ্যান: ভিতরকণিকা জাতীয় উদ্যান ও ম্যানগ্রোভ অরণ্য ওড়িশার কেন্দ্রাপাড়া জেলায় অবস্থিত।"
  },
  {
    qNum: 81,
    sec: "arithmetic",
    topic: "percentage",
    subject: "Arithmetic",
    q: "If a bucket is 60% full, then it contains 4 litres more water than when it is 46 2/3% full. What is the capacity of the bucket?",
    opts: ["30 litres", "15 litres", "16 2/3 litres", "20 litres"],
    ans: 0,
    expl: "60% - 46 2/3% = 40/3% = 2/15 of capacity. (2/15) × Capacity = 4 litres => Capacity = (4 × 15)/2 = 30 litres.",
    hint: "শতকরা: পার্থক্যের ২/১৫ অংশ = ৪ লিটার। বালতির ধারণক্ষমতা = (৪ × ১৫)/২ = ৩০ লিটার।"
  },
  {
    qNum: 82,
    sec: "generalStudies",
    topic: "history",
    subject: "General Studies",
    q: "Who wrote the book 'Life Divine'?",
    opts: ["Swami Vivekananda", "Keshab Chandra Sen", "Aurobindo Ghosh", "Swami Dayananda Saraswati"],
    ans: 2,
    expl: "'The Life Divine' is the philosophical magnum opus authored by Sri Aurobindo (Aurobindo Ghosh).",
    hint: "ঐতিহাসিক গ্রন্থ: 'দ্য লাইফ ডিভাইন' বিখ্যাত আধ্যাত্মিক দার্শনিক শ্রী অরবিন্দের লেখা।"
  },
  {
    qNum: 83,
    sec: "arithmetic",
    topic: "average",
    subject: "Arithmetic",
    q: "The average of the first nine prime numbers is",
    opts: ["9", "11", "11 1/9", "11 2/9"],
    ans: 2,
    expl: "First 9 primes: 2, 3, 5, 7, 11, 13, 17, 19, 23. Sum = 100. Average = 100 / 9 = 11 1/9.",
    hint: "গড় নির্ণয়: প্রথম ৯টি মৌলিক সংখ্যা (২, ৩, ৫, ৭, ১১, ১৩, ১৭, ১৯, ২৩)-এর যোগফল ১০০। গড় = ১০০/৯ = ১১ ১/৯।"
  },
  {
    qNum: 84,
    sec: "generalStudies",
    topic: "artAndCulture",
    subject: "General Studies",
    q: "Who of the following is associated with the musical instrument called Sarangi?",
    opts: ["Amjad Ali Khan", "V.G. Jog", "Buddhadeb Das Gupta", "Binda Khan"],
    ans: 3,
    expl: "Ustad Binda Khan was an iconic classical maestro of the Sarangi.",
    hint: "ভারতীয় উচ্চাঙ্গ সঙ্গীত: ওস্তাদ বিন্দা খান বিখ্যাত সারেঙ্গি বাদক ছিলেন।"
  },
  {
    qNum: 85,
    sec: "generalStudies",
    topic: "currentAffairs",
    subject: "General Studies",
    q: "'National Nursing and Midwifery Commission Bill' is associated with which Union Ministry?",
    opts: [
      "Ministry of Health and Family Welfare",
      "Ministry of Home Affairs",
      "Ministry of Women and Child Development",
      "Ministry of Science and Technology"
    ],
    ans: 0,
    expl: "Introduced and steered by the Union Ministry of Health and Family Welfare.",
    hint: "কেন্দ্রীয় সরকার: কেন্দ্রীয় স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রক দ্বারা এই বিলটি প্রণীত হয়।"
  },
  {
    qNum: 86,
    sec: "generalStudies",
    topic: "sports",
    subject: "General Studies",
    q: "When was FIFA founded?",
    opts: ["1900", "1904", "1920", "1930"],
    ans: 1,
    expl: "FIFA was officially established in Paris, France on 21 May 1904.",
    hint: "ক্রীড়া সংগঠন: ফিফা (FIFA) প্যারিসে ২১ মে ১৯০৪ সালে প্রতিষ্ঠিত হয়েছিল।"
  },
  {
    qNum: 87,
    sec: "arithmetic",
    topic: "profitAndLoss",
    subject: "Arithmetic",
    q: "A fan is listed at ₹1,500 and a discount of 20% is offered on the list price. What additional discount must be offered to the customer to bring the net price to ₹1,104?",
    opts: ["8%", "10%", "12%", "15%"],
    ans: 0,
    expl: "Price after 20% discount = 1500 × 0.8 = ₹1,200. Additional discount needed = 1200 - 1104 = ₹96. Additional discount rate = (96 / 1200) × 100 = 8%.",
    hint: "ধার্যমূল্য ও ছাড়: ২০% ছাড়ের পর দাম ১২০০ টাকা। পরবর্তী অতিরিক্ত ছাড় = ১২০০ - ১১০৪ = ৯৬ টাকা (৮%)।"
  },
  {
    qNum: 88,
    sec: "arithmetic",
    topic: "timeAndWork",
    subject: "Arithmetic",
    q: "2 men and 7 boys can do a piece of work in 14 days; 3 men and 8 boys can do the same in 11 days. Then 8 men and 6 boys can do three times the amount of this work in",
    opts: ["18 days", "21 days", "24 days", "30 days"],
    ans: 1,
    expl: "14(2M + 7B) = 11(3M + 8B) => 5M = 10B => 1M = 2B. Total work = 11B × 14 = 154 boy-days. 3 times work = 462 boy-days. 8M + 6B = 22B. Days = 462 / 22 = 21 days.",
    hint: "সময় ও কার্য: ১ জন পুরুষ = ২ জন বালক। মোট কাজের ৩ গুণ = ৪৬২ বালক-দিন। ২২ জন বালকের লাগবে ৪৬২/২২ = ২১ দিন।"
  },
  {
    qNum: 89,
    sec: "generalStudies",
    topic: "currentAffairs",
    subject: "General Studies",
    q: "'Operation Sarvashakti' recently seen in the news, was launched by which armed force?",
    opts: ["Indian Air Force", "Indian Navy", "Indian Coast Guard", "Indian Army"],
    ans: 3,
    expl: "Launched by the Indian Army in Jammu & Kashmir to flush out and neutralize terrorists across the Pir Panjal ranges.",
    hint: "প্রতিরক্ষা ও নিরাপত্তা: ভারতীয় সেনাবাহিনী (Indian Army) জম্মু-কাশ্মীরে সন্ত্রাসবিরোধী 'অপারেশন সর্বশক্তি' শুরু করে।"
  },
  {
    qNum: 90,
    sec: "generalStudies",
    topic: "history",
    subject: "General Studies",
    q: "Who was the first women President of the Indian National Congress?",
    opts: ["Sarojini Naidu", "Annie Besant", "Neli Sengupta", "Aruna Asaf Ali"],
    ans: 1,
    expl: "Annie Besant presided over the 1917 Calcutta session of the INC (Sarojini Naidu became the first Indian woman president in 1925).",
    hint: "ভারতের জাতীয় আন্দোলন: অ্যানি বেসান্ত ১৯১৭ সালের কলকাতা অধিবেশনে প্রথম মহিলা কংগ্রেস সভাপতি হিসেবে দায়িত্ব পালন করেন।"
  },
  {
    qNum: 91,
    sec: "arithmetic",
    topic: "hcfLcm",
    subject: "Arithmetic",
    q: "The least perfect square number divisible by 3, 4, 5, 6 and 8 is",
    opts: ["900", "1200", "2500", "3600"],
    ans: 3,
    expl: "LCM(3, 4, 5, 6, 8) = 120 = 2³ × 3 × 5. To make each power even: 120 × (2 × 3 × 5) = 120 × 30 = 3600.",
    hint: "পূর্ণবর্গ সংখ্যা ও লসাগু: লসাগু ১২০ = ২³ × ৩ × ৫। পূর্ণবর্গ করতে ৩০ দিয়ে গুণ = ১২০ × ৩০ = ৩৬০০।"
  },
  {
    qNum: 92,
    sec: "generalStudies",
    topic: "currentAffairs",
    subject: "General Studies",
    q: "Which country hosted the 'World Environment Day 2024'?",
    opts: ["Saudi Arabia", "Russia", "India", "Australia"],
    ans: 0,
    expl: "The Kingdom of Saudi Arabia hosted the global celebrations of World Environment Day on 5 June 2024.",
    hint: "পরিবেশ: সৌদি আরব ২০২৪ সালের ৫ জুন বিশ্ব পরিবেশ দিবসের বৈশ্বিক অনুষ্ঠানের আয়োজন করে।"
  },
  {
    qNum: 93,
    sec: "arithmetic",
    topic: "simplification",
    subject: "Arithmetic",
    q: "The value of 999 (995/999) × 999 is",
    opts: ["990809", "998996", "998999", "999824"],
    ans: 1,
    expl: "[999 + 995/999] × 999 = 999² + 995 = (1000 - 1)² + 995 = 998001 + 995 = 998996.",
    hint: "সরলীকরণ: (৯৯৯ × ৯৯৯) + ৯৯৫ = (১০০০ - ১)² + ৯৯৫ = ৯৯৮০০১ + ৯৯৫ = ৯৯৮৯৯৬।"
  },
  {
    qNum: 94,
    sec: "arithmetic",
    topic: "fractions",
    subject: "Arithmetic",
    q: "1/4 of a tank holds 135 litres of water. What part of the tank is full if it contains 180 litres of water?",
    opts: ["1/6", "1/3", "2/3", "2/5"],
    ans: 1,
    expl: "Full capacity = 135 × 4 = 540 litres. Fraction for 180 litres = 180 / 540 = 1/3.",
    hint: "ভগ্নাংশ: মোট ধারণক্ষমতা = ১৩৫ × ৪ = ৫৪০ লিটার। ১৮০ লিটার = ১৮০/৫৪০ = ১/৩ অংশ।"
  },
  {
    qNum: 95,
    sec: "generalStudies",
    topic: "science",
    subject: "General Studies",
    q: "Which one is the important macronutrient for the plants?",
    opts: ["Nitrogen", "Manganese", "Copper", "Chlorine"],
    ans: 0,
    expl: "Nitrogen (N) is an essential primary macronutrient for plant growth; Mn, Cu, and Cl are micronutrients.",
    hint: "উদ্ভিদ শারীরবিদ্যা: নাইট্রোজেন (Nitrogen) উদ্ভিদের বৃদ্ধির জন্য অপরিহার্য মুখ্য পরিপোষক (Macronutrient)।"
  },
  {
    qNum: 96,
    sec: "arithmetic",
    topic: "percentage",
    subject: "Arithmetic",
    q: "A number reduced by 35% becomes 325. What percent should it be increased so that it becomes 650?",
    opts: ["25%", "30%", "35%", "45%"],
    ans: 1,
    expl: "0.65x = 325 => x = 500. Required increase to reach 650 = 650 - 500 = 150. % increase = (150 / 500) × 100 = 30%.",
    hint: "শতকরা: আসল সংখ্যা = ৩২৫ / ০.৬৫ = ৫০০। ৫০০ থেকে ৬৫০ করতে বৃদ্ধি = ১৫০, শতকরা বৃদ্ধি = (১৫০/৫০০) × ১০০ = ৩০%।"
  },
  {
    qNum: 97,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "What is the capital of Nigeria?",
    opts: ["Algiers", "Abuja", "Lagos", "Nairobi"],
    ans: 1,
    expl: "Abuja is the federal capital of Nigeria (officially designated capital in 1991).",
    hint: "আন্তর্জাতিক ভূগোল: নাইজেরিয়ার বর্তমান রাজধানী আবুজা (Abuja)।"
  },
  {
    qNum: 98,
    sec: "generalStudies",
    topic: "reasoning",
    subject: "General Studies",
    q: "When one event brings about another event, it is known as:",
    opts: ["Correlation", "Comparison", "Causation", "Association"],
    ans: 2,
    expl: "Causation indicates a relationship between causes and effects, where one event directly produces another.",
    hint: "যুক্তিবিদ্যা ও বিজ্ঞান: একটি ঘটনা অন্য কোনো ঘটনার প্রত্যক্ষ কারণ ঘটানোকে কার্যকারণ (Causation) বলা হয়।"
  },
  {
    qNum: 99,
    sec: "generalStudies",
    topic: "geography",
    subject: "General Studies",
    q: "Parkachik Glacier is located in which State/U.T.?",
    opts: ["Arunachal Pradesh", "Ladakh", "Jammu and Kashmir", "Sikkim"],
    ans: 1,
    expl: "Parkachik Glacier is located in the Suru Valley of Kargil district, Union Territory of Ladakh.",
    hint: "হিমবাহ ও ভূগোল: পারকাচিক হিমবাহ লাদাখের কার্গিল জেলার সুরু উপত্যকায় অবস্থিত।"
  },
  {
    qNum: 100,
    sec: "generalStudies",
    topic: "staticGK",
    subject: "General Studies",
    q: "Lek is the currency of which country?",
    opts: ["Azerbaijan", "Angola", "Indonesia", "Albania"],
    ans: 3,
    expl: "The Albanian Lek (ALL) is the official currency of Albania.",
    hint: "আন্তর্জাতিক মুদ্রা: লেক (Lek) আলবেনিয়ার সরকারি জাতীয় মুদ্রা।"
  }
];

// Format questions into official schema
const formattedQuestions = rawQuestions2023S1.map(item => ({
  id: `pyq-2023-s1-${String(item.qNum).padStart(3, '0')}`,
  qNum: item.qNum,
  isPYQ: true,
  source: "WBPSC Clerkship 2023 (Session-I / Series A)",
  year: "2023-s1",
  stage: "part1",
  section: item.sec,
  topic: item.topic,
  subject: item.subject,
  type: "mcq",
  difficulty: "medium",
  question: item.q,
  options: item.opts,
  answer: item.ans,
  explanation: item.expl,
  bengaliHint: item.hint
}));

console.log(`Formatted ${formattedQuestions.length} questions for 2023 Shift 1.`);

// 1. Save 2023 Shift 1 dataset
fs.writeFileSync('data/pyq/2023-shift1-100.json', JSON.stringify(formattedQuestions, null, 2), 'utf8');
console.log('Saved data/pyq/2023-shift1-100.json');

// 2. Save full paper structure
const fullPaper2023S1 = {
  paperId: "wbpsc-clerkship-2023-shift1",
  title: "WBPSC Clerkship Examination (Part-I), 2023",
  shift: "Session - I (Series A)",
  year: 2023,
  totalMarks: 100,
  durationMinutes: 90,
  negativeMarking: 0.33,
  sections: [
    {
      id: "part1",
      name: "Part I: English Language",
      questionRange: "1–30",
      totalQuestions: 30,
      marksPerQuestion: 1
    },
    {
      id: "part2",
      name: "Part II: General Studies & Arithmetic",
      questionRange: "31–100",
      totalQuestions: 70,
      marksPerQuestion: 1
    }
  ],
  questions: formattedQuestions
};

fs.writeFileSync('data/pyq/2023-shift1-full-paper.json', JSON.stringify(fullPaper2023S1, null, 2), 'utf8');
console.log('Saved data/pyq/2023-shift1-full-paper.json');

// 3. Update data/pyq/verified-pyq.json
const s1_2019 = JSON.parse(fs.readFileSync('data/pyq/2019-shift1-100.json', 'utf8'));
const s2_2019 = JSON.parse(fs.readFileSync('data/pyq/2019-shift2-100.json', 'utf8'));
const combined300 = [...s1_2019, ...s2_2019, ...formattedQuestions];

fs.writeFileSync('data/pyq/verified-pyq.json', JSON.stringify(combined300, null, 2), 'utf8');
console.log(`Updated data/pyq/verified-pyq.json with ${combined300.length} total questions.`);
