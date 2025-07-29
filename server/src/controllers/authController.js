import User from '../models/User.js';
import { generateTokenResponse, generateSecureToken, hashToken, verifyToken } from '../utils/jwt.js';
import { asyncHandler } from '../middleware/error.js';

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    panNumber,
    address,
    bankDetails
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'User already exists with this email',
      code: 'USER_EXISTS'
    });
  }

  // Check if PAN already exists
  const existingPAN = await User.findOne({ panNumber });
  if (existingPAN) {
    return res.status(400).json({
      status: 'error',
      message: 'User already exists with this PAN number',
      code: 'PAN_EXISTS'
    });
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    panNumber,
    address,
    bankDetails
  });

  // Generate email verification token
  const emailVerificationToken = generateSecureToken();
  user.emailVerificationToken = hashToken(emailVerificationToken);
  await user.save({ validateBeforeSave: false });

  // TODO: Send email verification email
  console.log('Email verification token:', emailVerificationToken);

  // Generate tokens
  const tokenResponse = generateTokenResponse(user);

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully. Please verify your email.',
    data: tokenResponse
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password',
      code: 'INVALID_CREDENTIALS'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      status: 'error',
      message: 'Account is deactivated',
      code: 'ACCOUNT_DEACTIVATED'
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Generate tokens
  const tokenResponse = generateTokenResponse(user);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: tokenResponse
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  // Clear refresh token from database
  await User.findByIdAndUpdate(req.user.id, {
    $unset: { refreshToken: 1 }
  });

  res.status(200).json({
    status: 'success',
    message: 'Logout successful'
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/me
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    'firstName',
    'lastName',
    'phone',
    'address',
    'bankDetails'
  ];

  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({
      status: 'error',
      message: 'Current password is incorrect',
      code: 'INVALID_CURRENT_PASSWORD'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
});

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found with this email',
      code: 'USER_NOT_FOUND'
    });
  }

  // Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // TODO: Send password reset email
  console.log('Password reset token:', resetToken);

  res.status(200).json({
    status: 'success',
    message: 'Password reset token sent to email'
  });
});

/**
 * @desc    Reset password
 * @route   PUT /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  // Hash token
  const hashedToken = hashToken(token);

  // Find user with valid reset token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid or expired reset token',
      code: 'INVALID_RESET_TOKEN'
    });
  }

  // Reset password
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Generate new tokens
  const tokenResponse = generateTokenResponse(user);

  res.status(200).json({
    status: 'success',
    message: 'Password reset successful',
    data: tokenResponse
  });
});

/**
 * @desc    Verify email
 * @route   PUT /api/auth/verify-email
 * @access  Public
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // Hash token
  const hashedToken = hashToken(token);

  // Find user with verification token
  const user = await User.findOne({
    emailVerificationToken: hashedToken
  });

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid verification token',
      code: 'INVALID_VERIFICATION_TOKEN'
    });
  }

  // Mark email as verified
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully'
  });
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      status: 'error',
      message: 'Refresh token is required',
      code: 'NO_REFRESH_TOKEN'
    });
  }

  try {
    // Verify refresh token
    const decoded = verifyToken(refreshToken);
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token type',
        code: 'INVALID_TOKEN_TYPE'
      });
    }

    // Find user
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }

    // Generate new tokens
    const tokenResponse = generateTokenResponse(user);

    res.status(200).json({
      status: 'success',
      message: 'Token refreshed successfully',
      data: tokenResponse
    });

  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid refresh token',
      code: 'INVALID_REFRESH_TOKEN'
    });
  }
});
