// Importing necessary modules
import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

// Configuration for Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Using process.env to access environment variables
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file on Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Check if localFilePath is provided
        if (!localFilePath) {
            console.log("Could not find path");
            return null; // Returning null if path is not provided
        }

        // Upload file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Setting resource type to auto
        });

        // File has been uploaded successfully
        console.log("File uploaded successfully: ", response.url);
        return response.url; // Returning the URL of the uploaded file
    } catch (error) {
        // Remove the locally saved temporary files if the upload operation fails
        fs.unlinkSync(localFilePath);
        console.error("Error occurred during upload:", error);
        return null; // Returning null in case of error
    }
}

// Exporting the uploadOnCloudinary function
export { uploadOnCloudinary };
