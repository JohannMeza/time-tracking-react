const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/home.controller');

router.get('/home', HomeController.index);
router.get('/home', HomeController.show);
router.post('/home', HomeController.store);
router.put('/home', HomeController.update);
router.delete('/home', HomeController.deleted);

module.exports = router;