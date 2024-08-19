import React, { useEffect, useState } from "react";

const FlightResults = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const storedFlights = localStorage.getItem("flightResults");
    console.log("storedFlights", storedFlights);
    if (storedFlights) {
      setFlights(JSON.parse(storedFlights));
    } else {
      console.log("haha");
      return;
    }
  }, []);

  return (
    <div>
      <h2>Available Flights</h2>
      {flights.length > 0 ? (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              {flight.Segments.map((segmentArray, segIndex) => (
                <div key={segIndex}>
                  {segmentArray.map((segment, segDetailIndex) => (
                    <div
                      key={
                        segment.Airline.AirlineCode +
                        segment.FlightNumber +
                        segDetailIndex
                      }
                    >
                      <p>
                        {segment.Airline.AirlineName} - {segment.FlightNumber}
                      </p>
                      <p>
                        From: {segment.Origin.AirportName} To:{" "}
                        {segment.Destination.AirportName}
                      </p>
                      <p>
                        Departure: {segment.Origin.DepTime} Arrival:{" "}
                        {segment.Destination.ArrTime}
                      </p>
                      <p>
                        Baggage: {segment.Baggage} Cabin Baggage:{" "}
                        {segment.CabinBaggage}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights available.</p>
      )}
    </div>
  );
};

export default FlightResults;
