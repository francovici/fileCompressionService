import { describe, it } from "mocha";
import { expect } from "chai";
import { controller } from "../api/controllers/compressFileController";
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
            //insert a valid token before testing:
            .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVvdDNxT2lpdmtXWDRrbDFuSTdjVSJ9.eyJpc3MiOiJodHRwczovL2Rldi05a2hwb20zbC51cy5hdXRoMC5jb20vIiwic3ViIjoidG13eDNTMWtNN2EwUk9Nd0RmMGxtejhlcjZrQ3NWNERAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZmlsZUNvbXByZXNzaW9uU2VydmljZS8iLCJpYXQiOjE2NTU3Mzg4OTUsImV4cCI6MTY1NTgyNTI5NSwiYXpwIjoidG13eDNTMWtNN2EwUk9Nd0RmMGxtejhlcjZrQ3NWNEQiLCJzY29wZSI6ImdlbmVyYWwiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.QbdU_wnV1sUVH_Agmnd9J_3IbNK_nD5oPeoWReuVTwQOqXK39CbuktajQZ0jE2yJwXG3FPeHvUWeH0i21BK0w445_3LEiLRTqfXBhMIbPhsFPIwKErS79HaTZM1HdIK02T6qn4vuQd17kV1HdU44TgzlBdX082svQCp2-JpbfffvQhLPlcsFlmeQx2Hibnxz71wTg_ZG_1P5BHxaUxxFeeJRYRfzpzQVwigVto_ViyOvasgee6UQK4GdMMvoEB3QMeP7m1JSeAU7P-CTL73ZrqxWJNPF9dAJdJgRxgrUQc7U4JTDlE6FvLMn_J8hWoh4ssFCSD-TBsfKwonQtFak5A')
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