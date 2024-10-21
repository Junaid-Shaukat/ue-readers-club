import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import { userRoute } from "./Route/userRoute.js";
import { adminRoute } from "./Route/adminRoute.js";
import { commentRoute } from "./Route/commentRoute.js";


const app = express();

// Load environment variables from .env file
dotenv.config();

// Database connection
import mongodbconnection from "./mongodb-connection.js";

mongodbconnection();

const port = 3001;

// Add middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000','https://ue-readers-club.vercel.app'], // Replace with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define your routes
app.use("/admin", adminRoute);
app.use("/comment", commentRoute);
app.use("/users",userRoute );
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
