import Image from 'next/image'
import React from 'react'

const InnerBanner = ({data}) => {
  return (
    <section className='inner_banner-sec'>
      <Image src={data[0]?.imageUrl} width={1440} height={480}  alt='Inner Banner' priority/>
      <div className="inner_banner-mn">
        <div className="container">
          <div className="row">
              <div className="col-md-12">
                  <div className="inner-banner-head">
                    <h6>{data[0]?.eyeBrow}</h6>
                    <h1>{data[0]?.title}</h1>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InnerBanner