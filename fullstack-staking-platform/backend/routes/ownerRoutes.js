const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, ownerController.createOwner);
router.get('/:ownerID', authMiddleware, ownerController.getOwner);
router.put('/:ownerID', authMiddleware, ownerController.updateOwner);
router.delete('/:ownerID', authMiddleware, ownerController.deleteOwner);

module.exports = router;
