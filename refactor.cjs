const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const mainStart = '<main id="top">';
const mainEnd = '</main>';

const startIdx = content.indexOf(mainStart) + mainStart.length;
const endIdx = content.indexOf(mainEnd);
const mainContent = content.substring(startIdx, endIdx);

const sessionsStart = '<section className="section sessions-section" id="sessions" data-reveal>';
const paymentEnd = '</section>\n\n          <section className="section about-section" id="about">';

const sStartIdx = mainContent.indexOf(sessionsStart);
const pEndIdx = mainContent.indexOf(paymentEnd);

if (sStartIdx === -1 || pEndIdx === -1) {
  console.error("Could not find sections!");
  process.exit(1);
}

const clientContent = mainContent.substring(sStartIdx, pEndIdx + '</section>'.length);

const landingContent = mainContent.substring(0, sStartIdx) + mainContent.substring(pEndIdx + '</section>'.length);

const newMainContent = `
          <Routes>
            <Route path="/" element={
              <>
${landingContent}
              </>
            } />
            <Route path="/clients" element={
              <>
                <div className="client-page-header" style={{ paddingTop: '120px', paddingBottom: '40px', textAlign: 'center' }}>
                  <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--ink)', marginBottom: '16px' }}>Current Clients</h1>
                  <p style={{ fontSize: '1.2rem', color: 'var(--sage-ink)' }}>Book your next session or manage payments.</p>
                </div>
${clientContent}
              </>
            } />
          </Routes>
`;

content = content.substring(0, startIdx) + newMainContent + content.substring(endIdx);

fs.writeFileSync('src/App.jsx', content);
console.log('Refactoring complete');
