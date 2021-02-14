// const router = require("express").Router(); //explanation for this line of code if possible pls.

const express = require("express")
const router = express.Router()
const guestModel = require("../models/guest.model.js");
const ownerModel = require("../models/owners.models.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage.hbs");
});


router.get("/allpetowners", (req,res, next)=> {
  res.render("all-pet-owners.hbs");
});

router.get("/allpetlovers", (req, res, next) => {
  res.render("all-pet-lovers.hbs");
});



module.exports = router;


