import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import HotelFacilities from "../HotelFacilities";
import { useRouter } from "next/router";
import { getLocalItem } from "../../utils";
import BookingInfo from "./BookingInfo";
import FAQ from "./FAQ";
import HotelDetails from "./HotelDetails";

const BookingDetails = () => {
  const router = useRouter();
  const { bookingId } = router.query;
  const [booking, setBooking] = useState(
    getLocalItem("booking-result", []).find(
      (b) => b.BookingReferenceId === bookingId
    ) || {}
  );

  const getBooking = useCallback(() => {
    const allBookings = getLocalItem("booking-result", []);
    setBooking(allBookings.find((b) => b.BookingReferenceId === bookingId));
  }, [bookingId]);

  useEffect(() => {
    getBooking();
  }, [getBooking]);

  return (
    <>
      <HotelDetails hotelData={booking?.hotelData} />
      <HotelFacilities facilities={booking?.hotelData?.HotelFacilities || []} />
      <BookingInfo data={booking} />
      <Container>
        <Row className="mb-3">
          <Col md={6}>
            <h4>Location</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: booking?.hotelData?.Attractions
                  ? Object.values(booking?.hotelData?.Attractions)?.[0]
                  : "",
              }}
            ></p>
          </Col>
          <Col md={6}>
            <div className="w-100">
              <iframe
                width="100%"
                height="600"
                src={`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${booking?.hotelData?.Address}+(${booking?.hotelData?.HotelName})&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
              ></iframe>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <h4>Description of the accommodation</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: booking?.hotelData?.Description || "",
              }}
            ></p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h4>Checkin and important information</h4>
            <h6 className="mt-3">Check-In</h6>
            <p>
              Checkin time {booking?.hotelData?.CheckInTime} -{" "}
              {booking?.hotelData?.CheckOutTime} Minimum check-in age: 18
            </p>
            <h6 className="mt-3">Check-Out</h6>
            <p>Checkout time {booking?.hotelData?.CheckOutTime}</p>
          </Col>
        </Row>
        <FAQ hotelData={booking?.booking?.hotelData} />
        <Row>
          <Col md={6}>
            <h4 className="my-3">Looking for specific information?</h4>
            <h6 className="my-3">Search product info, FAQs, reviews</h6>
            <input
              type="text"
              placeholder="Type a keyword"
              className="w-50 py-3"
            />
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={3}>
            <h6>Want to Suggest something?</h6>
          </Col>
          <Col md={3}>
            <Button variant="outline-primary">Leave feedback</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingDetails;
