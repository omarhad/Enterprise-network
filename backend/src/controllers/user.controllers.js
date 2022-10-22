const { User } = require("../db/sequelize");

// GET :  all users
exports.getAllUsers = (req, res) => {
  try {
    User.findAll().then((users) => { // Find all users
      const message = "All users have been found."; 
      res.status(200).json({ message, data: users }); // Send the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send the error
  }
};

// GET : one user
exports.getUser = (req, res) => {
  try {
    User.findByPk(req.params.id) // Find one user by id
      .then((user) => {
        const message = "User has been found.";
        res.status(200).json({ message, data: user }); // Send the response
      });
  }
  catch (error) {
    res.status(500).json({ error: error.message }); // Send the error
  }
};

// PUT : Update one user
exports.updateUser = (req, res) => {
  try{
    const id = req.params.id; // Get the id from the url
    User.update(req.body, { // Update the user with the body request 
      where: { id: id } // Where the id is equal to the id from the url
    })
    .then(() => {
      User.findByPk(id).then((user) => { // Find the user by id
        const message = `User : ${user.id} has been updated.`;
        res.status(200).json({ message, data: user }); // Send the response
      });
    })
  }
  catch (error) {
    res.status(500).json({ error: error.message }); // Send the error
  }
};

// DELETE : Delete one user
exports.deleteUser = (req, res) => {
  try{
    User.findByPk(req.params.id).then((user) => { // Find the user by id
      const userDeleted = user; // Save the user in a variable
      User.destroy({ // Destroy the user
        where: { id: req.params.id } // Where the id is equal to the id from the url
      })
      .then(() => {
        const message = `User : ${userDeleted.id} has been deleted.`;
        res.status(200).json({ message, data: user }); // Send the response
      });
    });
  }
  catch (error) {
    res.status(500).json({ error: error.message });// Send the error
  }
};
