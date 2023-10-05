const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          include: [User],
        },
        User,
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: [User],
          },
          User,
        ],
      });

      const post = postData.get({ plain: true });
      res.render("onepost", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

// POST a new post
router.post("/post", async (req, res) => {
  try {
    const { post_title, post_body } = req.body;
    const user_id = req.session.user_id;
    const postData = await Post.create({
      post_title,
      post_body,
      user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// UPDATE one post
router.put("/post/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const { post_title, post_body } = req.body;
      const postData = await Post.update(
        { post_title, post_body },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(postData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

// GET one post to edit
router.get("/post/edit/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const userID = req.session.user_id;
      const postData = await Post.findByPk(req.params.id, {
        where: {
          user_id: userID,
        },
        include: [Comment, User],
      });
      const post = postData.get({ plain: true });
      res.render("editpost", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

// POST a new comment
router.post("/comment", async (req, res) => {
  try {
    const { comment_text, post_id } = req.body;
    const user_id = req.session.user_id;
    const commentData = await Comment.create({
      comment_text,
      post_id,
      user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to render dashboard with all posts for logged-in user
router.get("/dashboard", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userID = req.session.user_id;
      const postData = await Post.findAll({
        where: {
          user_id: userID,
        },
        include: [
          {
            model: Comment,
            include: [User],
          },
          User,
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
    return;
  }
  res.render("login");
});

// Route to render a newpost view
router.get("/newpost", (req, res) => {
  if (req.session.loggedIn) {
    res.render("newpost", { loggedIn: req.session.loggedIn });
    return;
  }
  res.render("login");
});

// DELETE a post
router.delete("/post/:id", async (req, res) => {
  try {
    // Remove post data
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Remove comments for that post
    await Comment.destroy({
      where: {
        post_id: req.params.id,
      },
    });

    res.status(200).json({ message: "Post and comments deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
