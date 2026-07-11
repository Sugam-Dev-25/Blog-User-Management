const express = require("express");

const router = express.Router();

const BlogController = require("../controllers/BlogController");

const AuthMiddleware = require("../middlewares/AuthMiddleware");

const upload = require("../config/multer");

router.get(
    "/blogs",
    BlogController.index
);

router.get(
    "/blogs/create",
    AuthMiddleware.isAuthenticated,
    BlogController.create
);

router.post(
    "/blogs",
    AuthMiddleware.isAuthenticated,
    upload.single("image"),
    BlogController.store
);

router.get(
    "/blogs/edit/:id",
    AuthMiddleware.isAuthenticated,
    BlogController.edit
);

router.get(
    "/blogs/:id",
    BlogController.show
);

router.put(
    "/blogs/:id",
    AuthMiddleware.isAuthenticated,
    upload.single("image"),
    BlogController.update
);

router.delete(
    "/blogs/:id",
    AuthMiddleware.isAuthenticated,
    BlogController.destroy
);

module.exports = router;