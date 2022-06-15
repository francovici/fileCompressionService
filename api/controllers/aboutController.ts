import { Request, Response } from "express";
import { env } from "process";

export const controller = {
    about : (req : Request, res : Response) => {
        res.status(200);
        res.json({message: `${env.APP_NAME} versión ${env.npm_package_version}`});
    }
};

module.exports = controller;