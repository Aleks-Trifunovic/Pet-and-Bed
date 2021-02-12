const router = require("express").Router();
// const bcrypt = require("bcryptjs");

//importing guest an owner models
const guestModel = require("../models/guest.model.js");
// const ownerModel = require("../models/owner.model.js");



router.get("/guestSignUp", (req, res, next) => {
  res.render("authorisation/guest-signUp.hbs")
});

router.post("/guestSignUp", (req, res, next) => {
  const {guestName,guestEmail,guestAddress,guestCity,guestPassword} = req.body;
  let myNewGuest = {
    name: guestName,
    email: guestEmail,
    address: guestAddress,
    city: guestCity,
    password: guestPassword,
  };
  
  guestModel.create(myNewGuest)  //freakin error is here
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      console.log("something went wrong creating");
    });
  
});

router.get("/ownerSignUp", (req, res, next) => {
  res.render("authorisation/owner-signUp.hbs");
});

router.get("/logIn", (req, res, next) => {
  res.render("authorisation/login.hbs");
});



module.exports = router;
