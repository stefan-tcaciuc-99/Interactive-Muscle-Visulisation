import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import admin from "./firebaseAdmin";
import { UserRecord } from "firebase-admin/lib/auth";


// Create Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON and URL-encoded query string data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.get('/', (req: Request, res: Response) => {
  res.send('API is working');
});

app.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(201).json({ token: customToken });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).json({ token: customToken });
  } catch (error:any) { 
    res.status(400).json({ error: error.message });
  }
});


// Start the server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
