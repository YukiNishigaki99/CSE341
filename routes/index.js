const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.yukiRoute);
routes.get('/fumio', lesson1Controller.fumioRoute);
routes.get('/kumiko', lesson1Controller.kumikoRoute);

module.exports = routes;