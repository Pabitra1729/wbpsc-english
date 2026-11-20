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

// 15 Non-finite Verbs
updateNote('data/notes/grammar/15-non-finite-verbs.json', {
  intro: "Non-finite verbs do not change their form according to the person, number, or tense of the subject. They consist of Infinitives (to + V1 or bare V1), Gerunds (verbal nouns ending in -ing), and Participles (verbal adjectives). WBPSC tests bare infinitives, prepositional gerund phrases, and dangling participles.",
  bengali: "Non-finite Verbs (অসমাপিকা ক্রিয়া) হলো সেই সমস্ত ক্রিয়াপদ যা Subject-এর Person বা Number অথবা বাক্যের Tense অনুযায়ী পরিবর্তিত হয় না। এর প্রধান তিনটি রূপ: ১. Infinitive ('to + V1' অথবা Bare Infinitive), ২. Gerund ('V-ing' যা Noun হিসেবে কাজ করে), ৩. Participle ('V-ing' বা 'V3' যা Adjective হিসেবে কাজ করে)। পরীক্ষায় বিশেষ করে যেসব শব্দের পর Bare Infinitive বসে (make, let, bid, see, hear) এবং যেসব নির্দিষ্ট বাক্যাংশের পর Gerund বসে (look forward to, with a view to, addicted to, accustomed to) সেগুলি প্রায়ই আসে।",
  rules: [
    {
      rule: "Bare Infinitive (infinitive without 'to') is used after modal verbs and active sensory/causative verbs: bid, let, make, see, hear, watch, notice.",
      examples: ["She made the clerk revise the register.", "Let him present his grievance.", "I heard her sing a Rabindrasangeet."],
      exceptions: ["In passive voice, 'make', 'bid', 'see', 'hear' take the full infinitive with 'to': 'He was made to revise the register'."]
    },
    {
      rule: "Fixed prepositional phrases ending in 'to' govern a Gerund (V-ing), NOT a bare verb: look forward to, with a view to, accustomed to, used to (be used to), averse to, devoted to, prone to, object to.",
      examples: ["I look forward to hearing from your department soon.", "He visited the library with a view to preparing his notes.", "She is accustomed to working long hours."],
      exceptions: ["Do not confuse 'used to + V1' (discontinued past habit) with 'be/get used to + V-ing' (accustomed to a state)."]
    },
    {
      rule: "A noun or pronoun preceding a Gerund should be in the possessive case (my, your, his, her, their, candidate's), not the objective case.",
      examples: ["I appreciated his helping the distressed villagers (NOT 'him helping').", "The officer objected to my leaving the workstation early."],
      exceptions: ["In informal usage objective case appears, but competitive examinations strictly enforce the formal possessive rule."]
    },
    {
      rule: "Dangling or unattached participle: A participial phrase at the beginning of a sentence must refer directly to the grammatical subject that follows the comma.",
      examples: ["Walking in the botanical garden, I found a purse (Correct: 'I' was walking).", "Being a stormy morning, I stayed indoors (Incorrect: implies 'I' was a stormy morning).", "It being a stormy morning, I stayed indoors (Correct)."],
      exceptions: ["Always provide an impersonal subject 'It' when denoting weather, time, or distance before 'Being'."]
    },
    {
      rule: "Verbs taking Gerund vs Infinitive: Verbs of mental decision (decide, hope, manage, refuse, want) take infinitives; verbs of continuation/avoidance (avoid, enjoy, postpone, finish, mind, suggest) take gerunds.",
      examples: ["He decided to appeal against the verdict.", "She enjoys reading historical biographies.", "Would you mind closing the casement?"],
      exceptions: ["'Stop to do' means pausing one activity in order to do another; 'stop doing' means terminating the activity itself."]
    }
  ],
  commonMistakes: [
    "Writing 'I look forward to meet you' instead of 'to meeting you'.",
    "Writing 'He came with a view to inspect' instead of 'with a view to inspecting'.",
    "Writing 'Being a rainy day, he could not go out' instead of 'It being a rainy day...'.",
    "Writing 'She made me to weep' instead of 'She made me weep'.",
    "Writing 'Please excuse me leaving' instead of 'Please excuse my leaving'."
  ],
  examTricks: [
    "With a view to / Look forward to Formula: Always followed by V-ing!",
    "Dangling Participle check: Ask 'WHO was doing the action of the participle?' If it's not the subject right after the comma, it's an error.",
    "Passive 'Make' Rule: Active takes bare verb ('made him go'); Passive takes to-verb ('was made to go')."
  ],
  memoryTricks: [
    "LOOK FORWARD TO + -ING: Looking forward is an ongoing feeling, so keep the '-ing'!",
    "IT BEING A DAY: Weather needs 'It' before 'being'."
  ],
  revision: [
    "Look forward to, with a view to, accustomed to require Gerund (-ing).",
    "Bare infinitive follows let, make, bid, hear, see in active voice.",
    "Possessive case precedes a gerund (my leaving, his going).",
    "Participles must logically link to the sentence subject."
  ]
});

