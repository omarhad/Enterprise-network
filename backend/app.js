const express = require("express"); // Express : framework web
const favicon = require("serve-favicon"); // Serve-favicon : favicon

const bodyParser = require("body-parser"); // Body-parser : parser
const userRoutes = require("./src/routes/user.routes"); // Importation des routes
const postRoutes = require("./src/routes/post.routes"); // Importation des routes
const sequelize = require("./src/db/sequelize"); // Importation de la base de données


const app = express(); // Create an instance of express


// Middleware
app
  .use(favicon(__dirname + "/log.ico")) // Favicon
  .use(bodyParser.json()); // Body-parser

// Initialize the database
sequelize.initDb(); 

app.get('/', (req, res) => {
  res.send('Hello Heroku!');
});

// Use routes
app.use("/api/user", userRoutes); // Use the users routes
app.use("/api/post", postRoutes); // Use the posts routes")

// Error handling
app.use(({res}) => {
  const message = "The requested resource could not be found.";
  res.status(404).json({ message });
});

module.exports = app; // Export the app
