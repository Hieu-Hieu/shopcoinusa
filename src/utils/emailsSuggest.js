import { emailValidator } from "./validators";

export const suggestEmail = (email) => {
  if (!email) return [];
  let text = email;
  let domain = "";
  const domains = [
    "@gmail.com",
    "@hotmail.com",
    "@outlook.com",
    "@yahoo.com",
    "@icloud.com",
  ];
  if (email.indexOf("@") !== -1) {
    text = email.split("@")[0];
    domain = email.split("@")[1];
  }
  let result = domains.map((item) => text + item);
  if (domain) {
    result = result.filter((item) => item.includes(domain));
    if (result.includes(email)) result = [];
  }

  return result;
};
