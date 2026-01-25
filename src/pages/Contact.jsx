export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
        
        <div className="contact-details">
          <div className="contact-item">
             <span className="contact-label">Phone</span>
             <span className="contact-value">8334005602</span>
          </div>
          <div className="contact-item">
             <span className="contact-label">Email</span>
             <a href="mailto:mddilshadali2410@gmail.com" className="contact-value link">mddilshadali2410@gmail.com</a>
          </div>
        </div>

        <div className="contact-socials">
          <a href="https://github.com/Dilshad24" target="_blank" rel="noreferrer" className="social-icon">
            <img src={`${import.meta.env.BASE_URL}logo/github.svg`} alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/dilshad-ali24" target="_blank" rel="noreferrer" className="social-icon">
            <img src={`${import.meta.env.BASE_URL}logo/linkedin.svg`} alt="LinkedIn" />
          </a>
          <a href="mailto:mddilshadali2410@gmail.com" className="social-icon">
            <img src={`${import.meta.env.BASE_URL}logo/gmail.svg`} alt="Email" />
          </a>
        </div>

        <div className="contact-footer">
          <p>Thank you for visiting!</p>
        </div>
      </div>
    </div>
  )
}
