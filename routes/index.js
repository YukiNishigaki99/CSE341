const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.displayName);
routes.get('/myGrandfather', myController.myGrandfather);
routes.get('/myGrandmother', myController.myGrandmother);

module.exports = routes;