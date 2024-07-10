const express = require('express');
const router = express.Router();
const raceSeriesController = require('../controllers/raceSeriesController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, raceSeriesController.createRaceSeries);
router.get('/:seriesID', authMiddleware, raceSeriesController.getRaceSeries);
router.put('/:seriesID', authMiddleware, raceSeriesController.updateRaceSeries);
router.delete('/:seriesID', authMiddleware, raceSeriesController.deleteRaceSeries);

module.exports = router;
