const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// signup users for the first time

router.post("/users/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find if email is in the list or not
    const user = await User.findByCredentials(email);
    //set the password
    user.password = password;

    // Get the auth token
    const token = await user.generateAuthToken();

    // save the user
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Signin users
router.post("/users/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find if email is in the list or not
    const user = await User.findByCredentials(email, password);

    // Get the auth token
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// Add users to the database for the first time
router.post("/users/add", async (req, res) => {
  try {
    // create a new user
    const user = new User();
    user.email = req.body.email;
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
