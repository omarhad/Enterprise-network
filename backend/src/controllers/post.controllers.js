const { ValidationError } = require("sequelize");
const { Post } = require("../db/sequelize");

exports.getAllPost = (req, res) => {
  Post.findAndCountAll({ order: ["id"] })
    .then(({ count, rows }) => {
      // Find all post
      const message = `All posts have been found. total :  ${count} `;
      res.status(200).json({ message, data: rows }); // Send the response OK and the users
    })
    .catch((error) => {
      const message = "The list of posts could not be found. try again later.";
      res.status(500).json({ message, data: error });
    });
};

exports.createPost = (req, res) => {};

exports.readPost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      // Find one post by id
      if (post === null) {
        const message = "The post could not be found.";
        return res.status(404).json({ message });
      }
      const message = `Post : ${post.id} has been found.`;
      res.status(200).json({ message, data: post }); // Send the response OK and the user
    })
    .catch((error) => {
      const message = "The post could not be found. try again later.";
      res.status(500).json({ message, data: error });
    });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;
  Post.update(req.body, {
    where: { id: id },
  })
    .then(() => {
      return Post.findByPk(id).then((post) => {
        if (post === null) {
          const message = "The post could not be found.";
          return res.status(404).json({ message });
        }
        const message = `Post : ${post.id} has been found.`;
        res.status(200).json({ message, data: post }); // Send the response OK and the user
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
        }
      const message = "The post could not be found. try again later.";
      res.status(500).json({ message, data: error });
    });
};

exports.deletePost = (req, res) => {};

exports.likePost = (req, res) => {};

exports.unlikePost = (req, res) => {};
