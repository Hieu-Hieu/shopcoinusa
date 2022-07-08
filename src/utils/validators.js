export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Your email address is not correct";
  }
  return "";
};

export const passwordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must have a minimum 6 characters";
  } else if (!new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])").test(password))
    return "Your password must have at least: 1 Lowercase, 1 Uppercase, and Digits";
  return "";
};
