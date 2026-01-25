import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div className="name">
        <p>About</p>
        <p>Dilshad Ali</p>
      </div>
      <div className="myprofile">
        <div className="myprofilemyimg">
          <img src="/myimage/myimg1.png" alt="" />
        </div>
        <div className="myprofileabout">
          <div className="desination">
            <h2>Associate Consultant at</h2>
            <img id="cglogo" src="/project_image/capgemini.png" alt="" />
          </div>
          <p>
            Dedicated <b>Guidewire Developer</b> with
            <b>3.3 years of experience</b>, specializing in
            <b>Guidewire PolicyCenter</b>, including <b>PolicyCenter Rating</b>,
            and <b>Guidewire 9.04</b> for
            <b>Configuration, Implementation, and Development</b>. Proficient in
            the <b>Financial Services</b> and <b>Insurance domain</b>, delivering
            robust and scalable solutions to enhance functionality and streamline
            operations.
          </p>
          {/*
          <p>
            Seeking to leverage my skills in Python, Web Development and Machine
            Learninge, to gain expertise in multiple areas of software development
            and thereby contribute to the success of the organization.
          </p>
          */}
          <p>Skills:</p>
          <ul>
            <li>Guidewire Policy Center</li>
            <li>Guidewire PC Rating</li>
            <li>Guidewire PC Configuration</li>
            <li>Html / Css</li>
            <li>Python</li>
            <li>Guidewire Policy Center</li>
            <li>Gosu</li>
            <li>Machine Learning</li>
            <li>Deep Learning</li>
            <li>Html / Css</li>
            <li>Javascrypt / Php / Sql</li>
            <li>Data Structures</li>
            <li>Microsoft Excel</li>
            <li>Pandas</li>
            <li>Microsoft Excel</li>
            <li>Blueprism</li>
          </ul>
          <div className="myprofileaboutchild">
            <Link to="/work">Projects</Link>
            <a
              href="https://docs.google.com/document/d/1OFkB3d3SXz-nod_0xjSlYeIgnwhYAyPC/edit?usp=sharing&ouid=112976319464163235155&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
            >Resume</a>
          </div>
          <div className="sociallinks">
            <ul>
              <li>
                <a href="https://github.com/Dilshad24" target="_blank" rel="noreferrer">
                  <img src="/logo/github.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dilshad-ali24" target="_blank" rel="noreferrer">
                  <img src="/logo/linkedin.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="mailto:mddilshadali2410@gmail.com">
                  <img src="/logo/gmail.svg" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
