const { Schema, model } = require("mongoose");
//const mongoose = require(`mongoose`);   whats the diference between these two?

//schema for an owner

const ownerSchema = new Schema({
  image: {
    type: [String],
    default: `https://images.media-allrecipes.com/images/75131.jpg`,
  },
  name: {
    type: String,
    requred: true,
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
    enum: [`Amsterdam`, `Berlin`],
  },
  country: {
    type: String,
    enum: [`Netherlands`, `Germany`],
  },
  password: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
  },
  petName: {
    type: String,
  },
  pet: {
    type: String,
    enum: [`cat`, `dog`],
  },
  petAge: {
    type: Number,
  },
  placeInfo: {
    type:String,
  },
});

const ownerModel = model("owner", ownerSchema);


module.exports = ownerModel;
