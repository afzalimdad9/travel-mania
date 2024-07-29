import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const tripData = [
  {
    imgUrl: "/images/trip-1.png",
    city:"Flights , Hotels , Resorts",
    destination:"Istan  Turkey"
  },
  {
    imgUrl: "/images/trip-2.png",
    city:"Flights , Hotels , Resorts",
    destination:"Malé , aldives" 
  },
  {
    imgUrl: "/images/trip-3.png",
    city:"Flights , Hotels , Resorts",
    destination:"Londo , UK"
  },
  {
    imgUrl: "/images/trip-4.png",
    city:"Flights , Hotels , Resorts",
    destination:"Sydne , Australia"
  },
  {
    imgUrl: "/images/trip-5.png",
    city:"Flights , Hotels , Resorts",
    destination:"Paris , France"
  },

]

const PlaneTrip = () => {
  return (
    <section className='plane_trip-sec'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
              <div className='trip_head'>
                  <div>
                      <h3>Plane your perfect trip</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing</p>
                  </div>
                  <Link href={"/"} className='btn10' >See more place</Link>
              </div>

              <div className="trip_sec-mn">
                <ul>
                {tripData?.map((iteam,index)=>{
                  return(
                    <li key={index}>
                        <Image width={90} height={90} src={iteam?.imgUrl} alt="images" />
                        <div>
                            <h6>{iteam?.destination}</h6>
                            <p>{iteam?.city}</p>
                        </div>
                    </li>
                  )
                })}
                </ul>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlaneTrip