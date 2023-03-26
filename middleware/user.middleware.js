const { UserModel } = require("../models/user.model");

const userPresent = async (req, res, next) => {
  const { email } = req.body;
  const isPresent = await UserModel.findOne({ email });
  //   console.log("isPresent", isPresent);
  if (isPresent) {
    res.status(200).send({ msg: "User already exist, Please login" });
  } else {
    next();
  }
};

module.exports = { userPresent };
