const mongoose = require("mongoose")
//schema for guest
const guestSchema = new mongoose.Schema({
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
    required: true,
  },
  country: {
    type: String,
    enum: ["Netherlands", "Germany"],
  },
  password: {
    type: String,
    required: true,
  },
  guestPet: {
    type: String,
    enum: ["cat", "dog", "both"],
    required: true,
  },
  aboutMe: {
    type: String,
  },
  image: {
      type: String,
      default: "",
  }
});


let guestModel = mongoose.model("guest", guestSchema);

module.exports = guestModel;
