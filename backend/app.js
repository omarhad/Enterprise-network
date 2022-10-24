const express = require("express"); // Express : framework web
const favicon = require("serve-favicon"); // Serve-favicon : favicon
const mongoose = require("mongoose"); // MongoDB : gestionnaire de base de données
const cors = require("cors"); // Cors : gestionnaire de requêtes HTTP
const dotenv = require("dotenv"); // Dotenv : gestionnaire de variables d'environnement


const bodyParser = require("body-parser"); // Body-parser : parser
const userRoutes = require("./src/routes/user.routes"); // Importation des routes
const postRoutes = require("./src/routes/post.routes"); // Importation des routes

dotenv.config({
  path: "./config/.env",
}); // Load the .env file


// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_SRV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); // Create an instance of express


// Middleware
app
  .use(favicon(__dirname + "/log.ico")) // Favicon
  .use(bodyParser.json()) // Body-parser
  .use(cors()); // Cors

// Use routes
app.use("/api/user", userRoutes); // Use the users routes
app.use("/api/post", postRoutes); // Use the posts routes")

// Error handling
app.use(({res}) => {
  const message = "The requested resource could not be found.";
  res.status(404).json({ message });
});

module.exports = app; // Export the app
