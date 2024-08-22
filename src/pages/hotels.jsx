import Head from "next/head";
import BannerForm from "../Components/BannerForm/BannerForm";
import HotelBanner from "../Components/HotelBanner";
import HotelBook from "../Components/HotelBook";
import Layout from "../layout/index";
import LatestTravelBlog from "../Components/Blog";
import DiscoverGreece from "../Components/DiscoverGreece";
import ExploreStays from "../Components/ExploreStays";
import PopularHotelsDubai from "../Components/PopularHotelsDubai";

const hotels = () => {
  return (
    <>
      <Head>
        <title>Hotels</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HotelBanner />
        <BannerForm />
        <ExploreStays />
        <HotelBook />
        <DiscoverGreece />
        <PopularHotelsDubai />
        <LatestTravelBlog />
      </Layout>
    </>
  );
};

export default hotels;
