var express = require('express');
var router = express.Router();

router.get('/food/foodChoice', function(req, res, next) {
  res.render('foodChoice', { title: 'Route 053', category: req.params.category });
});


module.exports = router;