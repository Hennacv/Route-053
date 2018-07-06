var express = require('express');
var router = express.Router();

router.get('/specific/:category', function(req, res, next) {
  res.render('specificList', { title: 'Route 053', category: req.params.category });
});

module.exports = router;