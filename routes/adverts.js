var express = require('express');
var router = express.Router();
const Advert = require('../models/Advert');

//GET adverts endpoint
router.get('/', async function(req, res, next) {
console.log('aa')
const adverts = await Advert.find({});
res.json({ok: true, result: adverts});
});

//POST create advert endpoint
router.post('/', function(req,res,next){

});

//EDIT advert endpoint
router.put('/', function(req,res,next){

});


//DELETE advert endpoint
router.delete('/', function(req,res,next){

});


router.get('/tags', function(req,res,next){
  //GET all tags endpoint
});




module.exports = router;
