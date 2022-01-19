const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //validate the data before we make a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user already exists in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cpassword: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //validate the data before we make a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user exists in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.cpassword);
  if (!validPass) return res.status(400).send("Invalid Password");

  //create and assign a secure token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn: 60});
  res.header("auth-token", token).send(token);
});

module.exports = router;
