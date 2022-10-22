const { User } = require("../db/sequelize");

exports.register = (req, res) => {
  try {
    User.create(req.body)
        .then((user) => {
        const message = "User has been created.";
        res.status(201).json({ message, data: user });
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
