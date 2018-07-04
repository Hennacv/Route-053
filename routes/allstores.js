var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('allstores', { title: 'Route 053' });
});

module.exports = router;