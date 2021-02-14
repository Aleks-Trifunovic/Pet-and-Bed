// const router = require("express").Router(); //explanation for this line of code if possible pls.

const express = require("express")
const router = express.Router()
const guestModel = require("../models/guest.model.js");
const ownerModel = require("../models/owners.models.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage.hbs");
});

//get, find and show all owners on allowners Page
router.get("/allpetowners", (req,res)=> {
  ownerModel.find()
    .then((owners)=> { 
      res.render("all-pet-owners.hbs", { owners });
      
    })
    .catch(()=>{
      console.log("something went wrong finding owners,time to panic")
    })
  
});
// route from allowners page to search and filtered owners page

router.get("/allfilteredowners", (req, res, next)=> {
  res.render("filtered-pet-owners.hbs");
});
//how to make a search button on all pet owners page send use to filtered owners page? 





// router.get("/allpetlovers", (req, res, next) => {
//   res.render("all-pet-lovers.hbs");
// });



module.exports = router;


