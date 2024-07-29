import React from 'react'

const Newsletter = () => {
  return (
        <section className='newsletter_sec'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 col-sm-12">
                            <div className="new_heading">
                                <h2>Subscribe for Latest Newsletter</h2>
                            </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="new_form">
                            <form action="">
                                <input type="email" placeholder='Your Email Address' />
                                <button type='submit' className='btnwhite'>Subscribe</button> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Newsletter