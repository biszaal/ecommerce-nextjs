import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

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
                  <FacebookIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <TwitterIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <InstagramIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>
                <LocationOnIcon htmlColor="#FF6D70" /> 123 Street, City, Country
              </li>
              <li>
                <EmailIcon htmlColor="#FF6D70" /> info@example.com
              </li>
              <li>
                <PhoneIcon htmlColor="#FF6D70" /> +1234567890
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
