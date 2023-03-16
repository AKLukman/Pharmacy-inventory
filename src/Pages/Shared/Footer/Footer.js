import React from "react";
import footerImage from "../../../assets/images/footer.png";
const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div>
      <div>
        <footer
          className="footer p-10 "
          style={{
            background: `url(${footerImage}) `,
            backgroundSize: "cover",
          }}
        >
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
      </div>
      <div>
        <p className="text-center mt-16">
          Copyright ©{year} - All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
