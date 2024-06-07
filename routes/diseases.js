const express = require('express');
const router = express.Router();

const diseasesController = require('../controllers/diseases');
const validation = require('../middleware/validate');

router.get('/', diseasesController.getAll);

router.get('/:id', diseasesController.getSingle);

router.post('/', validation.saveDisease, diseasesController.recordDisease);

router.put('/:id', validation.saveDisease, diseasesController.updateDisease);

router.delete('/:id', diseasesController.deleteDisease);

module.exports = router;