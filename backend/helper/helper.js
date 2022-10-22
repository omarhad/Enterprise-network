exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (users) => {
  const userIds = users.map(user => user.id);// Get the id of each user
  const maxId = userIds.reduce((a, b) => Math.max(a, b));  // Get the max id
  const uniqueId = maxId + 1;  // Get the unique id
  
  return uniqueId;
};
