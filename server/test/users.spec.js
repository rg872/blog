const app = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const assert = chai.assert;


describe('Users', function(){
    describe('POST /signup : register new user', function(){
        it('should respond with no err', function(done) {
            this.timeout(15000);
            chai.request(app)
            .post('/user/signup')
            .send({
                name:'Rafie Gilang',
                password:'123',
                email:'gilang@gmail.com',
                role:'admin',
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

    describe('POST /signin : login user', function(){
        it('should respond with token and no err', function(done){
            this.timeout(15000);
            chai.request(app)
            .post('/user/signin')
            .send({
                password:'123',
                email:'gilang@gmail.com'
            })
            .end(function (err, res) {    
                //console.log(res.body.token)            
                assert.equal(res.error, false,'err is supposed to false')    
                assert.notEqual(res.status, 500, 'status is not supposed to 500')
                assert.notEqual(res.status, 404, 'status is not supposed to 404')
                assert.notEqual(res.status, 400, 'status is not supposed to 400')                    
                assert.equal(res.status, 200, 'status is supposed to 200')
                assert.exists(res.body.token, 'token is not supposed to null or undefined')                    
                done()
                })
        })
    })
})






