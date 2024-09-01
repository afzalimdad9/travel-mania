import Image from "next/image";
import React from "react";
import { Accordion } from "react-bootstrap";
import { useFlightContext } from "../../context/FlightDataContext";
import SegmentDetails from "./SegmentDetails";
import { useRouter } from "next/router";

const FlightInfoAccordion = ({ isReturn, continueState, setContinueState }) => {
  const { selectedFlight, flightInfo } = useFlightContext();
  const router = useRouter();

  async function updateData(data) {
    const { total, mainGuest, childGuests, adultGuests } = data;

    localStorage.setItem("totalAmount", total);
    localStorage.setItem("main-guest", JSON.stringify(mainGuest));
    localStorage.setItem("children-guests", JSON.stringify(childGuests));
    localStorage.setItem("adult-guests", JSON.stringify(adultGuests));

    setContinueState(false);

    router.push("/bagging");
  }

  let firstSegment = selectedFlight?.Segments?.[0]?.[0];
  let lastSegment =
    selectedFlight?.Segments?.[0]?.[selectedFlight?.Segments?.[0]?.length - 1];

  return (
    <div className="seat_select-innr-ardian">
      <div className="seat_select-innr-icn">
        <div>
          <Image
            src={"/images/seat-plane-icon.png"}
            width={90}
            height={90}
            alt="img"
          />
        </div>
        <div>
          <span>
            {new Date(firstSegment?.Origin?.DepTime).toLocaleDateString()}
          </span>
          <p>
            {
              (isReturn ? firstSegment?.Origin : lastSegment?.Destination)
                ?.Airport?.CityName
            }{" "}
            (
            {
              (isReturn ? firstSegment?.Origin : lastSegment?.Destination)
                ?.Airport?.CityCode
            }
            ) -{" "}
            {
              (!isReturn ? firstSegment?.Origin : lastSegment?.Destination)
                ?.Airport?.CityName
            }{" "}
            (
            {
              (!isReturn ? firstSegment?.Origin : lastSegment?.Destination)
                ?.Airport?.CityCode
            }
            )
          </p>
        </div>
      </div>

      <Accordion defaultActiveKey="0">
        {(isReturn
          ? (selectedFlight?.Segments?.[0] || []).reverse()
          : selectedFlight?.Segments?.[0] || []
        )?.map((segment, idx) => (
          <SegmentDetails
            key={idx}
            continueState={continueState}
            handleSeatsUpdate={updateData}
            idx={idx}
            SegmentSeats={selectedFlight?.SSR?.SeatDynamic?.[0]?.SegmentSeat?.[
              idx
            ]?.RowSeats?.map((s) => s.Seats)?.flat()}
            segment={segment}
            flightInfo={flightInfo}
            isReturn={isReturn}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default FlightInfoAccordion;
