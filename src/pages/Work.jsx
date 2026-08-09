const projects = [
  { title: 'Virtual Assistant Jarvis', category: 'AI / Automation', image: 'jarvis.png', text: 'An open-source, privacy-first assistant with conversational AI, voice interaction, automation, and a modular command pipeline.', tech: 'Python · LLMs · STT/TTS · Selenium', link: 'https://github.com/Dilshad24', live: 'https://github.com/Dilshad24' },
  { title: 'Amazon Review Intelligence', category: 'Machine Learning', image: 'amazon.jpg', text: 'A Django sentiment-analysis application trained on nearly 400,000 product reviews to surface meaningful customer feedback.', tech: 'Python · Django · NLP · Deep Learning', link: 'https://github.com/Dilshad24/Amazon-Product-Review-Analysis-Using-Deep-Learning', live: 'https://github.com/Dilshad24/Amazon-Product-Review-Analysis-Using-Deep-Learning' },
  { title: 'Face Recognition Attendance', category: 'Computer Vision', image: 'Face.jpg', text: 'An automated attendance platform that detects faces in real time and records entry and exit activity without manual input.', tech: 'Python · OpenCV · Face Recognition', link: 'https://github.com/Dilshad24/Student-Attendance-Management-System-Using-Face-Recognition', live: 'https://github.com/Dilshad24/Student-Attendance-Management-System-Using-Face-Recognition' },
  { title: 'Easy Shopping', category: 'Web Development', image: 'easyshopping.com.jpg', text: 'A full e-commerce experience built around a clean shopping flow, product discovery, and account functionality.', tech: 'HTML · CSS · JavaScript · PHP · SQL', link: 'https://github.com/Dilshad24/ecommerce-website', live: 'https://easyshopping122.000webhostapp.com/' },
  { title: 'GChat', category: 'Networking', image: 'chatbot.jpg', text: 'A group chat room that lets people connect in real time through Python socket programming.', tech: 'Python · Socket Programming', link: 'https://github.com/Dilshad24/GChat-GroupChatSystem-', live: 'https://github.com/Dilshad24/GChat-GroupChatSystem-' },
  { title: 'Cars.com', category: 'Web Design', image: 'cars.com.png', text: 'cars.com is a web site that focuses on various ways we can create a website. It showcases cars from different companies with different models in a creative and eye-catching way.', tech: 'HTML · CSS · JavaScript', link: 'https://github.com/Dilshad24', live: 'https://github.com/Dilshad24' },
  { title: 'Lunch Box.com', category: 'Web Application', image: 'LunchBox.png', text: 'Lunch Box is an online grocery shop where customers can buy individual ingredients as well as they can search for a recipe and book all the ingredients needed to cook that recipe.', tech: 'Web · E-commerce', link: 'https://github.com/Dilshad24', live: 'https://github.com/Dilshad24' },
  { title: 'Sea Shells', category: 'Web Design', image: 'seashell.png', text: 'Sea Shell is Bags Designing and Producing Comapny which is Expert on all kind of bag and with variety of Metarials.', tech: 'HTML · CSS · UI/UX', link: 'https://github.com/Dilshad24', live: 'https://github.com/Dilshad24' },
  { title: 'Book Finder', category: 'Web Application', image: 'bookfinder.png', text: 'Book Finder is a web Application which can search books for you with the help of google books api.', tech: 'JavaScript · Google Books API', link: 'https://github.com/Dilshad24/bookfinder', live: 'https://github.com/Dilshad24/bookfinder' },
  { title: 'Furniture Hub', category: 'Web Application', image: 'furniturehub.png', text: 'Furniture hub is a furniture website which shows 3d model of every furniture so that customer can see from all angels.', tech: '3D · WebGL · E-commerce', link: 'https://github.com/Dilshad24', live: 'https://github.com/Dilshad24' },
  { title: 'Demo website', category: 'Web Design', image: 'cognetws.png', text: 'This is a demo website that was created for website building company.', tech: 'Web Design · HTML · CSS', link: 'https://github.com/Dilshad24', live: 'https://github.com/Dilshad24' },
]

export default function Work() {
  return (
    <main className="projects-page page-shell">
      <section className="page-intro" style={{ maxWidth: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '40px', flexWrap: 'wrap' }}>
        <div>
          <p className="overline">Selected work</p>
          <h1 style={{ margin: '12px 0 0', fontSize: 'clamp(2.5rem, 5vw, 4.8rem)' }}>Systems thinking,<br /><em>applied.</em></h1>
        </div>
        <p style={{ maxWidth: '500px', margin: '0 0 10px 0', fontSize: '1rem', lineHeight: '1.7' }}>
          From enterprise insurance platforms to independent AI experiments, these projects reflect my approach to solving real problems with thoughtful technology.
        </p>
      </section>
      
      <section className="project-grid">
        {projects.map((project, index) => (
          <article className={`project-tile tile-${index + 1}`} key={project.title}>
            {(project.live || project.link) ? (
              <a className="project-image" href={project.live || project.link} target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}project_image/${project.image}`} alt="" loading={index > 1 ? "lazy" : "eager"} decoding="async" />
              </a>
            ) : (
              <div className="project-image">
                <img src={`${import.meta.env.BASE_URL}project_image/${project.image}`} alt="" loading={index > 1 ? "lazy" : "eager"} decoding="async" />
              </div>
            )}
            <div className="project-body">
              <span className="project-category">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.text}</p>
              <div className="project-tech">
                {project.tech.split('·').map(t => (
                  <span key={t.trim()} className="tech-pill">{t.trim()}</span>
                ))}
              </div>
              {(project.link || project.live) && (
                <div className="project-links">
                  {project.link && <a href={project.link} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer">Website <span>↗</span></a>}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