// 16 Conditional Sentences
updateNote('data/notes/grammar/16-conditional-sentences.json', {
  intro: "Conditional sentences express a condition and its consequence, consisting of an 'if-clause' (condition) and a 'main clause' (result). The four classical structures (Zero, First, Second, Third) and inversion patterns are frequently tested in clerkship examinations.",
  bengali: "Conditional Sentences (শর্তমূলক বাক্য) কোনো শর্ত ও তার সম্ভাব্য ফলাফল নির্দেশ করে। পরীক্ষায় প্রধানত ৩টি কাঠামো আসে: ১. First Conditional (বাস্তব বা সম্ভাব্য ভবিষ্যৎ): 'If + Present Simple, will + V1' (যেমন: 'If it rains, we will stay home')। ২. Second Conditional (কাল্পনিক বর্তমান/অবাস্তব অবস্থা): 'If + Past Simple (বা were), would + V1' (যেমন: 'If I were a bird, I would fly')। ৩. Third Conditional (অতীতের অপূর্ণ বা অসম্ভব শর্ত): 'If + Past Perfect (had + V3), would have + V3' (যেমন: 'If he had worked hard, he would have passed')।",
  rules: [
    {
      rule: "Zero Conditional (universal truths, scientific laws, natural habits): If + Present Simple, Present Simple.",
      examples: ["If water reaches 100 degrees Celsius, it boils.", "If you heat iron, it expands."],
      exceptions: ["Do not use 'will' in either clause when stating universal scientific facts."]
    },
    {
      rule: "First Conditional (probable/realistic future situations): If/Unless + Present Simple, will/can/may + V1.",
      examples: ["If you qualify the preliminary exam, you will appear for the main examination.", "Unless she submits the document today, her candidature will be cancelled."],
      exceptions: ["Never place 'will' or 'shall' in the if-clause: say 'If he comes, I will go' (NOT 'If he will come')."]
    },
    {
      rule: "Second Conditional (hypothetical, imaginary, or contrary-to-fact present situations): If + Simple Past (or 'were' for all persons), would/could/might + V1.",
      examples: ["If I were the district magistrate, I would redress your grievances immediately.", "If he knew the address, he would accompany us."],
      exceptions: ["In imaginary conditions with the verb 'to be', strictly use 'were' for all subjects (including I, he, she, it): 'If I were you'."]
    },
    {
      rule: "Third Conditional (unfulfilled past actions and counterfactual historical situations): If + Past Perfect (had + V3), would/could/might have + past participle (V3).",
      examples: ["If he had applied earlier, he would have secured admission.", "If the train had arrived on schedule, we would have attended the convocation."],
      exceptions: ["Both clauses refer to the past; do not mix tenses ('If he had worked, he would pass' is an error)."]
    },
    {
      rule: "Inversion in Conditional Sentences: Inversion can eliminate the conjunction 'if' without changing the meaning.",
      examples: ["Had I known of your arrival, I would have received you at the terminal (= If I had known...).", "Were I in your position, I would accept the appointment (= If I were in your position...).", "Should you need any clarification, please contact the helpdesk (= If you should need...)."],
      exceptions: ["Do not reinsert 'if' when inversion is employed: 'Had I known...' (NOT 'If had I known')."]
    }
  ],
  commonMistakes: [
    "Writing 'If he will come, I will assist him' (Double will error; use 'If he comes...').",
    "Writing 'If I was you, I would resign' instead of 'If I were you...'.",
    "Writing 'If he had studied, he would score well' instead of 'would have scored well'.",
    "Writing 'Had he had worked hard' instead of 'Had he worked hard'.",
    "Writing 'Unless you do not submit the receipt' (Unless is already negative; omit 'not')."
  ],
  examTricks: [
    "Third Conditional Pair: 'HAD + V3' in the if-clause DEMANDS 'WOULD HAVE + V3' in the main clause.",
    "Imaginary Condition: 'If + subject + WERE' -> Look for 'were' regardless of singular or plural subject.",
    "Inversion Check: 'Had + Subject + V3' at the start functions identically to 'If + Subject + had + V3'."
  ],
  memoryTricks: [
    "Conditional Scale: 1st = Present -> Will; 2nd = Past/Were -> Would; 3rd = Had V3 -> Would Have V3.",
    "Were for Dreams: 'If I were a king' (Imaginary = WERE)."
  ],
  revision: [
    "Never use 'will' in an if-clause.",
    "Hypothetical conditions always use 'were' for all persons.",
    "Third conditional formula: Had + V3 ... would have + V3.",
    "Had at the beginning of a clause replaces 'If'."
  ]
});

