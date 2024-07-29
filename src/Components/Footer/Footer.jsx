import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Newsletter from '../Newsletter/Newsletter';
import Image from 'next/image';


const Footer = () => {
  return (
    <>
    <Newsletter/>
      <footer>
        <div className="container">
          <div className="row">
                <div className="col-md-6 col-xl-4 col-sm-12">
                  <div className="foot_about">
                    <Image src="/images/logo2.png" width={135} height={60} alt="alt" />
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    <ul>
                      <li><Link href={"/"}><FaFacebookF /></Link></li>
                      <li><Link href={"/"}><SlSocialTwitter/></Link></li>
                      <li><Link href={"/"}><FaYoutube /></Link></li>
                      <li><Link href={"/"}><FaInstagram/></Link></li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 col-xl-2 col-sm-12">
                  <div className="foot_link">
                    <h4>Quick Links</h4>
                    <ul>
                      <li><Link href={"/"}>Home</Link></li>
                      <li><Link href={"/"}>About Us</Link></li>
                      <li><Link href={"/"}>Host A Venue</Link></li>
                      <li><Link href={"/"}>Blog</Link></li>
                      <li><Link href={"/"}>Hotel</Link></li>
                      <li><Link href={"/"}>Contact Us</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3 col-sm-12">
                  <div className="foot_link-address">
                    <h4>Get In Touch</h4>
                    <ul>
                      <li><Link href={"tel:11234567890"}><div className='icn'> <MdOutlineLocalPhone /></div> <p> +1 12345 67890</p></Link></li>
                      <li><Link href={"mailto:example@gmail.com"}><div className='icn'><CiMail /></div><p> example@gmail.com</p></Link></li>
                      <li><Link href={"/"}><div className='icn'><HiOutlineLocationMarker /></div><p> 1014 N Main St, Miami, Oklahoma, 74354, United States</p></Link></li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3 col-sm-12">
                  <div className="foot_instagram">
                      <h4>Follow Us On @instagram</h4>
                      <Image width={325} height={210} src="/images/footer_insta.png" alt="alt" />
                  </div>
                </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2023 All rights reserved</p>
        </div>
      </footer>
    </>
  )
}

export default Footer