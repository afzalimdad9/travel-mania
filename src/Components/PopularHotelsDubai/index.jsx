import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";

const index = () => {
  return (
    <section className="hotel_sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hotel-head">
              <h6>Popular Hotels in Dubai</h6>
            </div>
          </div>
        </div>
        <div className="row">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="pop-hotel">
                  <div className="hotel-img">
                    <Image
                      src={`/images/hotel-1.png`}
                      layout="responsive"
                      width={500}
                      height={300}
                      alt="img"
                    />
                  </div>
                  <h6>PC Hotel Bhurban</h6>
                  <p>
                    Lorem ipsum dolor sit amet, alina adipisci elite. Egestas
                    elementum enim netus amet turpis lectus.
                  </p>
                  <ul className="hotel-info">
                    <li>
                      <FaMapMarkerAlt /> <span>Museums</span>
                    </li>
                    <li>
                      <FaUser /> <span>24 Person Capacity</span>
                    </li>
                  </ul>
                  <div className="price">
                    <h5>
                      $280/ <span>Per Night</span>
                    </h5>
                    <Link href={"/"} className="price-link">
                      <BsArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default index;
