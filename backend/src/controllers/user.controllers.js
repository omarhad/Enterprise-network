const { User } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Op } = require("sequelize");

// GET :  all users
exports.getAllUsers = (req, res) => {
  if (
    req.query.firstname || // If the query string firstname is not empty
    req.query.lastname
  ) {
    // If the query string lastname is not empty
    const firstName = req.query.firstname;
    const lastName = req.query.lastname;
    return User.findAndCountAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${firstName}%` } },
          { lastName: { [Op.like]: `%${lastName}%` } },
        ],
      },
      order: ["lastName"], 
    }).then(({ count, rows }) => {
      const message = `${count} : Users have been found.`;
      res.status(200).json({ message, data: rows }); // Send the response OK and the users
    });
  } else {
    User.findAndCountAll()
      .then(({ count, rows }) => {
        // Find all users
        const message = `All users have been found. total :  ${count} `;
        res.status(200).json({ message, data: rows }); // Send the response OK and the users
      })
      .catch((error) => {
        const message =
          "The list of users could not be found. try again later.";
        res.status(500).json({ message, data: error });
      });
  }
};

// GET : one user
exports.getUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      // Find one user by id
      if (user === null) {
        const message = "The user could not be found.";
        return res.status(404).json({ message });
      }
      const message = `User : ${user.id} has been found.`;
      res.status(200).json({ message, data: user }); // Send the response OK and the user
    })
    .catch((error) => {
      const message = "The user could not be found. try again later.";
      res.status(500).json({ message, data: error });
    });
};

// PUT : Update one user
exports.updateUser = (req, res) => {
  const id = req.params.id; // Get the id from the url
  User.update(req.body, {
    where: { id: id }, // Update the user with the body request Where the id is equal to the id from the url
  })
    .then(() => {
      return User.findByPk(id).then((user) => {
        if (user === null) {
          const message = "The user could not be found.";
          return res.status(404).json({ message });
        }
        const message = `User : ${user.id} has been updated.`;
        res.status(200).json({ message, data: user }); // Send the response OK and the user updated
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "The user could not be updated. try again later.";
      res.status(500).json({ message, data: error });
    });
};

// DELETE : Delete one user
exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message = "The user could not be found.";
        return res.status(404).json({ message });
      }
      const userDeleted = user;
      return User.destroy({
        where: { id: req.params.id }, // Delete the user Where the id is equal to the id from the url
      }).then(() => {
        const message = `User : ${userDeleted.id} has been deleted.`;
        res.status(200).json({ message, data: user }); // Send the response OK and the user deleted
      });
    })
    .catch((error) => {
      const message = "The user could not be updated. try again later.";
      res.status(500).json({ message, data: error }); // Send the error
    });
};
