import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const index = () => {
  return (
    <section className="pop-dest-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="pop-dest-head">
              <ul>
                <li>
                  <h6>Explore Stays In Trending Destinations</h6>
                  <p>
                    Build your best memories with your loved ones in top
                    destinations.
                  </p>
                </li>
                <li>
                  <Link href={"/"} className="btn10">
                    See more places
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="desti-card">
              <Image
                src={"/images/desti-img-1.png"}
                width={250}
                height={180}
                alt="img"
              />
              <div className="meta-tgs">
                <FaMapMarkerAlt />
                <span>USA</span>
              </div>
              <h6>Chicago</h6>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="desti-card">
              <Image
                src={"/images/desti-img-2.png"}
                width={250}
                height={180}
                alt="img"
              />
              <div className="meta-tgs">
                <FaMapMarkerAlt />
                <span>USA</span>
              </div>
              <h6>Schaumburg</h6>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="desti-card">
              <Image
                src={"/images/desti-img-3.png"}
                width={250}
                height={180}
                alt="img"
              />
              <div className="meta-tgs">
                <FaMapMarkerAlt />
                <span>Italy</span>
              </div>
              <h6>Rome</h6>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="desti-card">
              <Image
                src={"/images/desti-img-4.png"}
                width={250}
                height={180}
                alt="img"
              />
              <div className="meta-tgs">
                <FaMapMarkerAlt />
                <span>France</span>
              </div>
              <h6>Paris</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
