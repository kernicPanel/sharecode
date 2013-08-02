var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest api server', function(){
  var id, id2;

  it('post object', function(done){
    superagent.post('http://localhost:3000/api/snippets')
      .send({ name: 'John',
        email: 'john@rpjs.co'
      })
      .end(function(e,res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.length).to.eql(24);
        id = res.body[0]._id;
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
   *      // console.log(res.body)
   *      expect(e).to.eql(null);
   *      expect(res.body.length).to.eql(1);
   *      expect(res.body[0]._id.length).to.eql(24);
   *      id2 = res.body[0]._id;
   *      done();
   *    });
   *});
   */

  it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/api/snippets')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(res.body.length).to.be.within(1, Infinity);
        expect(res.body.map(function (item){return item._id;})).to.contain(id);
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
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.msg).to.eql('success');
        done();
      });
  });

  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        expect(res.body.name).to.eql('Peter');
        done();
      });
  });

  it('removes an object', function(done){
    superagent.del('http://localhost:3000/api/snippets/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.msg).to.eql('success');
        done();
      });
  });
});