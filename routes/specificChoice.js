var express = require('express');
var router = express.Router();

router.get('/specific/choice/:location', function(req, res, next) {
  res.render('specificChoice', { title: 'Specific Location', location: req.params.location });
});

module.exports = router;