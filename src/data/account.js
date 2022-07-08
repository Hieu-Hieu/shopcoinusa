const accounts = [
  { email: "trunghieu@gmail.com", password: "123ABCdef" },
  { email: "aiking@gmail.com", password: "123ABCdef" },
];

export const fakeAuthentication = (email, password) => {
  let mess = "";
  const user = accounts.find((item) => item.email === email);
  if (user) {
    if (user.password === password) {
      mess = "success";
    } else {
      mess = "Password Incorrect";
    }
  } else {
    mess = "Email not found!";
  }
  // return new Promise((res, rej) => {
  //   setTimeout(() => res(mess), 2000);
  // });
  return mess;
};
