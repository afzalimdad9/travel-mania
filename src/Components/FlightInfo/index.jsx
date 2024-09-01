import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import FlightLogo from "../../../public/images/flight-logo.png"; // Using next/image for optimized images
import { useRouter } from "next/router";
import getSymbolFromCurrency from "currency-symbol-map";
import { authenticate } from "../../pages/api/flight";
import axios from "axios";
import { getDifferenceInHoursAndMinutes, getLocalItem } from "../../utils";
import { useFlightContext } from "../../context/FlightDataContext";

const FlightCard = (props) => {
  const router = useRouter();
  const { tripType } = router.query;
  const { setSelectedFlight } = useFlightContext();

  async function selectedFlight(e) {
    e.preventDefault();
    try {
      const authResponse = await authenticate();

      if (!authResponse) {
        toast.error("Authentication failed. Cannot proceed with the search.");
        return;
      }

      const { tokenId: TokenId } = authResponse;

      const TraceId = await getLocalItem("TraceId", "");

      const FareRules = await axios
        .post("/api/fare-rule", {
          EndUserIp: "192.168.10.10",
          TokenId,
          TraceId,
          ResultIndex: props.ResultIndex,
        })
        .then((res) => res.data.Response.FareRules);

      const FareQuote = await axios
        .post("/api/fare-quote", {
          EndUserIp: "192.168.10.10",
          TokenId,
          TraceId,
          ResultIndex: props.ResultIndex,
        })
        .then((res) => res.data.Response.Results);

      setSelectedFlight({ ...props, FareRules, FareQuote });
      localStorage.setItem(
        "selectedFlight",
        JSON.stringify({ ...props, FareRules, FareQuote })
      );

      router.push({
        pathname: "/passengerdetails",
        query: router.query,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container
      fluid
      className="p-4 container my-5"
      style={{ backgroundColor: "#EAF1FC", borderRadius: "10px" }}
    >
      <Row className="align-items-center">
        {/* Airline Info */}
        <Col md={8}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Image src={FlightLogo} alt="Emirates" width={50} height={50} />
            </Col>
            <Col>
              <h6 className="mb-0">
                Fly to{" "}
                {props?.Segments?.[0]?.[0]?.Destination?.Airport?.CityName} with{" "}
                {props?.Segments?.[0]?.[0]?.Airline?.AirlineName}
              </h6>
            </Col>
          </Row>
          <hr />
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">
                {props?.Segments?.[0]?.[0]?.Origin?.DepTime?.split("T")?.[1]}
              </h5>
              <p className="text-primary">
                {props?.Segments?.[0]?.[0]?.Origin?.Airport?.CountryName}
              </p>
            </Col>
            <Col xs="auto" className="text-center">
              <span>
                {
                  getDifferenceInHoursAndMinutes(
                    props?.Segments?.[0]?.[0]?.Origin?.DepTime,
                    props?.Segments?.[0]?.[0]?.Destination?.ArrTime
                  ).hours
                }
                hr{" "}
                {
                  getDifferenceInHoursAndMinutes(
                    props?.Segments?.[0]?.[0]?.Origin?.DepTime,
                    props?.Segments?.[0]?.[0]?.Destination?.ArrTime
                  ).minutes
                }
                m
              </span>
              <hr style={{ border: "1px solid #6c757d", width: "100%" }} />
              <i className="bi bi-airplane" style={{ fontSize: "20px" }}></i>
            </Col>
            <Col>
              <h5 className="mb-0">
                {
                  props?.Segments?.[0]?.[0]?.Destination?.ArrTime?.split(
                    "T"
                  )?.[1]
                }
              </h5>
              <p className="text-primary">
                {props?.Segments?.[0]?.[0]?.Destination?.Airport?.CountryName}
              </p>
            </Col>
          </Row>
          <hr />
          {tripType !== "one-way" && (
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0">
                  {props?.Segments?.[0]?.[1]?.Origin?.DepTime?.split("T")?.[1]}
                </h5>
                <p className="text-primary">
                  {props?.Segments?.[0]?.[1]?.Origin?.Airport?.CountryName}
                </p>
              </Col>
              <Col xs="auto" className="text-center">
                <span>
                  {
                    getDifferenceInHoursAndMinutes(
                      props?.Segments?.[0]?.[1]?.Origin?.DepTime,
                      props?.Segments?.[0]?.[1]?.Destination?.ArrTime
                    ).hours
                  }
                  hr{" "}
                  {
                    getDifferenceInHoursAndMinutes(
                      props?.Segments?.[0]?.[1]?.Origin?.DepTime,
                      props?.Segments?.[0]?.[1]?.Destination?.ArrTime
                    ).minutes
                  }{" "}
                  minutes
                </span>
                <hr style={{ border: "1px solid #6c757d", width: "100%" }} />
                <i className="bi bi-airplane" style={{ fontSize: "20px" }}></i>
              </Col>
              <Col>
                <h5 className="mb-0">
                  {
                    props?.Segments?.[0]?.[1]?.Destination?.ArrTime?.split(
                      "T"
                    )?.[1]
                  }
                </h5>
                <p className="text-primary">
                  {props?.Segments?.[0]?.[1]?.Destination?.Airport?.CountryName}
                </p>
              </Col>
            </Row>
          )}
        </Col>

        {/* Price and Book Button */}
        <Col md={4} className="text-center">
          <h4 className="mb-4">
            {getSymbolFromCurrency(props?.Fare?.Currency)}
            {props?.Fare?.BaseFare}
          </h4>
          <Button variant="primary" onClick={selectedFlight} size="lg">
            Book Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FlightCard;
