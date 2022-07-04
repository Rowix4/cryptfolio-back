const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

app.get("/api/user", function(req, res){
    res.status(200).json({mail: 'zizi@zizi.com'})
})

describe('Get /user', function(){
    it('return status 200 when user is get', function(done){
        request(app)
            .get('/api/user')
            .auth('mail', 'password')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})