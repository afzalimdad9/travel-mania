import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <section className="flight_card-sec">
    <div className="container">
      <div className="row">
          <div className="col-md-6">
                <div className="flight_card">
                    <Image src={'/images/flgt-img-1.png'} height={550} width={600} alt='img'/>
                    <div className="flight_card-inn">
                        <h6>Flights</h6>
                        <p>Search Flights & Places Hire to our most popular destinations</p>
                        <Link href={'/'} className='btn10'>Show Filghts</Link>
                    </div>
                </div>
          </div>
          <div className="col-md-6">
                <div className="flight_card">
                    <Image src={'/images/flgt-img-2.png'} height={550} width={600} alt='img'/>
                    <div className="flight_card-inn">
                        <h6>Hotels</h6>
                        <p>Search Flights & Places Hire to our most popular destinations</p>
                        <Link href={'/'} className='btn10'>Show Filghts</Link>
                    </div>
                </div>
          </div>
      </div>
    </div>
  </section>
  )
}

export default index