// 17 Sentence Structure
updateNote('data/notes/grammar/17-sentence-structure.json', {
  intro: "Sentence structure defines how clauses and phrases coalesce to express complete thoughts. In competitive exams, questions examine simple, compound, and complex sentences, clause identification, and avoiding run-ons or comma splices.",
  bengali: "Sentence Structure হলো বাক্যের অভ্যন্তরীণ গঠনপ্রণালী। গঠনের দিক থেকে বাক্য প্রধানত তিন প্রকার: ১. Simple Sentence (একটিমাত্র Subject ও একটিমাত্র Finite Verb থাকে), ২. Compound Sentence (দুটি স্বাধীন Independent Clause 'FANBOYS' অর্থাৎ for, and, nor, but, or, yet, so ইত্যাদি Coordinating Conjunction দ্বারা যুক্ত থাকে), ৩. Complex Sentence (একটি Principal Clause এবং এক বা একাধিক Subordinate Clause থাকে যা because, although, since, when, if ইত্যাদি দিয়ে যুক্ত থাকে)।",
  rules: [
    {
      rule: "Simple Sentence consists of a single independent clause with one subject and one finite verb; it expresses a unified complete thought.",
      examples: ["The experienced clerk verified all treasury vouchers promptly.", "Inspite of his illness, he appeared for the examination."],
      exceptions: ["A simple sentence may have compound subjects or compound predicates, provided they share the same syntactic bond."]
    },
    {
      rule: "Compound Sentence consists of two or more independent clauses joined by coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so) or a semicolon.",
      examples: ["He prepared diligently for months, yet he missed the cut-off by two marks.", "The bell rang, and the examination commenced immediately."],
      exceptions: ["Do not join two independent clauses with only a comma (known as a 'comma splice' error); use a comma + coordinating conjunction or a semicolon."]
    },
    {
      rule: "Complex Sentence contains one main (independent) clause and at least one subordinate (dependent) clause introduced by a subordinating conjunction or relative pronoun.",
      examples: ["Although the syllabus was vast, the candidates revised thoroughly.", "The officer who approved the sanction was felicitated."],
      exceptions: ["When the subordinate clause precedes the main clause, separate them with a comma."]
    },
    {
      rule: "Compound-Complex Sentence incorporates at least two independent clauses and one or more dependent clauses.",
      examples: ["Though he was exhausted from the journey, he reviewed the draft, and he submitted his remarks before midnight."],
      exceptions: ["Ensure conjunctions do not clash or cause ambiguity in reference."]
    },
    {
      rule: "Parallelism in sentence structure: Elements fulfilling identical functions in a sentence must match in grammatical form.",
      examples: ["He likes reading novels, swimming in the river, and cycling in the morning (all gerunds).", "The officer spoke clearly, persuasively, and courteously (all adverbs)."],
      exceptions: ["Mixing forms ('He likes reading, to swim, and cycling') violates structural parallelism."]
    }
  ],
  commonMistakes: [
    "Comma splice: 'The rain stopped, they went out' (Correct: 'The rain stopped, and they went out' or 'When the rain stopped, they went out').",
    "Faulty parallelism: 'He is known for his honesty, wisdom, and being punctual' (Correct: 'honesty, wisdom, and punctuality').",
    "Incomplete fragment: 'Because he was late to the exam centre' (Needs a main clause to complete the thought).",
    "Double subordinators: 'Although he was late, because of traffic' (Unfinished syntax).",
    "Dangling modifiers misplaced between clauses."
  ],
  examTricks: [
    "FANBOYS check: For, And, Nor, But, Or, Yet, So connect independent clauses in compound sentences.",
    "Simple vs Complex check: Look at the number of finite verbs. 1 finite verb = Simple; 2 finite verbs joined by 'although/if/since' = Complex.",
    "Parallelism trick: Look across commas and 'and/or'—all joined items must share identical endings (-ing, -ly, or noun forms)."
  ],
  memoryTricks: [
    "FANBOYS = For, And, Nor, But, Or, Yet, So (Coordinating Conjunctions).",
    "One Verb = Simple; Two Independent = Compound; Dependent + Independent = Complex."
  ],
  revision: [
    "Simple = 1 independent clause (1 finite verb).",
    "Compound = 2+ independent clauses joined by FANBOYS or semicolon.",
    "Complex = 1 main clause + 1+ dependent clauses.",
    "Items in a list or series must maintain parallel grammatical form."
  ]
});

