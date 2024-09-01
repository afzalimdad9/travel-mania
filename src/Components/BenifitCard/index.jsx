import React from "react";
import { Image } from "react-bootstrap";

const BenifitCard = () => {
  return (
    <div className="extra-benifit">
      <h6>Log in to your account to unlock extra benefits</h6>
      <ul className="mt-3">
        <li>
          <div>
            <Image
              alt="img"
              src={"/images/psngr-dtl-cin-1.png"}
              width={90}
              height={70}
            />
          </div>
          <div>
            <p>Save on your booking when you pay using Cash + Avios</p>
          </div>
        </li>
        <li>
          <div>
            <Image
              alt="img"
              src={"/images/psngr-dtl-cin-2.png"}
              width={90}
              height={70}
            />
          </div>
          <div>
            <p>Auto-fill your travel details</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BenifitCard;
