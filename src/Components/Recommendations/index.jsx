import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaClock, FaHeadset, FaMapSigns } from "react-icons/fa";
import DesertSafari from "../../../public/images/desert-safari.svg";
import AdmissionTickets from "../../../public/images/admission-tickets.svg";
import SightseeingTour from "../../../public/images/sightseeing-tour.svg";
import BoatRide from "../../../public/images/boat-ride.svg";

const recommendations = [
  {
    image: DesertSafari,
    title: "Dubai Desert Safari with BBQ Dinner",
    days: "3 Days",
    price: "Rs. 23,000",
    location: "Dubai",
  },
  {
    image: AdmissionTickets,
    title: "Burj Khalifa Admission Tickets",
    days: "1 Day",
    price: "Rs. 23,000",
    location: "Dubai",
  },
  {
    image: SightseeingTour,
    title: "Abu Dhabi Sightseeing Tour",
    days: "1 Day",
    price: "Rs. 23,000",
    location: "Dubai",
  },
  {
    image: BoatRide,
    title: "Burj Khalifa Lake Boat Ride",
    days: "14 Days",
    price: "Rs. 23,000",
    location: "Dubai",
  },
];

const RecommendationCard = ({ image, title, days, price, location }) => (
  <Col md={6} lg={3} className="mb-4">
    <div className="card recommendation-card">
      <Image
        src={image}
        className="card-img-top"
        alt={title}
        width={200}
        heigh={200}
      />
      <div className="card-body">
        <p className="location mb-1">{location}</p>
        <p className="fw-bolder">{title}</p>
        <p className="days mb-1">{days}</p>
        <p className="price mb-0 text-primary">From: {price}</p>
      </div>
    </div>
  </Col>
);

const RecommendationsSection = () => {
  return (
    <Container className="mt-5">
      <h5 className="text-black font-weight-bold mb-5">
        We&apos;ve got you covered
      </h5>
      <Row className="mb-5 text-center">
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
        <Col>
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
