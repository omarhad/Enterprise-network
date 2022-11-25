const UserModel = require("../models/model.users");
const { registerErrors, loginErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");

// -----------------------------------------------------------------------------------------------
// Token creation
const maxAge = 1 * 24 * 60 * 60 * 1000; // maxAge limits the time the token is valid
const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: maxAge,
    }
  );
};

// -----------------------------------------------------------------------------------------------
// POST : Register a new user
exports.register = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin = false } = req.body; // Get the data from the request

  await UserModel.create({ email, password, firstName, lastName, isAdmin }) // Create a new user
    .then((user) => {
      const message = "The user has been created";
      //copy the user object without the password
      user.password = undefined;
      res.status(201).json({
        message, // Send a message
        userId: user._id, // Send the user id
        token: createToken(user._id), // Create a token
      });
    })
    .catch((error) => {
      const err = registerErrors(error);
      res.status(500).json({ message: err, data: error });
    });
};

// -----------------------------------------------------------------------------------------------
// POST : Login a user
exports.logIn = async (req, res) => {
  const { email, password } = req.body; // Get the data from the request

  await UserModel.login(email, password) // Login the user
    .then((user) => {
      const message = "The user has been logged in";
      return res.status(200).json({
        message,
        userId: user._id,
        token: createToken(user._id), // Create a token
      });
    })
    // Error handling
    .catch((err) => {
      const message = loginErrors(err);
      return res.status(500).json({ error: message });
    });
};

// -----------------------------------------------------------------------------------------------
// GET : logout a user
exports.logOut = (req, res) => {};
