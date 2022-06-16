import { Request, Response } from "express";
import { readFile, readFileSync, write, writeFile, WriteStream } from "fs";
import {gzip} from 'compressing';
import { UploadedFile } from "express-fileupload";

const controller = (req : Request, res : Response) => {
    
    console.log(req.files);
    //Read File from req
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
    const fileInName = `in-${Date.now()}`;
    const fileOutName = `out-${Date.now()}`;

    let uploadedFile : UploadedFile | UploadedFile[] = req.files[0];
    
    if (uploadedFile instanceof Array){
        uploadedFile = uploadedFile[0];
    }

    //Move uploaded file to in dir
    uploadedFile.mv(fileInName, function(err : unknown) {
        if (err)
            return res.status(500).send(err);
        
        //compress file
        gzip.compressFile(`../../tmp/in/${fileInName}`, `../../tmp/out/${fileOutName}`)
        .then(() =>{
            //return compressed file
            const compressedFile = readFileSync(`../../tmp/out/${fileOutName}`);
            res.status(200).send(compressedFile);
        })
        .catch(() => {
            res.status(400).send('Error when compressing file');
        });
    });

    


    //Write tmp file
    /* 
    writeFile(`../../tmp/in/${fileInName}`,fileContent,(error) => {
        if(error)
            res.status(400).send('Error when reading file');

        //compress file
        gzip.compressFile(`../../tmp/in/${fileInName}`, `../../tmp/out/${fileOutName}`)
        .then(() =>{
            //return compressed file
            const compressedFile = readFileSync(`../../tmp/out/${fileOutName}`);
            res.status(200).send(compressedFile);
        })
        .catch(() => {
            res.status(400).send('Error when compressing file');
        });
    }); */
};

module.exports = controller;