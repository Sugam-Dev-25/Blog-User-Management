const express = require("express");

const router = express.Router();

const PageController = require("../controllers/PageController");
const GuestMiddleware = require("../middlewares/GuestMiddleware");

router.get("/", PageController.home);

router.get(
    "/login",
    GuestMiddleware.isGuest,
    PageController.login
);

router.get(
    "/register",
    GuestMiddleware.isGuest,
    PageController.register
);

module.exports = router;