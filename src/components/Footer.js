import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="d-flex align-items-center justify-content-center">
      Made with ❤️ by&nbsp;
      <Link to="https://www.linkedin.com/in/sevvallka/" target="_blank" rel="noopener noreferrer">
       Şevval Kaya
      </Link>
    </footer>
  );
}

export default Footer;