// 18 Sentence Transformation
updateNote('data/notes/grammar/18-sentence-transformation.json', {
  intro: "Sentence transformation requires changing the syntactic form of a sentence without altering its underlying meaning. High-yield exam transformations include: affirmative <-> negative, assertive <-> interrogative, exclamatory <-> assertive, removal of 'too...to', and interchange of degrees of comparison.",
  bengali: "Transformation of Sentences হলো অর্থ অপরিবর্তিত রেখে বাক্যের গঠনের পরিবর্তন। পরীক্ষার সাধারণ রূপান্তরগুলি: ১. 'too ... to' তুলে 'so ... that ... cannot/could not' বসানো। ২. Affirmative থেকে Negative করতে বিপরীত শব্দ বা 'None but' ব্যবহার করা (যেমন: 'Only God can save us' -> 'None but God can save us')। ৩. Degrees of Comparison পরিবর্তন (যেমন: Superlative থেকে Comparative বা Positive)। ৪. Assertive থেকে Interrogative রূপান্তর।",
  rules: [
    {
      rule: "Transforming 'too ... to' into 'so ... that': Replace 'too' with 'so', replace 'to' with 'that + subject + cannot / could not + V1'.",
      examples: [
        "Affirmative: He is too frail to walk without assistance. -> Negative/Complex: He is so frail that he cannot walk without assistance.",
        "Past tense: She was too proud to apologize. -> She was so proud that she could not apologize."
      ],
      exceptions: ["If the main clause is past tense ('was/were'), use 'could not'; if present tense ('is/are'), use 'cannot'."]
    },
    {
      rule: "Transforming Affirmative to Negative: Use negative words with antonyms, or 'no sooner...than', or 'none but / nothing but'.",
      examples: [
        "Affirmative: Only graduates are eligible. -> Negative: None but graduates are eligible.",
        "Affirmative: He is always punctual. -> Negative: He is never unpunctual.",
        "Affirmative: As soon as the bell rang, the students departed. -> Negative: No sooner did the bell ring than the students departed."
      ],
      exceptions: ["'None but' is used for persons; 'Nothing but' is used for things; 'Not more than' is used for age/numbers."]
    },
    {
      rule: "Transforming Assertive to Interrogative: If the statement is affirmative, make the question negative; if the statement is negative, make the question affirmative.",
      examples: [
        "Assertive: Everyone admires Dr. Kalam. -> Interrogative: Who does not admire Dr. Kalam?",
        "Assertive: No one can tolerate such insolence. -> Interrogative: Can anyone tolerate such insolence?",
        "Assertive: Their glory can never fade. -> Interrogative: When can their glory fade? / Can their glory ever fade?"
      ],
      exceptions: ["Do not drop rhetorical force; ensure the meaning remains strictly identical."]
    },
    {
      rule: "Interchanging Degrees of Comparison without changing meaning.",
      examples: [
        "Superlative: Iron is the most useful of all metals.",
        "Comparative: Iron is more useful than any other metal.",
        "Positive: No other metal is as useful as iron."
      ],
      exceptions: ["When comparing one entity against all others of the same class, use 'any other' in comparative: 'Iron is more useful than any other metal' (NOT 'than any metal')."]
    },
    {
      rule: "Transforming Exclamatory to Assertive: Convert expressions of emotion into statements with adverbs of degree (very, truly, great).",
      examples: [
        "Exclamatory: What a splendid monument the Victoria Memorial is! -> Assertive: The Victoria Memorial is indeed a very splendid monument.",
        "Exclamatory: How sweet the nightingale sings! -> Assertive: The nightingale sings very sweetly."
      ],
      exceptions: ["'O that I were young again!' transforms to 'I wish that I were young again'."]
    }
  ],
  commonMistakes: [
    "Using 'could not' for present tense: 'He is so weak that he could not walk' (Correct: 'cannot walk').",
    "Omitting 'other' in comparative degree: 'Shakespeare is greater than any dramatist' (Correct: 'than any other dramatist').",
    "Changing the core meaning during transformation.",
    "Leaving an affirmative question for an affirmative assertive statement.",
    "Using 'None but' for non-living objects instead of 'Nothing but'."
  ],
  examTricks: [
    "Any Other Rule: In comparative degree, ALWAYS look for 'any other' when comparing a member of the same set.",
    "Only/Alone Trick: For persons -> 'None but'; for inanimate things -> 'Nothing but'; for numbers -> 'Not more than'.",
    "Tense Match in So...that: 'is' -> 'cannot'; 'was' -> 'could not'."
  ],
  memoryTricks: [
    "Too...to = So...that cannot/could not.",
    "None but for people, Nothing but for objects.",
    "Same group comparison = Any other."
  ],
  revision: [
    "Transformations must leave sentence meaning 100% unaltered.",
    "Present 'too...to' -> so...that cannot; Past 'too...to' -> so...that could not.",
    "Only/Alone = None but (persons), Nothing but (things).",
    "Superlative -> No other ... as/so ... as (positive)."
  ]
});

