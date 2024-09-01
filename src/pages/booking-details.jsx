import Head from "next/head";
import React from "react";
import Layout from "../layout/index";
import BookingDetails from "../Components/BookingDetails";

const Page = () => {
  return (
    <>
      <Head>
        <title>Amusement</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout noBanner>
        <BookingDetails />
      </Layout>
    </>
  );
};

export default Page;
