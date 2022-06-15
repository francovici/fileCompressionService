import { Request, Response } from "express";

const controller = (req : Request, res : Response) => {
    const compressedFile = null;
    //Read File from req.
    const fileContent = req.body;

    //Write tmp file

    //Compress File

    //Return compressed File
    res.status(200).send(compressedFile);
};

module.exports = controller;