var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var db = require('./initializesdk.js');

var indexRouter = require('./routes/index');
var firstChRouter = require('./routes/firstCh');
var funRouter = require('./routes/fun');
var funactivitiesRouter = require('./routes/funactivities');
var poolRouter = require('./routes/pool');
var pool1Router = require('./routes/pool1');
var pool2Router = require('./routes/pool2');
var filmRouter = require('./routes/film');
var eroomRouter = require('./routes/eroom');
var cultureRouter = require('./routes/culture');
var museumRouter = require('./routes/museum');
var churchRouter = require('./routes/church');
var galRouter = require('./routes/gal');
var shopRouter = require('./routes/shop');
var foodRouter = require('./routes/food');
var specificRouter = require('./routes/specific');
var routeRouter = require('./routes/route');
var allstoresRouter = require('./routes/allstores');
var terrasRouter = require('./routes/terras');
var cafeRouter = require('./routes/cafe');
var restaurantRouter = require('./routes/restaurant');
var muschgalRouter = require('./routes/muschgal');
var muschRouter = require('./routes/musch');
var musgalRouter = require('./routes/musgal');
var chgalRouter = require('./routes/chgal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3041);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/firstCh', firstChRouter);
app.use('/fun', funRouter);
app.use('/funactivities', funactivitiesRouter);
app.use('/pool', poolRouter);
app.use('/pool1', pool1Router);
app.use('/pool2', pool2Router);
app.use('/film', filmRouter);
app.use('/eroom', eroomRouter);
app.use('/culture', cultureRouter);
app.use('/museum', museumRouter);
app.use('/church', churchRouter);
app.use('/gal', galRouter);
app.use('/shop', shopRouter);
app.use('/food', foodRouter);
app.use('/specific', specificRouter);
app.use('/route', routeRouter);
app.use('/allstores', allstoresRouter);
app.use('/terras', terrasRouter);
app.use('/cafe', cafeRouter);
app.use('/restaurant', restaurantRouter);
app.use('/muschgal', muschgalRouter);
app.use('/musch', muschRouter);
app.use('/musgal', musgalRouter);
app.use('/chgal', chgalRouter);

router.route("/api/mastersheet").get(function(req, res) {
  var locations = [];

  db.ref("masterSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        var placeId = allItems[i][4];
        var name = allItems[i][1];
        locations.push({ name: name, placeId: placeId });
    }
    console.log("locs:", locations);
    res.send(locations);
    })
})

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'));

module.exports = app;
