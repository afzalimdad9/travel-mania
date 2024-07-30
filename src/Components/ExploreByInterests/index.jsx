import { Col, Container, Row } from "react-bootstrap";
import {
  FaArrowRight,
  FaChalkboardTeacher,
  FaConciergeBell,
  FaMapSigns,
  FaPaintBrush,
  FaTicketAlt,
  FaTree,
  FaUtensils,
} from "react-icons/fa";

const interests = [
  { icon: <FaMapSigns />, title: "Tours", count: "656 things to do" },
  { icon: <FaTree />, title: "Nature & outdoor", count: "312 things to do" },
  { icon: <FaUtensils />, title: "Food & drinks", count: "29 things to do" },
  {
    icon: <FaPaintBrush />,
    title: "Museums, arts & culture",
    count: "384 things to do",
  },
  {
    icon: <FaTicketAlt />,
    title: "Entertainment & tickets",
    count: "237 things to do",
  },
  {
    icon: <FaConciergeBell />,
    title: "Travel services & rentals",
    count: "8 things to do",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Workshops & classes",
    count: "7 things to do",
  },
];

const ExploreByInterests = () => {
  return (
    <Container className="mt-5">
      <div className="sign-in-banner mb-4 p-3">
        <p className="mb-1">
          <strong>Sign in to save time</strong>
        </p>
        <p>Your Travel Mania account lets you book using your saved details</p>
        <a className="btn btn-primary text-white" href="/signin">
          Sign in
        </a>
      </div>
      <Row>
        <Col lg={4} className="mb-4">
          <h6 className="section-title mb-3">Explore by interests</h6>
          <p className="section-subtitle mb-4">
            Browse everything from activities and attractions to tours and
            transfers
          </p>
        </Col>
        <Col lg={8} className="mb-4">
          <Row>
            {interests.map((interest, index) => (
              <Col lg={6} className="mb-3" key={index}>
                <div className="interest-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <span className="interest-icon">{interest.icon}</span>
                    <div className="ml-3">
                      <p className="interest-title mb-0">{interest.title}</p>
                      <p className="interest-count mb-0">{interest.count}</p>
                    </div>
                  </div>
                  <FaArrowRight className="arrow-icon" />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ExploreByInterests;
