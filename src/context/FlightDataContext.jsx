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

const FlightContext = createContext(null);

export const useFlightContext = () => useContext(FlightContext);

export default function FlightContextProvider({ children: child }) {
  const [paymentInfo, setPaymentInfo] = useState(
    getLocalItem("payment-info", initialPaymentInfo)
  );

  const getData = useCallback(async () => {
    try {
    } catch (error) {
      toast.error(
        error?.response?.data || "Something went wrong searching for hotel"
      );
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <FlightContext.Provider
      value={{
        paymentInfo,
        setPaymentInfo,
      }}
    >
      {child}
    </FlightContext.Provider>
  );
}
