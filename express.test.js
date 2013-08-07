var superagent = require('superagent');
var expect = require('expect.js');

describe('sharecode rest api server', function(){
  var id, id2;

  it('post object', function(done){
    superagent.post('http://localhost:3000/api/snippets')
      .send({ name: 'John',
        email: 'john@rpjs.co'
      })
      .end(function(e,res){
        //console.log(res.body.snippet[0]._id.length);
        expect(e).to.eql(null);
        expect(res.body.snippet.length).to.eql(1);
        expect(res.body.snippet[0]._id.length).to.eql(24);
        id = res.body.snippet[0]._id;
        done();
      });
  });

  /*
   *it('post other object', function(done){
   *  superagent.post('http://localhost:3000/api/snippets')
   *    .send({ name: 'John',
   *      email: 'john@rpjs.co'
   *    })
   *    .end(function(e,res){
   *      // console.log(res.body.snippet)
   *      expect(e).to.eql(null);
   *      expect(res.body.snippet.length).to.eql(1);
   *      expect(res.body.snippet[0]._id.length).to.eql(24);
   *      id2 = res.body.snippet[0]._id;
   *      done();
   *    });
   *});
   */

  it('retrieves an object', function(done){
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
        //console.log(res.body.snippet);
        expect(e).to.eql(null);
        expect(res.body.snippets.length).to.be.within(1, Infinity);
        expect(res.body.snippets.map(function (item){return item._id;})).to.contain(id);
        done();
      });
  });

  it('updates an object', function(done){
    superagent.put('http://localhost:3000/api/snippets/'+id)
      .send({
        name: 'Peter',
        email: 'peter@yahoo.com'
      })
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        //expect(typeof res.body.snippet).to.eql('object');
        expect(res.body.msg).to.eql('success');
        done();
      });
  });

  it('checks an updated object', function(done){
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

  it('removes an object', function(done){
    superagent.del('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        //expect(typeof res.body.snippet).to.eql('object');
        expect(res.body.msg).to.eql('success');
        done();
      });
  });
});
