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
      res.redirect("/logIn");
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
      res.redirect("/logIn");
    })
    .catch(() => {
      console.log("something went wrong creating");
    });
});



router.get("/logIn", (req, res, next) => {
  res.render("authorisation/login.hbs");
});

router.post("/logIn", (req, res, next) => {
  const { logInEmail, logInPassword } = req.body;
  console.log(req.body)
  if (!logInEmail || !logInPassword) {
    res.render("authorisation/login.hbs", { msg: "Please enter all fields" });
    return;
  }
  // email validation
  let re = /\S+@\S+\.\S+/;
  if (!re.test(logInEmail)) {
    res.render("authorisation/login", { msg: "Email not in valid format" });
    return;
  }
  // PASWORD VALIDATION
  let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  if (!regexPass.test(logInPassword)) {
    res.render("authorisation/login", {msg: "Password incorrect",});
  }

// handle post requests when the user submits something in the sign in form
router.post("/logIn", (req, res, next) => {
    const {email, password} = req.body
    // implement the same set of validations as you did in signup as well
    // NOTE: We have used the Async method here. Its just to show how it works
    guestModel.findOne({email: email})
        .then((result) => {
            // if user exists
            if (result) {
                //check if the entered password matches with that in the DB
                bcrypt.compare(password, result.password)
                    .then((isMatching) => {
                        if (isMatching) {
                            // when the user successfully signs up
                            req.session.userData = result
                            req.session.areyoutired = false
                            res.redirect("/profile")
                        }
                        else {
                            // when passwords don’t match
                            res.render("auth/signin.hbs", {msg: "Passwords dont match"})
                        }
                    })
            }
            else {
                // when the user signs in with an email that does not exits
                res.render("auth/signin.hbs", {msg: "Email does not exist"})
            }
        })
        .catch((err) => {
            next(err)
        })
});



  //   let salt = bcrypt.genSaltSync(10);
  //   let hash = bcrypt.hashSync(password, salt);
  //   UserModel.create({ username, email, password: hash });
});


//we are getting an error with the password when we try to login. 
//if you are trying to log in from a guest acc then in if condition this needs to be present "!guestPassword.length".
// if you are logging in from an owners acc then !ownerPassword.length should be there. find a way to make it dinamic perhaps. or whatever.
// we have 2 models, one owner and one guest instead of one. How do we switch between them.



module.exports = router;
