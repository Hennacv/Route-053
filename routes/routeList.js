var express = require('express');
var router = express.Router();

router.get('/route/:category', function(req, res, next) {
  res.render('routeList', { title: 'Route 053', category: req.params.category });
});

module.exports = router;