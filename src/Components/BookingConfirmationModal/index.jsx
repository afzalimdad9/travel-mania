import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/router";

const BookingConfirmationModal = ({
  adultData,
  childrenData,
  mainGuest,
  show,
  handleClose,
  contactDetails,
  title = "Guest",
  url,
  handleCallback,
}) => {
  const router = useRouter();
  return (
    <Modal show={show} onHide={handleClose} className="cstm_modal">
      <Modal.Header>
        <Modal.Title>Verify {title} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>
            <div>
              <span>Adult</span>
              <p>{mainGuest?.firstName}</p>
            </div>

            <div>
              <CiEdit />
            </div>
          </li>
          {Object.values(adultData).map((guest, id) => (
            <li key={id}>
              <div>
                <span>Adult</span>
                <p>{guest?.firstName}</p>
              </div>

              <div>
                <CiEdit />
              </div>
            </li>
          ))}
          {Object.values(childrenData).map((guest, id) => (
            <li key={id}>
              <div>
                <span>Children</span>
                <p>{guest?.firstName}</p>
              </div>

              <div>
                <CiEdit />
              </div>
            </li>
          ))}

          <li>
            <div>
              <span>Contact Details</span>
              <p>{contactDetails?.email}</p>
            </div>

            <div>
              <CiEdit />
            </div>
          </li>
        </ul>

        <p>
          Please check that the name entered matches the name on the passport.
          The details can not be edited after you continue,
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn10" onClick={handleClose}>
          Review
        </Button>
        <Button
          className="btn10"
          onClick={() => {
            handleCallback && handleCallback();
            router.push(url || "/payment/booking");
          }}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingConfirmationModal;
