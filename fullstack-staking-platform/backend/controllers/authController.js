const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../models/db');
const config = require('../config/config');

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await poolPromise;
    await pool.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .query('INSERT INTO Users (email, password, firstName, lastName) VALUES (@email, @password, @firstName, @lastName)');

    res.status(201).send('User registered successfully.');
  } catch (err) {
    res.status(500).send('Error registering user: ' + err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ userID: user.userID, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid credentials.');
      }
    } else {
      res.status(401).send('Invalid credentials.');
    }
  } catch (err) {
    res.status(500).send('Error logging in user: ' + err);
  }
};

const logout = (req, res) => {
  // Invalidate the token here if using token blacklisting
  res.status(200).send('User logged out successfully.');
};

const getUser = async (req, res) => {
  try {
    const userID = req.userID; // This should be set by the JWT middleware

    const pool = await poolPromise;
    const result = await pool.request()
      .input('userID', sql.Int, userID)
      .query('SELECT userID, email, firstName, lastName FROM Users WHERE userID = @userID');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    res.status(500).send('Error retrieving user: ' + err);
  }
};

module.exports = { register, login, logout, getUser };
