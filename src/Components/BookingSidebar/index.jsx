import React from "react";
import { useHotelContext } from "../../context/HotelDataContext";
import { Col, Row } from "react-bootstrap";
import { calculateNights } from "../../utils";
import getSymbolFromCurrency from "currency-symbol-map";

const BookingSidebar = () => {
  const { hotelData, formData, selectedRoom } = useHotelContext();

  return (
    <div className="passn-dtl-sidbar">
      <div className="trip-sum-dtl">
        <h6>{hotelData?.HotelName}</h6>
        {new Array(hotelData?.HotelRating ? hotelData?.HotelRating : undefined)
          .fill("0")
          .map((_, idx) => (
            <svg
              key={idx}
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.90251 0.662507L8.2039 3.30768C8.27858 3.45705 8.42794 3.56354 8.60957 3.59534L11.5212 4.02222C11.9582 4.0863 12.1293 4.61967 11.8199 4.929L9.70765 6.98733C9.57996 7.10488 9.52648 7.28605 9.54769 7.45662L10.0493 10.3581C10.1239 10.7951 9.66524 11.1257 9.27017 10.9233L6.66787 9.54722C6.59102 9.50526 6.50487 9.48327 6.41732 9.48327C6.32976 9.48327 6.24361 9.50526 6.16677 9.54722L3.564 10.9233C3.16939 11.1261 2.71116 10.7951 2.78538 10.3581L3.28694 7.45662C3.30353 7.37059 3.29857 7.28179 3.27251 7.19814C3.24645 7.11448 3.2001 7.03858 3.13758 6.97719L1.02577 4.92854C0.705383 4.61921 0.887015 4.08584 1.32404 4.02176L4.23613 3.59488C4.4067 3.56307 4.55606 3.45659 4.6418 3.29662L5.94272 0.662046C6.1345 0.267436 6.70014 0.267436 6.90251 0.662046V0.662507Z"
                fill="#666666"
              />
            </svg>
          ))}
        <h6 style={{ fontSize: "14px" }} className="my-1">
          {hotelData?.Address}
        </h6>
        <Row className="mt-3 me-3">
          <Col md={1} className="align-self-end">
            <span className="badge bg-warning text-dark fs-6">
              {hotelData?.HotelRating}
            </span>
          </Col>
          <Col
            md={3}
            className="text-center align-items-center d-flex justify-content-center text-muted"
          >
            Rating
          </Col>
        </Row>
        <div
          style={{
            background: "black",
            height: "0.5px",
            padding: "1px",
          }}
          className="my-3 w-100"
        />
        <div className="flex-div">
          <div className="trip-dv-1">
            <p>
              {formData?.checkin} - {formData?.checkout}
            </p>
          </div>

          <div className="trip-dv-1">
            <span>
              {calculateNights(formData?.checkin, formData?.checkout)} Nights
            </span>
          </div>
        </div>

        <div
          style={{
            background: "black",
            height: "0.5px",
            padding: "1px",
          }}
          className="my-3 w-100"
        />

        <div className="flex-div mb-3">
          <div className="trip-dv-1">
            <h6>{selectedRoom?.Name?.[0]}</h6>
            <h6>
              Occupancy:{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5424 3.81008C10.5424 5.79589 8.98207 7.35618 6.99626 7.35618C5.01044 7.35618 3.45016 5.79589 3.45016 3.81008C3.45016 1.82426 5.01044 0.263977 6.99626 0.263977C8.98207 0.263977 10.5424 1.82426 10.5424 3.81008ZM9.12392 3.81008C9.12392 2.6044 8.20193 1.68242 6.99626 1.68242C5.79059 1.68242 4.8686 2.6044 4.8686 3.81008C4.8686 5.01575 5.79059 5.93774 6.99626 5.93774C8.20193 5.93774 9.12392 5.01575 9.12392 3.81008ZM0.613281 11.6115C0.613281 10.0512 1.88988 8.77461 3.45016 8.77461H10.5424C12.1026 8.77461 13.3792 10.0512 13.3792 11.6115V12.3207C13.3792 13.1009 12.7409 13.7392 11.9608 13.7392H2.03172C1.25158 13.7392 0.613281 13.1009 0.613281 12.3207V11.6115ZM2.03172 11.6115V12.3207H11.9608V11.6115C11.9608 10.8314 11.3225 10.1931 10.5424 10.1931H3.45016C2.67002 10.1931 2.03172 10.8314 2.03172 11.6115Z"
                  fill="#666666"
                />
              </svg>{" "}
              {formData?.adults} Adults, {formData?.children} Children
            </h6>
            <h6>{selectedRoom?.Inclusion}</h6>
            <h6>Pay Now</h6>
            <h6>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.82472 6.75322L12.3354 2.24258C12.6758 1.90216 12.6758 1.39152 12.3354 1.0511C11.9949 0.71067 11.4843 0.71067 11.1439 1.0511L6.63323 5.56173L2.12259 1.0511C1.78216 0.71067 1.27153 0.71067 0.9311 1.0511C0.590675 1.39152 0.590675 1.90216 0.9311 2.24258L5.44174 6.75322L0.9311 11.2639C0.590675 11.6043 0.590675 12.1149 0.9311 12.4554C1.10131 12.6256 1.27153 12.7107 1.52684 12.7107C1.78216 12.7107 1.95238 12.6256 2.12259 12.4554L6.63323 7.94471L11.1439 12.4554C11.3141 12.6256 11.5694 12.7107 11.7396 12.7107C11.9098 12.7107 12.1651 12.6256 12.3354 12.4554C12.6758 12.1149 12.6758 11.6043 12.3354 11.2639L7.82472 6.75322Z"
                  fill="#666666"
                />
              </svg>{" "}
              Non-refundable
            </h6>
          </div>
        </div>

        <div
          style={{
            background: "black",
            height: "0.5px",
            padding: "1px",
          }}
          className="my-3 w-100"
        />

        <h5 style={{ fontSize: 17 }} className="my-3">
          Price Details
        </h5>
        <div className="flex-div">
          <div className="trip-dv-1">
            <p>
              {calculateNights(formData?.checkin, formData?.checkout)} Nights
            </p>
            <p>
              {getSymbolFromCurrency(hotelData?.Currency)}
              {selectedRoom?.DayRates?.[0]?.[0]?.BasePrice} per night,
              including: <br />
              -41% off (
              <strong>
                {getSymbolFromCurrency(hotelData?.Currency)}
                {(
                  selectedRoom?.TotalFare -
                  selectedRoom?.TotalFare * 0.41
                ).toFixed(2)}
              </strong>
              )
            </p>
            <br />
            <p>Tax And Fees</p>
            <br />
            <p>
              Destination Fee <br /> Due at property
            </p>
          </div>

          <div className="trip-dv-1">
            <p>
              {getSymbolFromCurrency(hotelData?.Currency)}
              {selectedRoom?.TotalFare}
            </p>
            <br />
            <p>
              {getSymbolFromCurrency(hotelData?.Currency)}
              {selectedRoom?.TotalTax}
            </p>
            <br />
            <p>
              {getSymbolFromCurrency(hotelData?.Currency)}
              {(selectedRoom?.TotalFare * 0.193).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="trip-sum-price mt-0">
        <h6>
          <span className="prc-ttl">Total:</span>{" "}
          <span className="prc">
            {getSymbolFromCurrency(hotelData?.Currency)}
            {(
              selectedRoom?.TotalFare * 0.193 +
              selectedRoom?.TotalTax +
              selectedRoom?.TotalFare
            ).toFixed(2)}
          </span>
        </h6>
        <div
          style={{
            background: "black",
            height: "0.5px",
            padding: "1px",
          }}
          className="my-3 w-100"
        />
        <h6 className="my-3">
          <span className="prc-ttl">Now you pay:</span>{" "}
          <span className="prc">
            {getSymbolFromCurrency(hotelData?.Currency)}
            {(
              selectedRoom?.TotalFare * 0.193 +
              selectedRoom?.TotalTax +
              selectedRoom?.TotalFare -
              selectedRoom?.TotalFare * 0.193
            ).toFixed(2)}
          </span>
        </h6>
      </div>
    </div>
  );
};

export default BookingSidebar;
