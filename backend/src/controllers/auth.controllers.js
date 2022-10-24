const UserModel = require("../models/model.users");
const { registerErrors, loginErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken"); 

// -----------------------------------------------------------------------------------------------
// Token creation
const maxAge = 1 * 24 * 60 * 60 * 1000; // maxAge limits the time the token is valid
const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
}

// -----------------------------------------------------------------------------------------------
// POST : Register a new user
exports.register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body; // Get the data from the request

  await UserModel.create({ email, password, firstName, lastName }) // Create a new user
    .then((user) => {
      const message = "The user has been created";
      res.status(201).json({ message, data: user });
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

  try {
    const user = await UserModel.login(email, password); // Login the user
    const message = "The user has been logged in";
    res.status(200).json({
      message,
      userId: user._id,
      token: createToken(user._id), // Create a token
    });

    // Error handling
  } catch (error) { 
    const err = loginErrors(error);
    console.log(error);
    res.status(400).json({ message: err, data: error });
  }
};

// -----------------------------------------------------------------------------------------------
// GET : logout a user
exports.logOut = (req, res) => {};
