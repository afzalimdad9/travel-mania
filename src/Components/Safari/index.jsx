import Image from "next/image";
import React from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import Details1 from "../../../public/images/details-1.png";
import Details2 from "../../../public/images/details-2.png";
import Details3 from "../../../public/images/details-3.png";
import Details4 from "../../../public/images/details-4.png";
import Details5 from "../../../public/images/details-5.png";

function SafariSection() {
  return (
    <Container>
      {/* Breadcrumbs and Title */}
      <Row className="mb-3">
        <Col>
          <Breadcrumb className="my-5">
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Attractions</Breadcrumb.Item>
            <Breadcrumb.Item active>
              Dubai Desert Safari with BBQ Dinner
            </Breadcrumb.Item>
          </Breadcrumb>
          <p className="text-black fs-2 fw-bold">
            Dubai Desert Safari with BBQ Dinner
          </p>
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
        <Col xs={12} md={8}>
          <Image
            src={Details1} // Large image
            alt="Dubai City"
            width={800} // Adjust these sizes based on your layout needs
            height={600}
            className="h-75"
            layout="responsive"
          />
        </Col>
        <Col xs={12} md={4}>
          <Row>
            <Col xs={6} className="mb-2">
              <Image
                src={Details2} // Top left small image
                alt="Camel Ride"
                width={400}
                height={300}
                layout="responsive"
              />
            </Col>
            <Col xs={6} className="mb-2">
              <Image
                src={Details3} // Top right small image
                alt="Sand Dunes"
                width={400}
                height={300}
                layout="responsive"
              />
            </Col>
            <Col xs={6}>
              <Image
                src={Details4} // Bottom left small image
                alt="Desert Safari"
                width={400}
                height={300}
                layout="responsive"
              />
            </Col>
            <Col xs={6}>
              <Image
                src={Details5} // Bottom right small image
                alt="Desert Safari"
                width={400}
                height={300}
                layout="responsive"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SafariSection;
