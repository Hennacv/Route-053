var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pool2', { title: 'Route 053' });
});

module.exports = router;