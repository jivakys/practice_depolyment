const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      var decoded = jwt.verify(token, "masai");
      if (decoded) {
        req.body.userId = decoded.userId;
        next();
      } else {
        res.status(400).send({ msg: "Invalid Token" });
      }
    } else {
      res.status(400).send({ msg: "please login first!" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = { auth };
