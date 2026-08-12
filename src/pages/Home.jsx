import { Link } from 'react-router-dom'
import './home.css'
import mainImage from '../assets/my images/main image.webp'
import SkillIcon from '../components/SkillIcon'

import ProgressiveImage from '../components/ProgressiveImage'
import thumbnails from 'virtual:image-thumbnails'

export default function Home({ profile }) {
  // Extract just the first sentence of the summary so it doesn't break the design
  let shortSummary = profile.summary;
  if (shortSummary && shortSummary.includes('.')) {
    shortSummary = shortSummary.split('.')[0] + '.';
  }
  
  // Prevent repeating "I am [Name]" if the API data already starts with it
  const displaySummary = shortSummary.toLowerCase().startsWith('i am')
    ? shortSummary
    : `I am ${profile.name}, a ${shortSummary}`;

  return <main className="page-enter">
    <section className="hero-section page-shell"><p className="overline mobile-only"><i /> {profile.role} - {profile.company}</p><div className="hero-content"><p className="overline desktop-only"><i /> {profile.role} - {profile.company}</p><h1 className="desktop-only">Building<br />dependable<br /><em>insurance<br />technology.</em></h1><p className="hero-lede">{displaySummary}</p><div className="cta-row"><Link className="button button-primary" to="/work">Explore selected work <span>-&gt;</span></Link><Link className="button button-ghost" to="/resume">View resume</Link></div><div className="hero-skills"><p>Core stack</p><div>{profile.skills.map((skill) => <span key={skill} className="skill-pill"><SkillIcon skill={skill} />{skill}</span>)}</div></div><div className="social-row"><a href="https://github.com/Dilshad24" target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}logo/github.svg`} alt="" /><span>GitHub</span></a><a href="https://www.linkedin.com/in/dilshad-ali24" target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}logo/linkedin.svg`} alt="" /><span>LinkedIn</span></a><a href={`mailto:${profile.email}`}><img src={`${import.meta.env.BASE_URL}logo/gmail.svg`} alt="" /><span>Email</span></a></div></div><div className="hero-visual"><ProgressiveImage src={mainImage} placeholderSrc={thumbnails['main image.webp']} alt={profile.name} fetchPriority="high" decoding="async" /><div className="experience-card"><strong>{profile.yearsExperience}</strong><span>Years of<br />experience</span></div></div></section>
    <section className="experience-showcase page-shell scroll-reveal"><div className="showcase-heading"><div><p className="overline">Career history</p><h2>Professional <em>experience.</em></h2></div><p>Guidewire PolicyCenter delivery, rating configuration, production support, and workflow automation.</p></div><div className="experience-cards">{profile.experience.map((job, index) => <article className={`experience-panel scroll-reveal delay-${Math.min(index + 1, 5)}`} key={`${job.company}-${job.role}`}><span className="panel-number">0{index + 1}</span><p className="panel-period">{job.period}</p><h3>{job.role}</h3><p className="panel-company">{job.company} <i /> {job.location}</p><div className="panel-line" /><ul>{(job.points || []).slice(0, 3).map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></section>
    <section className="achievements-section page-shell scroll-reveal">
      <div className="showcase-heading">
        <div>
          <p className="overline">Milestones</p>
          <h2>Key <em>Achievements.</em></h2>
        </div>
      </div>
      <div className="achievements-grid">
        {profile.achievements.map((achievement, idx) => {
          const parts = achievement.split(' – ');
          return (
            <div className={`achievement-card scroll-reveal delay-${(idx % 3) + 1} ${parts.length > 1 ? 'achievement-card-wide' : ''}`} key={idx}>
              <div className="achievement-icon">✦</div>
              <div className="achievement-text-content">
                <p><strong>{parts[0]}</strong></p>
                {parts[1] && <p className="achievement-desc">{parts[1]}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>    <section className="certifications-cta-section page-shell scroll-reveal">
      <div className="cert-cta-box">
        <div className="cert-cta-header">
          <div>
            <p className="overline">Credentials</p>
            <h2>Professional <em>Certifications.</em></h2>
            <p className="cert-cta-lede">View my verified credentials demonstrating my expertise in Guidewire and Cloud technologies.</p>
          </div>
          <Link className="button button-primary" to="/certifications">View All Certificates <span>-&gt;</span></Link>
        </div>
        <div className="cert-cta-grid">
          {profile.certifications.map((cert, idx) => (
            <div className={`cert-cta-item scroll-reveal delay-${(idx % 4) + 1}`} key={cert.name}>
              <strong>{cert.name}</strong>
              {cert.detail && <span>{cert.detail}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="qualification-section page-shell"><article className="education-card"><p className="overline">Education</p><h3>{profile.education.degree}</h3><p>{profile.education.school}</p><div><span>{profile.education.date}</span><b>{profile.education.score}</b></div></article></section>
  </main>
}
