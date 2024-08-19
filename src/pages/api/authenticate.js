import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("inside authenticate api");
    try {
      const response = await axios.post(
        "https://tboairdemo.techmaster.in/API/API/v1/Authenticate/ValidateAgency/",
        req.body
      );
      console.log("response", response);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error during authentication" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
