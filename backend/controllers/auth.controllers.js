const { success, getUniqueId } = require("../helper/helper"); // Importing the helper
let users = require("../models/model.users"); // Importing the data model

exports.register = (req, res) => {
  const id = getUniqueId(users); // Get the unique id
  const userCreated = { 
    ...req.body, 
    ...{ 
      id: id, 
      created: new Date() 
    } 
  }; // Create the user
  users.push(userCreated); // Add the user to the users array

  const message = `User : ${userCreated.firstName + " " + userCreated.lastName} : created`; // Create the message

  res.json(success(message, userCreated)); // Send the response
};
