const express = require('express');
const router = express.Router();
const billingPreferencesController = require('../controllers/billingPreferencesController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, billingPreferencesController.createOrUpdateBillingPreferences);
router.get('/:ownerID', authMiddleware, billingPreferencesController.getBillingPreferences);

module.exports = router;
