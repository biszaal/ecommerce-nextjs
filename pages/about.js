import React from "react";
import NavBar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Image from "next/image";
export default function About() {
  return (
    <>
      <NavBar />

      <main>
        <div class="container mt-4">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title">About Us</h1>
              <p class="card-text">
                At Shopex, we value customer satisfaction and strive to provide
                exceptional service. Our user-friendly interface and secure
                payment gateways ensure that your shopping experience is
                convenient and trustworthy. We work closely with trusted
                suppliers and manufacturers to ensure the authenticity and
                quality of the products we offer. With a dedicated customer
                support team, we are always ready to assist you with any
                inquiries, concerns, or issues you may have. Your satisfaction
                is our top priority, and we continuously improve our services to
                meet your expectations. At Shopex, we believe in the power of
                ecommerce to connect people, businesses, and communities. We are
                committed to fostering a positive and inclusive online
                marketplace where customers can discover new products, sellers
                can expand their reach, and everyone can enjoy the benefits of
                online shopping. Thank you for choosing Shopex. We look forward
                to serving you and providing you with a delightful shopping
                experience.
              </p>
              <hr />
              <h2 class="card-title">Privacy Policy</h2>
              <p class="card-text">
                Your privacy is important to us. We understand the significance
                of protecting your personal information and adhere to strict
                privacy practices. We collect and store only the necessary
                information required for providing our services and processing
                your orders. We utilize secure encryption technology to
                safeguard your data and ensure its confidentiality. We do not
                share your personal information with third parties unless it is
                necessary for order fulfillment or required by law. When you
                browse our website, we may collect non-personal information such
                as your IP address, browser type, and operating system to
                analyze trends and improve our services. We may also use cookies
                to personalize your experience and provide relevant content and
                advertisements. If you choose to create an account with us, we
                securely store your account information, including your name,
                email address, and shipping details. This information is used to
                process your orders, provide order status updates, and enhance
                your shopping experience. We take appropriate measures to
                protect your information from unauthorized access, alteration,
                or disclosure. Our website is regularly monitored for security
                vulnerabilities, and we maintain strict internal procedures to
                safeguard your data. Please note that while we strive to protect
                your personal information, no method of transmission over the
                internet or electronic storage is completely secure. Therefore,
                we cannot guarantee absolute security, and you should take
                precautions to protect your own information. By using our
                website and services, you consent to the collection, use, and
                storage of your information as described in our Privacy Policy.
                If you have any questions or concerns regarding your privacy or
                our practices, please contact our customer support team. We are
                here to assist you and address any privacy-related issues. Thank
                you for trusting Shopex with your online shopping needs. We are
                dedicated to providing a safe and enjoyable experience for all
                our valued customers.
              </p>
            </div>
          </div>
        </div>
        <div class="container mt-4">
          <h2 class="pt-4 mt-2">Our Team</h2>
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <Image
                  src="/img/team/member1.jpg"
                  class="card-img-top"
                  alt="Team Member 1"
                  width={400}
                  height={300}
                />
                <div class="card-body">
                  <h5 class="card-title">John Doe</h5>
                  <p class="card-text">CEO</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <Image
                  src="/img/team/member2.jpg"
                  class="card-img-top"
                  alt="Team Member 2"
                  width={400}
                  height={300}
                />
                <div class="card-body">
                  <h5 class="card-title">Jane Smith</h5>
                  <p class="card-text">Marketing Manager</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <Image
                  src="/img/team/member3.jpg"
                  class="card-img-top"
                  alt="Team Member 3"
                  width={400}
                  height={300}
                />
                <div class="card-body">
                  <h5 class="card-title">Mike Johnson</h5>
                  <p class="card-text">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
