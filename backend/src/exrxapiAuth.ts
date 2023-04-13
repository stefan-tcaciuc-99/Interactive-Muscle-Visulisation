require("dotenv").config();
import axios from "axios";
const { API_USERNAME, API_PASSWORD, API_ENDPOINT } = process.env;

let authToken: string | null = null;

export async function authenticateUser() {
  try {
    console.log("Authenticating user...");
    const response = await axios.post(`${API_ENDPOINT}/consumer/login`, {
      username: API_USERNAME,
      password: API_PASSWORD,
    });

    authToken = response.data.token;
    console.log("Authentication successful.");

    // Set a timeout to refresh the token before it expires (expires in 1 hour)
    setTimeout(() => {
      authenticateUser();
    }, 60 * 60 * 1000 - 5000);
  } catch (error) {
    console.error("Error authenticating user:", error);
  }
}

export function getAuthToken() {
  return authToken;
}
