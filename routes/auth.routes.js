const router = require("express").Router();
// const bcrypt = require("bcryptjs");

//importing guest an owner models
const guestModel = require("../models/guest.model.js");
const ownerModel = require("../models/owners.models.js");

//sign up route for guest
router.get("/guestSignUp", (req, res, next) => {
  res.render("authorisation/guest-signUp.hbs");
});

router.post("/guestSignUp", (req, res, next) => {
  const {guestName,guestEmail,guestAddress,guestCity,guestCountry,guestPassword,guestPet,aboutMe} = req.body;
  let myNewGuest = {
    name: guestName,
    email: guestEmail,
    city: guestCity,
    address: guestAddress,
    country: guestCountry,
    password: guestPassword,
    guestPet: guestPet,
    aboutMe: aboutMe,
  };

  // Validating
  // if (!username.length || !email.length || !password.length) {
  //   res.render("auth/signup.hbs", { msg: "Please enter all fields" });
  //   return;
  //   // Email Validation
  //   let re = /\S+@\S+\.\S+/;
  //   if (!re.test(email)) {
  //     res.render("auth/signup", { msg: "Email not in valid format" });
  //     return;
  //   }
  // PASWORD VALIDATION
  // let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  // if (!regexPass.test(password)) {
  //    res.render('auth/signup', {msg: 'Password needs to have special characters, some numbers and be 6 characters atleast'})
  //    return;
  // }
  // }

  // this block of code sends our guest data to mongoDB
  guestModel
    .create(myNewGuest)
    .then(() => {
      res.redirect("/logIn");
    })
    .catch(() => {
      console.log("something went wrong creating");
    });
});

// sign up route for owner
router.get("/ownerSignUp", (req, res, next) => {
  res.render("authorisation/owner-signUp.hbs");
});

router.post("/ownerSignUp", (req, res, next) => {
  const {ownerName,ownerEmail,ownerAddress,ownerCity,ownerCountry,ownerPassword,ownerPet,aboutMe,ownerPetName } = req.body;
  let myNewOwner = {
    name: ownerName,
    email: ownerEmail,
    city: ownerCity,
    address: ownerAddress,
    country: ownerCountry,
    password: ownerPassword,
    ownerPet: ownerPet,
    aboutMe: aboutMe,
    ownerPetName: ownerPetName,
  };

  ownerModel.create(myNewOwner)
    .then(() => {
      res.redirect("/logIn");
    })
    .catch(() => {
      console.log("something went wrong creating");
    });
});





router.get("/logIn", (req, res, next) => {
  res.render("authorisation/login.hbs");
});

module.exports = router;
