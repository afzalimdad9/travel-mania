import Head from "next/head";
import React, { useState } from "react";
import Layout from "../layout/index";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getLocalItem } from "../utils";
import { useFlightContext } from "../context/FlightDataContext";
import getSymbolFromCurrency from "currency-symbol-map";

const Bagging = () => {
  const [show, setShow] = useState(false);
  const { selectedFlight, flightInfo } = useFlightContext();
  const [baggingInput, setBaggingInput] = useState(
    getLocalItem("additional-baggages", {})
  );

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  let mainGuest = getLocalItem("main-guest", {});
  let childGuests = getLocalItem("children-guests", {});
  let adultGuests = getLocalItem("adult-guests", {});

  let hasReturn = selectedFlight?.Segments?.length > 0;
  let oneWaySegments = selectedFlight?.Segments?.[0] || [];
  let returnSegments =
    (hasReturn
      ? selectedFlight?.Segments?.[1]
      : selectedFlight?.Segments?.[0]?.reverse()) || [];

  function handleChange(e) {
    const { name, value } = e.target;

    const isMainGuest = name === "mainGuest";
    const type = name.split("-")[0];
    const uid = name.split("-")[1];
    setBaggingInput((prev) => ({
      ...prev,
      [type]: isMainGuest
        ? value
        : {
            ...prev[type],
            [uid]: value,
          },
    }));

    localStorage.setItem(
      "additional-baggages",
      JSON.stringify({
        ...baggingInput,
        [type]: isMainGuest
          ? value
          : {
              ...baggingInput[type],
              [uid]: value,
            },
      })
    );
  }

  return (
    <>
      <Head>
        <title>Seat Selection</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal show={show} onHide={handleClose} className="bagg-popup">
        <Modal.Header closeButton>
          <Modal.Title>Select Additional Baggage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Carry more than your free baggage allowance by purchasing in advance
          </p>
          <h6>
            {oneWaySegments?.[0]?.Origin?.Airport?.CityName} ({flightInfo?.from}
            ) -{" "}
            {
              oneWaySegments?.[oneWaySegments?.length - 1]?.Destination?.Airport
                ?.CityName
            }{" "}
            ({flightInfo?.to}){" "}
            <span>
              {new Date(oneWaySegments?.[0]?.Origin?.DepTime).toLocaleString()}
            </span>
          </h6>
          <Table>
            <thead>
              <tr>
                <th>Passengers</th>
                <th>Additional Baggage weight in (Kg)</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainGuest?.firstName}</td>
                <td>
                  <div className="qnty_bg">
                    <input
                      name="mainGuest"
                      onChange={handleChange}
                      value={baggingInput?.mainGuest}
                      type="text"
                      placeholder="Example: 10"
                    />
                    <button className="primary">ADD</button>
                    <p>Please enter the multiples of 5</p>
                  </div>
                </td>
                <td className="text-center">-</td>
              </tr>
              {Object.values(adultGuests).map((guest, idx) => (
                <tr key={idx}>
                  <td>{guest?.firstName}</td>
                  <td>
                    <div className="qnty_bg">
                      <input
                        name={`adultGuests-${idx}`}
                        onChange={handleChange}
                        value={baggingInput?.adultGuests?.[`${idx}`]}
                        type="text"
                        placeholder="Example: 10"
                      />
                      <button className="primary">ADD</button>
                      <p>Please enter the multiples of 5</p>
                    </div>
                  </td>
                  <td className="text-center">-</td>
                </tr>
              ))}
              {Object.values(childGuests).map((guest, idx) => (
                <tr key={idx}>
                  <td>{guest?.firstName}</td>
                  <td>
                    <div className="qnty_bg">
                      <input
                        value={baggingInput?.childGuests?.[`${idx}`]}
                        name={`childGuests-${idx}`}
                        onChange={handleChange}
                        type="text"
                        placeholder="Example: 10"
                      />
                      <button className="primary">ADD</button>
                      <p>Please enter the multiples of 5</p>
                    </div>
                  </td>
                  <td className="text-center">-</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Continue</Button>
        </Modal.Footer>
      </Modal>
      <Layout noBanner>
        <section className="bagging-sec">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="bagging-sec-inn">
                  <h6>
                    {mainGuest?.firstName}, Complete your journey with a wide
                    range of world class services,
                  </h6>
                  <h5>Seat Selection</h5>

                  <div className="bagging-sec-table">
                    <div className="table-responsive">
                      <Table>
                        <thead>
                          <tr>
                            <th>
                              {oneWaySegments?.[0]?.Origin?.Airport?.CityName} (
                              {flightInfo?.from}) -{" "}
                              {
                                oneWaySegments?.[oneWaySegments?.length - 1]
                                  ?.Destination?.Airport?.CityName
                              }{" "}
                              ({flightInfo?.to})
                            </th>
                            {oneWaySegments?.map((seg, idx) => (
                              <th key={idx}>
                                {seg?.Origin?.Airport?.CityCode} -{" "}
                                {seg?.Destination?.Airport?.CityCode}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{mainGuest?.firstName}</td>
                            {oneWaySegments?.map((_, idx) => {
                              const seat = mainGuest?.[`seat${idx}`];

                              if (!seat)
                                return <td key={idx}>No seat selected</td>;
                              return (
                                <td key={idx}>
                                  {seat?.Code}{" "}
                                  {getSymbolFromCurrency(seat?.Currency)}
                                  {seat?.Price}
                                </td>
                              );
                            })}
                          </tr>

                          {Object.values(adultGuests).map((guest, idx) => (
                            <tr key={idx}>
                              <td>{guest?.firstName}</td>
                              {oneWaySegments?.map((_, idx) => {
                                const seat = guest?.[`seat${idx}`];
                                if (!seat)
                                  return <td key={idx}>No seat selected</td>;
                                return (
                                  <td key={idx}>
                                    {seat?.Code}{" "}
                                    {getSymbolFromCurrency(seat?.Currency)}
                                    {seat?.Price}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}

                          {Object.values(childGuests).map((guest, idx) => (
                            <tr key={idx}>
                              <td>{guest?.firstName}</td>
                              {oneWaySegments?.map((_, idx) => {
                                const seat = guest?.[`seat${idx}`];
                                if (!seat)
                                  return <td key={idx}>No seat selected</td>;
                                return (
                                  <td key={idx}>
                                    {seat?.Code}{" "}
                                    {getSymbolFromCurrency(seat?.Currency)}
                                    {seat?.Price}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    {flightInfo?.tripType !== "one-way" && (
                      <>
                        <hr />

                        <div className="table-responsive">
                          <Table>
                            <thead>
                              <tr>
                                <th>
                                  {
                                    oneWaySegments?.[oneWaySegments.length - 1]
                                      ?.Destination?.Airport?.CityName
                                  }{" "}
                                  ({flightInfo?.to}) -{" "}
                                  {
                                    oneWaySegments?.[0]?.Origin?.Airport
                                      ?.CityName
                                  }{" "}
                                  ({flightInfo?.from})
                                </th>
                                {returnSegments?.map((seg, idx) => (
                                  <th key={idx}>
                                    {
                                      seg?.[
                                        hasReturn ? "Origin" : "Destination"
                                      ]?.Airport?.CityCode
                                    }{" "}
                                    -{" "}
                                    {
                                      seg?.[
                                        !hasReturn ? "Origin" : "Destination"
                                      ]?.Airport?.CityCode
                                    }
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{mainGuest?.firstName}</td>
                                {returnSegments?.map((_, idx) => {
                                  const seat =
                                    mainGuest?.[
                                      `seat${idx + oneWaySegments.length}`
                                    ];

                                  if (!seat)
                                    return <td key={idx}>No seat selected</td>;

                                  return (
                                    <td key={idx}>
                                      {seat?.Code}{" "}
                                      {getSymbolFromCurrency(seat?.Currency)}
                                      {seat?.Price}
                                    </td>
                                  );
                                })}
                              </tr>

                              {Object.values(adultGuests).map((guest, idx) => (
                                <tr key={idx}>
                                  <td>{guest?.firstName}</td>
                                  {returnSegments?.map((_, idx) => {
                                    const seat =
                                      guest?.[
                                        `seat${idx + oneWaySegments.length}`
                                      ];

                                    if (!seat)
                                      return (
                                        <td key={idx}>No seat selected</td>
                                      );
                                    return (
                                      <td key={idx}>
                                        {seat?.Code}{" "}
                                        {getSymbolFromCurrency(seat?.Currency)}
                                        {seat?.Price}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}

                              {Object.values(childGuests).map((guest, idx) => (
                                <tr key={idx}>
                                  <td>{guest?.firstName}</td>
                                  {returnSegments?.map((_, idx) => {
                                    const seat =
                                      guest?.[
                                        `seat${idx + oneWaySegments.length}`
                                      ];

                                    if (!seat)
                                      return (
                                        <td key={idx}>No seat selected</td>
                                      );
                                    return (
                                      <td key={idx}>
                                        {seat?.Code}{" "}
                                        {getSymbolFromCurrency(seat?.Currency)}
                                        {seat?.Price}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </>
                    )}
                  </div>

                  <h5>Additional Baggage</h5>
                  <div className="addtional-bg-dv">
                    <div className="addtional-bg-img">
                      <Image
                        src={"/images/bag-img.png"}
                        width={325}
                        height={245}
                        alt="img"
                      />
                    </div>
                    <div className="addtional-bg-txt">
                      <h6>Upto 70% off extra baggage</h6>
                      <p>
                        Carry more than your free baggage allowance by
                        purchasing in advance
                      </p>
                      <Link href={""} className="btn10" onClick={handleShow}>
                        Select
                      </Link>
                    </div>
                  </div>

                  <div className="btn-sub">
                    <Link href={"/tripsummary"} className="btn10">
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Bagging;
