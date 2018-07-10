var express = require('express');
var router = express.Router();

router.get('/list/:sheetId/:listId', function(req, res, next) {
  res.render('listId', { title: req.params.title, sheetId: req.params.sheetId, listId: req.params.listId });
});

module.exports = router;