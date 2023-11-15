require("../models/User");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middlewear/requireLogin");

router.route("/").get((req, res) => {
  res.send("hello im router");
});

router.get("/protected", requireLogin, (req, res) => {
  res.send(`Hello,  This is a protected route.`);
});


router.route("/signup")
//   .get((req, res) => {
//     res.send("Hello, this is get page");
//   })
  .post((req, res) => {
    // res.send("hello sign up");
    // res.json({ finish: "successful" });
    // console.log("signup");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "please add all the fields" });
    }

    User.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user already exists" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
      });
    });
  });



router.route("/signin").post((req, res) => {
  // res.send("hello sign in");

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "error please fill the requirements" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.status(200).json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({ token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
});

module.exports = router;
