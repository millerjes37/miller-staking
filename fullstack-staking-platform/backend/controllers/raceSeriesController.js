const { sql, poolPromise } = require('../models/db');

const createRaceSeries = async (req, res) => {
  try {
    const { name, stakeDueDate, stakeMailInDate, stakeAmount, horseIDs } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('stakeDueDate', sql.Date, stakeDueDate)
      .input('stakeMailInDate', sql.Date, stakeMailInDate)
      .input('stakeAmount', sql.Float, stakeAmount)
      .input('horseIDs', sql.NVarChar, JSON.stringify(horseIDs))
      .query('INSERT INTO Race_Series (name, stakeDueDate, stakeMailInDate, stakeAmount, horseIDs) VALUES (@name, @stakeDueDate, @stakeMailInDate, @stakeAmount, @horseIDs)');
    res.status(201).json({ message: 'Race series created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create race series.', details: err });
  }
};

const getRaceSeries = async (req, res) => {
  try {
    const { seriesID } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('seriesID', sql.Int, seriesID)
      .query('SELECT * FROM Race_Series WHERE seriesID = @seriesID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'Race series not found.' });
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to retrieve race series.', details: err });
  }
};

const updateRaceSeries = async (req, res) => {
  try {
    const { seriesID } = req.params;
    const { name, stakeDueDate, stakeMailInDate, stakeAmount, horseIDs } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('seriesID', sql.Int, seriesID)
      .input('name', sql.NVarChar, name)
      .input('stakeDueDate', sql.Date, stakeDueDate)
      .input('stakeMailInDate', sql.Date, stakeMailInDate)
      .input('stakeAmount', sql.Float, stakeAmount)
      .input('horseIDs', sql.NVarChar, JSON.stringify(horseIDs))
      .query('UPDATE Race_Series SET name = @name, stakeDueDate = @stakeDueDate, stakeMailInDate = @stakeMailInDate, stakeAmount = @stakeAmount, horseIDs = @horseIDs WHERE seriesID = @seriesID');
    res.status(200).json({ message: 'Race series updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update race series.', details: err });
  }
};

const deleteRaceSeries = async (req, res) => {
  try {
    const { seriesID } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('seriesID', sql.Int, seriesID)
      .query('DELETE FROM Race_Series WHERE seriesID = @seriesID');
    res.status(200).json({ message: 'Race series deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete race series.', details: err });
  }
};

module.exports = {
  createRaceSeries,
  getRaceSeries,
  updateRaceSeries,
  deleteRaceSeries
};
