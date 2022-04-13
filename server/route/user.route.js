const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controllers');

router.get('/', UserController.index);
router.post('/', UserController.store);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleted)

module.exports = router;