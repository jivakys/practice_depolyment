const express = require("express");
const { PostModel } = require("../models/post.model");

const postRoute = express.Router();

postRoute.get("/top", async (req, res) => {
  const userId = req.body;
  try {
    const data = await PostModel.find({ userId: userId.userId })
      .sort({ no_if_comments: -1 })
      .limit(1);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/", async (req, res) => {
  const userId = req.body;
  try {
    const post = await PostModel.find({ userId: userId.userId });
    res.send(post);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/dev", async (req, res) => {
  const device = req.query.device;
  // console.log("dv=", device);
  try {
    const data = await PostModel.find({ device: device });
    res.send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/device", async (req, res) => {
  const device1 = req.query.device1;
  const device2 = req.query.device2;
  // console.log("dv=", device1, device2);
  try {
    const data = await PostModel.find({ device: [device1, device2] });
    res.send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const data = new PostModel(payload);
    await data.save();
    res.status(200).send({ msg: "post is added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const payload = req.body;
  // console.log("uid=", userId);
  try {
    await PostModel.findByIdAndUpdate({ _id: userId }, payload);
    res.status(200).send({ msg: "post is updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.delete("/delete/:postId", async (req, res) => {
  try {
    await PostModel.findByIdAndDelete({ _id: req.params.userId });
    res.status(400).send({ msg: "post Deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { postRoute };
