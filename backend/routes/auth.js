const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
//imprting JWT
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");

//creating a JWT secret
const JWT_SECRET = "fancyguyiitbroxxx1604";

//ROUTE1
//creating a user using POST: auth not required; "/api/auth/createuser"; NO login required
router.post(
  "/createuser",
  [
    //adding data validation using express data validation
    body("name", "Please enter a valid name").isLength({ min: 1 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password should be minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether email exists already
    //we use user.create which returns a promise
    try {
      let user = await User.findOne({ email: req.body.email }); //wai until promise resolved
      //return error message if the email already exists
      if (user) {
        return res.status(400).json({ error: "This email already exists" });
      }

      //creating a SECURE password hash
      //creating a SALT
      const salt = await bcrypt.genSalt(10); //this returns a promise, thus the function must be marked async
      const secPass = await bcrypt.hash(req.body.password, salt); //this returns a promise, thus the function must be marked async

      //creating the new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        id: user.id,
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      //   res.json(user);
      //   console.log(user);

      res.json({ authToken });
    } catch (error) {
      //catching and dealing with errors
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

//ROUTE2
//Authenticate a user using POST: "api/auth/login"; NO login required - login karne ke liye thodi login karengee!
router.post(
  "/login",
  [
    //adding data validation using express data validation
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be blank!").exists(),
  ],
  async (req, res) => {
    //If errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //async function, use await
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      //we compare the password from the user, and the one from our database
      //its asynchronous, so we need to await it
      const passwordCompare = await bcrypt.compare(password, user.password);

      //handling wrong/invalid password
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      //sending over the data if correct credentials
      const data = {
        id: user.id,
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.send(authToken);
    } catch (error) {
      //catching and dealing with errors
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

//ROUTE3
//Get logged in user details using POST "api/auth/getuser"; Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    //we find the user using their unique id, but NOT selecting their password
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    //catching and dealing with errors
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

module.exports = router;
