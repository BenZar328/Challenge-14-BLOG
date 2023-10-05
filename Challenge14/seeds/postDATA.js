const { Post } = require("../models");

const postData = [
  {
    post_title: "First Post",
    post_body: "This is the content of the first post.",
    user_id: 1, 
  },
  {
    post_title: "Second Post",
    post_body: "This is the content of the second post.",
    user_id: 2, 
  },
  {
    post_title: "Third Post",
    post_body: "This is the content of the third post.",
    user_id: 3, 
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
