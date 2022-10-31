process.env.NODE_ENV = 'TEST';

import { describe, it } from "mocha";
import {app} from "../server";
import request from "supertest";
import { readFileSync, writeFileSync } from "fs";
import { NextFunction } from "express";
import path from "path";
import { expect } from "chai";

describe('Running fileCompressor tests...',() => {
    it('Should return the compressed file',(done : NextFunction)=>{
        
        request(app)
            .post('/api/fileCompression/compressFile')
            .set('Content-Type','multipart/form-data')
            .attach('archivo',readFileSync(path.resolve('./test-files/big2-wallpaper.jpg')),{filename:'big2-wallpaper.jpg'})
            .expect('Content-Type','application/octet-stream')
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                writeFileSync(path.resolve('./tmp/big-wallpaper-test.zip'),res.body);
                // Done
                done();
              });
    });
 
    it('Should return error if file is too big',(done)=>{
        
        request(app)
            .post('/api/fileCompression/compressFile')
            .set('Content-Type','multipart/form-data')
            .attach('archivo',readFileSync(path.resolve('./test-files/matrix.gif')),{filename:'big-wallpaper.jpg'})
            .expect(413, (err,res) => {
                expect(res.status).to.equal(413);
                done();
              });
    });

    
    
});