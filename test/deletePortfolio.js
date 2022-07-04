const request = require('supertest');
const express = require('express');

const app = express();

app.delete("/api/portfolio/:id", function(req, res){
    res.status(200).json({id:'1'})
})

describe('DELETE /portfolio', function(){

    it("return status 200 when portfolio is DELETE", function(done, req){
        request(app)
            .delete('/api/portfolio/:id')
            .set('Accept', 'application/json')
            .expect(200, done);
    })
})
