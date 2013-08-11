var superagent = require('superagent');
var expect = require('expect.js');

var testSnippet = {
  name: 'John',
  email: 'john@rpjs.co'
};

describe('sharecode rest api server', function(){
  var id, id2;

  it('post a snippet', function(done){
    superagent.post('http://localhost:3000/api/snippets')
      .send({snippet: testSnippet})
      .end(function(e,res){
        //console.log(res.body.snippet);
        expect(e).to.eql(null);
        id = res.body.snippet._id;
        testSnippet._id = id;
        expect(typeof res.body.snippet).to.eql('object');
        expect(res.body.snippet).to.eql(testSnippet);
        expect(res.body.snippet._id.length).to.eql(24);
        done();
      });
  });

  it('retrieves a snippet', function(done){
    superagent.get('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        expect(typeof res.body.snippet[0]).to.eql('object');
        expect(res.body.snippet[0]._id.length).to.eql(24);
        expect(res.body.snippet[0]._id).to.eql(id);
        done();
      });
  });

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/api/snippets')
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        expect(res.body.snippets.length).to.be.within(1, Infinity);
        expect(res.body.snippets.map(function (item){return item._id;})).to.contain(id);
        done();
      });
  });

  var testSnippet2 = {
    name: 'Peter',
    email: 'peter@yahoo.com'
  };

  it('updates a snippet', function(done){
    superagent.put('http://localhost:3000/api/snippets/'+id)
      .send({snippet: testSnippet2})
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        testSnippet2._id = id;
        expect(typeof res.body.snippet).to.eql('object');
        expect(res.body.snippet).to.eql(testSnippet2);
        //expect(res.body.msg).to.eql('success');
        done();
      });
  });

  it('checks an updated snippet', function(done){
    superagent.get('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        expect(typeof res.body.snippet[0]).to.eql('object');
        expect(res.body.snippet[0]._id.length).to.eql(24);
        expect(res.body.snippet[0]._id).to.eql(id);
        expect(res.body.snippet[0].name).to.eql('Peter');
        done();
      });
  });

  it('removes a snippet', function(done){
    superagent.del('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        //console.log(res);
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.statusCode).to.eql(200);
        done();
      });
  });

});
