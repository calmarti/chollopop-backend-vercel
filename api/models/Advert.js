const mongoose = require("mongoose");

const AdvertSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  sale: { type: Boolean, required: true },
  tags: {type: [String], required: true },
  photo: { type: String }
});

AdvertSchema.statics.getTags = async function() {
  try {
    const values = await Advert.distinct('tags');
    return values;
  } catch (err) {
    throw(err);
  }
};

const Advert = mongoose.model('Advert', AdvertSchema);

module.exports = Advert;