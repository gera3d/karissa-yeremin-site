const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// The goal is to extract sections into components
// 1. Find <section className="hero"> ... </section> up to <section className="section testimonials-section" ... </section>
// We'll just replace the contents of <main id="top"> ... </main> inside App

const mainStart = '<main id="top">';
const mainEnd = '</main>';

const startIdx = content.indexOf(mainStart) + mainStart.length;
const endIdx = content.indexOf(mainEnd);
const mainContent = content.substring(startIdx, endIdx);

// We want to split mainContent into LandingContent and ClientContent
// ClientContent is sessions-section and payment-section
const sessionsStart = '<section className="section sessions-section" id="sessions" data-reveal>';
const paymentEnd = '</section>\n\n          <section className="section about-section" id="about">';

const sStartIdx = mainContent.indexOf(sessionsStart);
const pEndIdx = mainContent.indexOf(paymentEnd); // This matches the end of payment-section

const clientContent = mainContent.substring(sStartIdx, pEndIdx);

const landingContent = mainContent.substring(0, sStartIdx) + mainContent.substring(pEndIdx + '</section>\n\n'.length - 1); // keep the newlines

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
                  <h1>Current Clients</h1>
                  <p>Book your next session or manage payments.</p>
                </div>
${clientContent}
              </>
            } />
          </Routes>
`;

content = content.substring(0, startIdx) + newMainContent + content.substring(endIdx);

fs.writeFileSync('src/App.jsx', content);
console.log('Refactoring complete');
