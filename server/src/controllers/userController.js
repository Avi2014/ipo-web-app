import User from '../models/User.js';
import { asyncHandler } from '../middleware/error.js';

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private (Admin only)
 */
export const getUsers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    kycStatus,
    isActive,
    role,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = {};

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { panNumber: { $regex: search, $options: 'i' } }
    ];
  }

  if (kycStatus) filter.kycStatus = kycStatus;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (role) filter.role = role;

  // Calculate pagination
  const skip = (page - 1) * limit;
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute query
  const [users, total] = await Promise.all([
    User.find(filter)
      .select('-password -refreshToken -passwordResetToken -emailVerificationToken')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit)),
    User.countDocuments(filter)
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: 'success',
    data: {
      users,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        totalRecords: total
      }
    }
  });
});

/**
 * @desc    Get single user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private (Admin only)
 */
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password -refreshToken -passwordResetToken -emailVerificationToken');

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
      code: 'USER_NOT_FOUND'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * @desc    Update user (Admin only)
 * @route   PUT /api/users/:id
 * @access  Private (Admin only)
 */
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
      code: 'USER_NOT_FOUND'
    });
  }

  // Fields that admin can update
  const allowedFields = [
    'firstName',
    'lastName',
    'phone',
    'kycStatus',
    'isActive',
    'role',
    'isEmailVerified'
  ];

  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true
    }
  ).select('-password -refreshToken -passwordResetToken -emailVerificationToken');

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: {
      user: updatedUser
    }
  });
});

/**
 * @desc    Delete user (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private (Admin only)
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
      code: 'USER_NOT_FOUND'
    });
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user.id) {
    return res.status(400).json({
      status: 'error',
      message: 'Cannot delete your own account',
      code: 'CANNOT_DELETE_SELF'
    });
  }

  // Soft delete by setting isActive to false
  await User.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully'
  });
});

/**
 * @desc    Update KYC status (Admin only)
 * @route   PUT /api/users/:id/kyc
 * @access  Private (Admin only)
 */
export const updateKYCStatus = asyncHandler(async (req, res) => {
  const { kycStatus } = req.body;

  if (!['pending', 'verified', 'rejected'].includes(kycStatus)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid KYC status',
      code: 'INVALID_KYC_STATUS'
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
      code: 'USER_NOT_FOUND'
    });
  }

  user.kycStatus = kycStatus;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'KYC status updated successfully',
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        kycStatus: user.kycStatus
      }
    }
  });
});

/**
 * @desc    Get user statistics (Admin only)
 * @route   GET /api/users/stats
 * @access  Private (Admin only)
 */
export const getUserStats = asyncHandler(async (req, res) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: { $sum: { $cond: ['$isActive', 1, 0] } },
        verified: { $sum: { $cond: [{ $eq: ['$kycStatus', 'verified'] }, 1, 0] } },
        pending: { $sum: { $cond: [{ $eq: ['$kycStatus', 'pending'] }, 1, 0] } },
        rejected: { $sum: { $cond: [{ $eq: ['$kycStatus', 'rejected'] }, 1, 0] } },
        emailVerified: { $sum: { $cond: ['$isEmailVerified', 1, 0] } }
      }
    }
  ]);

  const kycStats = await User.aggregate([
    {
      $group: {
        _id: '$kycStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const monthlyRegistrations = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      overview: stats[0] || {},
      kycBreakdown: kycStats,
      monthlyRegistrations
    }
  });
});

/**
 * @desc    Search users (Admin only)
 * @route   GET /api/users/search
 * @access  Private (Admin only)
 */
export const searchUsers = asyncHandler(async (req, res) => {
  const { q, limit = 10 } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({
      status: 'error',
      message: 'Search query must be at least 2 characters',
      code: 'INVALID_SEARCH_QUERY'
    });
  }

  const users = await User.find({
    $or: [
      { firstName: { $regex: q, $options: 'i' } },
      { lastName: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { panNumber: { $regex: q, $options: 'i' } }
    ],
    isActive: true
  })
    .select('firstName lastName email panNumber kycStatus')
    .limit(parseInt(limit));

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});
