import Image from "next/image";
import React from "react";
import { useFlightContext } from "../../context/FlightDataContext";
import { getDifferenceInHoursAndMinutes } from "../../utils";
import getSymbolFromCurrency from "currency-symbol-map";

const TripSummary = () => {
  const { selectedFlight, flightInfo } = useFlightContext();

  let hasReturn = (selectedFlight?.Segments || []).length > 0;
  let returnSegment = hasReturn
    ? selectedFlight?.Segments?.[1] || []
    : selectedFlight?.Segments?.[0] || [];

  return (
    <div className="passn-dtl-sidbar">
      <h6>Your trip summary</h6>
      <div className="trip-sum-dtl">
        <h6>Outbound flight</h6>

        {(selectedFlight?.Segments?.[0] || []).map((segment, idx) => (
          <div key={idx} className="flex-div">
            <div className="trip-dv-1">
              <span>
                {new Date(segment?.Origin?.DepTime).toLocaleDateString()}
              </span>
              <p>{new Date(segment?.Origin?.DepTime).toLocaleTimeString()}</p>
              <p>{segment?.Origin?.Airport?.CityCode}</p>
            </div>
            <div className="trip-sum-img">
              <p>
                {
                  getDifferenceInHoursAndMinutes(
                    segment?.Origin?.DepTime,
                    segment?.Destination?.ArrTime
                  ).hours
                }
                :
                {
                  getDifferenceInHoursAndMinutes(
                    segment?.Origin?.DepTime,
                    segment?.Destination?.ArrTime
                  ).minutes
                }
              </p>
              <Image
                width={160}
                height={13}
                src="/images/trip-sum-img.png"
                alt="img"
              />
            </div>

            <div className="trip-dv-1">
              <span>
                {new Date(segment?.Destination?.ArrTime).toLocaleDateString()}
              </span>
              <p>
                {new Date(segment?.Destination?.ArrTime).toLocaleTimeString()}
              </p>
              <p>{segment?.Destination?.Airport?.CityCode}</p>
            </div>
          </div>
        ))}
      </div>

      {flightInfo?.tripType !== "one-way" && (
        <div className="trip-sum-dtl">
          <h6>Outbound flight</h6>

          {returnSegment.map((segment, idx) => (
            <div key={idx} className="flex-div">
              <div className="trip-dv-1">
                <span>
                  {new Date(
                    segment?.[!hasReturn ? "Destination" : "Origin"]?.[
                      !hasReturn ? "ArrTime" : "DepTime"
                    ]
                  ).toLocaleDateString()}
                </span>
                <p>
                  {new Date(
                    segment?.[!hasReturn ? "Destination" : "Origin"]?.[
                      !hasReturn ? "ArrTime" : "DepTime"
                    ]
                  ).toLocaleTimeString()}
                </p>
                <p>
                  {
                    segment?.[!hasReturn ? "Destination" : "Origin"]?.Airport
                      ?.CityCode
                  }
                </p>
              </div>
              <div className="trip-sum-img">
                <p>
                  {
                    getDifferenceInHoursAndMinutes(
                      segment?.Origin?.DepTime,
                      segment?.Destination?.ArrTime
                    ).hours
                  }
                  :
                  {
                    getDifferenceInHoursAndMinutes(
                      segment?.Origin?.DepTime,
                      segment?.Destination?.ArrTime
                    ).minutes
                  }
                </p>
                <Image
                  width={160}
                  height={13}
                  src="/images/trip-sum-img.png"
                  alt="img"
                />
              </div>

              <div className="trip-dv-1">
                <span>
                  {new Date(
                    segment?.[hasReturn ? "Destination" : "Origin"]?.[
                      hasReturn ? "ArrTime" : "DepTime"
                    ]
                  ).toLocaleDateString()}
                </span>
                <p>
                  {new Date(
                    segment?.[hasReturn ? "Destination" : "Origin"]?.[
                      hasReturn ? "ArrTime" : "DepTime"
                    ]
                  ).toLocaleTimeString()}
                </p>
                <p>
                  {
                    segment?.[hasReturn ? "Destination" : "Origin"]?.Airport
                      ?.CityCode
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="trip-sum-price">
        <h6>
          <span className="prc-ttl">Total trip price:</span>{" "}
          <span className="prc">
            {getSymbolFromCurrency(selectedFlight?.Fare?.Currency)}
            {flightInfo?.tripType !== "one-way"
              ? selectedFlight?.Fare?.BaseFare
                ? selectedFlight?.Fare?.BaseFare * 2
                : 0
              : selectedFlight?.Fare?.BaseFare}
          </span>
        </h6>
      </div>
    </div>
  );
};

export default TripSummary;
