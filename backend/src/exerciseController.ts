require("dotenv").config();
import express, { Request, Response } from "express";
import axios from "axios";
import { getAuthToken } from "./exrxapiAuth";

const {API_ENDPOINT } = process.env;

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { musclegroup, apparatus } = req.query;
  const apiUrl = API_ENDPOINT;

  try {
    console.log("Fetching exercise data...");
    const exerciseResponse = await axios.get(
      `${apiUrl}/exrxapi/v1/allinclusive/exercises`,
      {
        params: {
          exercisename: "null",
          bodypart: "null",
          musclegroup: musclegroup||"null",
          apparatus: apparatus||"null",
          difficulty: "null",
          utility_name: "null",
          movement_name: "null",
          apparatus_groups_name: "null",
          mechanics: "null",
          force: "null",
          movement: "null",
          subcategory: "null",
          synergists: "null",
          stabilizers: "null",
        },
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );

    const exercises = Object.values(exerciseResponse.data.exercises);

    console.log("Exercise response:", exerciseResponse);
    console.log(musclegroup||"null", apparatus||"null");

    console.log("Sending response...");
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    res.status(500).json({ message: "Error fetching exercise data" });
  }
});

export default router;
