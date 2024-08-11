import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const index = () => {
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
                <span>Dubai</span>
                <FaExchangeAlt className="mx-2" />
                <span>England</span>
              </div>
              <div>
                <small>1 adult | economy</small>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Section */}
        <Col className="d-flex justify-content-end align-items-center">
          <div className="d-flex align-items-center">
            <FaAngleLeft />
            <span className="mx-2">Thu, 30 May</span>
            <FaAngleRight className="me-4" />
            <FaAngleLeft />
            <span className="mx-2">Sat, 15 Jun</span>
            <FaAngleRight />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default index;
