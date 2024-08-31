import Image from "next/image";
import React from "react";
import {
  Breadcrumb,
  Col,
  Container,
  ListGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { useHotelContext } from "../../context/HotelDataContext";

function HotelDetailMain() {
  const { hotelData } = useHotelContext();

  return (
    <Container>
      {/* Breadcrumbs and Title */}
      <Row className="mb-3">
        <Col>
          <Breadcrumb className="my-5">
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Attractions</Breadcrumb.Item>
            <Breadcrumb.Item active>{hotelData?.HotelName}</Breadcrumb.Item>
          </Breadcrumb>
          <p className="text-black fs-2 fw-bold">{hotelData?.HotelName}</p>
          <p>{hotelData?.Address}</p>
        </Col>
      </Row>

      {/* Ratings and Reviews */}
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6}>
          <h5>
            <span className="badge bg-warning text-dark">
              {hotelData?.HotelRating} Fabulous (
              {Math.floor(Math.random() * 1000)} reviews)
            </span>
          </h5>
          <p>#7 Best seller in {hotelData?.Address?.split(",").pop()}</p>
        </Col>
        <Col xs={12} md={6} className="text-md-right">
          {/* <button className="btn btn-outline-dark">See all reviews</button> */}
          <button className="btn btn-outline-secondary">
            Share this hotel
          </button>
        </Col>
      </Row>

      {/* Photo Gallery */}
      <Row>
        <Col xs={12} md={8}>
          <Image
            src={hotelData?.Images[0]} // Large image
            alt="Dubai City"
            width={800} // Adjust these sizes based on your layout needs
            height={600}
            // className="h-75"
            style={{ width: "800px", height: "510px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={12} md={4}>
          <Row>
            <Col xs={6} className="mb-2">
              <Image
                src={hotelData?.Images[1]} // Top left small image
                alt="Camel Ride"
                width={400}
                height={300}
                style={{ width: "400px", height: "250px", objectFit: "cover" }}
              />
            </Col>
            <Col xs={6} className="mb-2">
              <Image
                src={hotelData?.Images[2]} // Top right small image
                alt="Sand Dunes"
                width={400}
                height={300}
                style={{ width: "400px", height: "250px", objectFit: "cover" }}
              />
            </Col>
            <Col xs={6}>
              <Image
                src={hotelData?.Images[3]} // Bottom left small image
                alt="Desert Safari"
                width={400}
                height={300}
                style={{ width: "400px", height: "250px", objectFit: "cover" }}
              />
            </Col>
            <Col xs={6}>
              <Image
                src={hotelData?.Images[4]} // Bottom right small image
                alt="Desert Safari"
                width={400}
                height={300}
                style={{ width: "400px", height: "250px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="ml-8" xs={8}>
          <Nav variant="underline" defaultActiveKey="overview">
            <Nav.Item>
              <Nav.Link eventKey={"overview"}>Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="facilities">Facilities</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="location">Location</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="details">Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews">Reviews</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={4}>
          <Row>
            <Col>
              <h5 className="text-end">$488</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="price_tags text-end">$32 per night</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="price_tags text-end">VAT included</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HotelDetailMain;
