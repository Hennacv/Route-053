var express = require('express');
var router = express.Router();

router.get('/qr-multi/:types', function(req, res, next) {
  res.render('multipleLocations', { title: 'Route 053 | Finding Route', types: req.params.types });
});

module.exports = router;