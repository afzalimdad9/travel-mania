import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
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
  hasReturn,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let availableSeats = SegmentSeats?.filter((s) => s.AvailablityType === 1).map(
    (d) => ({ ...d, isBusiness: Number(d.RowNo) < 16 })
  );
  let [mainGuest, setMainGuest] = useState(getLocalItem("main-guest", {}));
  let [childGuests, setChildGuests] = useState(
    getLocalItem("children-guests", {})
  );
  let [adultGuests, setAdultGuests] = useState(
    getLocalItem("adult-guests", {})
  );

  let subtotal = useMemo(() => {
    return Object.values(childGuests).reduce((acc, cur, idx) => {
      const price = cur?.[`seat${idx}`]?.Price || 0;
      acc += price;
      return acc;
    }, mainGuest?.[`seat${idx}`]?.Price || 0);
  }, [mainGuest, childGuests, idx]);

  let total = useMemo(
    () =>
      Object.values(adultGuests).reduce((acc, cur, idx) => {
        const price = cur?.[`seat${idx}`]?.Price || 0;
        acc += price;
        return acc;
      }, subtotal),
    [subtotal, adultGuests]
  );

  const groupedRows = Object.groupBy(SegmentSeats, ({ RowNo }) => RowNo);

  function handleReduce(acc, cur, id) {
    if (!acc[id]) {
      acc[id] = {};
    }

    acc[id] = cur;

    return acc;
  }

  const isBusiness = flightInfo?.flightMode !== "Economy";

  useEffect(() => {
    if (continueState) {
      handleSeatsUpdate({
        total,
        mainGuest,
        adultGuests,
        childGuests,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continueState]);

  useEffect(() => {
    if (
      (mainGuest && !mainGuest?.[`seat${idx}`]) ||
      Object.values(adultGuests).some((k) => !k?.[`seat${idx}`]) ||
      Object.values(childGuests).some((k) => !k?.[`seat${idx}`])
    ) {
      let availableOnlySeats = availableSeats?.filter(
        (s) => s?.isBusiness === isBusiness
      );

      setMainGuest((prev) => ({
        ...prev,
        [`seat${idx}`]: availableOnlySeats[0],
      }));

      setAdultGuests(
        Object.values(adultGuests)
          .map((k, _) => ({
            ...k,
            [`seat${idx}`]: availableOnlySeats[_ + 1],
          }))
          .reduce(handleReduce, {})
      );

      setChildGuests(
        Object.values(childGuests)
          .map((k, _) => ({
            ...k,
            [`seat${idx}`]:
              availableOnlySeats[_ + Object.values(adultGuests).length + 1],
          }))
          .reduce(handleReduce, {})
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainGuest, adultGuests, childGuests]);

  function selectSeat(seat) {
    if (isSeatTaken(seat?.Code) || seat.AvailablityType === 2) {
      return;
    }

    const isMainGuest = selectedIndex === 0;
    const isChild = selectedIndex >= Object.values(adultGuests).length + 1;

    if (isMainGuest) {
      setMainGuest((prev) => ({
        ...prev,
        [`seat${idx}`]: seat,
      }));
    } else if (isChild) {
      setChildGuests(
        Object.values(childGuests)
          .map((k, _) => ({
            ...k,
            [`seat${idx}`]:
              selectedIndex === _ + (Object.values(adultGuests).length + 1)
                ? seat
                : k[`seat${idx}`],
          }))
          .reduce(handleReduce, {})
      );
    } else {
      setAdultGuests(
        Object.values(adultGuests)
          .map((k, _) => ({
            ...k,
            [`seat${idx}`]:
              selectedIndex === _ + (Object.values(adultGuests).length + 1)
                ? seat
                : k[`seat${idx}`],
          }))
          .reduce(handleReduce, {})
      );
    }
  }

  function isSeatTaken(code) {
    const mainGuestHas = mainGuest?.[`seat${idx}`]?.Code === code;
    const adultGuestHas = Object.values(adultGuests).some(
      (k) => k?.[`seat${idx}`]?.Code === code
    );
    const childGuestHas = Object.values(childGuests).some(
      (k) => k?.[`seat${idx}`]?.Code === code
    );
    return mainGuestHas || childGuestHas || adultGuestHas;
  }

  const windowSeat = availableSeats?.filter(
    (s) => s.SeatType === 1 && s.isBusiness === isBusiness
  )[0];
  const aisleSeat = availableSeats
    ?.filter((s) => s.SeatType === 2 && s.isBusiness === isBusiness)
    ?.sort((a, b) => b?.Price - a?.Price)[0];

  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>
        <div>
          <h6>
            {
              (isReturn && !hasReturn ? segment?.Destination : segment?.Origin)
                ?.Airport?.CityCode
            }{" "}
            -{" "}
            {
              (isReturn && !hasReturn ? segment?.Origin : segment?.Destination)
                ?.Airport?.CityCode
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
              <li
                style={{
                  cursor: "pointer",
                  background: selectedIndex === 0 ? "green" : "transparent",
                  padding: "10px 5px",
                  borderRadius: "12px",
                }}
                onClick={() => setSelectedIndex(0)}
              >
                <div className="seat-numb">
                  {mainGuest?.[`seat${idx}`]?.Code}
                </div>
                <div>
                  <h6>{mainGuest?.firstName}</h6>
                  <ul>
                    <li
                      style={{
                        opacity: selectedIndex === 0 ? 1 : 0,
                        cursor: selectedIndex === 0 ? "text" : "default",
                      }}
                    >
                      <IoMdCheckmark /> <span>Selected</span>
                    </li>
                    <li>
                      <span>
                        {getSymbolFromCurrency(
                          mainGuest?.[`seat${idx}`]?.Currency
                        )}
                        {mainGuest?.[`seat${idx}`]?.Price}
                      </span>
                    </li>
                  </ul>
                </div>
              </li>

              {Object.values(adultGuests).map((k, id) => (
                <li
                  key={id}
                  style={{
                    cursor: "pointer",
                    background:
                      selectedIndex === id + 1 ? "green" : "transparent",
                    padding: "10px 5px",
                    borderRadius: "12px",
                  }}
                  onClick={() => setSelectedIndex(id + 1)}
                >
                  <div className="seat-numb">{k?.[`seat${idx}`]?.Code}</div>
                  <div>
                    <h6>{k?.firstName}</h6>
                    <ul>
                      <li
                        style={{
                          opacity: selectedIndex === id + 1 ? 1 : 0,
                          cursor: selectedIndex === id + 1 ? "text" : "default",
                        }}
                      >
                        <IoMdCheckmark /> <span>Selected</span>
                      </li>
                      <li>
                        <span>
                          {getSymbolFromCurrency(k?.[`seat${idx}`]?.Currency)}
                          {k?.[`seat${idx}`]?.Price}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}

              {Object.values(childGuests).map((k, id) => (
                <li
                  key={id}
                  style={{
                    cursor: "pointer",
                    background:
                      selectedIndex ===
                      Object.values(adultGuests).length + 1 + id
                        ? "green"
                        : "transparent",
                    padding: "10px 5px",
                    borderRadius: "12px",
                  }}
                  onClick={() =>
                    setSelectedIndex(Object.values(adultGuests).length + 1 + id)
                  }
                >
                  <div className="seat-numb">{k?.[`seat${idx}`]?.Code}</div>
                  <div>
                    <h6>{k?.firstName}</h6>
                    <ul>
                      <li
                        style={{
                          opacity:
                            selectedIndex ===
                            Object.values(adultGuests).length + 1 + id
                              ? 1
                              : 0,
                          cursor:
                            selectedIndex ===
                            Object.values(adultGuests).length + 1 + id
                              ? "text"
                              : "default",
                        }}
                      >
                        <IoMdCheckmark /> <span>Selected</span>
                      </li>
                      <li>
                        <span>
                          {getSymbolFromCurrency(k?.[`seat${idx}`]?.Currency)}
                          {k?.[`seat${idx}`]?.Price}
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
                  <span>
                    {getSymbolFromCurrency(windowSeat?.Currency)}
                    {windowSeat?.Price}
                  </span>
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
                  <span>
                    {getSymbolFromCurrency(aisleSeat?.Currency)}
                    {aisleSeat?.Price}
                  </span>
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
                  .slice(!isBusiness ? 16 : 1, !isBusiness ? 30 : 16)
                  .map((_, id) => (
                    <li key={id}>
                      <p>{_}</p>
                    </li>
                  ))}
              </ul>
              <div>
                <ul className="seat-alpha">
                  {Object.values(groupedRows)
                    .slice(!isBusiness ? 16 : 1, !isBusiness ? 30 : 16)[0]
                    .map((_, id) => (
                      <li key={id}>
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
                        !isBusiness ? 16 : 1,
                        !isBusiness ? 30 : 16
                      )[0].length
                    }, 1fr)`,
                  }}
                >
                  {Object.values(groupedRows)
                    .slice(!isBusiness ? 16 : 1, !isBusiness ? 30 : 16)
                    .flat()
                    .map((v, idx) => {
                      return (
                        <li key={idx}>
                          <Image
                            src={
                              !isSeatTaken(v?.Code) && v.AvailablityType !== 2
                                ? v.AvailablityType === 0
                                  ? "/images/seat-2.png"
                                  : v.AvailablityType === 1
                                  ? "/images/seat-1.png"
                                  : "/images/seat-3.png"
                                : "/images/seat-4.png"
                            }
                            onClick={() => selectSeat(v)}
                            width={40}
                            style={{
                              cursor:
                                isSeatTaken(v?.Code) || v.AvailablityType === 2
                                  ? "not-allowed"
                                  : "pointer",
                            }}
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
