import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/router";
import { getLocalItem } from "../utils";

const HotelContext = createContext(null);

const initialPaymentInfo = {
  cardNumber: "",
  cardExpiryMonth: "",
  cardExpiryYear: "",
  cardCVC: "",
  cardName: "",
  email: "",
  country: "",
  postalCode: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
};

export const useHotelContext = () => useContext(HotelContext);

export default function HotelContextProvider({ children: child }) {
  const router = useRouter();
  const { stayplace, checkin, checkout, adults, children } = router.query;
  const [hotelData, setHotelData] = useState(getLocalItem("hotelData", null));
  const [selectedRoom, setSelectedRoom] = useState(
    getLocalItem("selectedRoom", null)
  );
  const [categories, setCategories] = useState(getLocalItem("categories", []));
  const [city, setCity] = useState(getLocalItem("cities", []));
  const [formData, setFormData] = useState(getLocalItem("guest-details", null));
  const [paymentInfo, setPaymentInfo] = useState(
    getLocalItem("payment-info", initialPaymentInfo)
  );
  const [hotels, setHotels] = useState(getLocalItem("hotelResults", []));

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
      const recentLocation = localStorage.getItem("recent-location");

      if (recentLocation !== null && recentLocation === stayplace) return;

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
      localStorage.setItem(
        "categories",
        JSON.stringify(result.map((d) => d.HotelFacilities).flat())
      );
      setCity(cityResult);
      localStorage.setItem("cities", JSON.stringify(cityResult));
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
      localStorage.setItem("recent-location", stayplace);
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
        selectedRoom,
        setSelectedRoom,
        formData,
        setFormData,
        paymentInfo,
        setPaymentInfo,
      }}
    >
      <ToastContainer />
      {child}
    </HotelContext.Provider>
  );
}
