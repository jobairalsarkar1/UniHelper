// import React from "react";
import "../styles/External.css";
import { Footer } from "../components";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-inner-container">
        <div className="contact-inner-inner-container">
          <div className="contact-info-holder">
            <h2 className="contact-info-title" style={{ color: "green" }}>
              UniHelper
            </h2>
            <span>K-52/Imaginary Garden,Delusion</span>
            <span>Middle Earth</span>
            <span>Grace 1212, Middle Earth</span>
            <span>Tel: +000XXXXXXX-ÁÁ</span>
          </div>
          <div className="contact-info-holder">
            <h2 className="contact-info-title">Emergency Contact</h2>
            <span>
              Student Information Centre, Registry Exam Controller Admission
            </span>
            <div className="contact-det">
              <span className="att-key">Tel</span>
              <span>:</span>
              <span>
                <a href={`tel:+8809638402646`}>+8809602464646</a>, (IVR press 2){" "}
                <a href={`tel:+8801322802603`}>+8801322021603</a>,{" "}
                <a href={`tel:+8801320221603`}>+8801322021603</a>
              </span>
            </div>
            <div className="contact-det">
              <span className="att-key">Email</span>
              <span>:</span>
              <span>
                <a href={`mailto:example@something.com`}>
                  example@something.com
                </a>
              </span>
            </div>
            <span>Contact Hours: 9:00AM - 5:30PM</span>
          </div>
          <div className="contact-info-holder">
            <h2 className="contact-info-title">Emergency Contact</h2>
            <span>Office of Proctor</span>
            <span>
              Tel: <a href={`tel:+800158994949`}>+800158994949</a>
            </span>
            <span>
              Email:{" "}
              <a href={`mailto:proctoroffice@uh.bd`}>proctoroffice@uh.bd</a>
            </span>
            <span>Contact Hours: 9:00AM - 5:30PM</span>
          </div>
          <div className="contact-info-holder">
            <h2 className="contact-info-title" style={{ color: "#2a4172" }}>
              General Contact
            </h2>
            <span>
              Ofice of Register:{" "}
              <a href={`mailto:something@register.com`}>
                something@register.com
              </a>
            </span>
            <span>
              Office of Proctor:{" "}
              <a href={`mailto:proctor@dummy.bd`}>proctor@dummy.bd</a>
            </span>
            <span>
              Medical Center :{" "}
              <a href={`mailto:medical@yahoo.com`}>medical@yahoo.com</a>
            </span>
            <span>
              Student Life:{" "}
              <a href={`mailto:lifeStudent@gmail.com`}>lifeStudent@gmail.com</a>
            </span>
          </div>
          <div className="contact-info-holder">
            <h2 className="contact-info-title" style={{ color: "#2a4172" }}>
              General Contact
            </h2>
            <span>K-52/Imaginary Garden,Delusion</span>
            <span>Middle Earth</span>
            <span>Grace 1212, Middle Earth</span>
            <span>Tel: +000XXXXXXX-ÁÁ</span>
          </div>
        </div>
        {/* <span>Contact</span> */}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
