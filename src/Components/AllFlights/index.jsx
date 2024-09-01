import React, { useState } from "react";
import FlightAccordion from "../FlightAccordion";
import FlightInfo from "../FlightInfo";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useFlightContext } from "../../context/FlightDataContext";

const AllFlights = () => {
  const { flights } = useFlightContext();
  const [sort, setSort] = useState(0);

  let sortedFlights = flights.sort(function (a, b) {
    switch (sort) {
      case 0:
        return b.Fare.BaseFare - a.Fare.BaseFare;

      case 1:
        return a.Fare.BaseFare - b.Fare.BaseFare;

      default:
        return a.Segments[0][0].Duration - b.Segments[0][0].Duration;
    }
  });

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
              <span className="me-2">{flights.length} Results</span>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  Sort by: Best
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      setSort(0);
                    }}
                    href=""
                  >
                    Best
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      setSort(1);
                    }}
                    href=""
                  >
                    Cheapest
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      setSort(2);
                    }}
                    href=""
                  >
                    Fastest
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {/* Right Section: Flight Information Cards */}
          <Row>
            <Col>
              {sortedFlights.map((flight, idx) => (
                <FlightInfo {...flight} key={idx} />
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AllFlights;
