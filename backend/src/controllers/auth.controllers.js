const { User } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = (req, res) => {
  User.create(req.body) // Create a user with the body request
    .then((user) => {
      const message = "User has been created.";
      res.status(201).json({ message, data: user }); // Send the response
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "The user could not be created. try again later.";
      res.status(500).json({ message, data: error }); // Send the error
    });
};

exports.logIn = (req, res) => {
  User.findOne({ where: { email: req.body.email } }) // Find a user with the email
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      bcrypt.compare(req.body.password, user.password).then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = "The password is invalid.";
            return res.status(401).json({ message });
          }

          // Create a token
          const token = jwt.sign(
            { userId: user.id } ,
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          );

          const message = "User has been logged in.";
          res.status(200).json({ message, data: user , token }); // Send the response
        });
    })
    .catch((error) => {
      const message = "The user could not be logged in. try again later.";
      res.status(500).json({ message, data: error }); // Send the error
    });
};

exports.logOut = (req, res) => {};
