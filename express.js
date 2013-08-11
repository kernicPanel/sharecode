var express = require('express'),
    mongoskin = require('mongoskin');

var app = express();
app.use(express.bodyParser());

var db = mongoskin.db('localhost:27017/sharecode', {safe:true});

app.param('collectionName', function(req, res, next, collectionName){
  if (collectionName === 'snippets' || collectionName === 'tags') {
    req.collection = db.collection(collectionName);
    req.collectionName = collectionName;
  }
  return next();
});

app.use(express.logger('dev'));
//app.use(express.directory('assets'));
app.use(express.static('assets'));

var singularize = [];
singularize['snippets'] = 'snippet';
singularize['tags'] = 'tag';

//app.use(function(req, res, next){
  //console.log(res);
  //next();
//});

app.get('/', function(req, res) {
  //res.send('please select a collection, e.g., /api/snippets');
  //console.log('get /');
  res.sendfile('assets/index.html');
  //res.sendfile('index.html');
});

app.get('/api/:collectionName', function(req, res, next) {
  console.log('req.params');
  req.collection.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
    if (e) {
      next(e);
    }
    //res.send({snippets : results});
    var response = {};
    response[req.collectionName] = results;
    res.send(response);
  });
});

app.post('/api/:collectionName', function(req, res, next) {
  req.collection.insert(req.body[singularize[req.collectionName]], {}, function(e, results){
    if (e) {
      next(e);
    }
    //console.log('snippets : ', {snippet : results[0]});
    //res.send({snippet : results[0]});
    var response = {};
    response[singularize[req.collectionName]] = results[0];
    res.send(response);
  });
});


app.get('/api/:collectionName/:id', function(req, res, next) {
  req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) {
      next(e);
    }
    //res.send(result);
    //res.send({snippet : [result]});
    var response = {};
    response[singularize[req.collectionName]] = [result];
    res.send(response);
  });
});

app.put('/api/:collectionName/:id', function(req, res, next) {
  var snippet = req.body[singularize[req.collectionName]];
  req.collection.update({_id: req.collection.id(req.params.id)}, {$set:snippet}, {safe:true, multi:false}, function(e, result){
    if (e) {
      next(e);
    }
    snippet._id = req.params.id;
    //res.send({snippet: snippet}, 200);
    var response = {};
    response[singularize[req.collectionName]] = snippet;
    res.send(response, 200);
  });
});

app.del('/api/:collectionName/:id', function(req, res, next) {
  req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result){
    if (e) {
      next(e);
    }
    //res.send((result===1)?{msg:'success'}:{msg:'error'});
    res.send({}, 200);
  });
});


app.listen(3000);
