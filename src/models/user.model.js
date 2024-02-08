// Importing required modules
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    fullName: {
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

// Middleware to hash the password before saving
UserSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to verify if the entered password matches the stored hashed password
UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for user authentication
UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Method to generate a refresh token for user authentication
UserSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Define the User model
export const User = mongoose.model("User", UserSchema);
