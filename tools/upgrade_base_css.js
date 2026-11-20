const fs = require('fs');

const baseCssPath = 'css/base.css';
let content = fs.readFileSync(baseCssPath, 'utf8');

// The replacement CSS for chapter layout, notes, Bengali accordion, callouts, and quiz
const newStyles = `/* ==========================================================================
   CHAPTER TEMPLATE & PEDAGOGICAL NOTES STYLES
   ========================================================================== */

.chapter-layout {
  max-width: 940px;
}

/* Chapter Hero Section */
.chapter-hero {
  background: var(--gradient-subtle);
  border: 1px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.chapter-meta-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.badge-section {
  background: var(--primary);
  color: #ffffff;
  font-weight: 700;
}

.badge-weightage {
  background: var(--accent-purple-soft);
  color: var(--accent-purple);
  border: 1px solid var(--accent-purple-border);
}

.badge-time {
  background: var(--surface);
  color: var(--muted);
  border: 1px solid var(--border);
}

.badge-count {
  background: var(--success-soft);
  color: var(--success);
  border: 1px solid var(--success-border);
}

.chapter-title {
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  font-weight: 800;
  margin: 0.25rem 0 0.75rem;
  letter-spacing: -0.02em;
  color: var(--text);
  line-height: 1.25;
}

.chapter-intro-lead {
  font-size: 1.08rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0 0 1.25rem;
}

.chapter-top-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.chapter-top-actions button.bookmarked {
  background: var(--warning-soft);
  color: var(--warning);
  border-color: var(--warning-border);
}

/* Quick Jump Sticky Navigation */
.chapter-jump-nav {
  position: sticky;
  top: 1rem;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
  overflow-x: auto;
}

.jump-title {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  white-space: nowrap;
}

.jump-pills {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
}
.jump-pills::-webkit-scrollbar {
  display: none;
}

.jump-pill {
  font-size: 0.84rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  background: var(--surface);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  white-space: nowrap;
  transition: all 0.15s ease;
}

.jump-pill:hover {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: var(--primary-border);
  transform: translateY(-1px);
}

.jump-pill.highlight {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 2px 4px rgba(29, 78, 216, 0.25);
}
.jump-pill.highlight:hover {
  background: var(--primary-hover);
  color: #ffffff;
}

/* Bengali Guide Accordion Section */
.bengali-section {
  margin-bottom: 2rem;
}

.bengali-card {
  background: var(--surface);
  border: 1px solid var(--primary-border);
  border-left: 5px solid var(--primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.2s ease;
}

.bengali-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.4rem;
  cursor: pointer;
  user-select: none;
  background: var(--primary-soft);
}

.bengali-summary::-webkit-details-marker {
  display: none;
}

.bengali-summary-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.bengali-badge {
  background: var(--primary);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  font-family: "Noto Sans Bengali", sans-serif;
}

.bengali-summary strong {
  font-size: 1.05rem;
  color: var(--text);
  font-family: "Noto Sans Bengali", system-ui, sans-serif;
}

.bengali-toggle-icon {
  font-size: 1.25rem;
  color: var(--primary);
  transition: transform 0.2s ease;
}

.bengali-card[open] .bengali-toggle-icon {
  transform: rotate(180deg);
}

.bengali-content {
  padding: 1.4rem 1.6rem;
  background: var(--surface);
}

.bengali-content p {
  font-family: "Noto Sans Bengali", "Noto Sans", sans-serif;
  font-size: 1.06rem;
  line-height: 1.95;
  color: var(--text);
  margin: 0;
}

/* Rules Section & Rule Cards */
.rules-section {
  margin-bottom: 2.25rem;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.75rem;
}

.section-sub {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary);
  margin-bottom: 0.2rem;
}

.section-header-row h2 {
  font-size: 1.45rem;
  font-weight: 800;
  margin: 0;
  color: var(--text);
}

.rules-grid {
  display: grid;
  gap: 1.25rem;
}

.rule-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.rule-card:hover {
  border-color: var(--primary-border);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.rule-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.rule-pill {
  background: var(--primary-soft);
  color: var(--primary);
  border: 1px solid var(--primary-border);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  letter-spacing: 0.04em;
  margin-top: 0.15rem;
}

.rule-heading {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  color: var(--text);
}

.rule-examples-box {
  background: var(--surface-subtle);
  border: 1px solid var(--border-subtle);
  border-left: 3px solid var(--success);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  margin-top: 0.75rem;
}

.rule-sub-tag {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.rule-sub-tag.positive {
  color: var(--success);
}

.rule-sub-tag.alert {
  color: var(--warning);
}

.rule-list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.75;
  color: var(--text);
}

.rule-list li {
  margin-bottom: 0.35rem;
}
.rule-list li:last-child {
  margin-bottom: 0;
}

.rule-exceptions-box {
  background: var(--warning-soft);
  border: 1px solid var(--warning-border);
  border-left: 3px solid var(--warning);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  margin-top: 0.75rem;
}

/* Callout Sections (Common Mistakes, Exam Tricks, Memory, Revision) */
.note-callout {
  padding: 1.5rem 1.75rem;
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.callout-head {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.callout-icon {
  font-size: 1.6rem;
  line-height: 1;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}

.callout-head h2 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 0.2rem;
}

.callout-sub {
  font-size: 0.92rem;
  color: var(--muted);
  margin: 0;
}

/* Common Mistakes / Exam Traps */
.mistakes-callout {
  background: var(--danger-soft);
  border-color: var(--danger-border);
  border-left: 5px solid var(--danger);
}
.mistakes-callout .callout-head h2 {
  color: var(--danger);
}

.mistakes-grid {
  display: grid;
  gap: 0.75rem;
}

.mistake-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--danger-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.15rem;
}

.mistake-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mistake-col.bad .m-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--danger);
}

.mistake-col.bad .m-text {
  font-size: 0.95rem;
  color: var(--danger-hover);
  text-decoration: line-through;
  opacity: 0.85;
}

.mistake-col.good .m-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--success);
}

.mistake-col.good .m-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--success-hover);
}

.mistake-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: var(--surface);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--danger-border);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Exam Tricks */
.tricks-callout {
  background: var(--warning-soft);
  border-color: var(--warning-border);
  border-left: 5px solid var(--warning);
}
.tricks-callout .callout-head h2 {
  color: var(--warning);
}

.tricks-list {
  display: grid;
  gap: 0.75rem;
}

.trick-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--warning-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.15rem;
}

.trick-badge {
  background: var(--warning);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.trick-item p {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.6;
  color: var(--text);
}

/* Memory Tricks */
.memory-callout {
  background: var(--accent-purple-soft);
  border-color: var(--accent-purple-border);
  border-left: 5px solid var(--accent-purple);
}
.memory-callout .callout-head h2 {
  color: var(--accent-purple);
}

.memory-grid {
  display: grid;
  gap: 0.75rem;
}

.memory-chip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--accent-purple-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.25rem;
  font-size: 0.96rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.5;
}

.chip-bulb {
  font-size: 1.25rem;
}

/* Revision Capsule */
.revision-callout {
  background: var(--success-soft);
  border-color: var(--success-border);
  border-left: 5px solid var(--success);
}
.revision-callout .callout-head h2 {
  color: var(--success);
}

.revision-capsule-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.revision-capsule-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  background: var(--surface);
  border: 1px solid var(--success-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.15rem;
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--text);
}

.check-icon {
  color: var(--success);
  font-weight: 900;
  font-size: 1.1rem;
  line-height: 1.4;
}

/* Chapter Bottom CTA */
.chapter-bottom-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background: var(--gradient-subtle);
  border: 1px solid var(--primary-border);
  border-radius: var(--radius-xl);
  padding: 2rem 2.25rem;
  margin-top: 2rem;
  box-shadow: var(--shadow-md);
}

.cta-info h3 {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0 0 0.35rem;
  color: var(--text);
}

.cta-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
}

.cta-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 0.85rem 1.65rem;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: var(--radius-md);
}

/* Practice Quiz Layout & Elements */
.quiz {
  margin-top: 2.5rem;
}

.quiz-card {
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.quiz-progress-bar-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--border-subtle);
}

.quiz-progress-bar {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.quiz-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
}

.quiz-step-count {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary);
}

.quiz-question-title {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  line-height: 1.5;
  margin: 0 0 1.5rem;
  color: var(--text);
}

.question-options {
  display: grid;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.option {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 1.02rem;
  font-weight: 500;
  background: var(--surface);
  border: 1.5px solid var(--border);
  color: var(--text);
  transition: all 0.15s ease;
  cursor: pointer;
}

.option:hover:not(:disabled) {
  border-color: var(--primary);
  background: var(--primary-soft);
  transform: translateX(4px);
}

.option-prefix {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-subtle);
  border: 1px solid var(--border);
  font-weight: 800;
  font-size: 0.88rem;
  color: var(--text);
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.option.correct {
  background: var(--success-soft) !important;
  border-color: var(--success) !important;
  color: var(--success-hover) !important;
  font-weight: 700;
}
.option.correct .option-prefix {
  background: var(--success);
  color: #ffffff;
  border-color: var(--success);
}

.option.wrong {
  background: var(--danger-soft) !important;
  border-color: var(--danger) !important;
  color: var(--danger-hover) !important;
}
.option.wrong .option-prefix {
  background: var(--danger);
  color: #ffffff;
  border-color: var(--danger);
}

.feedback {
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-md);
  margin: 1.25rem 0;
  border: 1px solid transparent;
  animation: fadeIn 0.2s ease-in;
}

.feedback.correct {
  background: var(--success-soft);
  border-color: var(--success-border);
  color: var(--text);
}

.feedback.wrong {
  background: var(--danger-soft);
  border-color: var(--danger-border);
  color: var(--text);
}

.feedback-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}
.feedback.correct .feedback-title {
  color: var(--success);
}
.feedback.wrong .feedback-title {
  color: var(--danger);
}

.feedback-exp {
  margin: 0 0 0.5rem;
  line-height: 1.65;
  font-size: 0.98rem;
}

.feedback-rule, .feedback-hint {
  margin: 0.25rem 0 0;
  font-size: 0.92rem;
  line-height: 1.5;
}
.feedback-rule {
  color: var(--muted);
}
.feedback-hint {
  color: var(--primary);
  font-family: "Noto Sans Bengali", sans-serif;
}

.quiz-complete-card {
  text-align: center;
  padding: 3rem 2rem;
}

.complete-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.complete-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

/* Print Stylesheet for Notes */
@media print {
  .desktop-nav, .bottom-nav, .mobile-theme, .mobile-search, .search-panel,
  .chapter-jump-nav, .chapter-top-actions, .chapter-bottom-cta, .quiz,
  .skip-link, #nav-root {
    display: none !important;
  }
  body, .page {
    background: #ffffff !important;
    color: #000000 !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  .chapter-hero, .rule-card, .note-callout, .bengali-card {
    border: 1px solid #cccccc !important;
    box-shadow: none !important;
    background: #ffffff !important;
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 1rem !important;
  }
  .bengali-card[open] {
    display: block !important;
  }
}
`;

// Replace lines between "/* Chapter Template Layout */" and "/* Responsive Media Queries */"
const startMarker = "/* Chapter Template Layout */";
const endMarker = "/* Responsive Media Queries */";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const updatedContent = content.substring(0, startIndex) + newStyles + "\n" + content.substring(endIndex);
  fs.writeFileSync(baseCssPath, updatedContent, 'utf8');
  console.log('Successfully upgraded css/base.css with modern chapter and note styles!');
} else {
  console.error('Could not find markers in css/base.css');
}
