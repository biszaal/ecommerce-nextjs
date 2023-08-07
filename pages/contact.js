import React from "react";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main>
        <div className="container">
          <div className="contact-details">
            <div className="row">
              <div className="col-md-6">
                <h2>Our Location</h2>
                <div id="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9719.177207455208!2d-1.8856340000000003!3d52.48286!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bdf33f3ee235%3A0xcf26467b12814a58!2sBirmingham%20City%20University%20International%20College%20(BCUIC)!5e0!3m2!1sen!2suk!4v1689167769601!5m2!1sen!2suk"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="col-md-6">
                <h2>Contact Information</h2>
                <p>
                  <PhoneIcon /> Phone: +1 123 456 7890
                </p>
                <p>
                  <PlaceIcon /> Address: 123 Street, City, Country
                </p>
              </div>
            </div>
          </div>

          <div className="container contact-form">
            <h2>Send us a Message</h2>
            <p>
              {
                "Please fill out the form below and we'll get back to you as soon as possible."
              }
            </p>

            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
