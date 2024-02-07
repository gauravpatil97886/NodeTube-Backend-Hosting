import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" //6 43
// Define the UserSchema
const UserSchema = new Schema({
    // Unique identifier for the user
    id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // Indexing for faster retrieval
    },
    // Email of the user
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true // Trimming whitespace from the input
    },
    // Full name of the user
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true // Indexing for faster retrieval
    },
    // URL for the user's avatar image stored in Cloudinary
    avatar: {
        type: String, // Cloudinary URL
        required: true
    },
    // URL for the user's cover image
    coverImage: {
        type: String
    },
    // Array to store the user's watch history
    watchHistory: [{
        type: String, // IDs of the watched videos
        type: Schema.Types.ObjectId, // Reference to Video schema
        ref: "Video"
    }],
    // Password for the user account
    password: {
        type: String,
        required: [true, 'password is required'] // Error message if password is missing
    },
    // Refresh token for user authentication
    refreshToken: {
        type: String
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Define the User model
export const User = mongoose.model("User", UserSchema);
