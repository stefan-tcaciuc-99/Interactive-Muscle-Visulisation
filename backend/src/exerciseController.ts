require("dotenv").config();
import express, { Request, Response } from "express";
import axios from "axios";

const { API_USERNAME, API_PASSWORD, API_ENDPOINT } = process.env;

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { muscle, apparatus } = req.query;
  const apiUrl = API_ENDPOINT;

  try {
    console.log("Authenticating user...");
    const response = await axios.post(`${apiUrl}/consumer/login`, {
      username: API_USERNAME,
      password: API_PASSWORD,
    });

    const { token } = response.data;

    console.log("Fetching exercise data...");
    const exerciseResponse = await axios.get(
      `${apiUrl}/exrxapi/v1/allinclusive/exercises`,
      {
        params: {
          exercisename: null,
          bodypart: null,
          musclegroup: muscle,
          apparatus: apparatus,
          difficulty: null,
          utility_name: null,
          movement_name: null,
          apparatus_groups_name: null,
          mechanics: null,
          force: null,
          movement: null,
          subcategory: null,
          synergists: null,
          stabilizers: null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Sending response...");
    res.json(exerciseResponse.data);
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    res.status(500).json({ message: "Error fetching exercise data" });
  }
});

export default router;
