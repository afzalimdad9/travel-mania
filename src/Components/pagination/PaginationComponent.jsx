import Image from "next/image";
import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const PaginationComponent = ({ itemsPerPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Array.from(
      { length: itemsPerPage },
      (_, index) => startIndex + index + 1
    ).filter((item) => item <= totalItems);
  };

  return (
    <div className="mt-4">
      <ul className="list-group mb-4">
        {getCurrentPageItems().map((item) => (
          <div key={item} className="flight_card-mn">
            <div className="flight_card-deatil-1">
              <div className="flight-logo">
                <Image src={"/images/flight-logo.png"} width={50} height={50} alt="img" />
                <p>Fly to Kos with Emirates</p>
              </div>
              <div className="flight-timming">
                <div className="flight-time-inn">
                  <div className="flight-time-strt">
                    <h6>07:30</h6>
                    <p>Dubai</p>
                  </div>
                  <div className="flight-line">
                    <p>1hr 40m</p>
                    <svg
                      width="100%"
                      height="9"
                      viewBox="0 0 226 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M225.354 4.85355C225.549 4.65829 225.549 4.34171 225.354 4.14645L222.172 0.964466C221.976 0.769204 221.66 0.769204 221.464 0.964466C221.269 1.15973 221.269 1.47631 221.464 1.67157L224.293 4.5L221.464 7.32843C221.269 7.52369 221.269 7.84027 221.464 8.03553C221.66 8.2308 221.976 8.2308 222.172 8.03553L225.354 4.85355ZM0 5H225V4H0V5Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                  <div className="flight-time-strt">
                    <h6>09:20</h6>
                    <p>England</p>
                  </div>
                  <Accordion>
                    <Accordion.Item eventKey={item}>
                      <Accordion.Header></Accordion.Header>
                      <Accordion.Body>
                        <div className="d-flex flex-column align-items-start flight-connect">
                          <div className="d-flex align-items-center firstCircle">
                            <div className="circle"></div>
                            <h5 className="m-0 p-0 ms-2 fw-normal">
                              00:20
                              <span className="fw-medium ms-2 text-gold1">
                                New York
                              </span>
                              <span className="ms-2"></span>
                            </h5>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="vertiLine"></div>
                            <p className="h6 m-0 text-secondary fw-normal ms-3">
                              9h 55min
                            </p>
                          </div>
                          <div className="d-flex align-items-center lastCircle">
                            <div className="circle"></div>
                            <h5 className="m-0 p-0 ms-2 fw-normal">
                              17:15
                              <span className="fw-medium ms-2 text-gold1">
                                {" "}
                                Istanbul
                              </span>
                              <span className="ms-2"></span>
                            </h5>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="flight-time-inn">
                  <div className="flight-time-strt">
                    <h6>07:30</h6>
                    <p>Dubai</p>
                  </div>
                  <div className="flight-line">
                    <p>1hr 40m</p>
                    <svg
                      width="226"
                      height="9"
                      viewBox="0 0 226 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M225.354 4.85355C225.549 4.65829 225.549 4.34171 225.354 4.14645L222.172 0.964466C221.976 0.769204 221.66 0.769204 221.464 0.964466C221.269 1.15973 221.269 1.47631 221.464 1.67157L224.293 4.5L221.464 7.32843C221.269 7.52369 221.269 7.84027 221.464 8.03553C221.66 8.2308 221.976 8.2308 222.172 8.03553L225.354 4.85355ZM0 5H225V4H0V5Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                  <div className="flight-time-strt">
                    <h6>09:20</h6>
                    <p>England</p>
                  </div>
                  <Accordion>
                    <Accordion.Item eventKey={item}>
                      <Accordion.Header></Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="flight_card-deatil-price">
              <h5>$980</h5>
              <button className="btn10">Book Now</button>
            </div>
          </div>
        ))}
      </ul>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
