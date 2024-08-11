import React, { useEffect, useState } from "react";

const FlightResults = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const storedFlights = localStorage.getItem("flightResults");
    if (storedFlights) {
      setFlights(JSON.parse(storedFlights));
    }
  }, []);

  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            {flight.Segments.map((segment) => (
              <div key={segment.Airline.AirlineCode + segment.FlightNumber}>
                <p>
                  {segment.Airline.AirlineName} - {segment.FlightNumber}
                </p>
                <p>
                  From: {segment.Origin.AirportName} To:{" "}
                  {segment.Destination.AirportName}
                </p>
                <p>
                  Departure: {segment.DepTime} Arrival: {segment.ArrTime}
                </p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightResults;
