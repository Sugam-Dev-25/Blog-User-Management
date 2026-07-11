const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const profileUpload = require("../config/profileMulter");

router.get(
    "/profile",
    AuthMiddleware.isAuthenticated,
    AuthController.profile
);

router.post(
    "/profile",
    AuthMiddleware.isAuthenticated,
    profileUpload.single("profile"),
    AuthController.updateProfile
);

module.exports = router;