import multer from "multer";

// Configuring storage options for multer
const storage = multer.diskStorage({
    // Defining the destination folder for uploaded files
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    // Defining the filename for uploaded files
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Exporting a configured multer instance with specified storage options
export const upload = multer({ 
    storage, 
});
