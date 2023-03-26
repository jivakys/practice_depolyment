const express = require("express");
var cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.route");
const { auth } = require("./middleware/post.midddleware");
const { postRoute } = require("./routes/post.route");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors());

app.use("/users", userRoute);
app.use(auth);
app.use("/posts", postRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to database");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server Running on port ${process.env.port}`);
});
