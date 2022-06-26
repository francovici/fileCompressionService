const compressFileController = require('./controllers/compressFileController');

const baseUrl = '/api/fileCompression';
module.exports = (app) => {
    app.route(`${baseUrl}/compressFile`).post(compressFileController);
}