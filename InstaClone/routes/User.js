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
  
  router.put("/follow", requireLogin, async (req, res) => {
    try {
      const updateFollowedUser = await User.findByIdAndUpdate(
        req.body.followid,
        {
          $push: { followers: req.user._id },
        },
        {
          new: true,
        }
      );
  
      const updateCurrentUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followid },
        },
        { new: true }
      );
  
      res.json(updateCurrentUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  

  router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowid,{
      $pull:{followers:req.user._id}
    },{
      new:true
    },(err,result=>{
      if(err){
        return res.status(422).json({error:err})
      }
      User.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowid},

      },{new:true}).then(result=>{
        res.json(result)
      }).catch(error=>{
        res.json({error:error})
      })




    }))
  })
module.exports = router;