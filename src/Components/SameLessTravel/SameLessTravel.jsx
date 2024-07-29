 import React from 'react'
 import {semlessData} from "../../Data"
 
 const SameLessTravel = () => {
   return (
    <section className="sameless-travel-sec">
    <div className="container">
      <div className="row">
        <div className="col-md-9 centerCol">
          <div className="uni-head">
          <h5>Your Gateway to Seamless Travel Experiences</h5>
          <p>
            Welcome to Travel Menia, where your travel dreams take flight!
            We&lsquo;re not just another booking platform  were your one-stop
            destination for everything you need to plan your next
            adventure with ease and confidence
          </p>
          </div> 
        </div>
      </div>
      <div className="row row-gap-4">
        {semlessData?.map((iteam, index) => {
          return (
            <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
              <div className="sameless-card">
                  <h5>{iteam?.cardNum}</h5>
                  <h6>{iteam?.title}</h6>
                  <p>{iteam?.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
   )
 }
 
 export default SameLessTravel