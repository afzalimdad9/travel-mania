import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { calculateNights } from "../../utils";
import { useHotelContext } from "../../context/HotelDataContext";

const HotelRoomsViewer = ({ rooms }) => {
  const {
    query: { adults, children },
  } = useRouter();
  const { hotelData, setSelectedRoom, setFormData } = useHotelContext();
  const router = useRouter();

  return (
    <Container>
      {Object.entries(rooms).map(([key, value], idx) => (
        <Row className="my-5" key={idx}>
          <Col xs={6} className="room_card">
            <Row>
              <Image
                src={hotelData?.Images[0]}
                alt=""
                width={140}
                height={120}
                style={{
                  width: "140px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <Col>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "underline",
                  }}
                >
                  {key}
                </h3>
                <h6>
                  {adults} Adults, {children} Childrens
                </h6>
                {value
                  .map((r) => r.RoomPromotion.join(","))
                  .map((r, id) => (
                    <h6 key={id}>{r}</h6>
                  ))}

                <button className="mt-2">See Room Details &gt;</button>
              </Col>
            </Row>
          </Col>
          <Col xs={6} className="room_card">
            {value.map((v, id) => (
              <Row key={id}>
                <BookingOptions
                  selectedRoom={() => {
                    setSelectedRoom(v);
                    localStorage.setItem("selectedRoom", JSON.stringify(v));
                    localStorage.setItem(
                      "guest-details",
                      JSON.stringify(router.query)
                    );
                    setFormData(router.query);
                    router.push("/guestdetails");
                  }}
                  room={v}
                />
              </Row>
            ))}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default HotelRoomsViewer;

function BookingOptions({ room, selectedRoom }) {
  const {
    query: { checkin, checkout },
  } = useRouter();
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <Row className="card-body">
              <Col>
                <div className="d-flex align-items-center mb-3">
                  <i
                    className="fas fa-utensils"
                    style={{ color: "#009688" }}
                  ></i>
                  <span className="ml-2">Breakfast included</span>
                  <i
                    className="fas fa-info-circle ml-2"
                    style={{ color: "#009688" }}
                  ></i>
                </div>
                <div className="form-check mb-3">
                  <label className="form-check-label" htmlFor="payNow">
                    Pay now
                  </label>
                </div>
                <div className="mb-3">
                  <span className="font-weight-bold">
                    {room?.IsRefundable ? "Refundable" : "Non-refundable"}
                  </span>
                </div>
                {room?.IsRefundable && (
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="protectBooking"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="protectBooking"
                    >
                      Protect my booking with Refund
                      <span className="ml-3"> + £22 </span>
                    </label>
                  </div>
                )}
              </Col>
              <Col className="text-end">
                <div className=" mb-3"> -40% TODAY </div>
                <div className="h3 mb-3 text-decoration-line-through">
                  {" "}
                  ${(room?.TotalFare + room?.TotalTax).toFixed(0)}{" "}
                  <span className="text-success">
                    {" "}
                    ${(room?.TotalFare).toFixed(0)}{" "}
                  </span>{" "}
                </div>
                <p className="mb-3">
                  {" "}
                  ${room?.DayRates?.[0]?.[0]?.BasePrice?.toFixed(0)} per night (
                  {calculateNights(checkin, checkout)} nights){" "}
                </p>
                <p className="mb-3"> VAT included </p>
                <button
                  onClick={selectedRoom}
                  className="btn btn-primary btn-block"
                >
                  Book
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
