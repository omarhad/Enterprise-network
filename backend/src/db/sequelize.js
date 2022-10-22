const { Sequelize, DataTypes } = require("sequelize"); // Sequelize : ORM
const dotenv = require("dotenv"); // Dotenv : gestionnaire de variables d'environnement
const UserModel = require("../models/model.users"); // Importation du modèle
const users = require("./mock.users"); // Importation des données

dotenv.config({
    path: "./config/.env",
  }); // Load the .env file

// Connect to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then( () => console.log("Connection DB has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));


const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then(() => {
    users.map((user) => {
      User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        birthday: user.birthday,
        job: user.job,
        image: user.image,
        likes: user.likes,
        bio: user.bio,
        isAdmin: user.isAdmin
      }).then((User) => console.log(User.toJSON()));
    });
  });
};

module.exports = {
  initDb, User
};
