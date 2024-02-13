import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true, sparse: true } // Adding unique sparse index to fullName field
    },
    avatar: {
      type: String,
      required: true// cloudinary url
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password: {
      type: String,
      required: [true, 'Password is required for the account'] // Improved error message
    },
    refreshToken: {
      type: String
    }

  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function(password){
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

userSchema.methods.generateAccessToken = function(){
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    );
  } catch (error) {
    return null;
  }
};

userSchema.methods.generateRefreshToken = function(){
  try {
    return jwt.sign(
      {
        _id: this._id,
        
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    );
  } catch (error) {
    return null;
  }
};

export const User = mongoose.model("User", userSchema);
