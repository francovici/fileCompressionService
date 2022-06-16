import { Request, Response } from "express";
import { existsSync, readFile, readFileSync, write, writeFile, WriteStream } from "fs";
import {zip} from 'compressing';
import { UploadedFile } from "express-fileupload";
import * as path from 'path';

const controller = (req : Request, res : Response) => {
    
    console.log(req.files);    
    
    //Read File from req
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    


    let uploadedFile : UploadedFile | UploadedFile[] = req.files.archivo;
    
    if (uploadedFile instanceof Array){
        uploadedFile = uploadedFile[0];
    }

    const fileInName = `${Date.now()}-${uploadedFile.name}`;
    const fileOutName = `${Date.now()}-${uploadedFile.name.split('.')[0]}.zip`;

    const fileInPath = path.resolve(`./files/in/${fileInName}`);
    const fileOutPath = path.resolve(`./files/out/${fileOutName}`);
    console.log(fileInPath);
    
    //Move uploaded file to in dir
    uploadedFile.mv(fileInPath, function(err : unknown) {
        if (err)
            return res.status(500).send(err);
        
        if(!(existsSync(fileInPath))){
            res.status(500).send('File not ouploaded');
        }
        //compress file
        zip.compressFile(fileInPath, fileOutPath)
        .then(() =>{
            //return compressed file
            readFile(fileOutPath,(err,data)=>{
                res.status(200).send(data);
            });
        })
        .catch((err) => {
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