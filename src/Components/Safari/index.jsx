import Image from "next/image";
import React from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";

function SafariSection() {
  return (
    <Container>
      {/* Breadcrumbs and Title */}
      <Row className="mb-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Attractions</Breadcrumb.Item>
            <Breadcrumb.Item active>
              Dubai Desert Safari with BBQ Dinner
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1>Dubai Desert Safari with BBQ Dinner</h1>
          <p>
            Dune bashing followed by cultural activities, live entertainment,
            and barbecue dinner
          </p>
        </Col>
      </Row>

      {/* Ratings and Reviews */}
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6}>
          <h5>
            <span className="badge bg-warning text-dark">
              4.4 Fabulous (1694 reviews)
            </span>
          </h5>
          <p>#7 Best seller in Dubai</p>
        </Col>
        <Col xs={12} md={6} className="text-md-right">
          <button className="btn btn-outline-dark">See all reviews</button>
          <button className="btn btn-outline-secondary">
            Share this attraction
          </button>
        </Col>
      </Row>

      {/* Photo Gallery */}
      <Row>
        <Col xs={12} sm={6} md={3}>
          <Image
            src="/path-to-your-image-1.jpg"
            alt="Dubai City"
            width={500} // Adjust based on your layout needs
            height={300}
            layout="responsive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Image
            src="/path-to-your-image-2.jpg"
            alt="Camel Ride"
            width={500}
            height={300}
            layout="responsive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Image
            src="/path-to-your-image-3.jpg"
            alt="Sand Dunes"
            width={500}
            height={300}
            layout="responsive"
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Image
            src="/path-to-your-image-4.jpg"
            alt="Desert Safari"
            width={500}
            height={300}
            layout="responsive"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SafariSection;
