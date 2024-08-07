import Image from "next/image";
import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { FaPlane, FaTaxi } from "react-icons/fa";

function NavigationBar() {
  return (
    <Navbar
      style={{ backgroundColor: "#4B57DC" }}
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <Image
            src="/path-to-your-logo.png"
            width="120"
            height="30"
            className="d-inline-block align-top"
            alt="Travel Exploration Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#flights">
              <FaPlane /> Find Flight
            </Nav.Link>
            <Nav.Link href="#stays">
              <BiSearch /> Find Stays
            </Nav.Link>
            <Nav.Link href="#taxi">
              <FaTaxi /> Airport Taxi
            </Nav.Link>
            <Nav.Link href="#more">
              <BiSearch /> Find Stays
            </Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-light" className="me-2">
              Login
            </Button>
            <Button variant="light">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
