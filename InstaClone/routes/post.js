const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const requireLogin = require('../middlewear/requireLogin');

router.get('/allpost',requireLogin,(req,res)=>{

    // res.send({message:"all post"});
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.status(200).json({posts});
        // res.status(200).json({message:"we got the response"});

    })
    .catch(error=>{
        res.status(400).json({error:"there is something missing"});
        
    })
})






router.post('/createpost',requireLogin,(req, res) => {
    res.send(`Hello,  This is create post route.`);
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
        return res.status(422).json({error:"please add all the feilds"});
    }
    req.user.password =undefined;
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.status(200).json({ post : result});
    })
    .catch(err=>{
        res.json({error:"something missing"});
    })
});

router.get('/mypost',requireLogin,(req,res)=>{
    // res.json({message:"this is my post router"})
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost});
    }).catch(err=>{
        // console.log(err);
        res.status(401).json({error:"something is wrong"});
    })
})

// router.put('/like',(req,res)=>{
//     // res.json({message:"this is the like router"})
//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{likes:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err});
//         }else{
//             res.json(result)
//         }
//     })
// })

router.put('/like',requireLogin, (req, res) => {
    // Log the received data for debugging
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized user" });
      }
    console.log('Received like request:', req.body);
  
    Post.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id }
    }, {
      new: true
    })
    .then(result => {
      console.log('Post updated successfully:');
      res.json(result);
    })
    .catch(err => {
      console.error('Error updating post:', err);
      res.status(422).json({ error: err });
    });
  });

  router.put('/unlike',requireLogin, (req, res) => {
    // Log the received data for debugging
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized user" });
      }
    console.log('Received like request:', req.body);
  
    Post.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
    }, {
      new: true
    })
    .then(result => {
      console.log('Post updated successfully:');
      res.json(result);
    })
    .catch(err => {
      console.error('Error updating post:', err);
      res.status(422).json({ error: err });
    });
  });
  

  router.put('/comment',requireLogin, (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized user" });
      }
    console.log('Received like request:', req.body);

    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
  
    Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: comment }
    }, {
      new: true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .then(result => {
      console.log('Post updated successfully:');
      res.json(result);
    })
    .catch(err => {
      console.error('Error updating post:', err);
      res.status(422).json({ error: err });
    });
  });
  

  router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .then((response,err)=>{
      if(err || !response){
        return res.status(422).json({error:"this is the error"})
      }
      if(response.postedBy._id.toString() === req.user._id.toString()){
          // response.remove()
          Post.findByIdAndDelete(req.params.postId)
          .then(result=>{
            res.json(result)
          }).catch(err=>{
            console.log('Error deleting post:', err);
            res.status(500).json({ error: 'Internal server error' });
          })
      }
    })
  })


module.exports=router;