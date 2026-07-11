const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController");

const AuthMiddleware = require("../middlewares/AuthMiddleware");

const AdminMiddleware = require("../middlewares/AdminMiddleware");

router.get(
    "/users",
    AuthMiddleware.isAuthenticated,
    AdminMiddleware.isAdmin,
    UserController.index
);

router.delete(
    "/users/:id",
    AuthMiddleware.isAuthenticated,
    AdminMiddleware.isAdmin,
    UserController.destroy
);

module.exports = router;