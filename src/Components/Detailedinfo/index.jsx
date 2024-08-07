import Image from "next/image";
import React from "react";
import { Accordion, Col, Container, ListGroup, Row } from "react-bootstrap";

function DetailedInfo() {
  return (
    <Container>
      <Row className="my-3">
        <Col>
            <h2>What&apos;s included</h2>
            <ListGroup>
                <ListGroup.Item>Snorkeling gear</ListGroup.Item>
                <ListGroup.Item>Camel ride</ListGroup.Item>
                <ListGroup.Item>BBQ dinner</ListGroup.Item>
                <ListGroup.Item>Free parking</ListGroup.Item>
            </ListGroup>
        </Col>
        <Col>
            <h2>What&apos;s not included</h2>
            <ListGroup>
                <ListGroup.Item>Lunch</ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h2>Health & Safety</h2>
          <p>Measures in place for the health and safety of guests.</p>
        </Col>
      </Row>

      <Row className="my-3">
        <Col xs={12}>
          <h2>Itinerary Information</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Day 1: Dubai Safari</Accordion.Header>
              <Accordion.Body>
                Experience a thrilling dune bashing session followed by a
                cultural show.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="my-3">
        <Col xs={12}>
          <h2>Location</h2>
          <Image
            src="/path-to-map-image.jpg"
            alt="Location map"
            width={600}
            height={400}
            layout="responsive"
          />
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h2>User Ratings</h2>
          <p>Comfort: 4.2</p>
          <p>Location: 4.5</p>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailedInfo;
