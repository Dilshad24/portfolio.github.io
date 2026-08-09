import React from 'react';

const DEVICONS = {
  "python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "react": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "javascript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "html/css": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "aws": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "sql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg",
  "opencv": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
  "git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "nodejs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
};

const DefaultIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DocumentIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const GuidewireIcon = ({ color = "#007398" }) => (
  <svg width="14" height="14" viewBox="0 0 100 100" fill={color} style={{ transform: 'scale(1.15)' }}>
    <path d="M100 0H0v100h100V40H40v20h40v20H20V20h80z" />
  </svg>
);

const BluePrismIcon = () => {
  const dx = 25;
  const dy = 14.5;
  const tf = (x, y) => `${x},${y} ${x-dx},${y+dy} ${x},${y+2*dy} ${x+dx},${y+dy}`;
  const lf = (x, y) => `${x},${y} ${x-dx},${y+dy} ${x-dx},${y+3*dy} ${x},${y+2*dy}`;
  const rf = (x, y) => `${x},${y} ${x+dx},${y+dy} ${x+dx},${y+3*dy} ${x},${y+2*dy}`;
  
  return (
    <svg width="15" height="15" viewBox="0 0 100 100">
      <g transform="translate(0, 4)">
        <polygon points={tf(50, 5)} fill="#0078C8" />
        <polygon points={tf(25, 19.5)} fill="#A5C4D4" />
        <polygon points={tf(75, 19.5)} fill="#A5C4D4" />
        <polygon points={lf(50, 34)} fill="#1B365D" />
        <polygon points={rf(50, 34)} fill="#A5C4D4" />
        <polygon points={lf(25, 48.5)} fill="#1B365D" />
        <polygon points={rf(25, 48.5)} fill="#0078C8" />
        <polygon points={lf(75, 48.5)} fill="#0078C8" />
        <polygon points={rf(75, 48.5)} fill="#0078C8" />
      </g>
    </svg>
  );
};

export default function SkillIcon({ skill }) {
  const normalized = skill.toLowerCase().trim();
  
  if (DEVICONS[normalized]) {
    return <img src={DEVICONS[normalized]} alt="" style={{ width: '15px', height: '15px', objectFit: 'contain' }} />;
  }

  // Custom overrides matching the user's specific screenshot aesthetics
  if (normalized === 'blue prism' || normalized === 'blueprism') return <BluePrismIcon />;
  if (normalized.includes('guidewire') || normalized === 'gosu') return <GuidewireIcon color="#07799c" />;
  if (normalized.includes('data') || normalized.includes('machine learning')) return <DocumentIcon color="#3b82f6" />;
  if (normalized.includes('deep learning')) return <DocumentIcon color="#f97316" />;

  return <DefaultIcon />;
}
