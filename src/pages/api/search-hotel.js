import { hotelApiInstance } from "../../configs/hotelApi";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cityCode } = req.query;

    try {
      const HotelCodes = await hotelApiInstance.post('/TBOHotelCodeList', {
        CityCode: cityCode || "113116",
        "IsDetailedResponse": "true"
      }).then(r => r.data.Hotels);
      const response = await hotelApiInstance.post(
        "/search",
        { ...req.body, HotelCodes: HotelCodes.map(h => h.HotelCode).join(',') },
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
