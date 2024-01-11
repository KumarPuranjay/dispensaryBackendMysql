const express = require("express");
const {
  userSignIn,
  getUser,
  getAllUsers,
  addUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signIn", userSignIn);
userRouter.post("/getUser", getUser);
userRouter.post("/addUser", addUser);
userRouter.get("/getAllUsers", getAllUsers);

module.exports = userRouter;
