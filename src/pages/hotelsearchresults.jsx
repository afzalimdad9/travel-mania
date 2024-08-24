import Signin from "../Components/Signin";
import Head from "next/head";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import BannerForm from "../Components/BannerForm/BannerForm";
import Layout from "../layout/index";
import HotelBanner from "../Components/HotelBanner/index";
import ModernVision from "../../public/images/modern-vision.svg";
import Deal1 from "../../public/images/deal-1.svg";
import Deal2 from "../../public/images/deal-2.svg";
import Deal3 from "../../public/images/deal-3.svg";

import Image from "next/image";
import { FaCreditCard, FaLeaf } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";

const searchResults = [
  {
    image: ModernVision,
    title:
      "Modern Visions of Dubai - Dubai Marina Cruise and Dubai Frame Visit",
    description:
      "With this tour you get the chance to discover Dubai's Past, Present and Future. Experience a Pan...",
    price: "US$499",
    cancellation: "Free cancellation available",
  },
  {
    image: ModernVision,
    title:
      "Modern Visions of Dubai - Dubai Marina Cruise and Dubai Frame Visit",
    description:
      "With this tour you get the chance to discover Dubai's Past, Present and Future. Experience a Pan...",
    price: "US$499",
    cancellation: "Free cancellation available",
  },
  {
    image: ModernVision,
    title:
      "Modern Visions of Dubai - Dubai Marina Cruise and Dubai Frame Visit",
    description:
      "With this tour you get the chance to discover Dubai's Past, Present and Future. Experience a Pan...",
    price: "US$499",
    cancellation: "Free cancellation available",
  },
];

const deals = [
  {
    image: Deal1,
    title: "Dubai Top 20 Must-see Attractions with Burj Khalifa and Souks",
    discount: "20% OFF",
    price: "From US$49.00",
  },
  {
    image: Deal2,
    title: "Dubai Top 20 Must-see Attractions with Burj Khalifa and Souks",
    discount: "20% OFF",
    price: "From US$49.00",
  },
  {
    image: Deal3,
    title: "Dubai Top 20 Must-see Attractions with Burj Khalifa and Souks",
    discount: "20% OFF",
    price: "From US$49.00",
  },
];

const HotelSearchResults = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    showWith: [],
    reviewScore: [],
    location: [],
    language: [],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = [...prevFilters[filterType]];
      if (updatedFilter.includes(value)) {
        return {
          ...prevFilters,
          [filterType]: updatedFilter.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevFilters,
          [filterType]: [...updatedFilter, value],
        };
      }
    });
  };

  return (
    <>
      <Head>
        <title>Hotels - Search Result</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HotelBanner />
        <BannerForm />
        <Container className="mt-5 d-flex flex-column align-items-end">
          <Row>
            <Col md={3}>
              <h5>Filter by</h5>
              <Form>
                <h6>Category</h6>
                {[
                  "Tours",
                  "Museums, arts & culture",
                  "Afternoon",
                  "Entertainment & tickets",
                  "Food & drinks",
                  "Nature & outdoor",
                  "Travel services & rentals",
                  "Workshops & classes",
                ].map((category, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={category}
                    onChange={() => handleFilterChange("category", category)}
                  />
                ))}

                <h6>Price</h6>
                {[
                  "US$0 - US$22",
                  "US$22 - US$44",
                  "US$44 - US$88",
                  "US$88 - US$176",
                  "US$176+",
                ].map((price, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={price}
                    onChange={() => handleFilterChange("price", price)}
                  />
                ))}

                <h6>Show results with</h6>
                {["Free cancellation", "Skip the line", "Arabic"].map(
                  (option, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={option}
                      onChange={() => handleFilterChange("showWith", option)}
                    />
                  )
                )}

                <h6>Review score</h6>
                {["4.5 & up", "4.0 & up", "3.0 & up"].map((score, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={score}
                    onChange={() => handleFilterChange("reviewScore", score)}
                  />
                ))}

                <h6>Location</h6>
                {["Dubai", "Abu Dhabi", "Sharjah"].map((location, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={location}
                    onChange={() => handleFilterChange("location", location)}
                  />
                ))}

                <h6>Language</h6>
                {["English", "Arabic"].map((language, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={language}
                    onChange={() => handleFilterChange("language", language)}
                  />
                ))}
              </Form>
            </Col>
            <Col md={9}>
              <h5>Hotels in Dubai</h5>
              <div className="my-3">
                <Button variant="outline-primary" className="me-2">
                  Our top picks
                </Button>
                <Button variant="outline-primary" className="me-2">
                  Most popular
                </Button>
                <Button variant="outline-primary" className="me-2">
                  Lowest price
                </Button>
                <Button variant="outline-primary">Best reviewed</Button>
              </div>
              {searchResults.map((result, index) => (
                <Card key={index} className="mb-4">
                  <Row noGutters>
                    <Col md={3}>
                      <Image
                        src={result.image}
                        alt={result.title}
                        className="object-fit-cover"
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title className="fs-4 text-primary">
                          {result.title}
                        </Card.Title>
                        <Card.Text>{result.description}</Card.Text>
                        <Card.Text className="text-success fs-6 d-flex flex-row align-align-items-center">
                          <FaRegCreditCard className="me-1" />
                          {result.cancellation}
                        </Card.Text>
                        <div className="d-flex flex-row justify-content-between my-3">
                          <Card.Text className="fs-5 fw-bold">
                            {result.price}
                          </Card.Text>
                          <Button variant="outline-primary">
                            See availability
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default HotelSearchResults;
