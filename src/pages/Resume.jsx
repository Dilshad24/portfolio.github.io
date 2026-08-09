import { useState } from 'react';

const documentId = '1MATzyPKk4mo2Y2bF9r6yuZmw_Zte1qX2W0G01o5CpoY'
const downloadUrl = `https://docs.google.com/document/d/${documentId}/export?format=pdf`
const previewUrl = `https://docs.google.com/document/d/${documentId}/preview`

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="resume-container page-enter">
      <section className="page-intro" style={{ maxWidth: '100%', marginBottom: '24px' }}>
        <div className="resume-header-row" style={{ alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}>Curriculum <em>Vitae.</em></h1>
            <p style={{ maxWidth: '640px', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              My complete professional history, including roles at EY and Capgemini, 
              certifications, and project highlights. This live document is always up to date.
            </p>
          </div>
          <a href={downloadUrl} className="button button-primary download-btn" style={{ flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </a>
        </div>
      </section>

      <div className="live-resume-frame" style={{ position: 'relative' }}>
        <div className="frame-header" style={{ position: 'relative', zIndex: 2 }}>
          <span className="dot dot-close"></span>
          <span className="dot dot-min"></span>
          <span className="dot dot-max"></span>
          <div className="frame-title">Dilshad_Ali_Resume.pdf</div>
        </div>
        {isLoading && (
          <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', textAlign: 'center', color: 'var(--muted)', zIndex: 0, font: '500 0.85rem "DM Mono", monospace' }}>
            Loading document...
          </div>
        )}
        <div className="iframe-scaler" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <iframe 
            src={previewUrl} 
            title="Dilshad Ali resume" 
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </main>
  )
}
