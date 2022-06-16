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

//Cleanup output dirs
if(existsSync(path.resolve(fileInFolder)))
    rmSync(path.resolve(fileInFolder),{recursive:true});

if(existsSync(path.resolve(fileOutFolder)))
    rmSync(path.resolve(fileOutFolder),{recursive:true});


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

app.use(checkJwt);

const maxFileSize = typeof process.env.MAX_FILE_SIZE === 'number' ? process.env.MAX_FILE_SIZE : 6;

app.use(fileUpload({
    limits: {
        fileSize: maxFileSize * 1024 * 1024 
    },
    createParentPath:true,
    abortOnLimit: true,
    responseOnLimit:`File cannot exceed ${maxFileSize} MB`,
    useTempFiles:true,
    tempFileDir: path.resolve('./tmp')
}));

routes(app);
morganBody(app);
app.server = app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

module.exports = app;
