const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const authController = require("../controllers/auth.controllers");

// Auth routes
router.post("/register", authController.register);

// User routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
