import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 fixed-bottom">
      <Container>
        <Row className="d-flex align-items-center justify-content-center">
          <Col className="text-center">
            Made with ❤️ by&nbsp;
            <Link 
              to="https://www.linkedin.com/in/sevvallka/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white"
            >
              Şevval Kaya
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
