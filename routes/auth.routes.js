const router = require("express").Router();
const bcrypt = require("bcryptjs");

//importing guest and owner models
const guestModel = require("../models/guest.model.js");
const ownerModel = require("../models/owners.models.js");

//sign up route for guest
router.get("/guestSignUp", (req, res, next) => {
  res.render("authorisation/guest-signUp.hbs");
});

router.post("/guestSignUp", (req, res, next) => {
  const {
    guestName,
    guestEmail,
    guestAddress,
    guestCity,
    guestCountry,
    guestPassword,
    guestPet,
    ownerPetName,
    aboutMe,
  } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(guestPassword, salt);
    console.log(hash)


  // this block of code sends our guest data to mongoDB
    console.log(req.body)
  guestModel
    .create({
      name: guestName,
      email: guestEmail,
      address: guestAddress,
      city: guestCity,
      country: guestCountry,
      password: hash,
      guestPet: guestPet,
      aboutMe: aboutMe,
    })
    .then(() => {
      res.redirect("/logInGuest");
    })
    .catch((err) => {
      console.log("something went wrong creating", err);
    });
});

// sign up route for owner
router.get("/ownerSignUp", (req, res, next) => {
  res.render("authorisation/owner-signUp.hbs");
});

router.post("/ownerSignUp", (req, res, next) => {
  const {ownerName,ownerEmail,ownerAddress,ownerCity,ownerCountry,ownerPassword,ownerPet,aboutMe,ownerPetName } = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(ownerPassword, salt);
  console.log(hash);

  ownerModel.create({
      name: ownerName,
      email: ownerEmail,
      address: ownerAddress,
      city: ownerCity,
      country: ownerCountry,
      password: hash,
      ownerPet: ownerPet,
      aboutMe: aboutMe,
      ownerPetName: ownerPetName,
    })
    .then(() => {
      res.redirect("/logInOwner");
    })
    .catch(() => {
      console.log("something went wrong creating");
    });
});


//login guest
router.get("/logInGuest", (req, res, next) => {
  //we need to copy this part and make another for owner. cause now ne have 2 login pages.
  res.render("authorisation/log-in-guest.hbs");
});

router.post("/logInGuest", (req, res, next) => {
  const { logInEmail, logInPassword } = req.body;
  console.log(req.body);
  if (!logInEmail || !logInPassword) {
    res.render("authorisation/log-in-guest.hbs", { msg: "Please enter all fields" });
    return;
  }
  // email validation
  let re = /\S+@\S+\.\S+/;
  if (!re.test(logInEmail)) {
    res.render("authorisation/log-in-guest.hbs", { msg: "Email not in valid format" });
    return;
  }
  // PASWORD VALIDATION
  let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  if (!regexPass.test(logInPassword)) {
    res.render("authorisation/log-in-guest.hbs", { msg: "Password incorrect" });
  }

  // handle post requests when the user submits something in the sign in form
  router.post("/logInGuest", (req, res, next) => {
    const { email, password } = req.body;
    // implement the same set of validations as you did in signup as well
    // NOTE: We have used the Async method here. Its just to show how it works
    guestModel
      .findOne({ email: email })
      .then((result) => {
        // if user exists
        if (result) {
          //check if the entered password matches with that in the DB
          bcrypt.compare(password, result.password).then((isMatching) => {
            if (isMatching) {
              // when the user successfully signs up
              req.session.userData = result;
              req.session.areyoutired = false;
              res.redirect("/guestProfile");
            } else {
              // when passwords don’t match
              res.render("authorisation/log-in-guest.hbs", {
                msg: "Passwords dont match",
              });
            }
          });
        } else {
          // when the user signs in with an email that does not exits
          res.render("authorisation/log-in-guest.hbs", {
            msg: "Email does not exist",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  });

});
// login owner
router.get("/logInOwner", (req, res, next) => {
  
  res.render("authorisation/log-in-owner.hbs");
});
router.post("/logInOwner", (req, res, next) => {
  const { logInEmail, logInPassword } = req.body;
  console.log(req.body);
  if (!logInEmail || !logInPassword) {
    res.render("authorisation/log-in-owner.hbs", {
      msg: "Please enter all fields",
    });
    return;
  }
  // email validation
  let re = /\S+@\S+\.\S+/;
  if (!re.test(logInEmail)) {
    res.render("authorisation/log-in-owner.hbs", {
      msg: "Email not in valid format",
    });
    return;
  }
  // PASWORD VALIDATION
  let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  if (!regexPass.test(logInPassword)) {
    
    res.render("authorisation/log-in-owner.hbs", { msg: "Password incorrect" });
    
  }

  // handle post requests when the user submits something in the sign in form
  router.post("/logInOwner", (req, res, next) => {
    const { logInEmail, logInPassword } = req.body;
    // implement the same set of validations as you did in signup as well
    // NOTE: We have used the Async method here. Its just to show how it works
    ownerModel.findOne({ email: logInEmail })
      .then((result) => {
        // if user exists
        if (result) {
          //check if the entered password matches with that in the DB
          bcrypt.compare(logInPassword, result.logInPassword).then((isMatching) => {
            if (isMatching) {
              // when the user successfully signs up
              // req.session.ownerData = result;
              // req.session.areyoutired = false;
              res.redirect("/ownerProfile");
            } else {
              // when passwords don’t match
              res.render("authorisation/log-in-owner.hbs", {
                msg: "Passwords dont match Check again or just quit...youll never be a dev",
              });
            }
          });
        } else {
          // when the user signs in with an email that does not exits
          res.render("authorisation/log-in-owner.hbs", {
            msg: "Email does not exist",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = router;
