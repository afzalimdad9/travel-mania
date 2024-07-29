import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";


const index = () => {
  return (
    <section className='hotel_sec'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="hotel-head">
                        <h6>Popular Hotels For Booking</h6>
                        <p>Hotels in Pakintan</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="pop-hotel">
                        <Image src={'/images/hotel-1.png'} width={100} height={100} alt='img'/>
                        <h6>Pearl Continental Hotels</h6>
                        <p>Lorem ipsum dolor sit amet, alina adipisci elite. Egestas elementum enim netus amet turpis lectus.</p>
                        <ul>
                            <li><FaMapMarkerAlt /> <span>Museums</span></li>
                            <li><FaUser /> <span>12 Person Capacity</span></li>
                        </ul>
                        <div className='price'>
                            <h6>$150/ <span>Per Night</span></h6>
                            <Link href={'/'}><BsArrowRight/></Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="pop-hotel">
                        <Image src={'/images/hotel-2.png'} width={100} height={100} alt='img'/>
                        <h6>Pearl Continental Hotels</h6>
                        <p>Lorem ipsum dolor sit amet, alina adipisci elite. Egestas elementum enim netus amet turpis lectus.</p>
                        <ul>
                            <li><FaMapMarkerAlt /> <span>Museums</span></li>
                            <li><FaUser /> <span>12 Person Capacity</span></li>
                        </ul>
                        <div className='price'>
                            <h6>$150/ <span>Per Night</span></h6>
                            <Link href={'/'}><BsArrowRight/></Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="pop-hotel">
                        <Image src={'/images/hotel-1.png'} width={100} height={100} alt='img'/>
                        <h6>Pearl Continental Hotels</h6>
                        <p>Lorem ipsum dolor sit amet, alina adipisci elite. Egestas elementum enim netus amet turpis lectus.</p>
                        <ul>
                            <li><FaMapMarkerAlt /> <span>Museums</span></li>
                            <li><FaUser /> <span>12 Person Capacity</span></li>
                        </ul>
                        <div className='price'>
                            <h6>$150/ <span>Per Night</span></h6>
                            <Link href={'/'}><BsArrowRight/></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="hotel-link text-center mt-5">
                        <Link href={"/"} className='btn10'>See more places</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default index