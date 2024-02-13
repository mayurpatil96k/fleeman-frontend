import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <Row>
          <Col>
            <p>India Drive</p>
            <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
          </Col>
          <Col>
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/aboutus" className="text-light">About Us</Link></li>
              <li><Link to="/AffiliatedHotels" className="text-light">Affiliated Hotels</Link></li>
              <li><Link to="/WeatherRedirect" className="text-light">Weather</Link></li>
              <li><Link to="/CustomerCare" className="text-light">Contact Us</Link></li>
              <li><Link to="/sitemap" className="text-light">SiteMap</Link></li>
              <li><Link to="/CareerPage" className="text-light">Careers</Link></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
