import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { tokenId, searchPayload } = req.body;
    console.log("searchPayload", searchPayload);

    try {
      const response = await axios.post(
        "https://apistaging.tboair.com/InternalAirService.svc/rest/Search/",
        searchPayload,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error during flight search:",
        error.response?.data || error.message
      );
      res
        .status(500)
        .json({
          error: "Error during flight search",
          details: error.response?.data || error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
