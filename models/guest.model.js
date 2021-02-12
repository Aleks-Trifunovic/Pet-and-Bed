const { Schema, model } = require("mongoose");
//schema for guest
const guestSchema = new Schema({
  image: {
    type: String,
    default: ``,
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
  preferencePet: {
    type: String,
    enum: [`cat`, `dog`],
  },
  aboutMe: {
    type: String,
  },
});

const guestModel = model("guest", guestSchema);

module.export = guestModel;
