import { asyncHandler } from "../utils/asyncHandler";

// Define an asynchronous function to handle user registration
const registerUser = asyncHandler(async (req, res) => {
  // Send a response with status 200 and a JSON object containing a message
  res.status(200).json({
    message: "ok"
  });
});
