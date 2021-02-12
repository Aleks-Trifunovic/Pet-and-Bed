const { Schema, model } = require("mongoose");
//schema for guest
const guestSchema = new Schema({
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
  preferencePet: {
    type: String,
    enum: [`cat`, `dog`],
  },
  aboutMe: String,
});


const guestModel = model("guest", guestSchema);

module.export = guestModel;
