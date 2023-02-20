import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

// Create Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON and URL-encoded query string data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.get('/api', (req: Request, res: Response) => {
  res.send('API is working');
});

// Start the server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
