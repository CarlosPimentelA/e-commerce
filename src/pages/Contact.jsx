import { useEffect } from "react";
import "./Contact.css";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
function Contact() {
  
  return (
    <>
    <NavBar/>
      <form className="contact-page">
        <div className="contact-form">
          <div className="contact-form-header">
            <h1 className="contact-title">Contact Us</h1>
            <p>
              We’re here to help! Send us your query via the form below or send
              an email at{" "}
              <a
                href="https://mail.google.com/mail/u/0/?pli=1#inbox?compose=CllgCHrfTTbfcqpbdvMcLvPdhhztZRjVSgDpknXCrmlhmVZzJjgNctxWNdZJGbLXsgHHFSFTWZL"
                target="_blank"
                className="contact-form-link"
              >
                helpdesk@gmail.com
              </a>{" "}
              for any issue you’re facing
            </p>
          </div>
          <div className="contact-form-form">
            <input type="text" placeholder="Name" className="input-name" />
            <input type="email" placeholder="Email" className="input-email" />
            <textarea
              className="textarea"
              cols="61"
              rows="10"
              placeholder="Type your message here"
            ></textarea>
          </div>
          <button type="submit" className="button-form">
            Send
          </button>
        </div>
        <div className="contact-img"></div>
      </form>
      <Footer/>
    </>
  );
}

export default Contact;
