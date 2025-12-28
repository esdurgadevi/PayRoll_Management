// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // ← adjust if you use models/index.js
const ApiError = require('../utils/ApiError');

class authService {
  static generateToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  static async register({ name, email, password, role = 'employee' }) {
    if (await User.findOne({ where: { email } })) {
      throw new ApiError(409, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async login(email, password) {
    const user = await User.findOne({
      where: { email, isActive: true },
    });

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

module.exports = authService;