import bcrypt from "bcrypt";

const users = [
  {
    name: "admin",
    password: bcrypt.hashSync("123456", 10),
    email: "admin@example.com",
    isAdmin: true,
  },
  {
    name: "Alex Doe",
    password: bcrypt.hashSync("123456", 10),
    email: "alexdoe@example.com",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    password: bcrypt.hashSync("123456", 10),
    email: "janedoe@example.com",
    isAdmin: false,
  },
];
export default users;
