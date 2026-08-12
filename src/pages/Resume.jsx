import { useState, useEffect, useRef } from 'react';
import resumeData from '../data/resume-data.json';
import SkeletonResume from '../components/SkeletonResume';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const documentId = '1MATzyPKk4mo2Y2bF9r6yuZmw_Zte1qX2W0G01o5CpoY'
const downloadUrl = `https://docs.google.com/document/d/${documentId}/export?format=pdf`

export default function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <main className="resume-container page-enter">
      <section className="page-intro" style={{ maxWidth: '100%' }}>
        <div className="resume-header-row" style={{ alignItems: 'center' }}>
          <div>
            <p className="overline">Professional Record</p>
            <h1 style={{ margin: '12px 0 8px', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}>Curriculum <em>Vitae.</em></h1>
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
        <div className="iframe-scaler" ref={containerRef} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#e9ecef', padding: '8px 0' }}>
          <Document
            file={`${import.meta.env.BASE_URL}Dilshad_Ali_Resume.pdf?v=${resumeData.updatedAt || Date.now()}`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<SkeletonResume width={containerWidth ? containerWidth * 0.95 : 800} />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {numPages && Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} style={{ borderBottom: index < numPages - 1 ? '1px dashed #ccc' : 'none' }}>
                  <Page
                    pageNumber={index + 1}
                    width={containerWidth ? containerWidth * 0.95 : undefined} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </div>
          </Document>
        </div>
      </div>
    </main>
  )
}
