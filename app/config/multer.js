const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/blogs");

    },

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname);

        const fileName = Date.now() + ext;

        cb(null, fileName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowed = /jpg|jpeg|png|webp/;

    const ext = allowed.test(path.extname(file.originalname).toLowerCase());

    const mime = allowed.test(file.mimetype);

    if (ext && mime) {

        return cb(null, true);

    }

    cb(new Error("Only Image Allowed"));

};

module.exports = multer({

    storage,

    fileFilter

});