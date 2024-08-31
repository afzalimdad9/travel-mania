import Head from "next/head";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import BannerForm from "../Components/BannerForm/HotelBookingForm";
import HotelBanner from "../Components/HotelBanner/index";
import HotelCard from "../Components/HotelCard";
import Layout from "../layout/index";

import { getCountry } from "iso-3166-1-alpha-2";
import { useRouter } from "next/router";
import { useHotelContext } from "../context/HotelDataContext";

const HotelSearchResults = () => {
  const router = useRouter();
  const { stayplace } = router.query;
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    showWith: [],
    reviewScore: [],
    location: [],
    language: [],
  });
  const { setHotelData, categories, city, hotels } = useHotelContext();

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

  const [sortedId, setSortedId] = useState(0);

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
        <Container className="mt-5 d-flex flex-column align-items-stretch">
          <Row>
            <Col md={3}>
              <h5>Filter by</h5>
              <Form>
                <h6>Category</h6>
                {categories.slice(0, 10).map((category, index) => (
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

                {/* <h6>Show results with</h6>
                {["Free cancellation", "Skip the line", "Arabic"].map(
                  (option, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={option}
                      onChange={() => handleFilterChange("showWith", option)}
                    />
                  )
                )} */}

                <h6>Review score</h6>
                {["4.5 & up", "4.0 & up", "3.0 & up"].map((score, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={score}
                    onChange={() => handleFilterChange("reviewScore", index)}
                  />
                ))}

                <h6>Location</h6>
                {city.map((location, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={location.Name}
                    onChange={() =>
                      handleFilterChange("location", location.Code)
                    }
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
              <h5>Hotels in {getCountry(stayplace || "IN")}</h5>
              <div className="my-3">
                {[
                  "Our top picks",
                  "Most popular",
                  "Lowest price",
                  "Highest price",
                ].map((k, idx) => (
                  <Button
                    active={sortedId === idx}
                    variant="outline-primary"
                    className="me-2"
                    key={idx}
                    onClick={() => setSortedId(idx)}
                  >
                    {k}
                  </Button>
                ))}
              </div>
              {hotels
                .filter(
                  (s) =>
                    (filters.category.length > 0
                      ? filters.category.some((d) =>
                          s.HotelFacilities.includes(d)
                        )
                      : true) &&
                    (filters.location.length > 0
                      ? filters.location.some((d) => s.CityId === d)
                      : true)
                )
                .sort((a, b) => {
                  switch (sortedId) {
                    case 2:
                      return (
                        Math.min(
                          ...a.Rooms.map((t) => t.TotalFare + t.TotalTax)
                        ).toFixed(0) -
                        Math.min(
                          ...b.Rooms.map((t) => t.TotalFare + t.TotalTax)
                        ).toFixed(0)
                      );

                    case 3:
                      return (
                        Math.min(
                          ...b.Rooms.map((t) => t.TotalFare + t.TotalTax)
                        ).toFixed(0) -
                        Math.min(
                          ...a.Rooms.map((t) => t.TotalFare + t.TotalTax)
                        ).toFixed(0)
                      );

                    default:
                      return b.HotelRating - a.HotelRating;
                  }
                })
                .map((result, index) => (
                  <HotelCard
                    onClickAdd={() => {
                      setHotelData({
                        ...result,
                        notIncluded: categories.filter(
                          (s) => !result.HotelFacilities.includes(s)
                        ),
                      });
                      router.push({
                        pathname: "/hotel-details",
                        query: {
                          ...router.query,
                          hotelId: result?.HotelCode,
                        },
                      });
                    }}
                    key={index}
                    {...result}
                  />
                ))}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default HotelSearchResults;
