var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var router = express.Router();

var findReports = function(db, callback){
  var result = [];
  var cursor = db.collection('reports').find();
  cursor.each(function(err, doc){
    if (doc != null){
      result.push(doc);
    }else{
      callback(result);
    }
  });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = 'mongodb://localhost:27017/tim';
  MongoClient.connect(url, function(err, db) {
    findReports(db, function(result){
      db.close();
      res.writeHeader(200,{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      });
      res.end(JSON.stringify(result));
    });
  });
});

module.exports = router;
