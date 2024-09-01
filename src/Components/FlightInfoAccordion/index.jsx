import Image from "next/image";
import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { useFlightContext } from "../../context/FlightDataContext";
import SegmentDetails from "./SegmentDetails";

const FlightInfoAccordion = () => {
  const { selectedFlight, flightInfo } = useFlightContext();
  const [continueState, setContinueState] = useState(false);

  async function updateData(data) {
    const { total, mainGuest, childGuests, adultGuests } = data;

    localStorage.setItem("totalAmount", total);
    localStorage.setItem("main-guest", JSON.stringify(mainGuest));
    localStorage.setItem("children-guests", JSON.stringify(childGuests));
    localStorage.setItem("adult-guests", JSON.stringify(adultGuests));

    setContinueState(false);
  }

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
            {new Date(
              selectedFlight?.Segments?.[0]?.[0]?.Origin?.DepTime
            ).toLocaleDateString()}
          </span>
          <p>
            {selectedFlight?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName} (
            {selectedFlight?.Segments?.[0]?.[0]?.Origin?.Airport?.CityCode}) -{" "}
            {
              selectedFlight?.Segments?.[0]?.[
                selectedFlight?.Segments?.[0]?.length - 1
              ]?.Destination?.Airport?.CityName
            }{" "}
            (
            {
              selectedFlight?.Segments?.[0]?.[
                selectedFlight?.Segments?.[0]?.length - 1
              ]?.Destination?.Airport?.CityCode
            }
            )
          </p>
        </div>
      </div>

      <Accordion defaultActiveKey="0">
        {(selectedFlight?.Segments?.[0] || [])?.map((segment, idx) => (
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
          />
        ))}
      </Accordion>
      <Button
        onClick={() => setContinueState((pre) => !pre)}
        className="btn10 right-0 mt-3"
      >
        Continue
      </Button>
    </div>
  );
};

export default FlightInfoAccordion;
