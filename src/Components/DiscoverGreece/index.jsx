import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <section
      className="book-advent-sec"
      style={{
        backgroundImage: "url('/images/discover-greece.png')",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
          zIndex: 1,
        }}
      ></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="book-advent-txt">
              <h2>Discover Greece For Less</h2>
              <p>
                Exclusive Discounts on Top Hotels Across Greece – Book Your
                Dream Stay Today!
              </p>
              <Link href={"/"} className="btn10">
                Discover Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
