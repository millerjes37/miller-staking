const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, paymentController.createPayment);
router.get('/:paymentID', authMiddleware, paymentController.getPayment);
router.put('/:paymentID', authMiddleware, paymentController.updatePayment);
router.delete('/:paymentID', authMiddleware, paymentController.deletePayment);

module.exports = router;
