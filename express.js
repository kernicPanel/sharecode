var express = require('express'),
    mongoskin = require('mongoskin');

var app = express();
app.use(express.bodyParser());

var db = mongoskin.db('localhost:27017/sharecode', {safe:true});

app.param('collectionName', function(req, res, next, collectionName){
  if (collectionName === 'snippets') {
    req.collection = db.collection(collectionName);
  }
  return next();
});

app.use(express.logger('dev'));
app.use(express.directory('assets'));
app.use(express.static('assets'));

//app.use(function(req, res, next){
  //console.log(res);
  //next();
//});

app.get('/', function(req, res) {
  //res.send('please select a collection, e.g., /api/snippets');
  res.sendfile('assets/index.html');
});

app.get('/api/:collectionName', function(req, res) {
  req.collection.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
    if (e) {
      next(e);
    }
    res.send(results);
  });
});

app.post('/api/:collectionName', function(req, res) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) {
      next(e);
    }
    console.log('results : ', results);
    res.send(results);
  });
});


app.get('/api/:collectionName/:id', function(req, res) {
  req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) {
      next(e);
    }
    res.send(result);
  });
});

app.put('/api/:collectionName/:id', function(req, res) {
  req.collection.update({_id: req.collection.id(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
    if (e) {
      next(e);
    }
    res.send((result===1)?{msg:'success'}:{msg:'error'});
  });
});

app.del('/api/:collectionName/:id', function(req, res) {
  req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) {
      next(e);
    }
    res.send((result===1)?{msg:'success'}:{msg:'error'});
  });
});


app.listen(3000);
