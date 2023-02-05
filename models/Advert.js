const mongoose = require("mongoose");

const AdvertSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  sale: { type: Boolean, required: true },
  tags: {type: [String], required: true },
  photo: { type: String }
});


const Advert = mongoose.model('Advert', AdvertSchema);

module.exports = Advert;