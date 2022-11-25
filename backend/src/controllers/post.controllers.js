const PostModel = require("../models/model.posts");
const UserModel = require("../models/model.users");
const ObjectId = require("mongoose").Types.ObjectId;

const { picErrors } = require("../utils/errors.utils");

exports.getAllPost = (req, res) => {
  /** get all posts
   * @return { Promise } posts
   **/
  PostModel.find((err, docs) => {
    if (!err) {
      const message = "The posts have been found";
      return res.send({ message, data: docs });
    } else {
      const message = "The posts could not be found. try again later.";
      return res.status(500).json({ message, data: err });
    }
  }).sort({
    createdAt: -1,
  });
};

// -----------------------------------------------------------------------------------------------
// POST : Create Post
exports.createPost = async (req, res) => {
  /** create a new post
   * @param { String } posterId | id of the user : required
   * @param { String } message  | message of the post
   * @param { String } video    | video of the post
   * @param { String } file     | picture of the post
   * @return { Promise } post
   **/

  const { posterId, message, video } = req.body; // Get the id of the user
  const file = []; // Create an empty array for the pictures

  if (req.file) {
    file.push({
      pic: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }); // Add the picture to the array
  }
  const newPost = new PostModel({
    // Create a new post
    posterId: posterId,
    message: message,
    video: video,
    picture: file,
  });

  try {
    await newPost.save(); // Save the new post
    const message = "The post has been created";
    return res.status(201).json({ message, data: newPost });
  } catch (error) {
    // Error handling
    const message = "The post could not be created. try again later.";
    return res.status(500).json({ message, data: error });
  }
};

exports.readPost = (req, res) => {
  /** read a post
   * @param { String } id | id of the post : required
   * @return { Promise } post
   **/

  const { id } = req.params; // Get the id of the post

  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).json({ message, data: id });
  }

  PostModel.findById(id)
    .then((post) => {
      if (!post) {
        const message = `Post not found`;
        return res.status(400).json({ message, data: id });
      }
      const message = "The post has been found";
      return res.status(200).json({ message, data: post });
    })
    // Error handling
    .catch((err) => {
      const message = "The post could not be found. try again later.";
      res.status(500).json({ message, data: err });
    });
};

exports.updatePost = async (req, res) => {
  /**
   * update a post
   * @param { String } id       | id of the post : required
   * @param { String } posterId | id of the user : required
   * @param { String } message  | message of the post
   * @param { String } video    | video of the post
   * @return { Promise } post
   */

  const { id } = req.params; // Get the id of the post
  const { posterId, message, video } = req.body; // Get the id of the user

  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid id : " + id);
  }

  await PostModel.findById(id) // Find the post in the database
    .then((post) => {
      if (!post) {
        // Check if the post exists
        const message = "The post could not be found. try again later.";
        return res.status(404).json({ message, data: post });
      }
      const updatePost = {
        // Create the new post
        message: message,
        video: video,
      };
      if (posterId !== post.posterId) {
        // Check if the user is the owner of the post
        const message = "You are not allowed to update this post.";
        return res.status(403).json({ message, data: post });
      }
      post
        .updateOne(updatePost) // Update the post
        .then(
          () => {
            PostModel.findById(post._id) // Find the new post
              .then((post) => {
                const message = "The post has been updated";
                return res.status(200).json({ message, data: post });
              });
          }
          // Error handling
        )
        .catch((err) => {
          const message = "The post could not be updated. try again later.";
          return res.status(500).json({ message, data: err });
        });
    })
    // Error handling
    .catch((err) => {
      const message = "The post could not be updated. try again later.";
      res.status(500).json({ message, data: err });
    });
};

// -----------------------------------------------------------------------------------------------
// POST : Delete Post
exports.deletePost = async (req, res) => {
  /**
   * delete a post
   * @param { String } id       | id of the post : required
   * @param { String } posterId | id of the user : required
   * @param {Boolean} isAdmin  | if the user is an admin
   * @return { Promise } post
   */

  const { id } = req.params; // Get the id of the post
  const { posterId, isAdmin } = req.body; // Get the id of the user

  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid id : " + req.params.id);
  }

  await PostModel.findById(id)
    .then((post) => {
      if (!post) {
        // Check if the post exists
        const message = "The post could not be found. try again later.";
        return res.status(404).json({ message, data: post });
      }
      if (posterId != post.posterId && !isAdmin) {
        // Check if the user is the owner of the post
        const message = "You are not allowed to delete this post.";
        return res.status(403).json({ message, data: post });
      }
      post.deleteOne((err, data) => {
        // Delete the post
        if (!err) {
          const message = "The post has been deleted";
          res.send({ message, data });
        }
      });
    })
    // Error handling
    .catch((err) => {
      const message = "The post could not be deleted. try again later.";
      return res.status(500).json({ message, data: err });
    });
};

// -----------------------------------------------------------------------------------------------
// PATCH : Like Post
exports.likePost = async (req, res) => {
  /**
   * like a post
   * @param { String } id       | id of the post : required
   * @param { String } posterId | id of the user : required
   * @return { Promise } post
   */

  const { id } = req.params; // Get the id of the post
  const { likerId } = req.body; // Get the id of the user

  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).send({ message });
  }

  await PostModel.findById(id)
    .then((post) => {
      if (!post) {
        // Check if the post exists
        const message = "The post could not be found. try again later.";
        return res.status(404).json({ message, data: post });
      }
      if (post.likers.includes(likerId)) {
        // Check if the user already liked the post
        PostModel.findByIdAndUpdate(
          id,
          { $pull: { likers: likerId } },
          { new: true },
          (err, docs) => {
            if (!err) {
              const message = "The post has been unliked";
              return res.status(200).json({ message, data: docs });
            }
          }
        );
        UserModel.findByIdAndUpdate(
          likerId,
          { $pull: { likes: id } },
          { new: true }
        );
      } else {
        PostModel.findByIdAndUpdate(
          id,
          { $push: { likers: likerId } },
          { new: true },
          (err, docs) => {
            if (!err) {
              const message = "The post has been liked";
              return res.status(200).json({ message, data: docs });
            }
          }
        );
        UserModel.findByIdAndUpdate(
          likerId,
          { $push: { likes: id } },
          { new: true }
        );
      }
    })
    // Error handling
    .catch((err) => {
      const message = "The post could not be liked. try again later.";
      return res.status(500).json({ message, data: err });
    });
};
