import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    // File path for the video
    videoFile: {
        type: String,
        required: true
    },
    // URL for the video thumbnail
    thumbnail: {
        type: String,
        required: true
    },
    // Title of the video
    title: {
        type: String,
        required: true
    },
    // Description of the video
    description: {
        type: String,
        required: true
    },
    // Duration of the video in seconds
    duration: {
        type: Number,
        required: true
    },
    // Number of views for the video
    views: {
        type: Number,
        default: 0
    },
    // Flag indicating whether the video is published
    isPublished: {
        type: Boolean,
        default: true
    },
    // Reference to the user who owns the video
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

videoSchema.plugin(mongooseAggregatePaginate)
// Define the Video model
export const Video = mongoose.model("Video", videoSchema);
