const express = require('express');
const router = express.Router();

const ActivitiesController = require('../controllers/activities.controller');

router.get('/', ActivitiesController.index);
router.post('/', ActivitiesController.store);
router.get('/:id', ActivitiesController.show);
router.put('/:id', ActivitiesController.update);
router.delete('/:id', ActivitiesController.deleted);

module.exports = router;