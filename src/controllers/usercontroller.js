// Importing necessary modules
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary_service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Handler function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  // Extracting user input from request body
  const { fullName, email, username, password } = req.body;

  // Basic validation to ensure all required fields are filled
  if ([fullName, email, username, password].some(field => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if a user with the same email or username already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  // If user already exists, throw a conflict error
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Extract the local path of the avatar image, if provided
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // Check if avatar file is provided
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar image to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  
  // Check if avatar upload was successful
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar file");
  }

  // Upload cover image to Cloudinary
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // Create new user in the database
 const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // If cover image is not provided, set to empty string
    email,
    password,
    username: username.toLowerCase(), // Convert username to lowercase
  });

  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser)
  {
    throw new ApiError(500,"something went Wrong while regsitering the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registerd Sucessfully")

  )

});




// Exporting the registerUser function
export { registerUser };
