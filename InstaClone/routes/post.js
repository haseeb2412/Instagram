const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const requireLogin = require('../middlewear/requireLogin');

router.get('/allpost',(req,res)=>{

    // res.send({message:"all post"});
    Post.find()
    // .populate("postedBy","_id name")
    .then(posts=>{
        res.status(200).json({posts});
        res.status(200).json({message:"we got the response"});

    })
    .catch(err=>{
        res.status(401).json({error:"there is something missing"});
        
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
    // .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost});
    }).catch(err=>{
        // console.log(err);
        res.status(401).json({error:"something is wrong"});
    })
})




module.exports=router;