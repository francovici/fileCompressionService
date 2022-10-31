/* process.env.NODE_ENV = 'DEV';

import { describe, it } from "mocha";
import { app,checkJwt } from "../server";
import request from "supertest";
import { readFileSync } from "fs";
import { NextFunction } from "express";
import path from "path";
import { expect } from "chai";
import routes from "../api/routes";

describe('Running authorization tests...',() => {
    before(()=>{
        app.use(checkJwt);
        app._router.stack.splice(app._router.stack.findIndex((route : any) => route.route));
        routes(app);
    });
    it('Should return unauthorized on /fileCompress',(done : NextFunction)=>{
        request(app)
            .post('/api/fileCompression/compressFile')
            .set('Content-Type','multipart/form-data')
            .attach('archivo',readFileSync(path.resolve('./test-files/big-wallpaper.jpg')),{filename:'big-wallpaper.jpg'})
            .expect('Content-Type','application/html')
            .expect(401,(err,res)=>{
                expect(res.status).to.equal(401);
                done();
            });
    });
}); */