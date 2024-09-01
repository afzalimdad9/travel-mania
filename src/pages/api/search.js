import { searchFlights } from "./flight";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { tokenId, searchPayload } = req.body;

    try {
      const response = await searchFlights(tokenId, searchPayload);
      res.status(200).json(response);
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
