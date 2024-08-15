import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function PNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/add">Add Announcement</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default PNavbar;