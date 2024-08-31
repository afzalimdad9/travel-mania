import Image from "next/image";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaRegCreditCard } from "react-icons/fa";
import { useRouter } from "next/router";
import { calculateNights, htmlToText } from "../../utils";
import getSymbolFromCurrency from "currency-symbol-map";

const HotelCard = ({
  Images,
  HotelName,
  Address,
  Description,
  HotelFacilities,
  HotelCode,
  HotelRating,
  Currency,
  Rooms,
  onClickAdd,
}) => {
  const router = useRouter();
  const { adults, children, checkin, checkout } = router.query;

  return (
    <Card className="mb-4 border-0 shadow-sm rounded-3">
      <Row className="g-0 w-100">
        <Col md={3}>
          <Image
            src={Images[0]}
            alt={HotelName}
            style={{ width: "100%", height: "100%" }}
            width={1000}
            height={1000}
          />
        </Col>
        <Col md={9}>
          <Card.Body className="d-flex flex-column justify-content-between">
            <div>
              <Card.Text className="text-muted mb-1">{Address}</Card.Text>
              <Card.Title
                className="text-primary h5"
                role="button"
                onClick={onClickAdd}
              >
                {HotelName}
              </Card.Title>
              <Card.Text className="fw-bold mb-2">
                {htmlToText(Description)?.slice(0, 100)}
              </Card.Text>
              <ul className="list-unstyled mb-2">
                {HotelFacilities.slice(0, 2).map((feature, idx) => (
                  <li key={idx} className="text-success small mb-1">
                    <FaRegCreditCard className="me-1" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Card.Text className="text-muted small mb-2">
                {checkin
                  ? `${calculateNights(
                      checkin,
                      checkout
                    )} nights, ${adults} Adults, ${children} Children`
                  : ""}
              </Card.Text>
            </div>
            <div className="d-flex align-items-center justify-content-between w-100 mt-3">
              <div className="d-flex">
                <Card.Text>From</Card.Text>
                <Card.Text className="mb-0 px-2 text-danger text-decoration-line-through">
                  {getSymbolFromCurrency(Currency)}
                  {Math.max(
                    ...Rooms.map((t) => t.TotalFare + t.TotalTax)
                  ).toFixed(4)}
                </Card.Text>
                <Card.Text className="h4 mb-0 text-primary">
                  {getSymbolFromCurrency(Currency)}
                  {Math.max(...Rooms.map((t) => t.TotalFare)).toFixed(4)}
                </Card.Text>
              </div>
              <Button onClick={onClickAdd} variant="outline-primary">
                See availability &gt;
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
      <div className="position-absolute top-0 end-0 mt-3 me-3 text-end">
        <div className="align-self-end">
          <span className="badge bg-warning text-dark fs-6">{HotelRating}</span>
        </div>
        <div className="small text-muted">Rating</div>
      </div>
    </Card>
  );
};

export default HotelCard;
