import React, { useRef } from "react";

import Footer from "../layout/Footer";

import showToast from "../../helpers/toasts";

import emailjs from "@emailjs/browser";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { ImLink, ImLocation } from "react-icons/im";

import github from "../../images/github.png";
import linkedin from "../../images/linkedin.png";

const Contact = () => {
  const contactForm = useRef();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const messageInputRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    let res = emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        contactForm.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          nameInputRef.current.value = "";
          emailInputRef.current.value = "";
          messageInputRef.current.value = "";
          showToast(res, "send-contact-message");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // to auto resize text area
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="contact">
      <div className="contact__header">
        <h6 className="contact__header__text">Howdy!</h6>
        <p className="contact__header__subtext">
          Feel free to reach out to me if you have any questions, feedback, or
          employment opportunities.
        </p>
      </div>
      <div className="contact-wrapper">
        <form ref={contactForm} onSubmit={sendEmail} className="contact__form">
          <div className="contact__form__input-grp">
            <span className="contact__form__input-grp__span">
              <HiOutlineUser className="contact-icon" />
            </span>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="contact__form__input"
              ref={nameInputRef}
              required
            />
          </div>

          <div className="contact__form__input-grp">
            <span className="contact__form__input-grp__span">
              <HiOutlineMail className="contact-icon" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="contact__form__input"
              ref={emailInputRef}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Enter your message..."
            className="contact__form__message"
            onKeyDown={handleKeyDown}
            ref={messageInputRef}
            required
          />
          <button type="submit" value="Send" className="contact__form__button">
            Send
          </button>
        </form>

        <div className="contact__info">
          <p className="contact__info__header">
            Or contact me through any of the following ways:
          </p>
          <div className="contact__info__personal">
            <div className="contact__info__personal__item">
              <span className="contact__info__personal__item__span">
                <HiOutlineMail className="contact__info__personal__icon" />
              </span>
              <a
                className="contact__info__personal__item__link"
                href="mailto:johnstonstephenm@gmail.com"
              >
                johnstonstephenm@gmail.com
              </a>
            </div>
            <div className="contact__info__personal__item">
              <span className="contact__info__personal__item__span">
                <ImLink className="contact__info__personal__icon" />
              </span>
              <a
                className="contact__info__personal__item__link"
                href="http://stephenmjohnston.net"
                target="_blank"
                rel="noreferrer"
              >
                My Portfolio
              </a>
            </div>
            <div className="contact__info__personal__item">
              <span className="contact__info__personal__item__span">
                <ImLocation className="contact__info__personal__icon" />
              </span>
              <p className="contact__info__personal__item__text">
                Fowlerville, MI
              </p>
            </div>
            <div className="social-media-icons">
              <a
                href="https://github.com/sjohnston82"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={github}
                  alt="Github logo"
                  className="social-media-icon"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/stephenjohnston82/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="Linkedin Logo"
                  className="social-media-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