// 19 Question Tags
updateNote('data/notes/grammar/19-question-tags.json', {
  intro: "A question tag is a brief mini-question appended to a declarative sentence to confirm information or seek agreement. In WBPSC Clerkship, specific rules govern semi-negative words (seldom, hardly, barely), imperative sentences, 'I am', and indefinite pronoun subjects.",
  bengali: "Question Tag হলো বাক্যের শেষে জুড়ে দেওয়া একটি ছোট্ট প্রশ্ন, যার মাধ্যমে বক্তা কোনো তথ্যের নিশ্চয়তা বা সম্মতি চান। মূল নিয়ম: ১. বাক্য Affirmative (ইতিবাচক) হলে Tag হবে Negative (নেতিবাচক)। ২. বাক্য Negative হলে Tag হবে Positive। ৩. 'I am' থাকলে Tag হয় 'aren't I?'। ৪. 'Let us / Let's' দিয়ে শুরু হলে Tag হয় 'shall we?'। ৫. বাক্যে Hardly, Scarcely, Seldom, Rarely, Few, Little থাকলে বাক্যটি অর্ধ-নেতিবাচক (Semi-negative), তাই Tag সর্বদা Positive হবে।",
  rules: [
    {
      rule: "Fundamental polarity rule: A positive statement takes a contracted negative question tag; a negative statement takes a positive question tag.",
      examples: ["The treasury clerk was present, wasn't he?", "They have not submitted the ledger, have they?", "She speaks fluent English, doesn't she?"],
      exceptions: ["Always use standard contracted forms in negative tags: aren't, isn't, didn't, won't, can't (never write 'was not he?')."]
    },
    {
      rule: "The question tag for 'I am' in the affirmative is 'aren't I?'; in the negative ('I am not'), the tag is 'am I?'.",
      examples: ["I am eligible for the recruitment drive, aren't I?", "I am not responsible for the delay, am I?"],
      exceptions: ["'Amn't I' does not exist in standard written English; 'aren't I' is the universally accepted standard."]
    },
    {
      rule: "Semi-negative words (hardly, scarcely, barely, seldom, rarely, neither, few, little) make the statement negative; therefore, the question tag must be POSITIVE.",
      examples: ["He seldom attends social gatherings, does he?", "They have barely any resources left, have they?", "She hardly spoke during the conference, did she?"],
      exceptions: ["'A few' and 'a little' are positive in meaning and therefore take negative question tags: 'A few friends helped him, didn't they?'."]
    },
    {
      rule: "Imperative sentences: For orders/requests, the tag is usually 'will you?' or 'won't you?'; for suggestions beginning with 'Let's' (Let us), the tag is strictly 'shall we?'.",
      examples: ["Open the casement, will you? / won't you?", "Let's review the mock test questions together, shall we?", "Do not make noise here, will you?"],
      exceptions: ["When 'Let' means permission ('Let him do this'), the tag is 'will you?': 'Let him complete the form, will you?'."]
    },
    {
      rule: "Indefinite pronouns denoting persons (everyone, everybody, someone, nobody, none, anyone) take the plural pronoun 'they' in the question tag; verbs adjust to plural.",
      examples: ["Everyone cheered for the winners, didn't they?", "Nobody consented to the proposal, did they? (Nobody is negative -> positive tag).", "Someone has left their umbrella, haven't they?"],
      exceptions: ["Indefinite pronouns denoting things (everything, something, nothing) take the singular pronoun 'it': 'Everything is clear, isn't it?'."]
    }
  ],
  commonMistakes: [
    "Writing 'I am right, amn't I?' instead of 'aren't I?'.",
    "Writing 'He seldom visits, doesn't he?' instead of 'does he?' (seldom is already negative).",
    "Writing 'Let's start, will you?' instead of 'shall we?'.",
    "Writing 'Everybody was present, wasn't they?' instead of 'weren't they?' ('they' requires plural verb).",
    "Using full words instead of contraction: 'is not it?' (Correct: 'isn't it?')."
  ],
  examTricks: [
    "I am Rule: 'I am...' -> 'aren't I?'. Memorize this cold.",
    "Let's Rule: 'Let's...' -> 'shall we?'.",
    "Semi-Negative Trap: Seldom / Hardly / Scarcely / Barely / Rarely -> The tag MUST be POSITIVE.",
    "Everybody / Nobody Rule: Tag pronoun is ALWAYS 'they', so the auxiliary verb must be plural (weren't they? / do they?)."
  ],
  memoryTricks: [
    "Let's = Shall We?",
    "I am = Aren't I?",
    "Semi-Negatives = Positive Tag!"
  ],
  revision: [
    "Positive statement -> Negative tag; Negative statement -> Positive tag.",
    "I am -> aren't I?; I am not -> am I?.",
    "Let's -> shall we?.",
    "Nobody / Everybody -> pronoun 'they' (verbs: do/did/have/were they?)."
  ]
});

// 20 Error Detection
updateNote('data/notes/grammar/20-error-detection.json', {
  intro: "Error detection questions require locating the grammatically flawed segment within a sentence divided into parts (A, B, C, D / No error). Success depends on a systematic, hierarchical inspection protocol rather than reading by instinct or ear.",
  bengali: "Error Detection বা ভুল নির্ণয় হলো প্রতিযোগিতামূলক পরীক্ষার সবচেয়ে গুরুত্বপূর্ণ অংশ। অনেকে বাক্যটি 'পড়ে কেমন শোনাচ্ছে' (by ear) দেখে উত্তর দিতে যান, যা ভুল পদ্ধতির কারণ। সফল হতে হলে একটি ৫-দফা পদ্ধতি (5-point checklist) অনুসরণ করতে হবে: ১. Subject-Verb Agreement (Subject অনুযায়ী Verb বসেছে কিনা), ২. Tense Consistency (সমগ্র বাক্যে কালের সঙ্গতি), ৩. Pronoun-Antecedent Agreement (Pronoun ঠিকমতো মিলেছে কিনা), ৪. Fixed Preposition ও Collocation, ৫. Parallelism ও Modifier Placement।",
  rules: [
    {
      rule: "Step 1: Check Subject-Verb Agreement. Find the true grammatical subject by mentally removing intervening prepositional phrases and parenthetical clauses.",
      examples: ["The quality of these mangoes is exceptional (Subject is 'quality', singular).", "The minister, accompanied by his deputies, has arrived (Subject is 'minister')."],
      exceptions: ["Neither..nor / Either..or agree with the nearest subject."]
    },
    {
      rule: "Step 2: Check Tense Consistency and Timeline. Ensure time markers match verb tenses and conditional structures maintain alignment.",
      examples: ["He told me that he had completed the task the previous day (consistent past sequence).", "If he arrives, I will welcome him (not 'if he will arrive')."],
      exceptions: ["Do not shift tenses for universal truths, even after past reporting verbs."]
    },
    {
      rule: "Step 3: Check Pronoun Case, Number, and Antecedent. Ensure 'one' is followed by 'one's', pronoun order follows 231, and objective case follows prepositions/let.",
      examples: ["One must discharge one's duties.", "Let you and me handle the desk."],
      exceptions: ["Avoid ambiguous pronoun references where a pronoun could point to two different nouns."]
    },
    {
      rule: "Step 4: Check Prepositional Collocations and Redundancy. Watch for unauthorized prepositions after transitive verbs or missing prepositions in phrasal verbs.",
      examples: ["We discussed the matter (NOT 'discussed about').", "He disposed of his surplus vehicle (NOT 'disposed off').", "Comprise consists of parts (comprise does NOT take 'of' in active voice)."],
      exceptions: ["'Be comprised of' is acceptable in passive voice."]
    },
    {
      rule: "Step 5: Check Modifiers and Conjunction Pairing. Verify correlative pairs (No sooner..than, Hardly..when, Both..and, Lest..should) and check for dangling participles.",
      examples: ["Hardly had the meeting begun when the power failed.", "Walk cautiously lest you should stumble."],
      exceptions: ["Verify that 'not only...but also' connect parallel grammatical units."]
    }
  ],
  commonMistakes: [
    "Relying solely on intuition ('it sounds wrong') instead of testing specific rules.",
    "Missing errors in Part A because the mind assumes the sentence starts correctly.",
    "Overlooking 'No Error' options (approx. 10-15% of exam questions have no error).",
    "Missing single-letter preposition traps: 'dispose off' instead of 'dispose of'.",
    "Missing double comparatives: 'more superior' instead of 'superior'."
  ],
  examTricks: [
    "Scan in order: S-V Agreement -> Tense -> Pronoun -> Preposition -> Conjunction.",
    "Look out for high-frequency trap words: Scenery, Furniture, Discuss, Order, Enter, Senior, Lest, One, No sooner.",
    "If the subject has 'along with', 'as well as', 'together with', IGNORE everything between commas and look directly at the first noun."
  ],
  memoryTricks: [
    "S-T-P-P-C Checklist: Subject, Tense, Pronoun, Preposition, Conjunction.",
    "Cut the Clutter: Eliminate prepositional phrases between subject and verb to find the true subject."
  ],
  revision: [
    "Check subject-verb agreement first in every error detection problem.",
    "Watch out for forbidden prepositions: discuss about, enter into room, order for.",
    "Ensure 'one' pairs with 'one's', not 'his'.",
    "Correlative pairs must be matched exactly (No sooner..than, Hardly..when)."
  ]
});

