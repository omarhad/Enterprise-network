const PostModel = require("../models/model.posts");
const UserModel = require("../models/model.users");
const ObjectId = require("mongoose").Types.ObjectId;

// -----------------------------------------------------------------------------------------------
// PATCH : Comment
exports.commentPost = async (req, res) => {
  /** comment a post
   * @param { String } postId         | id of the user : required
   * @param { String } commenterId    | id of the post : required
   * @return { Promise } post
   **/

  const postId = req.params.id; // Get the id of the post
  const { commenterId, text } = req.body; // Get the id of the post

  // Check if the id is valid
  if (!ObjectId.isValid(postId)) {
    const message = `The id : ${postId} | is not valid`;
    return res.status(400).json({ message, data: commenterId });
  }

  const user = await UserModel.findById(commenterId); // Find the user
  await PostModel.findById(postId) // Find the post
    .then((post) => {
      if (!post) {
        const message = `Post not found`;
        return res.status(400).json({ message, data: commenterId });
      }
      if (!user) {
        const message = `User not found`;
        return res.status(400).json({ message, data: commenterId });
      }
      const newComment = {
        commenterId: commenterId,
        text: text,
        timestamp: new Date().getTime(),
      };
      post.comments.push(newComment);
      post.save();
      const message = "The comment has been created";
      return res.status(201).json({ message, data: post });
    })
    // Error handling
    .catch((error) => {
      const message = "The comment could not be created. try again later.";
      res.status(500).json({ message, data: error });
    });
};

exports.editCommentPost = async (req, res) => {
  /**
   * edit a comment
   * @param { String } postId         | id of the user : required
   * @param { String } commenterId    | id of the post : required
   * @param { String } commentId      | comment of the post
   * @param { String } text           | text of the comment
   * @return { Promise } post
   */

  const postId = req.params.id; // Get the id of the post
  const { commenterId, commentId, text } = req.body; // Get the id of the post

  // Check if the id is valid
  if (!ObjectId.isValid(postId)) {
    const message = `The id : ${postId} | is not valid`;
    return res.status(400).json({ message, data: commenterId });
  }

  await PostModel.findById(postId) // Find the post
    .then((post) => {
      if (!post) {
        // Check if the post exist
        const message = `Post not found`;
        return res.status(400).json({ message, data: postId });
      }
      const comment = post.comments.find((comment) => comment._id == commentId); // Find the comment
      if (!comment) {
        // Check if the comment exist
        const message = `Comment not found`;
        return res.status(400).json({ message, data: commentId });
      }
      if (comment.commenterId != commenterId) {
        // Check if the user is the owner of the comment
        const message = `You are not the owner of the comment`;
        return res.status(400).json({ message, data: commenterId });
      }
      comment.text = text; // Edit the comment
      post.save(); // Save the post
      const message = "The comment has been edited";
      return res.status(201).json({ message, data: post });
    })
    // Error handling
    .catch((error) => {
      const message = "The comment could not be edited. try again later.";
      return res.status(500).json({ message, data: error });
    });
};

exports.deleteCommentPost = async (req, res) => {
  /**
   * delete a comment
   * @param { String } postId         | id of the user : required
   * @param { String } commenterId    | id of the post : required
   * @param { String } commentId      | comment of the post
   * @return { Promise } post
   */

  const postId = req.params.id; // Get the id of the post
  const { commenterId, commentId } = req.body; // Get the id of the post

  // Check if the id is valid
  if (!ObjectId.isValid(postId)) {
    const message = `The id : ${postId} | is not valid`;
    return res.status(400).json({ message, data: commenterId });
  }

  await PostModel.findById(postId) // Find the post
    .then((post) => {
      if (!post) {
        // Check if the post exist
        const message = `Post not found`;
        return res.status(400).json({ message, data: postId });
      }
      const comment = post.comments.find((comment) => comment._id == commentId); // Find the comment
      if (!comment) {
        // Check if the comment exist
        const message = `Comment not found`;
        return res.status(400).json({ message, data: commentId });
      }
      if (comment.commenterId != commenterId) {
        // Check if the user is the owner of the comment
        const message = `You are not the owner of the comment`;
        return res.status(400).json({ message, data: commenterId });
      }
      post.comments.splice(post.comments.indexOf(comment), 1); // Delete the comment
      post.save(); // Save the post with the new comment
      const message = "The comment has been deleted";
      return res.status(201).json({ message, data: post });
    })
    // Error handling
    .catch((error) => {
      const message = "The comment could not be deleted. try again later.";
      return res.status(500).json({ message, data: error });
    });
};
