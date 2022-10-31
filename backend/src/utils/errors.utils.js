module.exports.registerErrors = (err) => {
  let errors = { firstName: "", lastName: "", email: "", password: "" };

  if (err.message.includes("firstName")) {
    errors.firstName = "First name is invalid";
  }
  if (err.message.includes("lastName")) {
    errors.lastName = "Last name is invalid";
  }
  if (err.message.includes("email")) {
    errors.email = "Email is already exist";
  }
  if (err.message.includes("password")) {
    errors.password = "Password is invalid";
  }

  return errors;
};

module.exports.loginErrors = (err) => {
  let errors = {};
  errors.login = "Email is invalid or password is invalid";
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = {
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    birthday: "",
  };
  if (err.message.includes("firstName")) {
    errors.firstName = "First name is invalid";
  }
  if (err.message.includes("lastName")) {
    errors.lastName = "Last name is invalid";
  }
  if (err.message.includes("email")) {
    errors.email = "Email is already exist or invalid";
  }
  if (err.message.includes("bio")) {
    errors.bio = "Bio is invalid";
  }
  if (err.message.includes("birthday")) {
    errors.birthday = "Birth date is invalid";
  }
  return errors;
};
