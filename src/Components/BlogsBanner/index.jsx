import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <section className="home-banner-section">
      <Image
        src="/images/blogs-banner.png"
        width={1300}
        height={800}
        alt="banner-img"
      />
      <div className="home_banner-mn">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="home_banner-txt">
                <h4>Travel Mania</h4>
                <h1>Travel Blog</h1>
                {/* <p>Special offers to suit your plan</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
