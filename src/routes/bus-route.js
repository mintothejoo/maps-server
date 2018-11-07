var express = require('express');
var router = express.Router();
var bus = require('./../controller/bus');

router.get('/', bus.getBusRoute);

module.exports = router;
