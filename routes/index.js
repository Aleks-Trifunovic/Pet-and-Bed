const router = require("express").Router(); //explanation for this line of code if possible pls.

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage.hbs");
});

router.get("/guestSignUp", (req, res, next) => {
  res.render("guest-signUp.hbs");
});

router.get("/ownerSignUp", (req, res, next) => {
  res.render("owner-signUp.hbs");
});

router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.get("/login/searchPage", (req, res, next) => {
  res.render("search.hbs");
});

router.get("/searchPage/overviewGuest", (req, res, next) => {    //ask the explanation of creating static vs dinamic routes
  res.render("overview-guest.hbs");
});

// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// router.get("/", (req, res, next) => {
//   res.render("index");
// });



module.exports = router;
