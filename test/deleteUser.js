const request = require('supertest');
const express = require('express');

const app = express();

app.delete("/api/user/:id", function(req, res){
    res.status(200).json({id:'1'})
})

describe('DELETE /user', function(){

    it("return status 200 when user is DELETE", function(done, req){
        request(app)
            .delete('/api/user/:id')
            .set('Accept', 'application/json')
            .expect(200, done);
    })
})
