import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED.....", err);
    });
