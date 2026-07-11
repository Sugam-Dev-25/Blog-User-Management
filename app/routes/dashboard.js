const express = require("express");

const router = express.Router();

const DashboardController = require("../controllers/DashboardController");

const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get(
    "/dashboard",
    AuthMiddleware.isAuthenticated,
    DashboardController.index
);

module.exports = router;