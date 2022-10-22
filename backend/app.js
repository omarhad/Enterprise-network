const express = require("express"); // Express : framework web
const morgan = require("morgan"); // Morgan : logger
const favicon = require("serve-favicon"); // Serve-favicon : favicon
const bodyParser = require("body-parser"); // Body-parser : parser
const userRoutes = require("./routes/user.routes"); // Importation des routes

const app = express(); // Create an instance of express

// Middleware
app
  .use(favicon(__dirname + "/log.ico")) // Favicon
  .use(morgan("dev")) // Morgan logger
  .use(bodyParser.json()); // Body-parser

// Use routes
app.use("/api/user", userRoutes); // Use the users routes

module.exports = app; // Export the app
