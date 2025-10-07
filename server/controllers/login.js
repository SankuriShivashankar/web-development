const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const findedUser = await User.findOne({ email: email });
    if (!findedUser) {
      const error = new Error('no user found');
      error.statusCode = 400;
      throw error;
    }

    // Ensure password exists in DB
    if (!findedUser.password) {
      const error = new Error('user has no password set');
      error.statusCode = 400;
      throw error;
    }

    // Ensure request contains password
    if (!password) {
      const error = new Error('password is required');
      error.statusCode = 400;
      throw error;
    }

    // Compare hashed password
    const isPassmatch = await bcrypt.compare(password, findedUser.password);
    if (!isPassmatch) {
      const error = new Error('incorrect password');
      error.statusCode = 400;
      throw error;
    }

    // Generate JWT and set cookie
    const accessToken = generateToken(findedUser.email);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,   // ✅ ok for localhost
      sameSite: 'lax', // ✅ works without https
    });

    res.status(200).json({ message: 'success', status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