// 21 Sentence Improvement & Correction
updateNote('data/notes/grammar/21-sentence-improvement-correction.json', {
  intro: "Sentence improvement questions present an underlined/bracketed phrase and offer choices to enhance correctness, precision, and elegance. The objective is to identify grammatical flaws, eliminate faulty options, and select the most concise and idiomatic phrasing.",
  bengali: "Sentence Improvement হলো বাক্যের একটি নির্দিষ্ট অংশ পরিবর্তন করে আরও নির্ভুল ও প্রাতিষ্ঠানিক রূপ দেওয়া। চারটি বিকল্পের মধ্যে তিনটি ভুল থাকে এবং একটি সঠিক (অথবা No Improvement)। অপশন বাদ দেওয়ার পদ্ধতি (Elimination Technique) এখানে সবচেয়ে কার্যকর: ব্যাকরণগত ভুল অপশনগুলি তৎক্ষণাৎ বাদ দিন, অহেতুক শব্দবহুল (redundant) অপশন এড়িয়ে চলুন এবং সবচেয়ে যথাযথ ও প্রাতিষ্ঠানিক বিকল্পটি বেছে নিন।",
  rules: [
    {
      rule: "Identify the underlying grammatical trigger in the underlined section before looking at the answer choices.",
      examples: ["The committee [are consisting of] five members. -> Improvement: 'consists of' (stative verb cannot be continuous).", "He [is working] here since 2018. -> Improvement: 'has been working' (since + time requires perfect continuous)."],
      exceptions: ["If the original sentence is grammatically impeccable, boldly select 'No Improvement'."]
    },
    {
      rule: "Eliminate options introducing redundancy or tautological phrasing.",
      examples: [
        "Incorrect: 'return back' -> Correct: 'return'.",
        "Incorrect: 'revert back' -> Correct: 'revert'.",
        "Incorrect: 'repeat again' -> Correct: 'repeat'.",
        "Incorrect: 'sufficient enough' -> Correct: 'sufficient' or 'enough'."
      ],
      exceptions: ["Do not confuse emphasis with redundancy in legal/statutory terminology."]
    },
    {
      rule: "Preserve idiomatic collocations and fixed phrasing in administrative English.",
      examples: ["Take an examination (NOT 'give an examination' from a candidate's perspective).", "Pay attention to (NOT 'give attention').", "Make a speech / deliver a lecture."],
      exceptions: ["A teacher gives an examination; a candidate takes or sits for an examination."]
    },
    {
      rule: "Maintain subject-verb number agreement during improvements.",
      examples: ["A variety of topics [was discussed]. -> Correct: 'were discussed' (when 'a variety of' means several).", "The variety of items [were impressive]. -> Correct: 'was impressive' (singular focus)."],
      exceptions: ["'A number of' takes plural verb; 'The number of' takes singular verb."]
    },
    {
      rule: "Ensure concise phrasing: Prefer active, direct, and unbloated phrasing over wordy passive contortions.",
      examples: ["He acted in a manner that was hasty. -> Improvement: 'He acted hastily.'", "Owing to the fact that he was sick -> Improvement: 'Because he was sick.'"],
      exceptions: ["Conciseness should never sacrifice grammatical accuracy or essential nuance."]
    }
  ],
  commonMistakes: [
    "Selecting options with superfluous words like 'revert back' or 'return back'.",
    "Selecting options that correct one error but introduce a new agreement or tense error.",
    "Hesitating to choose 'No Improvement' when the original phrasing is already correct.",
    "Translating literally from Bengali: saying 'give an exam' instead of 'take an exam'.",
    "Selecting over-complicated phrasing under the illusion that bigger words mean better grammar."
  ],
  examTricks: [
    "Redundancy Filter: Instantly strike through any option containing 'return back', 'revert back', 'cope up with', 'reason why...because'.",
    "Candidate vs Teacher: Candidates TAKE exams; teachers GIVE/CONDUCT exams.",
    "No Improvement is real: In competitive exams, 'No Improvement' is the correct answer in approximately 20-25% of cases."
  ],
  memoryTricks: [
    "No Back with Return: Re- already means back, so drop 'back'!",
    "Cope With, NOT Cope Up With: 'Cope' takes only 'with'."
  ],
  revision: [
    "Eliminate ungrammatical choices immediately.",
    "Reject redundant expressions (return back, revert back, repeat again).",
    "Students 'take' or 'sit for' an examination.",
    "No Improvement is often the correct choice—never fear choosing it."
  ]
});

