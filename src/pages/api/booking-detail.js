import { hotelApiInstance } from "../../configs/hotelApi";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await hotelApiInstance.post(
        '/BookingDetail',
        req.body,
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error during hotel search:",
        error.response?.data || error.message
      );
      res
        .status(500)
        .json({
          error: "Error during hotel search",
          details: error.response?.data || error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
