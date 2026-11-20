# WBPSC Clerkship English — Complete Learning Platform

A static, mobile-first, high-performance web platform designed specifically for aspirants preparing for the **West Bengal Public Service Commission (WBPSC) Clerkship Examination** (Part-I Objective and Part-II Descriptive English).

---

## 🚀 Quick Start (Run Locally)

Because the platform uses standard ES6 `fetch()` to load JSON data files from `/data`, run a local HTTP server:

```powershell
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve .
```

Open `http://localhost:8000/` in your browser.

---

## 📁 System Architecture & Directory Map

```text
wbpsc-english/
├── index.html                 # Dashboard (streak, daily word, daily question, section portals)
├── grammar.html               # Grammar syllabus (23 chapters index)
├── chapter.html               # Dynamic chapter reader (?id=g01..g23, v01..v09, r01..r03, d01..d05)
├── vocabulary.html            # Vocabulary section (9 topics)
├── reading.html               # Reading comprehension, Cloze test, and Fill in the blanks
├── descriptive.html           # Part-II descriptive console (word counter, checklist, model answers)
├── question-bank.html         # Question Bank with multi-criteria filters and search
├── pyq.html                   # Verified PYQ archives (verified-only standard)
├── mock-tests.html            # Mock test hub (Full mocks, topic-wise, grammar, vocab, weak-topic)
├── test.html                  # CBT timed test engine (timer, palette, resume, auto-submit)
├── result.html                # Detailed score card, accuracy, topic diagnosis, solution review
├── vocab-builder.html         # Daily word, flashcards (flip, known/review-later), daily grammar
├── my-space.html              # Personal hub (Mistake notebook, bookmarks, test history, weak topics)
├── css/
│   ├── base.css               # Typography (Noto Sans & Noto Sans Bengali), mobile-first grid
│   ├── theme.css              # High contrast light and dark modes (local persistence)
│   ├── components.css         # Sidebar nav, mobile bottom nav, cards, modals, search
│   └── test.css               # Test palette, answer states, feedback boxes
├── js/
│   ├── app.js                 # Responsive navigation, global search (Ctrl/Cmd+K), theme toggle
│   ├── storage.js             # Resilient localStorage wrapper with try/catch safety
│   ├── bookmarks.js           # Question and chapter bookmark manager
│   ├── quiz-engine.js         # Chapter practice engine (instant feedback, hints, mistake logger)
│   ├── test-engine.js         # Timed CBT exam simulator with auto-submit & resume
│   ├── question-bank.js       # Searchable, filterable question bank engine
│   ├── mistake-notebook.js    # Mistake tracking and retry engine
│   ├── flashcards.js          # Interactive vocabulary flashcards
│   ├── descriptive.js         # Live word counter, auto-save drafts, self-check checklist
│   └── analytics.js           # Dashboard metrics, accuracy, and streak tracking
└── data/
    ├── chapters.json          # Master index of all 40 chapters
    ├── all-questions.json     # Consolidated question pool (251 questions)
    ├── test-config.json       # Exam configuration (questions, duration, negative marking)
    ├── daily-question.json    # Daily grammar challenge
    ├── vocabulary-builder.json# Daily vocabulary database
    ├── descriptive.json       # Model answers, formats, and checklists for Part-II
    ├── notes/
    │   ├── grammar/           # 23 complete grammar notes with "বাংলায় বুঝুন"
    │   ├── vocabulary/        # 9 vocabulary notes
    │   ├── reading/           # 3 reading and comprehension notes
    │   └── descriptive/       # 5 descriptive formats (Report, Précis, Summary, Translation, Paragraph)
    ├── questions/
    │   ├── grammar/           # 23 grammar question sets (20 Qs for sample chapters)
    │   ├── vocabulary/        # 9 vocabulary question sets
    │   └── reading/           # Reading comprehension, cloze test, and fill-in-the-blanks sets
    ├── passages/
    │   ├── comprehension.json # Full reading passages with Bengali summaries and questions
    │   └── cloze.json         # Cloze test passages with numbered blanks
    └── pyq/
        └── verified-pyq.json  # Official verified past-year questions
```

---

## 🔒 Verified PYQ Standard

> **Strict Content Standard:**
> Under no circumstances is a question labeled as a PYQ unless verified against an official WBPSC question booklet and revised master answer key.

Every verified PYQ object in `data/pyq/verified-pyq.json` contains:
```json
{
  "id": "pyq-2019-s1-01",
  "isPYQ": true,
  "source": "WBPSC Clerkship 2019 Shift 1",
  "year": "2019-s1",
  "stage": "part1",
  "topic": "grammar",
  "type": "mcq",
  "question": "The official question text verbatim...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": 2,
  "explanation": "Detailed explanation based on the official answer key.",
  "rule": "Grammar rule tested"
}
```

---

## ✍️ How to Add a Chapter

1. **Register the chapter in `data/chapters.json`**:
   ```json
   {
     "id": "g24",
     "section": "grammar",
     "title": "New Topic Title",
     "order": 24,
     "status": "ready",
     "notesFile": "data/notes/grammar/24-new-topic.json",
     "questionsFile": "data/questions/grammar/24-new-topic.json"
   }
   ```
2. **Create the notes file (`data/notes/...`)**:
   ```json
   {
     "id": "g24",
     "title": "New Topic Title",
     "intro": "Clear introductory concept.",
     "bengali": "সহজ বাংলায় বিষয়ের ভূমিকা ও ধারণা।",
     "rules": [
       {
         "rule": "Clear explanation of the rule.",
         "examples": ["First example sentence.", "Second example sentence."],
         "exceptions": ["Any specific exam exception."]
       }
     ],
     "commonMistakes": ["Common error students make."],
     "examTricks": ["15-second identification technique."],
     "memoryTricks": ["Mnemonic aid."],
     "revision": ["Key points for quick recap."]
   }
   ```
3. **Create the questions file (`data/questions/...`)**:
   ```json
   [
     {
       "id": "g24-001",
       "chapter": "g24",
       "type": "mcq",
       "difficulty": "medium",
       "isPYQ": false,
       "question": "Question sentence with blank or underlined part.",
       "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
       "answer": 0,
       "explanation": "Why Option 1 is the single correct choice.",
       "rule": "Rule name",
       "bengaliHint": "বাংলায় ইঙ্গিত।"
     }
   ]
   ```
4. **Recompile the unified index**:
   Run the aggregator to update `data/all-questions.json` so the Question Bank and Mock Test engine immediately include your new questions.

---

## 🌐 Deploying for Free

### GitHub Pages (Recommended)
1. Commit all files to your git repository:
   ```powershell
   git init
   git add .
   git commit -m "Complete WBPSC Clerkship English platform"
   ```
2. Push to GitHub:
   ```powershell
   git remote add origin https://github.com/<your-username>/wbpsc-clerkship-english.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub, navigate to **Settings > Pages**.
4. Set source to **Deploy from a branch**, select branch `main`, folder `/ (root)`, and click **Save**.
5. Your application is live within 60 seconds with SSL enabled for free.
