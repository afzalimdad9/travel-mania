import { formatDate } from "./utils";

export const semlessData = [
  {
    cardNum: "1",
    title: "Unrivaled Selection",
    desc: "Whether you're searching for the perfect hotel, seeking out the best attractions, or booking your next flight, we've got you covered with an unparalleled selection of options to suit every budget and preference.",
  },
  {
    cardNum: "2",
    title: "Ease and Convenience",
    desc: "Say goodbye to endless browsing and complicated booking processes. With our user-friendly interface and intuitive search tools, finding and booking your ideal travel arrangements has never been easier",
  },
  {
    cardNum: "3",
    title: "Best Price Guarantee",
    desc: "We're committed to offering you the best deals on hotels, attractions, and flights. With our competitive prices and exclusive discounts, you can rest assured that you're getting unbeatable value for your money.",
  },
  {
    cardNum: "4",
    title: "Expert Advice and Recommen dations",
    desc: "We're committed to offering you the best deals on hotels, attractions, and flights. With our competitive prices and exclusive discounts, you can rest assured that you're getting unbeatable value for your money.",
  },
  {
    cardNum: "5",
    title: "Secure and Reliable",
    desc: "Say goodbye to endless browsing and complicated booking processes. With our user-friendly interface and intuitive search tools, finding and booking your ideal travel arrangements has never been easier",
  },
  {
    cardNum: "6",
    title: "Exceptional Customer Service",
    desc: "We're committed to offering you the best deals on hotels, attractions, and flights. With our competitive prices and exclusive discounts, you can rest value for your money.",
  },
];


export let monthNumbers = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export const initialPaymentInfo = {
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

export const initialDetails = {
  gender: "mr",
  firstName: "",
  lastName: "",
  dob: formatDate(new Date().toISOString()),
  nationality: "",
  documentType: "",
  country: "",
};

export const initialContactDetails = {
  primaryContact: "",
  nationality: "",
  phone: "",
  email: "",
};