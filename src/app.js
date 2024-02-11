import express from "express"; // Import the Express framework
import cors from "cors"; // Import Cross-Origin Resource Sharing middleware
import cookieParser from "cookie-parser"; // Import Cookie Parser middleware

// Create an Express application instance
const app = express();

// Enable CORS with specified options
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Set the allowed origin from environment variable
  credentials: true 
}));

// Parse incoming JSON data with a specified limit
app.use(express.json({
  limit: "16kb" // Set the limit of JSON data size to 16kb
}));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded data with extended mode and a specified limit
app.use(express.urlencoded({
    extended: true, // Use extended mode for URL parsing
    limit: "16kb" // Set the limit of URL-encoded data size to 16kb
}));

// Parse cookies attached to the request
app.use(cookieParser());

 
import userRouter from './routes/user.route.js'; // Assuming the correct filename and path

// Mounting the userRouter at the correct URL path
app.use("/api/v1/users", userRouter)


// Export the Express application instance
export { app };
