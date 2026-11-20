const fs = require('fs');
const compCssPath = 'css/components.css';
let content = fs.readFileSync(compCssPath, 'utf8');

const bookletStyles = `
/* ==========================================================================
   VOCABULARY BOOKLET STYLES
   ========================================================================== */
.booklet-section {
  padding: 1.75rem 2rem;
  margin-bottom: 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  background: var(--surface);
}

.booklet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
}

.booklet-header h2 {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0.2rem 0;
  color: var(--text);
}

.booklet-search-wrap input {
  min-width: 280px;
  max-width: 100%;
  padding: 0.65rem 1.15rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--surface);
  color: var(--text);
  font-size: 0.95rem;
  transition: all 0.15s ease;
}

.booklet-search-wrap input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
  outline: none;
}

.booklet-table-wrap {
  max-height: 540px;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.booklet-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  text-align: left;
}

.booklet-table thead {
  position: sticky;
  top: 0;
  background: var(--surface-subtle);
  z-index: 10;
}

.booklet-table th {
  padding: 0.75rem 1rem;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
}

.booklet-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
  line-height: 1.55;
}

.booklet-table tr:hover td {
  background: var(--surface-subtle);
}

.booklet-table .b-num {
  font-weight: 700;
  color: var(--muted);
}

.booklet-table .b-term strong {
  color: var(--primary);
  font-weight: 700;
}

.booklet-table .b-bengali {
  font-family: "Noto Sans Bengali", sans-serif;
  color: var(--text);
  font-size: 1rem;
}
`;

if (!content.includes('VOCABULARY BOOKLET STYLES')) {
  fs.writeFileSync(compCssPath, content + "\n" + bookletStyles, 'utf8');
  console.log('Appended booklet styles to css/components.css');
} else {
  console.log('Booklet styles already present in css/components.css');
}
