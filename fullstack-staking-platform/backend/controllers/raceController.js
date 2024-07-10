const { sql, poolPromise } = require('../models/db');
const { OpenAIApi, Configuration } = require('openai');
const fs = require('fs');
const path = require('path');
const cv2 = require('opencv4nodejs'); // Assuming OpenCV is installed

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const createRace = async (req, res) => {
  try {
    const { raceName, raceDate, raceLocation, seriesID, horseIDs, raceResults } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('raceName', sql.NVarChar, raceName)
      .input('raceDate', sql.Date, raceDate)
      .input('raceLocation', sql.NVarChar, raceLocation)
      .input('seriesID', sql.Int, seriesID)
      .input('horseIDs', sql.NVarChar, JSON.stringify(horseIDs))
      .input('raceResults', sql.NVarChar, JSON.stringify(raceResults))
      .query('INSERT INTO Races (raceName, raceDate, raceLocation, seriesID, horseIDs, raceResults) VALUES (@raceName, @raceDate, @raceLocation, @seriesID, @horseIDs, @raceResults)');
    res.status(201).json({ message: 'Race created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create race.', details: err });
  }
};

const getRace = async (req, res) => {
  try {
    const { raceID } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('raceID', sql.Int, raceID)
      .query('SELECT * FROM Races WHERE raceID = @raceID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'Race not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve race.', details: err });
  }
};

const updateRace = async (req, res) => {
  try {
    const { raceID } = req.params;
    const { raceName, raceDate, raceLocation, seriesID, horseIDs, raceResults } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('raceID', sql.Int, raceID)
      .input('raceName', sql.NVarChar, raceName)
      .input('raceDate', sql.Date, raceDate)
      .input('raceLocation', sql.NVarChar, raceLocation)
      .input('seriesID', sql.Int, seriesID)
      .input('horseIDs', sql.NVarChar, JSON.stringify(horseIDs))
      .input('raceResults', sql.NVarChar, JSON.stringify(raceResults))
      .query('UPDATE Races SET raceName = @raceName, raceDate = @raceDate, raceLocation = @raceLocation, seriesID = @seriesID, horseIDs = @horseIDs, raceResults = @raceResults WHERE raceID = @raceID');
    res.status(200).json({ message: 'Race updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update race.', details: err });
  }
};

const deleteRace = async (req, res) => {
  try {
    const { raceID } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('raceID', sql.Int, raceID)
      .query('DELETE FROM Races WHERE raceID = @raceID');
    res.status(200).json({ message: 'Race deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete race.', details: err });
  }
};

const automateRaceDataInput = async (req, res) => {
  try {
    const { rawRaceData } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Parse the following race data and return a JSON object with keys: raceName, raceDate, raceLocation, seriesID, horseIDs, raceResults:\n${rawRaceData}`,
      max_tokens: 500,
      temperature: 0.7,
    });

    const parsedData = JSON.parse(response.data.choices[0].text.trim());

    const { raceName, raceDate, raceLocation, seriesID, horseIDs, raceResults } = parsedData;
    const pool = await poolPromise;
    await pool.request()
      .input('raceName', sql.NVarChar, raceName)
      .input('raceDate', sql.Date, raceDate)
      .input('raceLocation', sql.NVarChar, raceLocation)
      .input('seriesID', sql.Int, seriesID)
      .input('horseIDs', sql.NVarChar, JSON.stringify(horseIDs))
      .input('raceResults', sql.NVarChar, JSON.stringify(raceResults))
      .query('INSERT INTO Races (raceName, raceDate, raceLocation, seriesID, horseIDs, raceResults) VALUES (@raceName, @raceDate, @raceLocation, @seriesID, @horseIDs, @raceResults)');

    res.status(201).json({ message: 'Race created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to automate race data input.', details: err });
  }
};

module.exports = {
  createRace,
  getRace,
  updateRace,
  deleteRace,
  automateRaceDataInput
};
