export let users = [
  {
    id: 1,
    name: "Nayan Shankar",
    phone: "1231231231",
    password: "nayan123",
    role: "patient",
  },
  {
    id: 2,
    name: "Anaavil Sharma",
    phone: "1234567890",
    password: "anaavil123",
    role: "patient",
  },
];

export const addUser = (newUser) => {
  users.push(newUser);
};  