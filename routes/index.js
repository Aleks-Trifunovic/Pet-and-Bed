// const router = require("express").Router(); //explanation for this line of code if possible pls.

const express = require("express")
const router = express.Router()
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage.hbs");
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


