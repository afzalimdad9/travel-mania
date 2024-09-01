import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { getLocalItem } from "../utils";
import { initialPaymentInfo } from "../Data";
import { useRouter } from "next/router";
import { authenticate } from "../pages/api/flight";
import axios from "axios";

const FlightContext = createContext(null);

export const useFlightContext = () => useContext(FlightContext);

export default function FlightContextProvider({ children: child }) {
  const [paymentInfo, setPaymentInfo] = useState(
    getLocalItem("payment-info", initialPaymentInfo)
  );
  const [flightInfo, setFlightInfo] = useState(
    getLocalItem("flight-info", null)
  );
  const [flights, setFlights] = useState(getLocalItem("flightResults", []));
  const [selectedFlight, setSelectedFlight] = useState(
    getLocalItem("selectedFlight", null)
  );
  const { query } = useRouter();
  const {
    adults,
    children,
    tripType,
    from,
    to,
    flightMode,
    departureDate,
    returnDate,
  } = query;

  const getData = useCallback(async () => {
    if (!flightMode) return;

    try {
      const authResponse = await authenticate();

      if (!authResponse) {
        toast.error("Authentication failed. Cannot proceed with the search.");
        return;
      }

      const { tokenId } = authResponse;

      const searchPayload = {
        EndUserIp: "192.168.11.120",
        TokenId: tokenId,
        AdultCount: adults,
        ChildCount: children,
        InfantCount: 0,
        JourneyType: tripType === "round-trip" ? 2 : 1,
        DirectFlight: "false",
        OneStopFlight: "false",
        PreferredAirlines: null,
        BookingMode: tripType === "round-trip" ? 2 : 1,
        Segments: [
          {
            Origin: from,
            Destination: to,
            FlightCabinClass:
              flightMode === "Economy" ? 2 : flightMode === "Business" ? 4 : 3,
            PreferredDepartureTime: departureDate,
          },
          tripType === "round-trip" && {
            Origin: to,
            Destination: from,
            FlightCabinClass:
              flightMode === "Economy" ? 2 : flightMode === "Business" ? 4 : 3,
            PreferredDepartureTime: returnDate,
          },
        ].filter(Boolean),
        Sources: null,
      };

      const response = await axios.post("/api/search", {
        tokenId,
        searchPayload,
      });
      const flightResults = response.data;
      if (flightResults && flightResults.Response.ResponseStatus === 1) {
        localStorage.setItem(
          "flightResults",
          JSON.stringify(flightResults.Response.Results[0])
        );

        localStorage.setItem("TraceId", flightResults.Response.TraceId);

        setFlights(flightResults.Response.Results[0]);
      } else if (flightResults && flightResults.Error) {
        toast.error(
          `Error: ${
            flightResults.Error.ErrorMessage || "An unexpected error occurred"
          }`
        );
      } else {
        toast.error("An unexpected error occurred during flight search.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data || "Something went wrong searching for flight"
      );
    }
  }, [
    adults,
    children,
    tripType,
    from,
    to,
    flightMode,
    departureDate,
    returnDate,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <FlightContext.Provider
      value={{
        paymentInfo,
        setPaymentInfo,
        flights,
        setFlights,
        selectedFlight,
        setSelectedFlight,
        flightInfo,
        setFlightInfo,
      }}
    >
      {child}
    </FlightContext.Provider>
  );
}
