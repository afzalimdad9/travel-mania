import LocationCard from "../Components/LocationCard";
import { Inter } from "next/font/google";
import Head from "next/head";
import BannerForm from "../Components/BannerForm/BannerForm";
import CounterCard from "../Components/CounterCard";
import DestinationCard from "../Components/DestinationCard";
import FlightCard from "../Components/FlightCard";
import HomeBanner from "../Components/HomeBanner";
import HotelBook from "../Components/HotelBook";
import PlaneTrip from "../Components/PlaneTrip/PlaneTrip";
import Layout from "../layout/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeBanner />
        <BannerForm />
        <PlaneTrip />
        <HotelBook />
        <DestinationCard />
        <CounterCard />
        <FlightCard />
        <LocationCard />
      </Layout>
    </>
  );
}
