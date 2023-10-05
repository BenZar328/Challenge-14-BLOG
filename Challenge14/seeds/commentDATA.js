const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "This is the first comment on the first post.",
    user_id: 1,
    post_id: 1, 
  },
  {
    comment_text: "This is a comment on the second post.",
    user_id: 2, 
    post_id: 2, 
  },
  {
    comment_text: "Another comment on the first post.",
    user_id: 3, 
    post_id: 1, 
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
