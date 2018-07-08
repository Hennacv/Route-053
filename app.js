var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var db = require('./initializesdk.js');
var qrcode = require('qrcode');

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
var specificList = require('./routes/foodChoice');
var specificRouter = require('./routes/specific');
var specificList = require('./routes/specificList');
var routeRouter = require('./routes/route');
var routeList = require('./routes/routeList');
var allstoresRouter = require('./routes/allstores');
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
app.use('/muschgal', muschgalRouter);
app.use('/musch', muschRouter);
app.use('/musgal', musgalRouter);
app.use('/chgal', chgalRouter);
app.get('/specific/:category', function(req, res, next){
  res.render('specificList', { title: 'Route 053', category: req.params.category });
});
app.get('/route/:category', function(req, res, next){
  res.render('routeList', { title: 'Route 053', category: req.params.category });
});
app.get('/food/:category', function(req, res, next){
  res.render('foodChoice', { title: 'Route 053', category: req.params.category });
});

router.route("/api/mastersheet").get(function(req, res) {
  var locations = [];

  db.ref("masterSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        var name = allItems[i][1];
        var category = allItems[i][2];
        var subcategory = allItems[i][3];
        var placeId = allItems[i][4];
        var zone = allItems[i][6];
        var latitude = allItems[i][7];
        var longitude = allItems[i][8];

        locations.push({ name: name, placeId: placeId, category: category, subcategory: subcategory, zone: zone, latitude: latitude, longitude: longitude });
    }
    res.send(locations);
    })
})

router.route("/api/specific-mastersheet").get(function(req, res) {
  var filter = req.query.filter;
  var locations = [];

  db.ref("masterSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
      if(filter === allItems[i][2]){
        var name = allItems[i][1];
        var category = allItems[i][2];
        var subcategory = allItems[i][3];
        var placeId = allItems[i][4];
        var zone = allItems[i][6];
        var latitude = allItems[i][7];
        var longitude = allItems[i][8];

        locations.push({ name: name, placeId: placeId, category: category, subcategory: subcategory, zone: zone, latitude: latitude, longitude: longitude });
      }
    }
    res.send(locations);
    })
})

router.route("/api/route-mastersheet").get(function(req, res) {
  var filter = req.query.filter;
  var locations = [];

  db.ref("masterSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
      if(filter === allItems[i][2]){
        var name = allItems[i][1];
        var category = allItems[i][2];
        var subcategory = allItems[i][3];
        var placeId = allItems[i][4];
        var zone = allItems[i][6];
        var latitude = allItems[i][7];
        var longitude = allItems[i][8];

        locations.push({ name: name, placeId: placeId, category: category, subcategory: subcategory, zone: zone, latitude: latitude, longitude: longitude });
      }
    }
    res.send(locations);
    })
})

router.route("/api/restsheet").get(function(req, res) {
  var restaurants = [];

  db.ref("restSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        var name = allItems[i][0];
        var category = allItems[i][2];
        var subcategory = allItems[i][4];
        var placeId = allItems[i][1];
        var price = allItems[i][3];
        var latitude = allItems[i][5];
        var longitude = allItems[i][6];

        restaurants.push({ name: name, placeId: placeId, category: category, subcategory: subcategory, price: price, latitude: latitude, longitude: longitude });
    }
    res.send(restaurants);
    })
})

router.route("/api/food-restsheet").get(function(req, res) {
  var filter = req.query.filter;
  var restaurants = [];

  db.ref("restSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        if(filter === 'Restaurant' && (("Cafe" || "Terras") !== allItems[i][2])) {
          var name = allItems[i][0];
          var category = allItems[i][2];
          var subcategory = allItems[i][4];
          var placeId = allItems[i][1];
          var price = allItems[i][3];
          var latitude = allItems[i][5];
          var longitude = allItems[i][6];

          restaurants.push({ name: name, placeId: placeId, category: category, subcategory: subcategory, price: price, latitude: latitude, longitude: longitude });
        }
        if(filter === allItems[i][2]){
          var name = allItems[i][0];
          var category = allItems[i][2];
          var subcategory = allItems[i][4];
          var placeId = allItems[i][1];
          var price = allItems[i][3];
          var latitude = allItems[i][5];
          var longitude = allItems[i][6];

          restaurants.push({ name: name, placeId: placeId, category: category, subcategory: subcategory, price: price, latitude: latitude, longitude: longitude });
        }
    }
    res.send(restaurants);
    })
})

router.route("/api/create-qr").get(function(req, res) {
  var url = req.query.url;
  var url = url.toString();

  qrcode.toDataURL(url, function (err, link) {
    res.set('Content-Type', 'image/png');
    res.send(link)
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
