const router = require("express").Router();
const multer = require("../middleware/multer-config"); // Import the multer middleware

const postController = require("../controllers/post.controllers");
const commentController = require("../controllers/comment.controllers");
const uploadController = require("../controllers/upload.controllers");

// Post routes
router.get("/", postController.getAllPost);
router.get("/:id", postController.readPost);
router.post("/", multer, postController.createPost);
router.put("/:id", multer, postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
// router.patch('/unlike-post/:id', postController.unlikePost);

// Routes for comment

router.patch("/comment-post/:id", commentController.commentPost);
router.patch("/edit-comment-post/:id", commentController.editCommentPost);
router.delete("/delete-comment-post/:id", commentController.deleteCommentPost);

// Routes for upload
router.post("/upload/:id", multer, uploadController.uploadPost);
router.delete("/delete-upload/:id", multer, uploadController.deleteUploadPost);

module.exports = router;
