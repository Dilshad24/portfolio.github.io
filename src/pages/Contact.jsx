export default function Contact({ profile }) {
  return (
    <main className="contact-page page-shell page-enter">
      <section className="contact-hero">
        <p className="overline">Lets connect</p>
        <h1 style={{ letterSpacing: '-0.04em' }}>Have a role or<br /><em>idea in mind?</em></h1>
        <p>I am open to conversations about Guidewire, insurance technology, automation, and AI-focused engineering opportunities.</p>
        <a className="contact-email-btn" href={`mailto:${profile.email}`}>
          <span className="email-text">{profile.email}</span>
          <span className="email-icon">↗</span>
        </a>
      </section>

      <section className="contact-cards">


        <div className="contact-card">
          <p>Based in</p>
          <span>{profile.location}</span>
        </div>

        <div className="contact-card">
          <p>Find me online</p>
          <div className="social-links-grid">
            <a href="https://github.com/Dilshad24" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/dilshad-ali24" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  )
}
