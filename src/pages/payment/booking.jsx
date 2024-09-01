import Head from "next/head";
import React, { useCallback } from "react";
import Layout from "../../layout/index";
import Image from "next/image";
import Link from "next/link";
import { useHotelContext } from "../../context/HotelDataContext";
import {
  calculateNights,
  generateRandomString,
  getLocalItem,
} from "../../utils";
import getSymbolFromCurrency from "currency-symbol-map";
import months from "months";
import { useRouter } from "next/router";
import { countries } from "iso-3166-1-alpha-2";
import { toast } from "react-toastify";
import axios from "axios";

const initialContactDetails = {
  primaryContact: "",
  nationality: "",
  phone: "",
  email: "",
};

const Payment = () => {
  const { hotelData, formData, selectedRoom, paymentInfo, setPaymentInfo } =
    useHotelContext();
  const router = useRouter();
  const contactDetails = getLocalItem("contact-details", initialContactDetails);
  const adultData = getLocalItem("adult-guests", {});
  const childrenData = getLocalItem("children-guests", {});
  const mainGuest = getLocalItem("main-guest", {});

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setPaymentInfo((prev) => ({
        ...prev,
        [name]: value,
      }));

      localStorage.setItem(
        "payment-info",
        JSON.stringify({ ...paymentInfo, [name]: value })
      );
    },
    [setPaymentInfo, paymentInfo]
  );
  let monthNumbers = {
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

      localStorage.setItem(
        "booking-result",
        JSON.stringify({
          ...result,
          BookingReferenceId,
          ClientReferenceId,
        })
      );

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
      localStorage.setItem("bookingDetail", JSON.stringify(bookingDetail));

      toast.success("Payment Successful !");

      router.push({
        pathname: "/hotel-details",
        query: formData,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Head>
        <title>Seat Selection</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout noBanner>
        <section className="payment-sec">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-12">
                <div className="payment-mn-dv">
                  <div className="pay-dv">
                    <h6>Pay in your card currency</h6>
                    <p>
                      As a Visa or Mastercard credit cardholder, you can pay in
                      the currency of the country where your card was issued.
                    </p>
                  </div>
                  <div className="payment-form-mn">
                    <h6>Select your preferred payment method</h6>
                    <p>Debit / Credit cards</p>
                    <Image
                      src={"/images/card-img.png"}
                      width={350}
                      height={45}
                      alt="img"
                    />
                    <form action="#">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="field">
                            <label>Debit/ Credit Card Number</label>
                            <input
                              name="cardNumber"
                              onChange={handleChange}
                              value={paymentInfo?.cardNumber}
                              type="text"
                              placeholder="Enter the card number"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="field">
                            <label>Card Expiry</label>
                            <select
                              name="cardExpiryMonth"
                              onChange={handleChange}
                              value={paymentInfo?.cardExpiryMonth}
                            >
                              <option value="" disabled>
                                Month
                              </option>
                              {months.map((month, idx) => (
                                <option key={idx} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="field">
                            <label>Year</label>
                            <select
                              name="cardExpiryYear"
                              onChange={handleChange}
                              value={paymentInfo?.cardExpiryYear}
                            >
                              <option value="" disabled>
                                Year
                              </option>
                              {new Array(15).fill(" ").map((_, idx) => (
                                <option
                                  key={idx}
                                  value={idx + new Date().getFullYear()}
                                >
                                  {idx + new Date().getFullYear()}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="field">
                            <label>CVV/CVC</label>
                            <input
                              type="text"
                              name="cardCVC"
                              onChange={handleChange}
                              value={paymentInfo?.cardCVC}
                              placeholder="CVV/CVC"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>Name on Card</label>
                            <input
                              type="text"
                              name="cardName"
                              onChange={handleChange}
                              value={paymentInfo?.cardName}
                              placeholder="Enter the name printed on Card"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>Email Address (optional)</label>
                            <input
                              name="email"
                              onChange={handleChange}
                              value={paymentInfo?.email}
                              type="email"
                              placeholder="Email Address (optional)"
                            />
                          </div>
                        </div>
                      </div>
                    </form>

                    <div className="billing-from">
                      <h6>Billing Address</h6>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="field">
                            <label>Country Region</label>
                            <select
                              name="country"
                              onChange={handleChange}
                              value={paymentInfo?.country}
                            >
                              <option value="">Country Region</option>
                              {Object.entries(countries).map(([k, v], idx) => (
                                <option value={k} key={idx}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>Postal/zip code</label>
                            <input
                              type="number"
                              name="postalCode"
                              onChange={handleChange}
                              value={paymentInfo?.postalCode}
                              placeholder="Postal/zip code"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>Address line 1</label>
                            <input
                              name="address1"
                              onChange={handleChange}
                              value={paymentInfo?.address1}
                              type="text"
                              placeholder="Address line 1"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>Address line 2 (optional)</label>
                            <input
                              type="text"
                              name="address2"
                              onChange={handleChange}
                              value={paymentInfo?.address2}
                              placeholder="Address line 2 (optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>Town/ City</label>
                            <input
                              type="text"
                              name="city"
                              onChange={handleChange}
                              value={paymentInfo?.city}
                              placeholder="Town/ City"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field">
                            <label>State (optional)</label>
                            <input
                              type="text"
                              name="state"
                              onChange={handleChange}
                              value={paymentInfo?.state}
                              placeholder="State (optional)"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="field checkbox-field">
                            <input type="checkbox" />
                            <p>
                              I agree to the Travel Mania{" "}
                              <Link href={""}>terms and conditions.</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btn-field-sub">
                      <Link href={""} onClick={bookHotel} className="btn10">
                        Confirm Payment
                      </Link>
                      <Link
                        href={""}
                        onClick={router.back}
                        className="btn-back"
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="book-sum-dv">
                  <p>Booking summary</p>
                  <h6>{hotelData?.HotelName}</h6>
                  <p>
                    {formData?.checkin} - {formData?.checkout} (
                    {calculateNights(formData?.checkin, formData?.checkout)}{" "}
                    Nights)
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
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Payment;
