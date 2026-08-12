import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly before it hits the bottom
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Remove the class when it leaves the screen so it animates again when scrolling up/down
          entry.target.classList.remove('revealed');
        }
      });
    }, observerOptions);

    // Wait a brief moment for DOM to paint, then observe elements
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        el.classList.remove('revealed');
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]); // Re-run whenever the route changes
}
