const fs = require("fs");
const path = require("path");

class DeleteImage {

    remove(folder, fileName) {

        if (!fileName) return;

        const filePath = path.join(
            process.cwd(),
            "uploads",
            folder,
            fileName
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

    }

}

module.exports = new DeleteImage();