var express = require('express');
var router = express.Router();
const Advert = require('../models/Advert');

router.get('/', async function (req, res, next) {
    //GET all tags endpoint
    try {

      console.log(req.url);
      const tagValues = await Advert.getTags();
      res.json({ ok: true, result: tagValues });
    } catch (err) {
      res.status(500);
      next(err);
    }
  });

  module.exports = router;