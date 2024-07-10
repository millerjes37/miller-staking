const express = require('express');
const router = express.Router();
const raceController = require('../controllers/raceController');
const authMiddleware = require('../authMiddleware');
const rbacMiddleware = require('../rbacMiddleware'); // Add this to handle role-based access control

router.post('/', authMiddleware, rbacMiddleware(['Admin']), raceController.createRace);
router.get('/:raceID', authMiddleware, raceController.getRace);
router.put('/:raceID', authMiddleware, rbacMiddleware(['Admin']), raceController.updateRace);
router.delete('/:raceID', authMiddleware, rbacMiddleware(['Admin']), raceController.deleteRace);
router.post('/automate-input', authMiddleware, rbacMiddleware(['Admin']), raceController.automateRaceDataInput);

module.exports = router;
