import axios from "axios";

export const authenticate = async () => {
  const credentials = {
    BookingMode: "API",
    UserName: "albukhari",
    Password: "Alb@75736496",
    IPAddress: "192.168.11.120",
  };

  try {
    const response = await axios.post("/api/authenticate", credentials);
    console.log("response", response);
    const data = response.data;

    if (data && data.TokenId && data.TrackingId) {
      return { tokenId: data.TokenId, trackingId: data.TrackingId };
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
};

export const searchFlights = async (tokenId, searchPayload) => {
  try {
    const response = await axios.post(
      "https://apistaging.tboair.com/InternalAirService.svc/rest/Search/",
      searchPayload,
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    );
    if (response.data.ResponseStatus === 1) {
      return response.data.Results;
    } else {
      console.error("Flight search failed:", response.data.ErrorMessage);
    }
  } catch (error) {
    console.error("Error during flight search:", error);
  }
};
