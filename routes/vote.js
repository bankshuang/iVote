var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

var postReports = function(db, data, callback){
  var result = [];
  var collection = db.collection('reports');
  collection.insertOne(data, function (err,res){
    if (err == null){
      callback(res);
    }
  });
};

/* POST vote listing. */
router.post('/', function(req, res, next) {
  var u = req.param('user_name');
  var v = req.param('vote_for');
  console.log(u, v);
  if (!u || !v){
    res.writeHeader(401,{
      'Content-Type':'application/json'
    });
    res.end(JSON.stringify({result:'params error'}));
    return;
  }
  var url = 'mongodb://localhost:27017/tim';
  MongoClient.connect(url, function(err, db) {
    postReports(db, {username:u,vote_for:v}, function (result){
      db.close();
      res.writeHeader(200,{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      });
      res.end(JSON.stringify({result:'success'}));
    });
  });
});

module.exports = router;
