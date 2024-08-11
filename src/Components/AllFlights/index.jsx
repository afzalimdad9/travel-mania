import React from "react";
import FlightAccordion from "../FlightAccordion";
import FlightInfo from "../FlightInfo";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

const index = () => {
  return (
    <Container fluid className="container">
      <Row className="my-4">
        <Col md={3}>
          {/* Left Section: Filter Accordion */}
          <FlightAccordion />
        </Col>

        <Col md={9}>
          {/* Top Section: Get Price Alerts and Sort By */}
          <Row className="mb-3">
            <Col xs={6} className="d-flex align-items-center">
              <span className="fw-bold">Get Price Alerts</span>
            </Col>
            <Col
              xs={6}
              className="d-flex justify-content-end align-items-center"
            >
              <span className="me-2">236 Results</span>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  Sort by: Best
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Best</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Cheapest</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Fastest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {/* Right Section: Flight Information Cards */}
          <Row>
            <Col>
              <FlightInfo />
              <FlightInfo />
              <FlightInfo />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default index;
