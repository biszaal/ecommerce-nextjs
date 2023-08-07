import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="about">About Us</a>
              </li>
              <li>
                <a href="contact">Contact Us</a>
              </li>
              <li>
                <a href="about">Terms of Service</a>
              </li>
              <li>
                <a href="about">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>
                <i className="material-icons">location_on</i> 123 Street, City,
                Country
              </li>
              <li>
                <i className="material-icons">email</i> info@example.com
              </li>
              <li>
                <i className="material-icons">phone</i> +1234567890
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <span className="text-muted">
              &copy; 2023 Shopex. All rights reserved.
            </span>
          </div>
          <div className="col-lg-6 text-lg-end">
            <a href="about" className="btn btn-link">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
