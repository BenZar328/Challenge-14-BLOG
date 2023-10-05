const sequelize = require("../config/connection");
const seedUsers = require("./userDATA");
const seedPosts = require("./postDATA");
const seedComments = require("./commentDATA");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPosts();
  await seedComments();

  console.log("Seeding complete!");
  process.exit(0);
};

seedAll();