// 22 Sentence Rearrangement
updateNote('data/notes/grammar/22-sentence-rearrangement.json', {
  intro: "Sentence rearrangement (Parajumbles / Ordering of Sentences) tests logical reasoning, structural comprehension, and linguistic cohesion. Candidates must reconstruct a coherent paragraph from scrambled sentences (P, Q, R, S) using opening indicators, transition words, and noun-pronoun links.",
  bengali: "Sentence Rearrangement (Parajumbles) হলো এলোমেলোভাবে সাজানো ৪টি বাক্যকে (P, Q, R, S) যৌক্তিকভাবে পরপর সাজিয়ে একটি অর্থপূর্ণ অনুচ্ছেদ তৈরি করা। সফল হওয়ার কৌশল: ১. প্রারম্ভিক বাক্য (Opening Sentence) খুঁজে বের করা—যা সাধারণত কোনো নতুন ধারণা, ব্যক্তি বা বিষয়ের অবতারণা করে এবং কোনো Pronoun বা Conjunction দিয়ে শুরু হয় না। ২. Noun-Pronoun জোড়া তৈরি করা (আগে Noun, পরে তার Pronoun)। ৩. সময়ক্রম (Chronological order) এবং কারণ-ফলাফল (Cause and Effect) লক্ষ্য করা। ৪. অপশন দেখে পরীক্ষা (Option Verification) করা।",
  rules: [
    {
      rule: "Identify the Opening (Independent) Sentence: The first sentence usually introduces the primary theme, person, or context independently without relying on preceding context.",
      examples: ["P introduces 'Sir Jagadish Chandra Bose was a pioneering polymath...' -> Ideal opening sentence.", "A sentence starting with 'He also proved...', 'However...', or 'Consequently...' CANNOT be the opening sentence."],
      exceptions: ["Occasionally a general provocative quotation opens the passage before naming the subject."]
    },
    {
      rule: "Establish Noun-Pronoun Mandatory Pairs: A noun must be introduced in an earlier sentence before a personal pronoun (he, she, it, they) can refer to it.",
      examples: ["Sentence S introduces 'Rabindranath Tagore'; Sentence Q refers to 'His poetic genius...' -> Sequence must be S before Q (SQ is a mandatory pair)."],
      exceptions: ["If options show only one choice with the mandatory pair SQ together, that option is immediately confirmed."]
    },
    {
      rule: "Track Transition Signals and Discourse Markers: Contrast markers (however, on the contrary, nevertheless), addition markers (furthermore, moreover, besides), and conclusion markers (therefore, hence, consequently, in conclusion) establish clear sequential order.",
      examples: ["A sentence starting with 'Therefore...' will typically be the conclusion or result of an earlier premise."],
      exceptions: ["Do not place transition sentences before the initial claim is stated."]
    },
    {
      rule: "Identify Chronological / Cause-and-Effect Sequences: Events naturally unfold from past to present, problem to solution, or cause to effect.",
      examples: ["Birth/Early education -> Major achievements -> Later life/Legacy.", "Severe cyclone hits coastline -> Relief operations launched -> Long-term rehabilitation plan sanctioned."],
      exceptions: ["Flashback narrative devices are rare in factual competitive exam passages."]
    },
    {
      rule: "Use Option-Elimination Strategy: Inspect the first letter of each of the four given options to narrow down possible starting sentences.",
      examples: ["If options are (A) PQRS, (B) QPRS, (C) SRPQ, (D) SQRP, test whether P, Q, or S can logically open the passage to eliminate two choices instantly."],
      exceptions: ["Always read through the final selected sequence completely to ensure smooth, natural logical flow."]
    }
  ],
  commonMistakes: [
    "Reading sentences in arbitrary isolation instead of looking for linking pairs.",
    "Selecting a sentence with a pronoun ('He', 'It') or conjunction ('However') as the opening sentence.",
    "Failing to look at the multiple-choice options before attempting to solve manually.",
    "Disregarding time chronology (e.g. putting graduation before schooling).",
    "Ignoring the definite article 'the' which often marks second mention of a noun already introduced with 'a/an'."
  ],
  examTricks: [
    "Option First: Look at the first letters in the options (e.g. if three start with 'S' and one with 'P', heavily scrutinize 'S').",
    "Mandatory Pair Discovery: Find just ONE pair of sentences that must stick together (e.g. PR); eliminate any option that separates them.",
    "A/An before The: A concept introduced with 'a/an' (e.g. 'a novel device') always precedes its second reference with 'the' ('the device')."
  ],
  memoryTricks: [
    "N-P Pair: Noun precedes Pronoun.",
    "A before THE: 'A problem' comes before 'The problem'.",
    "Eliminate to Win: Test first letters in options to kill 2 wrong choices immediately."
  ],
  revision: [
    "Opening sentences never begin with however, therefore, moreover, or dependent pronouns.",
    "Find mandatory pairs (Noun -> Pronoun, Cause -> Effect).",
    "Chronology flows from problem to solution or past to present.",
    "Verify the full sequence before locking in your answer."
  ]
});

