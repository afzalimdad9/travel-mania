import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";


const index = () => {
  return (
    <section className='pop-dest-sec'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="pop-dest-head">
                        <ul>
                            <li>
                                <h6>Popular Destinations</h6>
                                <p>Vacations to make your experience enjoyable in Pakistan</p>
                            </li>
                            <li>
                                 <Link href={'/'} className='btn10'>See more places</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-3">
                    <div className="desti-card">
                        <Image src={'/images/desti-img-1.png'} width={250} height={180} alt='img'/>
                        <div className='meta-tgs'>
                            <FaMapMarkerAlt />
                            <span>Islamabad</span>
                        </div>
                        <h6>Margalla Hills National Park</h6>
                        <p>3 Days</p>
                        <h5>From: Rs. 23,000</h5>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="desti-card">
                        <Image src={'/images/desti-img-2.png'} width={250} height={180} alt='img'/>
                        <div className='meta-tgs'>
                            <FaMapMarkerAlt />
                            <span>Islamabad</span>
                        </div>
                        <h6>Margalla Hills National Park</h6>
                        <p>3 Days</p>
                        <h5>From: Rs. 23,000</h5>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="desti-card">
                        <Image src={'/images/desti-img-3.png'} width={250} height={180} alt='img'/>
                        <div className='meta-tgs'>
                            <FaMapMarkerAlt />
                            <span>Islamabad</span>
                        </div>
                        <h6>Margalla Hills National Park</h6>
                        <p>3 Days</p>
                        <h5>From: Rs. 23,000</h5>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="desti-card">
                        <Image src={'/images/desti-img-4.png'} width={250} height={180} alt='img'/>
                        <div className='meta-tgs'>
                            <FaMapMarkerAlt />
                            <span>Islamabad</span>
                        </div>
                        <h6>Margalla Hills National Park</h6>
                        <p>3 Days</p>
                        <h5>From: Rs. 23,000</h5>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default index