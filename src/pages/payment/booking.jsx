import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useHotelContext } from "../../context/HotelDataContext";
import {
  calculateNights,
  generateRandomString,
  getLocalItem,
} from "../../utils";
import PaymentLayout from "../../Components/PaymentLayout";
import { initialContactDetails, monthNumbers } from "../../Data";

const Payment = () => {
  const { hotelData, formData, selectedRoom, paymentInfo } = useHotelContext();
  const router = useRouter();
  const contactDetails = getLocalItem("contact-details", initialContactDetails);
  const adultData = getLocalItem("adult-guests", {});
  const childrenData = getLocalItem("children-guests", {});
  const mainGuest = getLocalItem("main-guest", {});

  async function bookHotel(e) {
    e.preventDefault();
    const checkInDate = new Date(formData?.checkin);
    const currentDate = new Date();

    const BookingReferenceId = generateRandomString(10);
    const ClientReferenceId = generateRandomString(10);

    const bookingReqParams = {
      BookingCode: selectedRoom?.BookingCode,
      CustomerDetails: [
        {
          CustomerNames: [
            {
              Title:
                mainGuest?.gender.charAt(0).toUpperCase() +
                mainGuest?.gender.slice(1),
              FirstName: mainGuest?.firstName,
              LastName: mainGuest?.lastName,
              Type: "Adult",
            },
            ...Object.values(adultData).map((d) => ({
              Title: d?.gender.charAt(0).toUpperCase() + d?.gender.slice(1),
              FirstName: d?.firstName,
              LastName: d?.lastName,
              Type: "Adult",
            })),
            ...Object.values(childrenData).map((d) => ({
              Title: d?.gender.charAt(0).toUpperCase() + d?.gender.slice(1),
              FirstName: d?.firstName,
              LastName: d?.lastName,
              Type: "Child",
            })),
          ],
        },
      ],
      ClientReferenceId,
      BookingReferenceId,
      TotalFare: paymentInfo?.address1,
      EmailId: paymentInfo?.email || contactDetails?.email,
      PhoneNumber: paymentInfo?.phone || contactDetails?.phone,
      BookingType: "Voucher",
      PaymentMode: "NewCard",
      PaymentInfo: {
        CvvNumber: paymentInfo?.cardCVC,
        CardNumber: paymentInfo?.cardNumber,
        CardExpirationMonth: monthNumbers[paymentInfo?.cardExpiryMonth],
        CardExpirationYear: paymentInfo?.cardExpiryYear,
        CardHolderFirstName: paymentInfo?.cardName?.split(" ")[0],
        CardHolderlastName: paymentInfo?.cardName?.split(" ")[1],
        BillingAmount:
          selectedRoom?.TotalFare * 0.193 +
          selectedRoom?.TotalTax +
          selectedRoom?.TotalFare -
          selectedRoom?.TotalFare * 0.193,
        BillingCurrency: hotelData?.Currency,
        CardHolderAddress: {
          AddressLine1: paymentInfo?.address1,
          AddressLine2: paymentInfo?.address2,
          City: paymentInfo?.city,
          PostalCode: paymentInfo?.postalCode,
          CountryCode: paymentInfo?.country,
        },
      },
    };

    try {
      const result = await axios
        .post(
          `/api/book-hotel?path=${
            checkInDate?.toDateString() !== currentDate?.toDateString()
              ? "/PreBook"
              : "/Book"
          }`,
          bookingReqParams
        )
        .then((r) => r.data);

      if (result?.Status?.Code !== 200) {
        return toast.error(result?.Status?.Description);
      }

      const bookingDetail = await axios
        .post("/api/booking-detail", {
          BookingReferenceId,
          ConfirmationNumber: result?.Status?.ConfirmationNumber,
        })
        .then((r) => r.data)
        .catch((e) => {
          console.error(e);
          return {};
        });

      const prevBookings = getLocalItem("booking-result", []);

      localStorage.setItem(
        "booking-result",
        JSON.stringify([
          ...prevBookings,
          {
            ...result,
            BookingReferenceId,
            ClientReferenceId,
            bookingDetail,
            formData,
            hotelData,
            selectedRoom,
            paymentInfo,
            adultData,
            childrenData,
            mainGuest,
            contactDetails,
          },
        ])
      );

      toast.success("Payment Successful !");

      localStorage.removeItem("guest-details");
      localStorage.removeItem("main-guest");
      localStorage.removeItem("selectedRoom");
      localStorage.removeItem("hotelData");
      localStorage.removeItem("paymentInfo");
      localStorage.removeItem("adult-guests");
      localStorage.removeItem("children-guests");
      localStorage.removeItem("contact-details");

      router.push({
        pathname: "/booking-details",
        query: {
          bookingId: BookingReferenceId,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <PaymentLayout onSubmit={bookHotel}>
      <div className="book-sum-dv">
        <p>Booking summary</p>
        <h6>{hotelData?.HotelName}</h6>
        <p>
          {formData?.checkin} - {formData?.checkout} (
          {calculateNights(formData?.checkin, formData?.checkout)} Nights)
        </p>
        <h5>
          Total : {getSymbolFromCurrency(hotelData?.Currency)}
          {(
            selectedRoom?.TotalFare * 0.193 +
            selectedRoom?.TotalTax +
            selectedRoom?.TotalFare -
            selectedRoom?.TotalFare * 0.193
          ).toFixed(2)}
        </h5>
      </div>
    </PaymentLayout>
  );
};

export default Payment;
