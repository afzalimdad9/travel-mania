import Head from "next/head";
import React from "react";

import Footer from "../Components/Footer/Footer";
import NavigationBar from "../Components/Navbar";
import SafariSection from "../Components/Safari";
import DetailedInfo from "../Components/Detailedinfo";

const details = () => {
  return (
    <>
      <Head>
        <title>Amusement</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <SafariSection />
      <DetailedInfo />
      <Footer />
    </>
  );
};

export default details;
