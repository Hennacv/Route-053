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
var specificChoice = require('./routes/specificChoice');
var routeRouter = require('./routes/route');
var routeList = require('./routes/routeList');
var allstoresRouter = require('./routes/allstores');
var muschgalRouter = require('./routes/muschgal');
var muschRouter = require('./routes/musch');
var musgalRouter = require('./routes/musgal');
var chgalRouter = require('./routes/chgal');

var listId = require('./routes/listId');
var specificLocation = require('./routes/specificLocation');
var multipleLocations = require('./routes/multipleLocations');


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
app.get('/specific/choice/:location', function(req, res, next){
  res.render('specificChoice', { title: 'Route 053', location: req.params.location });
});
app.get('/route/:category', function(req, res, next){
  res.render('routeList', { title: 'Route 053', category: req.params.category });
});
app.get('/food/:category', function(req, res, next){
  res.render('foodChoice', { title: 'Route 053', category: req.params.category });
});

// critical paths, touching these will result in the entire app not working
app.get('/list/:sheetId/:listId', function(req, res, next){
  res.render('listId', { title: 'Route 053 | Listing Locations', sheetId: req.params.sheetId, listId: req.params.listId });
});
app.get('/qr/:name/:dataString', function(req, res, next){
  res.render('specificLocation', { title: 'Route 053 | Locating Location', name: req.params.name, dataString: req.params.dataString });
});
app.get('/qr-multi/:types', function(req, res, next){
  res.render('multipleLocations', { title: 'Route 053 | Finding Path', types: req.params.types });
});

// this is the MAIN call for all the locations, except for culture
router.route("/api/fetchList").get(function(req, res){
  var data = req.query;
  var locations = [];
  db.ref(data.sheetId).once('value').then(function(snapshot){

    var allItems = snapshot.val();

    for(let i = 1; i < allItems.length; i++){
      if(data.listId !== "Restaurant") {
        if(data.listId === allItems[i][2]){
          var name = allItems[i][1];
          var category = allItems[i][2];
          var placeId = allItems[i][4];
          var latitude = allItems[i][7];
          var longitude = allItems[i][8];
          var logo = allItems[i][9];

          locations.push({
            name: name,
            placeId: placeId,
            category: category,
            latitude: latitude,
            longitude: longitude,
            logo: logo
          });
        }
      } else {
        if(data.listId === "Restaurant" && (("Cafe" || "Terras") !== allItems[i][2])){
          var name = allItems[i][1];
          var category = allItems[i][2];
          var placeId = allItems[i][4];
          var latitude = allItems[i][7];
          var longitude = allItems[i][8];
          var logo = allItems[i][9];

          locations.push({
            name: name,
            placeId: placeId,
            category: category,
            latitude: latitude,
            longitude: longitude,
            logo: logo
          });
        }
      }
    }
    res.send(locations);
  })
})

// this is the API call for cultures only
router.route("/api/fetchMultipleLocations").get(function(req, res){
  var data = req.query
  data = Object.keys(data)[0].split(' ')
  var locations = [];

  db.ref("cultureSheet").once('value').then(function(snapshot){
    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        if(allItems[i][3] === data[0] || allItems[i][3] === data[1] || allItems[i][3] === data[2]){
          var name = allItems[i][1];
          var category = allItems[i][2];
          var placeId = allItems[i][4];
          var latitude = allItems[i][7];
          var longitude = allItems[i][8];
          var logo = allItems[i][9];

          locations.push({
            name: name,
            placeId: placeId,
            category: category,
            latitude: latitude,
            longitude: longitude,
            logo: logo
          });
        }
    }
    res.send(locations);
  })
})

// ############ QR Codes #######################################

router.route("/api/qr-single").get(function(req, res) {
  var url = "http://www.route053.com/qr/location/";
  var urlLocation = req.query.link.split(',');
  var string = `@${urlLocation[0]},${urlLocation[1]},${urlLocation[2]}`
  url += string;
  console.log("URL STRING:", url);

  qrcode.toDataURL(url, function (err, link) {
    res.set('Content-Type', 'image/png');
    res.send(link)
  })
})

router.route("/api/qr-generic").get(function(req, res) {
  var url = req.query.url;

  qrcode.toDataURL(url, function (err, link) {
    res.set('Content-Type', 'image/png');
    res.send(link)
  })
})

router.route("/api/qr-multiple").get(function(req, res) {
  var url = "http://www.route053.com/qr/route/";
  var data = req.query
  data = Object.keys(data)[0]
  url += data

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
