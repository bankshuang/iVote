var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

var findDocs = function(db, callback){
  var result = [];
  var cursor = db.collection('docs').find();
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
  var url = 'mongodb://<username>:<password>@ds015335.mlab.com:15335/api_docs';
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    // db.close();
    // res.end('ok');
    findDocs(db, function(result){
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
