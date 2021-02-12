const router = require("express").Router();

//importing guest an owner models
// const guestModel = require("../models/guest.model.js");
// const ownerModel = require("../models/owner.model.js");



router.get("/guestSignUp", (req, res, next) => {
  res.render("authorisation/guest-signUp.hbs");
});

router.get("/ownerSignUp", (req, res, next) => {
  res.render("authorisation/owner-signUp.hbs");
});

router.get("/logIn", (req, res, next) => {
  res.render("authorisation/login.hbs");
});



module.exports = router;
