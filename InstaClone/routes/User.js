const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewear/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", requireLogin, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
      .select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const posts = await Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec();
      res.json({ user, posts });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


module.exports = router;