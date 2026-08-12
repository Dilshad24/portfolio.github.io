import { useState, useEffect } from 'react';
import './progressive-image.css';

// Keep track of which images have already been loaded in this session
const loadedImages = new Set();

export default function ProgressiveImage({ placeholderSrc, src, alt, className, ...props }) {
  // Initialize as true if we've already loaded this exact src before
  const [isLoaded, setIsLoaded] = useState(() => loadedImages.has(src));

  useEffect(() => {
    // Reset loaded state when src changes, unless it's already in our cache
    if (!loadedImages.has(src)) {
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    loadedImages.add(src);
    setIsLoaded(true);
  };

  return (
    <div className={`progressive-image-container ${className || ''}`}>
      {/* Low-res placeholder */}
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt={alt}
          className="progressive-image placeholder"
          style={{ 
            opacity: isLoaded ? 0 : 1, 
            transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
            visibility: isLoaded ? 'hidden' : 'visible',
            pointerEvents: 'none'
          }}
          {...props}
        />
      )}
      
      {/* High-res image */}
      <img
        src={src}
        alt={alt}
        className={`progressive-image main-image ${isLoaded ? 'loaded' : ''}`}
        style={isLoaded && loadedImages.has(src) ? { transition: 'none' } : {}}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}
