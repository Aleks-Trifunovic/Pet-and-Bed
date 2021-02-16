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
      let cities = owners.map((singleOwner)=>{
          return singleOwner.city
      }).filter((elem, index, arr) => arr.indexOf(elem) === index);

      let petType = owners
        .map((singleOwner) => {
          return singleOwner.ownerPet;
        }).filter((elem, index, arr) => arr.indexOf(elem) === index);
      res.render("all-pet-owners.hbs", { owners,cities, petType });
      
    })
    .catch(()=>{
      console.log("something went wrong finding owners,time to panic")
    })
  
});
// route from allowners page to search and filtered owners page
router.get("/filteredowners", (req, res, next)=> {  
  res.render("filtered-pet-owners.hbs");
});
router.post("/filteredowners", (req,res,next) =>{
    const { ownerPet, ownerCity } = req.body;
    console.log(req.body)
    let obj = {}
    if(ownerPet){
      obj.ownerPet = ownerPet
    }
    if(ownerCity){
      obj.city = ownerCity;
    }
    ownerModel.find(obj)
      .then((result)=>{
        console.log(result)
        res.render("filtered-pet-owners.hbs", { result });
      })
      .catch((err)=>{
          console.log("sth is wrong", err);
      })
});


// router.get("/ownerdetails", (req, res, next) => { //last page for owners

//   res.render("details/owner-details.hbs");
// });


router.get("/allguests", (req, res) => {
  guestModel.find()
    .then((guests) => {
      let cities = guests  
        .map((singleGuest) => {
          console.log(singleGuest.city);
          return singleGuest.city;
        })
        .filter((elem, index, arr) => arr.indexOf(elem) === index);
            
      let petType = guests
        .map((singleGuest) => {
          console.log(singleGuest.guestPet);
          return singleGuest.guestPet;
        })
        .filter((elem, index, arr) => arr.indexOf(elem) === index);
      res.render("all-pet-lovers.hbs", { guests, cities, petType });
    })
    .catch((err) => {
      console.log("something went wrong finding guests,time to panic --->", err);
    });
});

router.get("/ownerProfile", (req,res) => {
  let userData = req.session.userData;
  res.render("profiles/owner-profile.hbs", { userData });
});

router.get("/ownerEdit", (req,res) => {
  let userData = req.session.userData
  res.render("profiles/owner-edit.hbs", { userData });
})

router.get("/guestProfile", (req, res) => {
  let userData = req.session.userData
  res.render("profiles/guest-profile.hbs", { userData });
});




//edit guest
router.get("/:id/guestEdit", (req,res) => {
    let userData = req.session.userData

    let id = req.params.id
    // get all the todo info to show on the edit form
    guestModel.findById(userData)
        .then((guest) => {
            res.render("guest-edit.hbs", {guest})
        })
        .catch(() => {
            console.log("Edit fetch failed!")
        })
})


router.get("/:id/guestEdit", (req,res) => {
  let userData = req.session.userData
  let id = req.params.id
  const {guestName,guestEmail,guestAddress,guestCity,guestCountry,guestPassword,guestPet,aboutMe} = req.body;
  let updatedGuest = {
    name: guestName,
    email: guestEmail,
    address: guestAddress,
    city: guestCity,
    country: guestCountry,
    password: guestPassword,
    guestPet: guestPet,
    aboutMe: aboutMe,
  };

  guestModel.findByIdAndUpdate(updatedGuest)
  //then -> redirect the user
    .then(()=> {
      res.redirect("/")
    })
    .catch(()=> {
      console.log("Edit failed")
    })
  res.render("profiles/guest-edit.hbs", {userData});
})




router.post("/guestEdit", (req,res) => {

})








//route from all guests to filtered guests
router.get("/filteredGuests", (req, res, next) => {
  res.render("filtered-pet-lovers.hbs")
})
router.post("/filteredGuests", (req, res, next) => {
  const { guestName, guestCity } = req.body;
  console.log(req.body);
  let obj = {};
  if (guestName) {
    obj.guestName = guestName;
  }
  if (guestCity) {
    obj.city = guestCity;
  }
  guestModel.find(obj)
    .then((result) => {
      console.log(result);
      res.render("filtered-pet-lovers.hbs", { result });
    })
    .catch((err) => {
      console.log("sth is wrong", err);
    });
});

module.exports = router;


