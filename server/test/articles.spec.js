const app = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const assert = chai.assert;


describe('Articles', function(){
    describe('POST /add : create new article', function(){
        it('should respond with no err', function(done) {
            this.timeout(15000);
            chai.request(app)
            .post('/article/add')
            .send({
                title:'Buaya bangun',
                content:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImdpbGFuZ0BnbWFpbC5jb20iLCJpYXQiOjE1MjM5NjkyNDR9.NMqdCOsFDRamGMgzByr-E87As4XNrb9ez6bX8A_EoWY'
            })
            .end(function (err, res) {
                //console.log(res);                    
                assert.equal(res.error, false,'err is supposed false')
                assert.notEqual(res.status, 500, 'status is not supposed to 500')
                assert.notEqual(res.status, 404, 'status is not supposed to 404')
                assert.notEqual(res.status, 400, 'status is not supposed to 400')
                assert.equal(res.status, 200, 'status is supposed to 200')                    
                done()
                })
        })
    })

    describe('GET /all : get all article', function(){
        it('should respond with all article and no err', function(done) {
            this.timeout(15000);
            chai.request(app)
            .get('/article/all')
            .end(function (err, res) {
                //console.log(res);                    
                assert.equal(res.error, false,'err is supposed false')
                assert.notEqual(res.status, 500, 'status is not supposed to 500')
                assert.notEqual(res.status, 404, 'status is not supposed to 404')
                assert.notEqual(res.status, 400, 'status is not supposed to 400')
                assert.equal(res.status, 200, 'status is supposed to 200')
                assert.typeOf(res.body.articles, 'array', 'articles is supposed to be array')
                assert.isAbove(res.body.articles.length, 0, 'articles length is supposed to be above 0')                      
                done()
                })
        })
    })

    describe('POST /user : get article per user', function(){
        it('should respond with user articles and no err', function(done) {
            this.timeout(15000);
            chai.request(app)
            .post('/article/user')
            .send({
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImdpbGFuZ0BnbWFpbC5jb20iLCJpYXQiOjE1MjM5NjkyNDR9.NMqdCOsFDRamGMgzByr-E87As4XNrb9ez6bX8A_EoWY'
            })
            .end(function (err, res) {
                //console.log(res.error);                    
                assert.equal(res.error, false,'err is supposed false')
                assert.notEqual(res.status, 500, 'status is not supposed to 500')
                assert.notEqual(res.status, 404, 'status is not supposed to 404')
                assert.notEqual(res.status, 400, 'status is not supposed to 400')
                assert.equal(res.status, 200, 'status is supposed to 200')
                assert.typeOf(res.body.articles, 'array', 'articles is supposed to be array')
                assert.isAbove(res.body.articles.length, 0, 'articles length is supposed to be above 0')                     
                done()
                })
        })
    })

    describe('PUT /update : update article', function(){
        it('should respond with no err', function(done) {
            this.timeout(15000);
            chai.request(app)
            .put('/article/delete')
            .send({
                _id:'',
                title:'',
                content:''
            })
            .end(function (err, res) {
                //console.log(res.error);                    
                assert.equal(res.error, false,'err is supposed false')
                assert.notEqual(res.status, 500, 'status is not supposed to 500')
                assert.notEqual(res.status, 404, 'status is not supposed to 404')
                assert.notEqual(res.status, 400, 'status is not supposed to 400')
                assert.equal(res.status, 200, 'status is supposed to 200')
                assert.typeOf(res.body.articles, 'array', 'articles is supposed to be array')
                assert.isAbove(res.body.articles.length, 0, 'articles length is supposed to be above 0')                     
                done()
                })
        })
    })

    describe('DELETE /delete : delete article', function(){
        it('should respond with updated article and no err', function(done) {
            this.timeout(15000);
            chai.request(app)
            .delete('/article/delete')
            .send({
                _id:''
            })
            .end(function (err, res) {
                //console.log(res.error);                    
                assert.equal(res.error, false,'err is supposed false')
                assert.notEqual(res.status, 500, 'status is not supposed to 500')
                assert.notEqual(res.status, 404, 'status is not supposed to 404')
                assert.notEqual(res.status, 400, 'status is not supposed to 400')
                assert.equal(res.status, 200, 'status is supposed to 200')
                assert.typeOf(res.body.articles, 'array', 'articles is supposed to be array')
                assert.isAbove(res.body.articles.length, 0, 'articles length is supposed to be above 0')                     
                done()
                })
        })
    })
    
})






