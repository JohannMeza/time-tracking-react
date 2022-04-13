const express = require('express');
const router = express.Router();

const ScheduleController = require('../controllers/schedule.controller');

router.get('/', ScheduleController.index)
router.post('/', ScheduleController.store)
router.get('/:id', ScheduleController.show)
router.put('/:id', ScheduleController.update)
router.delete('/:id', ScheduleController.deleted)

module.exports = router