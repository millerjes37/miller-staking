const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, horseController.createHorse);
router.get('/:horseID', authMiddleware, horseController.getHorse);
router.put('/:horseID', authMiddleware, horseController.updateHorse);
router.delete('/:horseID', authMiddleware, horseController.deleteHorse);

module.exports = router;
