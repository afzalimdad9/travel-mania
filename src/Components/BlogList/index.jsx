import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import EcoFriendly from "../../../public/images/eco-friendly.svg";
import UnveilingOff from "../../../public/images/unveiling-off.svg";
import Image from "next/image";

const blogPosts = [
  {
    image: EcoFriendly,
    title: "Eco-Friendly Travel Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
  {
    image: UnveilingOff,
    title: "Unveiling Off-the-Beaten-Path Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
  {
    image: UnveilingOff,
    title: "Unveiling Off-the-Beaten-Path Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
];

const BlogList = () => {
  return (
    <Container className="mt-5">
      {/* Dropdown and Search Bar */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Select>
            <option>Latest Blog</option>
            <option value="1">Oldest Blog</option>
            <option value="2">Most Popular</option>
          </Form.Select>
        </Col>
        <Col md={6}></Col>
        <Col md={3}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search news..."
              className="me-2"
            />
            <Button variant="primary" className="w-50">
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Blog Posts */}
      <Row>
        {blogPosts.map((post, index) => (
          <Col md={4} key={index}>
            <Card className="mb-5">
              <Image
                src={post.image}
                alt={post.title}
                className="w-100 object-fit-cover"
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Text className="text-muted">{post.date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Centered Load More Button */}
      <Row className="my-5">
        <Col className="d-flex justify-content-center">
          <Button variant="primary" className="px-5">
            Load More
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogList;