// 23 Determiners
updateNote('data/notes/grammar/23-determiners.json', {
  intro: "Determiners are words placed before nouns to specify quantity, definiteness, possession, or proximity. In WBPSC Clerkship, key questions test quantifiers (some/any, much/many, each/every), demonstratives, and distributives.",
  bengali: "Determiners হলো Noun-এর পূর্বে বসে তার সুনির্দিষ্টতা, পরিমাণ, সংখ্যা বা অধিকার নির্দেশক শব্দ। এদের প্রধান ভাগ: Articles (a, an, the), Demonstratives (this, that, these, those), Possessives (my, your, his, her, our, their), এবং Quantifiers (some, any, much, many, each, every, either, neither)। পরীক্ষায় সবচেয়ে বেশি আসে: 'Some' সাধারণত হ্যাঁ-বোধক (affirmative) বাক্যে এবং 'Any' না-বোধক (negative) বা প্রশ্নবোধক বাক্যে বসে; তবে অনুরোধ বা প্রস্তাবে 'Some' ব্যবহৃত হয়।",
  rules: [
    {
      rule: "Distinguish between 'Some' and 'Any': 'Some' is used in affirmative sentences and polite requests/offers; 'Any' is used in negative sentences and general questions.",
      examples: [
        "Affirmative: I have received some important instructions.",
        "Request: Would you like some tea? (polite offer expecting positive response).",
        "Negative: He did not find any discrepancy in the audit.",
        "Question: Do you have any queries regarding the examination?"
      ],
      exceptions: ["'Any' can be used in affirmative sentences when it means 'it doesn't matter which': 'Any candidate can download the admit card'."]
    },
    {
      rule: "Distinguish between 'Each' and 'Every': 'Each' refers to two or more individual members considered separately; 'Every' refers to three or more members considered collectively as a whole.",
      examples: ["Each of the two finalists received a commendation (Each for two).", "Every citizen must exercise their franchise responsibly (Every for large collective).", "Each student had an individual mentor."],
      exceptions: ["'Each' can function as a pronoun or determiner; 'Every' is strictly a determiner and can never stand alone as a pronoun."]
    },
    {
      rule: "Distinguish between 'Much' (uncountable quantities) and 'Many' (countable numbers).",
      examples: ["How much experience do you have in clerical administration?", "How many applications were registered on the portal?"],
      exceptions: ["Use 'a great deal of' or 'a large amount of' with uncountable nouns; use 'a large number of' with plural countable nouns."]
    },
    {
      rule: "Distinguish between 'Either / Neither' (used strictly for two entities) and 'Any / None' (used for more than two entities).",
      examples: ["Neither of the two candidates was selected.", "None of the ten applicants qualified the physical fitness test.", "You may choose either of the two examination shifts."],
      exceptions: ["Using 'neither' for three or more persons is a frequent error in error-detection questions."]
    },
    {
      rule: "Demonstratives: 'This / These' denote near proximity in space or time; 'That / Those' denote distance.",
      examples: ["This ledger on my desk is updated; that archive on the top shelf is archaic.", "These files are urgent."],
      exceptions: ["In comparative clauses, 'that of' replaces singular noun repetition and 'those of' replaces plural noun repetition: 'The roads of Siliguri are wider than those of Darjeeling'."]
    }
  ],
  commonMistakes: [
    "Writing 'Neither of the five members attended' (Correct: 'None of the five members').",
    "Writing 'I do not have some money' (Correct: 'I do not have any money').",
    "Writing 'Every of the candidates' ('Every' cannot stand as a pronoun; use 'Each of the candidates').",
    "Writing 'How much books do you require?' instead of 'How many books'.",
    "Writing 'The climate of Kolkata is hotter than Asansol' (Correct: 'hotter than that of Asansol')."
  ],
  examTricks: [
    "Two vs More than Two: Either/Neither = EXACTLY 2. Any/None = MORE THAN 2.",
    "Comparison Repetition: Look out for 'that of' (singular) and 'those of' (plural) in comparison sentences.",
    "Request with Some: In polite questions offering something ('Would you like...'), use 'some', NOT 'any'."
  ],
  memoryTricks: [
    "Neither for 2; None for Many.",
    "Some for Smiles (Affirmative & Polite Offers); Any for Negatives and Doubts."
  ],
  revision: [
    "Some in positive/polite offers; Any in negative/questions.",
    "Each applies to 2 or more individually; Every applies to 3+ collectively.",
    "Either/Neither strictly for 2; Any/None for 3 or more.",
    "That of / Those of avoid repetitive noun comparison."
  ]
});

console.log("Grammar enhancement part 2 complete!");
