import axios from "axios";

const TOKEN_EXPIRY_TIME = 15 * 60 * 1000;

export const authenticate = async () => {
  const storedToken = localStorage.getItem("tokenId");
  const tokenExpiryTime = localStorage.getItem("tokenExpiryTime");

  if (
    storedToken &&
    tokenExpiryTime &&
    new Date().getTime() < tokenExpiryTime
  ) {
    return { tokenId: storedToken };
  }

  const credentials = {
    BookingMode: "API",
    UserName: "albukhari",
    Password: "Alb@75736496",
    IPAddress: "192.168.11.120",
  };

  try {
    const response = await axios.post("/api/authenticate", credentials);
    const data = response.data;

    console.log("data", data);

    if (data && data.TokenId && data.TrackingId) {
      const currentTime = new Date().getTime();
      localStorage.setItem("tokenId", data.TokenId);
      localStorage.setItem("tokenExpiryTime", currentTime + TOKEN_EXPIRY_TIME);
      return { tokenId: data.TokenId, trackingId: data.TrackingId };
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
};

export const searchFlights = async (searchPayload) => {
  const authResponse = await authenticate();
  if (!authResponse) {
    console.error("Failed to authenticate.");
    return null;
  }

  const { tokenId } = authResponse;

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
