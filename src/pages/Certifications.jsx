import { useEffect } from 'react'
import './certifications.css'

import ProgressiveImage from '../components/ProgressiveImage'

export default function Certifications({ profile }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="page-enter cert-page">
      <div className="page-shell">
        <header className="cert-header scroll-reveal">
          <p className="overline">Credentials</p>
          <h1>Professional <em>Certifications.</em></h1>
          <p className="lede">Here are my verified credentials, demonstrating my expertise in Guidewire and Cloud technologies.</p>
        </header>

        <div className="certificate-gallery">
          {profile.certifications.map((certificate, index) => (
            <article className={`certificate-embed scroll-reveal delay-${(index % 5) + 1}`} key={certificate.name}>
              <div className="certificate-embed-info">
                <h3>{certificate.name}</h3>
                {certificate.date && <span>{certificate.date}</span>}
                {certificate.detail && <p>{certificate.detail}</p>}
              </div>
              {certificate.url && (
                <div className="certificate-embed-media">
                  <ProgressiveImage
                    src={`${import.meta.env.BASE_URL}${certificate.url.startsWith('/') ? certificate.url.slice(1) : certificate.url}?v=${profile.updatedAt || Date.now()}`}
                    placeholderSrc={certificate.placeholder}
                    alt={certificate.name}
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
