const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const morganBody = require('morgan-body');
const fileUpload = require("express-fileupload");
const { rmSync, existsSync } = require('fs');
const path = require('path');

//Auth0
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const fileInFolder = './files/in';
const fileOutFolder = './files/out';
const tempFolder = './tmp';

//Cleanup output dirs
if(existsSync(path.resolve(fileInFolder)))
    rmSync(path.resolve(fileInFolder),{recursive:true});

if(existsSync(path.resolve(fileOutFolder)))
    rmSync(path.resolve(fileOutFolder),{recursive:true});

if(existsSync(path.resolve(tempFolder)))
    rmSync(path.resolve(tempFolder),{recursive:true});

const checkJwt = jwt.expressjwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.API_IDENTIFIER,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });


const app = express();
const port = process.env.PORT || 3000;

const testingEnvironment = process.env.NODE_ENV;

//Only use Auth middleware when not running tests:
if(testingEnvironment != 'TEST') {
    app.use(checkJwt);
}
const maxFileSize = process.env.MAX_FILE_SIZE ? process.env.MAX_FILE_SIZE : 6;

const fileUploadMiddleware = fileUpload({
    limits: {
        fileSize: maxFileSize * 1024 * 1024 
    },
    createParentPath:true,
    abortOnLimit: true,
    responseOnLimit:`File cannot exceed ${maxFileSize} MB`,
    useTempFiles:true,
    tempFileDir: path.resolve('./tmp')
});

app.use(fileUploadMiddleware);

routes(app);
morganBody(app);
app.server = app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

module.exports = {app,checkJwt};
