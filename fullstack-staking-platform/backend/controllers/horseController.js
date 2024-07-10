const { sql, poolPromise } = require('../models/db');

const createHorse = async (req, res) => {
  try {
    const { name, ownerID, raceSeriesIDs } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('ownerID', sql.Int, ownerID)
      .input('raceSeriesIDs', sql.NVarChar, JSON.stringify(raceSeriesIDs))
      .query('INSERT INTO Horses (name, ownerID, raceSeriesIDs) VALUES (@name, @ownerID, @raceSeriesIDs)');
    res.status(201).json({ message: 'Horse created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create horse.', details: err });
  }
};

const getHorse = async (req, res) => {
  try {
    const { horseID } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('horseID', sql.Int, horseID)
      .query('SELECT * FROM Horses WHERE horseID = @horseID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'Horse not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve horse.', details: err });
  }
};

const updateHorse = async (req, res) => {
  try {
    const { horseID } = req.params;
    const { name, ownerID, raceSeriesIDs } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('horseID', sql.Int, horseID)
      .input('name', sql.NVarChar, name)
      .input('ownerID', sql.Int, ownerID)
      .input('raceSeriesIDs', sql.NVarChar, JSON.stringify(raceSeriesIDs))
      .query('UPDATE Horses SET name = @name, ownerID = @ownerID, raceSeriesIDs = @raceSeriesIDs WHERE horseID = @horseID');
    res.status(200).json({ message: 'Horse updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update horse.', details: err });
  }
};

const deleteHorse = async (req, res) => {
  try {
    const { horseID } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('horseID', sql.Int, horseID)
      .query('DELETE FROM Horses WHERE horseID = @horseID');
    res.status(200).json({ message: 'Horse deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete horse.', details: err });
  }
};

module.exports = {
  createHorse,
  getHorse,
  updateHorse,
  deleteHorse
};
