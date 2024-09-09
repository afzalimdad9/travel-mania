import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Index = () => {
  const visaOptions = [
    {
      title: "Airport to Airport Tickets Only",
      price: "AED 989 /person",
      link: "#",
      img: "/path/to/a2a-image.jpg", // Replace with the actual image path
    },
    {
      title: "Visa Change Oman Exit By Land",
      price: "AED 950 /person",
      link: "#",
      img: "/path/to/oman-exit-image.jpg", // Replace with the actual image path
    },
    {
      title: "A2A Visa Change - Same Day",
      price: "AED 1299 /person",
      link: "#",
      img: "/path/to/a2a-same-day.jpg", // Replace with the actual image path
    },
  ];

  return (
    <Container className="my-5">
      <h5 className="text-center mb-4 text-black">
        UAE VISA CHANGE | DUBAI VISA CHANGE?
      </h5>
      <p className="text-center mb-4">
        Apply your UAE VISA CHANGE with South Travel for a hassle-free
        experience.
      </p>
      {visaOptions.map((option, index) => (
        <Card key={index} className="mb-4 shadow-sm">
          <Row className="no-gutters align-items-center">
            <Col md={3}>
              <Card.Img src={option.img} className="w-75 h-75" />
            </Col>
            <Col md={6}>
              <Card.Body className="d-flex justify-content-between align-items-start">
                <Card.Text className="fs-6">{option.title}</Card.Text>
                <Card.Text className="fs-6">
                  Starts from {option.price}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col md={3} className="d-flex justify-content-end">
              <Button
                href={option.link}
                variant="primary"
                className="m-3 text-white"
                style={{ height: "fit-content" }}
              >
                View Details
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default Index;
