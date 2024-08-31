export const HOTEL_API_URL = 'https://api.tbotechnology.in/TBOHolidays_HotelAPI';
const HOTEL_API_USERNAME = process.env.HOTEL_API_USERNAME || '';
const HOTEL_API_PASSWORD = process.env.HOTEL_API_PASSWORD || '';

export const hotelApiHeaders = {
    Authorization: 'Basic '+typeof window !== 'undefined' ? btoa(`${HOTEL_API_USERNAME}:${HOTEL_API_PASSWORD}`) : ''
}