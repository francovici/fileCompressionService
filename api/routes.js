const controller = require('./controllers/aboutController');
const compressFileController = require('./controllers/compressFileController');

const baseUrl = '/api/fileCompression';
module.exports = (app) => {
    app.route(`${baseUrl}/about`).get(controller.about);
    app.route(`${baseUrl}/compressFile`).get(compressFileController);
}