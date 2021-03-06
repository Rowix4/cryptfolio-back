const request = require('supertest');
const express = require('express');

const app = express();


app.put("/api/user/", function(req, res){
    res.status(200).json()
})


describe('ADD /user', function(req, res) {
    it('return status 200 when user is create', function(done) {
        request(app)
            .post('/api/user/')
            .send({mail:'test@test.com', password:'test'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                password: 'test',
                mail: 'test@test.com'
            }, done);
    });
});