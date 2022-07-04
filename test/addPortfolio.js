const request = require('supertest');
const express = require('express');
const db = require("../models");
const User = db.user;

const app = express();


app.put("api/portfolio/", function(req, res){
    res.status(200).json()
})


describe('ADD /portfolio', function() {
    it('return status 200 when portfolio is create', function(done, req, res) {
        const {mail} = req.body;
        const user = User.findOne({mail}).select('+password');
        request(app)
            .post('api/portfolio/')
            .send({name:'portfolio', userId:user._id})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});