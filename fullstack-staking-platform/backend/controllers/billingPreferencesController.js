const { sql, poolPromise } = require('../models/db');

const createOrUpdateBillingPreferences = async (req, res) => {
  try {
    const { ownerID, preference } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('ownerID', sql.Int, ownerID)
      .input('preference', sql.NVarChar, preference)
      .query(`
        MERGE INTO BillingPreferences AS target
        USING (VALUES (@ownerID, @preference)) AS source (ownerID, preference)
        ON target.ownerID = source.ownerID
        WHEN MATCHED THEN
          UPDATE SET preference = source.preference
        WHEN NOT MATCHED THEN
          INSERT (ownerID, preference) VALUES (source.ownerID, source.preference);
      `);
    res.status(200).json({ message: 'Billing preferences saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save billing preferences.', details: err });
  }
};

const getBillingPreferences = async (req, res) => {
  try {
    const { ownerID } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ownerID', sql.Int, ownerID)
      .query('SELECT * FROM BillingPreferences WHERE ownerID = @ownerID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'Billing preferences not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve billing preferences.', details: err });
  }
};

module.exports = {
  createOrUpdateBillingPreferences,
  getBillingPreferences
};
