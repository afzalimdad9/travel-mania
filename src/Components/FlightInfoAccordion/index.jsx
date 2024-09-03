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

  let hasReturn = selectedFlight?.Segments?.length > 1;
  let segments =
    (isReturn
      ? !hasReturn
        ? selectedFlight?.Segments?.[0]?.reverse()
        : selectedFlight?.Segments?.[1]
      : selectedFlight?.Segments?.[0]) || [];

  let firstSegment = segments?.[0];
  let lastSegment = segments?.[segments?.length - 1];

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
              firstSegment?.[!isReturn || hasReturn ? "Origin" : "Destination"]
                ?.Airport?.CityName
            }{" "}
            ({isReturn ? flightInfo?.to : flightInfo?.from}) -
            {
              lastSegment?.[!isReturn || hasReturn ? "Destination" : "Origin"]
                ?.Airport?.CityName
            }{" "}
            ({!isReturn ? flightInfo?.to : flightInfo?.from})
          </p>
        </div>
      </div>

      <Accordion defaultActiveKey="0">
        {segments?.map((segment, idx) => (
          <SegmentDetails
            key={idx}
            continueState={continueState}
            handleSeatsUpdate={updateData}
            idx={idx + (isReturn ? segments.length : 0)}
            SegmentSeats={selectedFlight?.SSR?.SeatDynamic?.[0]?.SegmentSeat?.[
              idx
            ]?.RowSeats?.map((s) => s.Seats)?.flat()}
            hasReturn={hasReturn}
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
