var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://route053-bc66e.firebaseio.com/'
});

var db = admin.database();
module.exports = db;