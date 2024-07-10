const { sql, poolPromise } = require('../models/db');

const createOwner = async (req, res) => {
  try {
    const { userID, phoneNumber, address, stripeToken } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('userID', sql.Int, userID)
      .input('phoneNumber', sql.NVarChar, phoneNumber)
      .input('address', sql.NVarChar, address)
      .input('stripeToken', sql.NVarChar, stripeToken)
      .query('INSERT INTO Owners (userID, phoneNumber, address, stripeToken) VALUES (@userID, @phoneNumber, @address, @stripeToken)');
    res.status(201).json({ message: 'Owner created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create owner.', details: err });
  }
};

const getOwner = async (req, res) => {
  try {
    const { ownerID } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ownerID', sql.Int, ownerID)
      .query('SELECT * FROM Owners WHERE ownerID = @ownerID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'Owner not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve owner.', details: err });
  }
};

const updateOwner = async (req, res) => {
  try {
    const { ownerID } = req.params;
    const { phoneNumber, address, stripeToken } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('ownerID', sql.Int, ownerID)
      .input('phoneNumber', sql.NVarChar, phoneNumber)
      .input('address', sql.NVarChar, address)
      .input('stripeToken', sql.NVarChar, stripeToken)
      .query('UPDATE Owners SET phoneNumber = @phoneNumber, address = @address, stripeToken = @stripeToken WHERE ownerID = @ownerID');
    res.status(200).json({ message: 'Owner updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update owner.', details: err });
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { ownerID } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('ownerID', sql.Int, ownerID)
      .query('DELETE FROM Owners WHERE ownerID = @ownerID');
    res.status(200).json({ message: 'Owner deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete owner.', details: err });
  }
};

module.exports = {
  createOwner,
  getOwner,
  updateOwner,
  deleteOwner
};
