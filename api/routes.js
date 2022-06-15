const controller = require('./controllers/aboutController');
const baseUrl = '/api/fileCompression';
module.exports = (app) => {
    app.route(`${baseUrl}/about`).get(controller.about);
}