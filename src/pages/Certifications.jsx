import { useEffect } from 'react'
import './certifications.css'

function getDriveImageUrl(url) {
  const match = url?.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}=w1200` : url;
}

export default function Certifications({ profile }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="page-enter cert-page">
      <div className="page-shell">
        <header className="cert-header">
          <p className="overline">Credentials</p>
          <h1>Professional <em>Certifications.</em></h1>
          <p className="lede">Here are my verified credentials, demonstrating my expertise in Guidewire and Cloud technologies.</p>
        </header>

        <div className="certificate-gallery">
          {profile.certifications.map((certificate) => (
            <article className="certificate-embed" key={certificate.name}>
              <div className="certificate-embed-info">
                <h3>{certificate.name}</h3>
                {certificate.date && <span>{certificate.date}</span>}
                {certificate.detail && <p>{certificate.detail}</p>}
              </div>
              {certificate.url && (
                <div className="certificate-embed-media">
                  <img 
                    src={getDriveImageUrl(certificate.url)} 
                    alt={certificate.name} 
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
