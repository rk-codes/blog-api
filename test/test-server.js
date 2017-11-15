const chai = require('chai');
const chaiHttp = require('chai-http'); 

const {app, closeServer, runServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Blog API', function() {

	before(function() {
    	return runServer();
  	});
  	after(function() {
    	return closeServer();
  	});

  	it('should list the items on GET', function() {
  		return chai.request(app)
  		  .get('/blog-posts')
  		  .then(function(res) {
  			res.should.have.status(200);
  			res.should.be.json;
  			res.body.should.be.a('array');
  			res.body.length.should.be.at.least(1);
  			const expectedKeys = ['title', 'content', 'author'];
  			res.body.forEach(function(item) {
  				item.should.be.a('object');
  				item.should.include.keys(expectedKeys);
  			})
  		});	
  	});

  	it('should add item on POST', function() {
  		const newItem = {title : "New Title", content: "New Content ", author: "CK"};
  		return chai.request(app)
  		  .post('/blog-posts')
  		  .send(newItem)
  		  .then(function(res) {
  			res.should.have.status(201);
  			res.should.be.json;
  			res.body.should.be.a('object');
  			res.body.should.include.keys('title', 'content', 'author');
  			res.body.id.should.not.be.null;
  		});
  	});

  	it('should delete items on DELETE', function() {
  		return chai.request(app)
  		  .get('/blog-posts')
  		  .then(function(res) {
  			return chai.request(app)
  				.delete(`/blog-posts/${res.body[0].id}`);
  		})
  		.then(function(res) {
  			res.should.have.status(204);
  		});
  	});

  	it('should update item on PUT', function() {

  	})

});