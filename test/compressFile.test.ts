process.env.NODE_ENV = 'TEST';
console.log(process.env.NODE_ENV);

import { describe, it } from "mocha";
import app from "../server";
import request from "supertest";
import { readFileSync, writeFileSync } from "fs";
import { NextFunction } from "express";
import path from "path";

describe('compress File Tests',() => {
    /* it('Should return error if file is too big',()=>{
        request(app)
            .post('/compressFile')
            .set('Content-Type','multipart/form-data')
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                callStatus = res.body.goodCall;
                expect(callStatus).to.equal(true);
                // Done
                done();
              });
    }); */

    it('Should return the compressed file',(done : NextFunction)=>{
        
        request(app)
            .post('/api/fileCompression/compressFile')
            .set('Content-Type','multipart/form-data')
            .attach('archivo',readFileSync(path.resolve('./assets/big-wallpaper.jpg')),{filename:'big-wallpaper.jpg'})
            .expect('Content-Type','application/octet-stream')
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                writeFileSync(path.resolve('./tmp/big-wallpaper-test.zip'),res.body);
                // Done
                done();
              });
    });

    //Test unauthorized
    
});