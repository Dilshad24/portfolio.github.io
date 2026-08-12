import './skeleton-resume.css';

export default function SkeletonResume({ width, pages = 2 }) {
  const pageStyle = width ? { 
    width: `${width}px`, 
    height: `${width * 1.414}px`, // Standard A4 aspect ratio
  } : {};

  return (
    <div className="skeleton-resume">
      <div style={{ display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        {Array.from({ length: pages }).map((_, pageIndex) => (
          <div 
            key={pageIndex} 
            className="skeleton-page" 
            style={{ 
              ...pageStyle, 
              borderBottom: pageIndex < pages - 1 ? '1px dashed #ccc' : 'none',
              boxShadow: 'none',
              borderRadius: 0
            }}
          >
            {pageIndex === 0 && (
              <div className="skeleton-header">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line subtitle"></div>
              </div>
            )}
            <div className="skeleton-content">
              {Array.from({ length: pageIndex === 0 ? 5 : 8 }).map((_, i) => (
                <div key={`section-${pageIndex}-${i}`} className="skeleton-section">
                  <div className="skeleton-line heading"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line text short"></div>
                  <div className="skeleton-line text"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
