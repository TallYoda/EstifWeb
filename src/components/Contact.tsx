import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize EmailJS with your public key so we get clearer behavior
    try {
      emailjs.init("Z5PCzySFzbca8pz-3");
    } catch (e) {
      console.warn("EmailJS init warning:", e);
    }
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage(null);
    emailjs
      .sendForm(
        "service_zcg4jf4",
        "template_mcmmfdo",
        e.currentTarget,
        // public key is optional here if init() used, but include for clarity
        "Z5PCzySFzbca8pz-3"
      )
      .then((result) => {
        console.log("EmailJS success:", result);
        setSent(true);
        e.currentTarget.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        const message = (err && (err.text || err.message)) || "Failed to send message.";
        setErrorMessage(String(message));
      });
  };

  return (
    <section id="contact" className="contact section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Contact</h2>

        <div className="row gy-4">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="contact-info">
              <p>
                <strong>Email:</strong>
                <br />
                <a href="mailto:Estifanos618@gmail.com">
                Estifanos618@gmail.com
                </a>
              </p>

              <p>
                <strong>Phone:</strong>
                <br />
                <a href="tel:+251927100924">+251 927100924</a>
              </p>

              <p>
                <strong>Instagram:</strong>
                <br />
                <a
                  href="https://www.instagram.com/estifanos927"
                  target="_blank"
                  rel="noreferrer"
                >
                  @estifanos927
                </a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <form onSubmit={sendEmail} className="contact-form">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  rows={5}
                  className="form-control"
                  placeholder="Your Message"
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Send Message
              </button>
              {sent && (
                <p className="text-success mt-3">Message sent successfully ✨</p>
              )}

              {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
