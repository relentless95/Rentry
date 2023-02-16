const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  const body = { ...req.body };
  console.log(body)

  if (body.password.length < 6) {
    res.render("auth/signup", {
      errorMessage: "Password must be at least 6 characters long",
    //   body: req.body,
      userData: req.body,
    });
  } else {
    const salt = await bcrypt.genSalt(13);
    console.log(body.password);

    const passwordHash = bcrypt.hashSync(body.password, salt);

    delete body.password;

    body.passwordHash = passwordHash;
    console.log('is working')

    try {   
        console.log(User)
        console.log(body)
      await User.create(body);
    //   res.send(body);
      res.redirect('/auth/login')
      console.log('inside create')
    } catch (error) {
      if (error.code === 1100) {
        console.log("duplicate!");
        res.render("auth/signup", {
          error: "username already used ",
        //   body: req.body,
        userData: req.body,

        });
      } else {
        // console.log(error);
        res.render("auth/signup", {
          errorMessage: 'inside else',
          userData: req.body,
        });
      }
    }
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  const body = req.body;
  console.log(req.body)
  userMatch = await User.find({ username: body.username });
//   console.log(userMatch);

  if (userMatch.length) {
    const user = userMatch[0];
    console.log('reaches here1')

    if (bcrypt.compareSync(body.password, user.passwordHash)) {
      const tempUser = {username: user.username, email: user.email};
    //   console.log(tempUser)
    console.log('reaches here2')
    console.log(req.session)

      req.session.user = tempUser;
    //   console.log('reaches here')
      res.redirect("/home");
    }
  } else {
    res.render( "auth/login", {errorMessage: 'inside login else'}
        
    )
  }
});

module.exports = router;