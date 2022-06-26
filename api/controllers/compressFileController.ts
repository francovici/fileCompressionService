import { Request, Response } from "express";
import { existsSync, mkdirSync, readFile, rmSync } from "fs";
import {zip} from 'compressing';
import { UploadedFile } from "express-fileupload";
import * as path from 'path';

export const controller = (req : Request, res : Response) => {
    
    console.log('--- Incoming File ---')
    console.log(req.files?.archivo);    
    
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

    const fileInFolder = './files/in';
    const fileOutFolder = './files/out';

    const fileInPath = path.resolve(`${fileInFolder}/${fileInName}`);
    const fileOutPath = path.resolve(`${fileOutFolder}/${fileOutName}`);
    
    //Move uploaded file to in dir
    uploadedFile.mv(fileInPath, function(err : Error) {
        if (err)
            return res.status(500).send(err.message);
        
        if(!(existsSync(fileInPath))){
            res.status(500).send('File not ouploaded');
        }

        if(!(existsSync(fileOutFolder))){
            mkdirSync(fileOutFolder);
        }
        //compress file
        zip.compressFile(fileInPath, fileOutPath)
        .then(() =>{
            //return compressed file
            readFile(fileOutPath,(err,data)=>{
                if(err)
                    res.status(500).send('Error when reading compressed file.' + err.message);
                console.log('--- Succeeded file compression  ---')
                res.status(200).send(data);
            });
        })
        .catch((err : Error) => {
            res.status(400).send('Error when compressing file. ' + err.message);
        })
        .finally(()=>{
            //cleanup generated files (in and out)
            rmSync(path.resolve(fileInPath));
            rmSync(path.resolve(fileOutPath));
        });
    });
};

module.exports = controller;