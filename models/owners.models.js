const mongoose = require("mongoose");

//schema for owner
const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requred: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
    enum: ["Amsterdam", "Berlin"],
  },
  country: {
    type: String,
    enum: ["Netherlands", "Germany"],
  },
  password: {
    type: String,
    required: true,
  },
  ownerPet: {
    type: String,
    enum: ["cat", "dog", "both"],
    required: true,
  },
  ownerPetName: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
});

let ownerModel = mongoose.model("owner", ownerSchema);

module.exports = ownerModel;
