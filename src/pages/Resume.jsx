import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker source to CDN to avoid build/path issues with Vite + GitHub Pages
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="resume-container">
      <div className="resume-header-row">
        <h2 className="resume-header">My Resume</h2>
        <a href="/resume.pdf" download className="download-btn">
          <span>Download PDF</span>
        </a>
      </div>
      
      <div className="pdf-container">
        <Document 
          file="/resume.pdf" 
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('Error loading PDF:', error)}
          loading={<div style={{color: 'white'}}>Loading PDF...</div>}
          error={<div style={{color: 'white', padding: '20px', textAlign: 'center'}}>
            <p>Failed to load PDF.</p> 
            <p style={{fontSize: '0.8em'}}>Please ensure <b>public/resume.pdf</b> exists and is a valid PDF file.</p>
          </div>}
        >
           {numPages && Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`} 
                pageNumber={index + 1} 
                width={width > 900 ? 900 : width - 40} 
                renderTextLayer={false}
                renderAnnotationLayer={true}
                className="pdf-page"
                style={{marginBottom: index < numPages -1 ? '10px' : '0'}}
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
