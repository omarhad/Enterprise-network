const { Sequelize, DataTypes } = require("sequelize"); // Sequelize : ORM
const dotenv = require("dotenv"); // Dotenv : gestionnaire de variables d'environnement
const bcrypt = require("bcrypt"); // Bcrypt : gestionnaire de mot de passe

const users = require("./mock.users"); // Importation des données
const posts = require("./mock.post"); // Importation des données
const UserModel = require("../models/model.users"); // Importation du modèle
const PostModel = require("../models/model.post"); // Initialize the database

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
  .then(() => console.log("Connection DB has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);

// Initialize the database
const initDb = () => {
  return sequelize.sync({ force: true }).then(() => {
    users.map((user) => {

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);

      User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hash,
        birthday: user.birthday,
        job: user.job,
        image: user.image,
        likes: user.likes,
        bio: user.bio,
        isAdmin: user.isAdmin,
      }).then((User) => console.log(User.toJSON()));

    });

    posts.map((post) => {

      Post.create({
        message: post.message,
        image: post.image,
        video: post.video,
        likes: post.likes,
        UserId: post.UserId,
      }).then((Post) => console.log(Post.toJSON()));

    });
  });
};

module.exports = {
  initDb,
  User,
  Post,
};
