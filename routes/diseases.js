const express = require('express');
const router = express.Router();

const diseasesController = require('../controllers/diseases');

router.get('/', diseasesController.getAll);

router.get('/:id', diseasesController.getSingle);

router.post('/', diseasesController.recordDisease);

router.put('/:id', diseasesController.updateDisease);

router.delete('/:id', diseasesController.deleteDisease);

module.exports = router;