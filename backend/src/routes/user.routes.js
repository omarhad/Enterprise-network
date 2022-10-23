const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const authController = require("../controllers/auth.controllers");
const auth = require("../middleware/auth");

// Auth routes
router.post( "/register", authController.register);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

// User routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
