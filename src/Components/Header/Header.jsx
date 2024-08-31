import React, { useState } from "react";
import Link from "next/link";
import { IoIosAirplane } from "react-icons/io";
import { LiaBedSolid } from "react-icons/lia";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useAuth0 } from "@auth0/auth0-react";
import { VscChevronDown } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { PiListDashesLight } from "react-icons/pi";


const headerData = [
  {
    title: "Find Flight",
    link: "/",
    icon: "IoIosAirplane",
  },
  {
    title: "Stays",
    link: "/hotels",
    icon: "LiaBedSolid",
  },
];

const iconMapping = {
  IoIosAirplane: IoIosAirplane,
  LiaBedSolid: LiaBedSolid,
};

const Header = ({noBanner}) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("user",user)
  return (
    <section className={`${noBanner ? "header-Bg-blue":"header-Bg-trans"} header_desktop`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 d-none  d-md-block">
            <ul className="header_links">
              {headerData?.map((item, index) => {
                const IconComponent = iconMapping[item.icon];
                return (
                  <li key={index}>
                    <Link href={item?.link}>
                      {IconComponent && <IconComponent />}
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="header_logo">
              <Link href={"/"}>
                <Image
                  src="/images/logo.png"
                  width={150}
                  height={70}
                  alt="logo"
                />
              </Link>

              <div
                className={`ham-mobile-icon d-none`}
                onClick={() => setMobileMenu((prevState) => !prevState)}
              >
                {mobileMenu ? <RxCross1 /> : <RxHamburgerMenu />}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 d-none  d-md-block">
            <div className="header_right">
              <ul>
                {isAuthenticated ? (
                  <li className="drop_down">
                    <div className="header-profile"> 
                     <Image width={30} height={30} src={user?.picture} alt="image" />
                     <VscChevronDown/>
                    </div>
                    <ul>
                      <li>
                        <div className="inner_header-profile">
                          <Image width={30} height={30} src={user?.picture} alt="image" />
                          <p> {user?.nickname}</p>
                        </div> 
                      </li>
                     <li>
                     
                     <PiListDashesLight/>
                        <Link
                          href={"/dashboard"}>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                      <IoIosLogOut/>
                        <Link
                          href={"/"}
                          onClick={() => logout()}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  {isAuthenticated ? (
                    ''
                  ) : (
                    <Link
                    href={"/"}
                    className="btnwhite"
                    onClick={() => loginWithRedirect()}
                  >
                    Login
                  </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* {mobileMenu && ( */}
      <div
        className={`${
          mobileMenu ? "mobile-menu-active" : ""
        } sidebar_main d-none`}
      >
        <Link href={"/"}>
          <Image src="/images/logo.png" width={150} height={70} alt="logo" />
        </Link>
        <ul className="header_links">
          {headerData?.map((item, index) => {
            const IconComponent = iconMapping[item.icon];
            return (
              <li key={index}>
                <Link href={item?.link}>
                  {IconComponent && <IconComponent />}
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* )} */}
    </section>
  );
};

export default Header;
