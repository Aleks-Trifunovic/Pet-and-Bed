const mongoose = require("mongoose");

//third model for posting sth...message or a review.

//do we need to use a dot in defining a schema e.g "new.Schema" ?
const propositionSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guest",
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
    required: true,
  },
  propositionMessage: {
    type: String,
    required: true,
    
  }
});

const propositionModel = mongoose.model("proposition", propositionSchema);


module.exports = propositionModel;
