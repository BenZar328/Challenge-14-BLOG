const { User } = require("../models");
const userData = [
  {
    username: "john smith",
    email: "Smitheriens@gmail.com",
    password: "password1",
  },
  {
    username: "Lord Farquad",
    email: "Fiona1@gmail.com",
    password: "password2",
  },
  {
    username: "Spiderman",
    email: "webslinger7@gmail.com.com",
    password: "password3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
