const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const morganBody = require('morgan-body');
const dotenv = require('dotenv');

//Auth0
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

dotenv.config();

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
//app.use(checkJwt);

routes(app);
app.use(bodyParser.json({ type: 'application/*+json'}));
morganBody(app);
app.server = app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});

module.exports = app;
