const { Schema, model } = require("mongoose");
//const mongoose = require(`mongoose`);   whats the diference between these two?

//schema for an owner

const ownerSchema = new Schema({
  image: {
    type: String,
    default: ``, 
  },
  personalData: {
    name: String,
    lastName: String,
    email: String,
    phoneNr: Number,
  },
  address: {
    street: String,
    zipCode: String,
    city: String,
    country: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pet: {
    name: String,
    petType: {
      type: String,
      enum: [`cat`, `dog`],
    },
    age: Number,
    aboutPet: String,
    image: {
      type: String,
      default: ``, // paste an image in here
    },
  },
  placeInfo: String,
});

const ownerModel = model("owner", ownerSchema);


module.exports = ownerModel;
