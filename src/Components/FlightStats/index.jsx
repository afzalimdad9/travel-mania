import { useRouter } from "next/router";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { formatDate } from "../../utils";

const FlightStats = () => {
  const {
    from,
    to,
    flightMode,
    children,
    adults,
    tripType,
    returnDate,
    departureDate,
  } = useRouter().query;
  return (
    <Container
      fluid
      className="bg-primary text-white p-3 rounded my-5 container"
    >
      <Row className="align-items-center">
        {/* Left Section */}
        <Col xs="auto">
          <div className="d-flex align-items-center">
            <FaSearch size={30} />
            <div className="ms-3">
              <div className="d-flex align-items-center">
                <span>{from}</span>
                {tripType === "one-way" ? (
                  <FaArrowRight className="mx-2" />
                ) : (
                  <FaExchangeAlt className="mx-2" />
                )}
                <span>{to}</span>
              </div>
              <div>
                <small>
                  {adults} Adult | {children} Children | {flightMode}
                </small>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Section */}
        <Col className="d-flex justify-content-end align-items-center">
          <div className="d-flex align-items-center">
            {departureDate && (
              <>
                <FaAngleLeft />
                <span className="mx-2">{formatDate(departureDate)}</span>
                <FaAngleRight className="me-4" />
              </>
            )}
            {returnDate && (
              <>
                <FaAngleLeft />
                <span className="mx-2">{formatDate(returnDate)}</span>
                <FaAngleRight className="me-4" />
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FlightStats;
