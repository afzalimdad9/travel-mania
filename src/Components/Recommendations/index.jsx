import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaClock, FaHeadset, FaMapSigns } from "react-icons/fa";

const recommendations = [
  {
    image: "/path/to/image1.jpg",
    title: "Dubai Desert Safari with BBQ Dinner",
    days: "3 Days",
    price: "Rs. 23,000",
    location: "Dubai",
  },
  {
    image: "/path/to/image2.jpg",
    title: "Burj Khalifa Admission Tickets",
    days: "1 Day",
    price: "Rs. 23,000",
    location: "Dubai",
  },
  {
    image: "/path/to/image3.jpg",
    title: "Abu Dhabi Sightseeing Tour",
    days: "1 Day",
    price: "Rs. 23,000",
    location: "Dubai",
  },
  {
    image: "/path/to/image4.jpg",
    title: "Burj Khalifa Lake Boat Ride",
    days: "14 Days",
    price: "Rs. 23,000",
    location: "Dubai",
  },
];

const RecommendationCard = ({ image, title, days, price, location }) => (
  <Col md={6} lg={3} className="mb-4">
    <div className="card recommendation-card">
      <Image src={image} className="card-img-top" alt={title} fill />
      <div className="card-body">
        <p className="location mb-1">{location}</p>
        <h5 className="card-title">{title}</h5>
        <p className="days mb-1">{days}</p>
        <p className="price mb-0">From: {price}</p>
      </div>
    </div>
  </Col>
);

const RecommendationsSection = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4 text-center">
        <Col md={4}>
          <FaMapSigns className="icon mb-2" />
          <h6 className="font-weight-bold">Explore top attractions</h6>
          <p>
            Experience the best of your destination, with attractions, tours,
            activities and more
          </p>
        </Col>
        <Col md={4}>
          <FaClock className="icon mb-2" />
          <h6 className="font-weight-bold">Fast and flexible</h6>
          <p>
            Book tickets online in minutes, with free cancellation on many
            attractions
          </p>
        </Col>
        <Col md={4}>
          <FaHeadset className="icon mb-2" />
          <h6 className="font-weight-bold">Support when you need it</h6>
          <p>
            Booking.com&apos;s global Customer Service team is here to help 24/7
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h6 className="section-title">Recommended in Dubai</h6>
          <p>Build your best memories with your loved ones in Dubai</p>
        </Col>
        <Col className="text-right">
          <Button variant="outline-primary">See more places</Button>
        </Col>
      </Row>
      <Row>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} {...rec} />
        ))}
      </Row>
    </Container>
  );
};

export default RecommendationsSection;
