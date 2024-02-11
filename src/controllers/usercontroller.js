import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    messages: ["ok ", "your", "welcome"] // Array of messages
  });
});

export { registerUser };
