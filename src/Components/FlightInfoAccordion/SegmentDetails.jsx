import Image from "next/image";
import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { IoMdCheckmark } from "react-icons/io";
import getSymbolFromCurrency from "currency-symbol-map";
import { getDifferenceInHoursAndMinutes, getLocalItem } from "../../utils";

const SegmentDetails = ({
  segment,
  isReturn,
  flightInfo,
  idx,
  SegmentSeats,
  handleSeatsUpdate,
  continueState,
}) => {
  let availableSeats = SegmentSeats?.filter((s) => s.AvailablityType === 1).map(
    (d) => ({ ...d, isBusiness: Number(d.RowNo) < 16 })
  );
  let mainGuest = getLocalItem("main-guest", {});
  let childGuests = getLocalItem("children-guests", {});
  let adultGuests = getLocalItem("adult-guests", {});

  let subtotal = Object.values(childGuests).reduce((acc, _, idx) => {
    acc += availableSeats[Object.values(adultGuests).length + 1 + idx].Price;
    return acc;
  }, availableSeats[0]?.Price);

  let total = Object.values(adultGuests).reduce((acc, _, idx) => {
    acc += availableSeats[1 + idx].Price;
    return acc;
  }, subtotal);

  const groupedRows = Object.groupBy(SegmentSeats, ({ RowNo }) => RowNo);

  useEffect(() => {
    function handleReduce(acc, cur, id) {
      if (!acc[id]) {
        acc[id] = {};
      }

      acc[id] = cur;

      return acc;
    }
    if (continueState) {
      handleSeatsUpdate({
        total,
        mainGuest: {
          ...mainGuest,
          [`seat${idx}`]: availableSeats[0],
        },
        adultGuests: Object.values(adultGuests)
          .map((k, _) => ({
            ...k,
            [`seat${idx}`]: availableSeats[_ + 1],
          }))
          .reduce(handleReduce, {}),
        childGuests: Object.values(childGuests)
          .map((k, _) => ({
            ...k,
            [`seat${idx}`]:
              availableSeats[_ + Object.values(adultGuests).length + 1],
          }))
          .reduce(handleReduce, {}),
      });
    }
  }, [continueState]);

  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>
        <div>
          <h6>
            {
              (isReturn ? segment?.Destination : segment?.Origin)?.Airport
                ?.CityCode
            }{" "}
            -{" "}
            {
              (!isReturn ? segment?.Destination : segment?.Origin)?.Airport
                ?.CityCode
            }
          </h6>
          <div>
            <span>Flight duration</span>
            <span>
              {
                getDifferenceInHoursAndMinutes(
                  segment?.Origin?.DepTime,
                  segment?.Destination?.ArrTime
                ).hours
              }
              hrs{" "}
              {
                getDifferenceInHoursAndMinutes(
                  segment?.Origin?.DepTime,
                  segment?.Destination?.ArrTime
                ).minutes
              }
              minutes
            </span>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="flight_acordian-inn">
          <div className="flight_acordian-lft">
            <ul className="seat-ul-num">
              <li>
                <div className="seat-numb">{availableSeats[0]?.Code}</div>
                <div>
                  <h6>{mainGuest?.firstName}</h6>
                  <ul>
                    <li>
                      <IoMdCheckmark /> <span>Selected</span>
                    </li>
                    <li>
                      <span>
                        {getSymbolFromCurrency(availableSeats[0]?.Currency)}
                        {availableSeats[0]?.Price}
                      </span>
                    </li>
                  </ul>
                </div>
              </li>

              {Object.values(adultGuests).map((k, id) => (
                <li key={id}>
                  <div className="seat-numb">
                    {availableSeats[id + 1]?.Code}
                  </div>
                  <div>
                    <h6>{k?.firstName}</h6>
                    <ul>
                      <li>
                        <IoMdCheckmark /> <span>Selected</span>
                      </li>
                      <li>
                        <span>
                          {getSymbolFromCurrency(
                            availableSeats[id + 1]?.Currency
                          )}
                          {availableSeats[id + 1]?.Price}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}

              {Object.values(childGuests).map((k, id) => (
                <li key={id}>
                  <div className="seat-numb">
                    {
                      availableSeats[Object.values(adultGuests).length + 1 + id]
                        ?.Code
                    }
                  </div>
                  <div>
                    <h6>{k?.firstName}</h6>
                    <ul>
                      <li>
                        <IoMdCheckmark /> <span>Selected</span>
                      </li>
                      <li>
                        <span>
                          {getSymbolFromCurrency(
                            availableSeats[
                              Object.values(adultGuests).length + 1 + id
                            ]?.Currency
                          )}
                          {
                            availableSeats[
                              Object.values(adultGuests).length + 1 + id
                            ]?.Price
                          }
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="seat-ul-ttl">
              <li>
                <p>Sub total</p>
              </li>
              <li>
                <p>
                  {getSymbolFromCurrency(availableSeats[0]?.Currency)}
                  {total}
                </p>
              </li>
            </ul>
          </div>
          <div className="flight_acordian-cntr">
            <ul className="seats-ul">
              <li>
                <div>
                  <Image
                    src={"/images/seat-1.png"}
                    width={44}
                    height={44}
                    alt="img"
                  />
                </div>
                <div>
                  <p>Extra legroom</p>
                  <span>18452.0 PKR</span>
                </div>
              </li>
              <li>
                <div>
                  <Image
                    src={"/images/seat-2.png"}
                    width={44}
                    height={44}
                    alt="img"
                  />
                </div>
                <div>
                  <p>Extra Preferred</p>
                  <span>18452.0 PKR</span>
                </div>
              </li>
              <li>
                <div>
                  <Image
                    src={"/images/seat-3.png"}
                    width={44}
                    height={44}
                    alt="img"
                  />
                </div>
                <div>
                  <p>Standard</p>
                </div>
              </li>
              <li>
                <div>
                  <Image
                    src={"/images/seat-4.png"}
                    width={44}
                    height={44}
                    alt="img"
                  />
                </div>
                <div>
                  <p>Occupied</p>
                </div>
              </li>
            </ul>

            <div className="seat-center-mn">
              <ul className="seat-numbers">
                {Object.keys(groupedRows)
                  .slice(
                    flightInfo?.flightMode === "Economy" ? 16 : 1,
                    flightInfo?.flightMode === "Economy" ? 30 : 16
                  )
                  .map((_) => (
                    <li key={_}>
                      <p>{_}</p>
                    </li>
                  ))}
              </ul>
              <div>
                <ul className="seat-alpha">
                  {Object.values(groupedRows)
                    .slice(
                      flightInfo?.flightMode === "Economy" ? 16 : 1,
                      flightInfo?.flightMode === "Economy" ? 30 : 16
                    )[0]
                    .map((_) => (
                      <li key={_}>
                        <p>{_.SeatNo}</p>
                      </li>
                    ))}
                </ul>
                <ul
                  className="seat-alpha"
                  style={{
                    display: "grid",
                    gridTemplateRows: `repeat(15, 1fr)`,
                    gridTemplateColumns: `repeat(${
                      Object.values(groupedRows).slice(
                        flightInfo?.flightMode === "Economy" ? 16 : 1,
                        flightInfo?.flightMode === "Economy" ? 30 : 16
                      )[0].length
                    }, 1fr)`,
                  }}
                >
                  {Object.values(groupedRows)
                    .slice(
                      flightInfo?.flightMode === "Economy" ? 16 : 1,
                      flightInfo?.flightMode === "Economy" ? 30 : 16
                    )
                    .flat()
                    .map((v, idx) => {
                      return (
                        <li key={idx}>
                          <Image
                            src={
                              v.AvailablityType === 0
                                ? "/images/seat-2.png"
                                : v.AvailablityType === 1
                                ? "/images/seat-1.png"
                                : v.AvailablityType === 4
                                ? "/images/seat-3.png"
                                : "/images/seat-4.png"
                            }
                            width={40}
                            height={40}
                            alt="img"
                          />
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="flight_acordian-rgt">
            <h6>{flightInfo?.flightMode}</h6>
            <Image
              src={"/images/plane-img.png"}
              width={100}
              height={100}
              alt="planeImage"
            />
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default SegmentDetails;
