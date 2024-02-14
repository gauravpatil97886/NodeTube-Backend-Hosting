import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
  loginUser, 
  logoutUser, 
  registerUser,refreshAccessToken, 
  ChangeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  getUserChannelProfile,
  getWatchHistory,
  updateUserCoverImage
} from "../controllers/usercontroller.js";
import multer from "multer";


const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshtoken").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,ChangeCurrentPassword)

router.route("/current-user").post(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

router.route("/watchhistory").get(verifyJWT,getWatchHistory)


export default router;
