const UserModel = require("../models/model.users");
const bcrypt = require("bcrypt"); // Bcrypt : gestionnaire de hashage
const { uploadErrors } = require("../utils/errors.utils");
const ObjectId = require("mongoose").Types.ObjectId;

// -----------------------------------------------------------------------------------------------
// GET :  all users
exports.getAllUsers = async (req, res) => {
  /**
   * Get all users
   * @return { Promise } users
   */

  await UserModel.find()
    .select("-password") // Find all users and select all fields except password
    .then((users) => {
      const message = "All users have been found";
      res.status(200).json({ message, data: users }); // Send the response OK and the users
    })

    // Error handling
    .catch((error) => {
      const message = "The list of users could not be found. try again later.";
      res.status(500).json({ message, data: error });
    });
};

// -----------------------------------------------------------------------------------------------
// GET : one user
exports.getUser = async (req, res) => {
  /**
   * Get one user
   * @param { String } id | id of the user
   * @return { Promise } user
   */

  const { id } = req.params; // Get the id from the request
  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).json({ message, data: id });
  }

  // Find the user
  await UserModel.findById(id)
    .select("-password") // Find the user by id and select all fields except password
    .then((user) => {
      // Check if the user exists
      if (!user) {
        const message = `The user with the given ID : ${id} was not found.`;
        return res.status(404).json({ message, data: id });
      }

      const message = "The user has been found";
      res.status(200).json({ message, data: user }); // Send the response OK and the user
    })

    // Error handling
    .catch((error) => {
      const message = "The user could not be found. try again later.";
      res.status(500).json({ message, data: error });
    });
};

//-----------------------------------------------------------------------------------------------
// PUT : Update one user
exports.updateUser = async (req, res) => {
  /**
   * Update one user
   * @param { String } id | id of the user
   * @return { Promise } user
   */

  const { id } = req.params; // Get the id from the request
  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).json({ message, data: id });
  }

  // if the user wants to update his password
  if (req.body.password) {
    // Hash the password
    await bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        req.body.password = hash;
      })
      .catch((error) => {
        const message = "The password could not be updated. try again later.";
        res.status(500).json({ message, data: error });
      });
  }
  // Update the user
  await UserModel.findByIdAndUpdate(id, req.body, { new: true })
    .select("-password") // Find the user by id and select all fields except password
    .then((user) => {
      // Check if the user exists
      if (!user) {
        const message = `The user with the given ID : ${id} was not found.`;
        return res.status(404).json({ message, data: id });
      }

      const message = "The user has been updated";
      res.status(200).json({ message, data: user }); // Send the response OK and the user
    })
    .catch((error) => {
      const err = uploadErrors(error);
      res.status(500).json({ message: err, data: error });
    });
};

// -----------------------------------------------------------------------------------------------
// DELETE : Delete one user
exports.deleteUser = async (req, res) => {
  /**
   * Delete one user
   * @param { String } id | id of the user
   * @return { Promise } user
   */

  const { id } = req.params; // Get the id from the request
  // Check if the id is valid
  if (!ObjectId.isValid(id)) {
    const message = `The id : ${id} | is not valid`;
    return res.status(400).json({ message, data: id });
  }

  // Delete the user
  await UserModel.findByIdAndDelete(id)
    .select("-password") // Find the user by id and select all fields except password
    .then((user) => {
      // Check if the user exists
      if (!user) {
        const message = `The user with the given ID : ${id} was not found.`;
        return res.status(404).json({ message, data: id });
      }

      const message = "The user has been deleted";
      res.status(200).json({ message, data: user }); // Send the response OK and the user
    })
    .catch((error) => {
      const message = "The user could not be deleted. try again later.";
      res.status(500).json({ message, data: error });
    });
};
