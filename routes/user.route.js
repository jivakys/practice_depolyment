const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { userPresent } = require("../middleware/user.middleware");

userRoute.post("/register", userPresent, (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const data = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
      });
      await data.save();
      res.status(200).send({ msg: "User registered successfully" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "user login successful",
            token: jwt.sign({ userId: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "wrong credential" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
module.exports = { userRoute };
// "title":"shyamt-5",
// "body":"shyambody-5",
// "device":"mobile",
// "no_if_comments":4
