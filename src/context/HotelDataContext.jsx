import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const HotelContext = createContext(null);
export const useHotelContext = () => useContext(HotelContext);

export default function HotelContextProvider({ children: child }) {
  const router = useRouter();
  const { stayplace, checkin, checkout, adults, children } = router.query;
  const [hotelData, setHotelData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [hotels, setHotels] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("hotelResults") !== null
      ? JSON.parse(window.localStorage.getItem("hotelResults"))
      : []
  );

  const getData = useCallback(async () => {
    if (!stayplace) return;
    const searchPayload = {
      CheckIn: checkin,
      CheckOut: checkout,
      GuestNationality: stayplace,
      PaxRooms: [
        {
          Adults: Number(adults),
          Children: Number(children),
          ChildrenAges: new Array(Number(children)).fill(0).map(() => 10),
        },
      ],
      ResponseTime: 19,
      IsDetailedResponse: true,
      Filters: {
        Refundable: false,
        No0fRooms: 1,
        MealType: "All",
      },
    };

    try {
      const response = await axios.post("/api/search-hotel", searchPayload);
      const apiResult = response.data;

      const [result, cityResult] = await Promise.all([
        await axios
          .post("/api/get-hotel-details", {
            Hotelcodes: apiResult?.HotelResult.map((h) => h.HotelCode).join(
              ","
            ),
            Language: "en",
          })
          .then((r) => r.data.HotelDetails),
        await axios
          .post("/api/get-cities-with-codes", {
            CountryCode: stayplace || "PK",
          })
          .then((r) => r.data.CityList),
      ]);
      setCategories(result.map((d) => d.HotelFacilities).flat());
      setCity(cityResult);
      setHotels(
        apiResult?.HotelResult.map((h) => ({
          ...h,
          ...result.find((d) => d.HotelCode === h.HotelCode),
        }))
      );
      localStorage.setItem(
        "hotelResults",
        JSON.stringify(
          apiResult?.HotelResult.map((h) => ({
            ...h,
            ...result.find((d) => d.HotelCode === h.HotelCode),
          }))
        )
      );
    } catch (error) {
      toast.error(
        error?.response?.data || "Something went wrong searching for hotel"
      );
    }
  }, [stayplace, checkin, checkout, adults, children]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <HotelContext.Provider
      value={{
        hotelData,
        setHotelData,
        hotels,
        setHotels,
        city,
        categories,
        setCategories,
      }}
    >
      {child}
    </HotelContext.Provider>
  );
}
