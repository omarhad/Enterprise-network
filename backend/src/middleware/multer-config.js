const multer = require("multer"); // Multer : gestionnaire de fichiers

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images"); // Set the destination of the file
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split("."); // Replace spaces by underscores
    const extension = MIME_TYPES[file.mimetype]; // Get the extension of the file
    callback(null, name[0] + "-" + Date.now() + "." + extension); // Add a timestamp to the file name
  },
});

module.exports = multer({ storage: storage }).single("file"); // Export the multer configuration
