export default function Contact() {
  return (
    <>
      <div className="contactsociallinks">
        <ul>
          <li>
            <a href="https://github.com/Dilshad24" target="_blank" rel="noreferrer">
              <img src={`${import.meta.env.BASE_URL}logo/github.svg`} alt="" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/dilshad-ali24" target="_blank" rel="noreferrer">
              <img src={`${import.meta.env.BASE_URL}logo/linkedin.svg`} alt="" />
            </a>
          </li>
          <li>
            <a href="mailto:mddilshadali2410@gmail.com">
              <img src={`${import.meta.env.BASE_URL}logo/gmail.svg`} alt="" />
            </a>
          </li>
        </ul>
      </div>
      <div className="contctnumber">
        <p>Contact No: 8334005602</p>
      </div>
      <div className="contactthanks">
        <p>Thank you For Visiting</p>
      </div>
    </>
  )
}
