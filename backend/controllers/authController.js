// controllers/authController.js
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');
const ApiError = require('../utils/ApiError');

class authController {
  static register = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, 'Name, email and password are required');
    }

    const result = await authService.register({ name, email, password, role });

    res.status(201).json({
      success: true,
      ...result,
    });
  });

  static login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      ...result,
    });
  });
}

module.exports = authController;