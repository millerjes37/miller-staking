const { sql, poolPromise } = require('../models/db');

const createPayment = async (req, res) => {
  try {
    const { recipientName, mailingAddress, directDepositInfo, processingInfo, stakeAmount, seriesID, ownerID } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('recipientName', sql.NVarChar, recipientName)
      .input('mailingAddress', sql.NVarChar, mailingAddress)
      .input('directDepositInfo', sql.NVarChar, directDepositInfo)
      .input('processingInfo', sql.NVarChar, processingInfo)
      .input('stakeAmount', sql.Float, stakeAmount)
      .input('seriesID', sql.Int, seriesID)
      .input('ownerID', sql.Int, ownerID)
      .query('INSERT INTO Payments (recipientName, mailingAddress, directDepositInfo, processingInfo, stakeAmount, seriesID, ownerID) VALUES (@recipientName, @mailingAddress, @directDepositInfo, @processingInfo, @stakeAmount, @seriesID, @ownerID)');
    res.status(201).json({ message: 'Payment created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment.', details: err });
  }
};

const getPayment = async (req, res) => {
  try {
    const { paymentID } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('paymentID', sql.Int, paymentID)
      .query('SELECT * FROM Payments WHERE paymentID = @paymentID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'Payment not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve payment.', details: err });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { paymentID } = req.params;
    const { recipientName, mailingAddress, directDepositInfo, processingInfo, stakeAmount } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('paymentID', sql.Int, paymentID)
      .input('recipientName', sql.NVarChar, recipientName)
      .input('mailingAddress', sql.NVarChar, mailingAddress)
      .input('directDepositInfo', sql.NVarChar, directDepositInfo)
      .input('processingInfo', sql.NVarChar, processingInfo)
      .input('stakeAmount', sql.Float, stakeAmount)
      .query('UPDATE Payments SET recipientName = @recipientName, mailingAddress = @mailingAddress, directDepositInfo = @directDepositInfo, processingInfo = @processingInfo, stakeAmount = @stakeAmount WHERE paymentID = @paymentID');
    res.status(200).json({ message: 'Payment updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment.', details: err });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { paymentID } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('paymentID', sql.Int, paymentID)
      .query('DELETE FROM Payments WHERE paymentID = @paymentID');
    res.status(200).json({ message: 'Payment deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete payment.', details: err });
  }
};

module.exports = {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment
};
