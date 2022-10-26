const UserModel = require("../models/model.users");
const PostModel = require("../models/model.posts");
const ObjectId = require("mongoose").Types.ObjectId;

// -----------------------------------------------------------------------------------------------
// POST : upload picture for user
exports.uploadProfil = (req, res) => {
  /**
   * upload picture for user
   * @param { String } id | id of the user
   * @param { File } file | picture of the user
   * @return { String } message | message of the response
   */

  const { id } = req.body._id; // Get the id from the params

  const updatedRecord = {
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };

  UserModel.updateOne({ id }, { $set: updatedRecord }) // Update the picture user
    .then(() => {
      const message = "The profile picture has been updated";
      res.status(200).json({ message });
    })
    // Error handling
    .catch((error) => {
      const message =
        "The profile picture could not be updated. try again later.";
      res.status(500).json({ message, error });
    });
};

// -----------------------------------------------------------------------------------------------
// POST : upload picture for post
exports.uploadPost = async (req, res) => {
  /**
   * upload picture for post
   * @param { String } id | id of the post
   * @param { String } userId | picture of the post
   * @param { File } file | picture of the post
   * @return { String } message | message of the response
   */

  const { id } = req.params; // Get the id from the params
  const userId = req.body.posterId; // Get the id poster from the request

  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).json({ message, data: id });
  }

  const updatedRecord = {
    pic: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };

  try {
    const user = await UserModel.findById(userId); // Find the user by id
    return await PostModel.findById(id) // Find the post by id
      .then((post) => {
        if (!post) {
          const message = `Post not found`;
          return res.status(400).json({ message, data: id });
        }
        if (post.posterId != userId) {
          // Check if the user is the owner of the post
          const message = `You are not the owner of this post`;
          return res.status(403).json({ message });
        }
        post.picture.push(updatedRecord); // Add the picture post
        post.save(); // Save the post
        const message = "The post picture has been updated";
        return res.status(200).json({ message, data: post });
      });
  } catch (error) {
    // Error handling
    const message = "The picture could not be updated. try again later.";
    res.status(500).json({ message, error });
  }
};

// -----------------------------------------------------------------------------------------------
// POST : delete picture for post
exports.deleteUploadPost = async (req, res) => {
  /**
   * delete picture for post
   * @param { String } id | id of the post
   * @param { String } userId | picture of the post
   * @param { String } picId | picture of the post
   * @return { String } message | message of the response
   */

  const { id } = req.params; // Get the id from the params
  const { posterId, picId } = req.body; // Get the id poster from the request

  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).json({ message, data: id });
  }

  try {
    return await PostModel.findById(id) //  Find the post by id
      .then((post) => {
        if (!post) {
          const message = `Post not found`;
          return res.status(400).json({ message, data: id });
        }
        if (post.posterId != posterId) {
          // Check if the user is the owner of the post
          const message = `You are not the owner of this post`;
          return res.status(403).json({ message });
        }
        const picture = post.picture.find((pic) => pic._id == picId); // Find the picture by id
        if(!picture) {
          const message = `Picture not found`;
          return res.status(400).json({ message, data: id });
        }
        post.picture.splice(post.picture.indexOf(picture), 1); // Delete the picture post
        post.save(); // Save the post
        const message = "The post picture has been deleted";
        return res.status(200).json({ message, data: post });
      });
  } catch (error) {
    // Error handling
    const message = "The picture could not be deleted. try again later.";
    res.status(500).json({ message, error });
  }
};