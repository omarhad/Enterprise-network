const router = require("express").Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config"); // Import the multer middleware

// Import the controllers
const userController = require("../controllers/user.controllers");
const authController = require("../controllers/auth.controllers");
const uploadController = require("../controllers/upload.controllers");

// Auth routes
router.post( "/register", authController.register);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

// User routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Upload routes
router.post('/upload', multer, uploadController.uploadProfil);

module.exports = router;
