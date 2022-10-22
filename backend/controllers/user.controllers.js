const { success } = require("../helper/helper");
let users = require("../models/model.users"); // Importing the data model

// GET :  all users
exports.getAllUsers = (req, res) => { // Get all users
  const message = "list of users "; // 

  res.json(success(message, users)); // Send the response "all users"
};

// GET : one user
exports.getUser = (req, res) => { // Get one user
  const id = req.params.id; // Get the id from the request
  const user = users.find((user) => user.id === id); // Find the user with the id
  const message = "the user :" + id; // Create the message

  res.json(success(message, user)); // Send the response "one user"
};

// PUT : Update one user
exports.updateUser = (req, res) => { // Update one user
  const id = parseInt(req.params.id); // Get the id from the request
  const userUpdate = { ...req.body, id: id }; // Create the new elemntUser

  users = users.map(user => { // Update the user in the users array
    return user.id === id ? userUpdate : users; // If the user id is the same as the id in the request, update the user
  });

  const message = `the user : ${userUpdate.firstName + " " + userUpdate.lastName} has been updated`; // Create the message
  
  res.json(success(message, userUpdate)); // Send the response "one user updated"
};

// DELETE : Delete one user
exports.deleteUser = (req, res) => { // Delete one user
  const id = parseInt(req.params.id); // Get the id from the request
  const userDelete = users.find(user => user.id === id); // Find the user with the id

  users.filter(user => user.id !== id); // Delete the user in the users array

  const message = `the user : ${userDelete.firstName + " " + userDelete.lastName} has been deleted`; // Create the message
  
  res.json(success(message, userDelete)); // Send the response "one user deleted"
};
  
