import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { PiSealCheckFill } from "react-icons/pi";

const OurMission = () => {
  return (
    <section className="mission-sec pt-80 pb-80">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="mission-img-txt">
                    <p>Mission and Values</p>
                    <h6>What people says about Golobe facilities</h6>
                    <p>Our platform is designed for intrepid travelers of all ages and backgrounds who crave immersive experiences, cultural discovery, and off-the-beaten-path adventures. Whether you&lsquo;re a solo backpacker, a family seeking memorable vacations, or a seasoned globetrotter, there&lsquo;s something for everyone at Travel Mania.</p>
                    <p>Our platform is designed for intrepid travelers of all ages and backgrounds who crave immersive experiences, cultural discovery, and off-the-beaten-path adventures.epid travelers of all ages and backgrounds who crave immersive experiences, cultural discovery, and off-the-beaten-path adventures.</p>
                    <ul>
                        <li><PiSealCheckFill /><p>Save Time and Effort</p></li>
                        <li><PiSealCheckFill /><p>Ensure Transparency</p></li>
                        <li><PiSealCheckFill /><p>Offer Competitive Prices</p></li>
                        <li><PiSealCheckFill /><p>Empower Travelers</p></li>
                    </ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="mission-img">
                    <Image src={"/images/mission-img.png"} width={500} height={500} alt='image' />
                    <Link href={"/"} className='btn10'>Explore The World</Link>
                </div>
              </div>
                
            </div>
          </div>
    </section>
  )
}

export default OurMission