"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email});

    const result = await User.comparePasswords(password,user.password);

    if (!result) {
    res
    .status(401)
    .json({ ok: false, error: "Credenciales inválidas" });
    return;
    }

    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.json({ ok: true, token: token });
      }
    );

  } catch (err) {
    res.status(500);
    next(err);
  }
});

router.post("/register", async function (req, res, next) {
  const hashedPassword = await User.hashPassword(req.body.password);  
  try {
      const newUser = await new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).save();
     res
     .status(200)
     .json({result:'new user created'});
  }
  catch(err){
    res.status(400)
    next(err);
  }
});

module.exports = router;
