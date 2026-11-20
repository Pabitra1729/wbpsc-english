const fs = require('fs');

const compCssPath = 'css/components.css';
let content = fs.readFileSync(compCssPath, 'utf8');

const extraStyles = `
/* ==========================================================================
   ENHANCED CHAPTER CARD & DASHBOARD UI
   ========================================================================== */

.chapter-list {
  display: grid;
  gap: 1rem;
}

.chapter-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-sm);
}

.chapter-card:hover {
  border-color: var(--primary-border);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.chapter-card-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.chapter-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.chapter-order-pill {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--primary-border);
}

.chapter-card h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.35;
}

.chapter-card p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

.chapter-card-actions {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
}

/* Dashboard Metrics & Hero Refinement */
.hero {
  background: var(--gradient-subtle);
  border: 1px solid var(--primary-border);
  border-radius: var(--radius-xl);
  padding: 2.25rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.hero h1 {
  font-size: clamp(1.85rem, 4vw, 2.65rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0.4rem 0 0.85rem;
  letter-spacing: -0.02em;
}

.hero p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 0 1.5rem;
}

.hero-actions {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.metric:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.metric::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--primary);
}

.metric:nth-child(2)::before {
  background: var(--success);
}

.metric:nth-child(3)::before {
  background: var(--accent-purple);
}

.metric span {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.metric strong {
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
  .chapter-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem;
  }
  .chapter-card-actions {
    width: 100%;
  }
  .chapter-card-actions .btn {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
`;

if (!content.includes('ENHANCED CHAPTER CARD & DASHBOARD UI')) {
  fs.writeFileSync(compCssPath, content + "\n" + extraStyles, 'utf8');
  console.log('Successfully appended enhanced component styles to css/components.css');
} else {
  console.log('Styles already present in css/components.css');
}
