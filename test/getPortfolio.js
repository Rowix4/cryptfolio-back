const request = require('supertest');
const assert = require('assert');
const express = require('express');
const db = require("../models");
const User = db.user;

const app = express();

app.get("/api/portfolio/:id", function(req, res){
    res.status(200).json({_id: '1', user:'1'})
})

describe('Get /portfolio', function(){
    it('return status 200 when portfolio is get', function(done){
        request(app)
            .get('/api/portfolio/:id')
            .auth('_id', 'user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})