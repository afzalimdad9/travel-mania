import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import FlightLogo from "../../../public/images/flight-logo.png"; // Using next/image for optimized images

const FlightCard = () => {
  return (
    <Container
      fluid
      className="p-4 container my-5"
      style={{ backgroundColor: "#EAF1FC", borderRadius: "10px" }}
    >
      <Row className="align-items-center">
        {/* Airline Info */}
        <Col md={8}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Image src={FlightLogo} alt="Emirates" width={50} height={50} />
            </Col>
            <Col>
              <h6 className="mb-0">Fly to Kos with Emirates</h6>
            </Col>
          </Row>
          <hr />
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">07:30</h5>
              <p className="text-primary">Dubai</p>
            </Col>
            <Col xs="auto" className="text-center">
              {/* <span>1hr 40m</span> */}
              {/* <hr style={{ border: "1px solid #6c757d", width: "100%" }} /> */}
              {/* <i className="bi bi-airplane" style={{ fontSize: "20px" }}></i> */}
            </Col>
            <Col>
              <h5 className="mb-0">09:20</h5>
              <p className="text-primary">England</p>
            </Col>
          </Row>
          <hr />
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">09:30</h5>
              <p className="text-primary">England</p>
            </Col>
            <Col xs="auto" className="text-center">
              {/* <span>2hr 42m</span>
              <hr style={{ border: "1px solid #6c757d", width: "100%" }} />
              <i className="bi bi-airplane" style={{ fontSize: "20px" }}></i> */}
            </Col>
            <Col>
              <h5 className="mb-0">15:30</h5>
              <p className="text-primary">Dubai</p>
            </Col>
          </Row>
        </Col>

        {/* Price and Book Button */}
        <Col md={4} className="text-center">
          <h4 className="mb-4">$980</h4>
          <Button variant="primary" size="lg">
            Book Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FlightCard;
