import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <section className="counter_sec">
        <Image src={'/images/map-img.png'} width={1200} height={500} alt='img'/>
        <div className="counter_sec-inn">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="counter-card">
                            <Image src={'/images/count-img-1.png'} width={80} height={80} alt='img'/>
                            <h6>1000+</h6>
                            <p>Hotel</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="counter-card">
                            <Image src={'/images/count-img-2.png'} width={80} height={80} alt='img'/>
                            <h6>4500+</h6>
                            <p>Rooms Available</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="counter-card">
                            <Image src={'/images/count-img-3.png'} width={80} height={80} alt='img'/>
                            <h6>30+</h6>
                            <p>Beaches View</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="counter-card">
                            <Image src={'/images/count-img-3.png'} width={80} height={80} alt='img'/>
                            <h6>8000+</h6>
                            <p>Guests</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default index;
