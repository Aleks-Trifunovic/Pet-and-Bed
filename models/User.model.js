const { Schema, model } = require("mongoose");
//const mongoose = require(`mongoose`);   whats the diference between these two?

//schema for guest
const guestSchema = new Schema({
  image: {
    type: String,
    default: ``, // paste an image in here
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
  preferencePet: {
    type: String,
    enum: [`cat`, `dog`],
  },
  aboutMe: String,
});

const guest = mongoose.model("guest", guestSchema);
// const guestModel = model("guest", guestSchema); What is better practice from these 2? which to use?

//schema for an owner

const ownerSchema = new Schema({
  image: {
    type: String,
    default: ``, // paste an image in here
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

const owner = mongoose.model("owner", ownerSchema);

//third model for posting sth...message or a review.

//do we need to use a dot in defining a schema e.g "new.Schema" ?
const reviewSchema = new Schema({
  id: String,
  review: String,
});

const review = mongoose.model("review", reviewSchema);

module.exports = guest;
module.exports = owner;
module.exports = review;
