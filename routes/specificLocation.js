var express = require('express');
var router = express.Router();

router.get('/qr/:name/:dataString', function(req, res, next) {
  res.render('specificLocation', { title: 'Locating Location', name: req.params.name, dataString: req.params.dataString });
});

module.exports = router;