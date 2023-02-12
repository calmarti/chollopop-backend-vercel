var express = require('express');
var router = express.Router();
const Advert = require('../models/Advert');

var multer = require('multer');
const upload = multer();


//GET adverts endpoint
router.get('/', async function (req, res, next) {
  try {
    const adverts = await Advert.find({});
    res.json({ ok: true, result: adverts });
  } catch (err) {
    res.status(500);
    next(err);
  }
});

//GET advert detail endpoint
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const advert = await Advert.findOne({ _id: id });
    res.json({ ok: true, result: advert });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


//POST create advert endpoint to post multipart/form-data with multer. 
//Beware that this implementation only allows to a multipart/form-data object with TEXT ONLY 
//Future version must allow for image uploading

router.post('/', upload.none(),  async function (req, res, next) {
  try {
    const data = req.body;
    const newAdvert = await new Advert(data).save();
    res.status(201);
    res.json({ ok: true, result: newAdvert });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



//DELETE advert endpoint
router.delete('/:id', async function(req,res,next){
  try {
    const id = req.params.id;
    const advert = await Advert.deleteOne({ _id: id });
    res.json({ ok: true});
  } catch (err) {
    res.status(500);
    next(err);
  }
});



//TODO: not essential for next deployment
//EDIT advert endpoint
router.put('/', function(req,res,next){

});


module.exports = router;
