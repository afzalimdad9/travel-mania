import axios from "axios";
import { HOTEL_API_URL, hotelApiHeaders } from ".";

export const hotelApiInstance = axios.create({
    headers: hotelApiHeaders,
    baseURL: HOTEL_API_URL
});