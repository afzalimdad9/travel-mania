import Image from "next/image";
import React from "react";

const BookingSidebar = () => {
  return (
    <div className="passn-dtl-sidbar">
      <div className="trip-sum-dtl">
        <h6>Outbound flight</h6>
        <div className="flex-div">
          <div className="trip-dv-1">
            <span>Thu, 30 May</span>
            <p>10:25</p>
            <p>DBI</p>
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.90251 0.662507L8.2039 3.30768C8.27858 3.45705 8.42794 3.56354 8.60957 3.59534L11.5212 4.02222C11.9582 4.0863 12.1293 4.61967 11.8199 4.929L9.70765 6.98733C9.57996 7.10488 9.52648 7.28605 9.54769 7.45662L10.0493 10.3581C10.1239 10.7951 9.66524 11.1257 9.27017 10.9233L6.66787 9.54722C6.59102 9.50526 6.50487 9.48327 6.41732 9.48327C6.32976 9.48327 6.24361 9.50526 6.16677 9.54722L3.564 10.9233C3.16939 11.1261 2.71116 10.7951 2.78538 10.3581L3.28694 7.45662C3.30353 7.37059 3.29857 7.28179 3.27251 7.19814C3.24645 7.11448 3.2001 7.03858 3.13758 6.97719L1.02577 4.92854C0.705383 4.61921 0.887015 4.08584 1.32404 4.02176L4.23613 3.59488C4.4067 3.56307 4.55606 3.45659 4.6418 3.29662L5.94272 0.662046C6.1345 0.267436 6.70014 0.267436 6.90251 0.662046V0.662507Z"
                fill="#666666"
              />
            </svg>
          </div>
          <div className="trip-sum-img">
            <p>08:15</p>
            <Image
              width={160}
              height={13}
              src="/images/trip-sum-img.png"
              alt="img"
            />
          </div>

          <div className="trip-dv-1">
            <span>Thu, 30 May</span>
            <p>10:25</p>
            <p>LDN</p>
          </div>
        </div>
      </div>

      <div className="trip-sum-dtl">
        <h6>Outbound flight</h6>
        <div className="flex-div">
          <div className="trip-dv-1">
            <span>Thu, 30 May</span>
            <p>10:25</p>
            <p>DBI</p>
          </div>
          <div className="trip-sum-img">
            <p>08:15</p>
            <Image
              width={160}
              height={13}
              src="/images/trip-sum-img.png"
              alt="img"
            />
          </div>

          <div className="trip-dv-1">
            <span>Thu, 30 May</span>
            <p>10:25</p>
            <p>LDN</p>
          </div>
        </div>
      </div>

      <div className="trip-sum-price">
        <h6>
          <span className="prc-ttl">Total trip price:</span>{" "}
          <span className="prc">603840.00 PKR</span>
        </h6>
      </div>
    </div>
  );
};

export default BookingSidebar;
