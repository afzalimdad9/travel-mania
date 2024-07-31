import Head from "next/head";
import AmusementBanner from "../Components/AmusementBanner";
import Layout from "../layout/index";

import LatestTravelBlog from "@/Components/Blog";
import ExploreByInterests from "@/Components/ExploreByInterests";
import RecommendationsSection from "@/Components/Recommendations";
import BannerForm from "../Components/BannerForm/BannerForm";
import CounterCard from "../Components/CounterCard";
import DestinationCard from "../Components/DestinationCard";
import FlightCard from "../Components/FlightCard";
import LocationCard from "../Components/LocationCard";
import Signin from "@/Components/Signin";

const amusement = () => {
  return (
    <>
      <Head>
        <title>Amusement</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AmusementBanner />
        <BannerForm />
        {/* <PlaneTrip /> */}
        {/* <HotelBook /> */}
        <DestinationCard />
        <Signin />
        <ExploreByInterests />
        <CounterCard />
        <FlightCard />
        <LocationCard />
        <RecommendationsSection />
        <LatestTravelBlog />
      </Layout>
    </>
  );
};

export default amusement;
