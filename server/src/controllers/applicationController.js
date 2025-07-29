import mongoose from 'mongoose';
import Application from '../models/Application.js';
import IPO from '../models/IPO.js';
import { asyncHandler } from '../middleware/error.js';

/**
 * @desc    Apply for IPO
 * @route   POST /api/applications
 * @access  Private
 */
export const applyForIPO = asyncHandler(async (req, res) => {
  const { ipoId, quantity, pricePerShare, upiId } = req.body;

  // Check if IPO exists and is open
  const ipo = await IPO.findById(ipoId);
  if (!ipo) {
    return res.status(404).json({
      status: 'error',
      message: 'IPO not found',
      code: 'IPO_NOT_FOUND'
    });
  }

  if (ipo.status !== 'open') {
    return res.status(400).json({
      status: 'error',
      message: 'IPO is not open for applications',
      code: 'IPO_NOT_OPEN'
    });
  }

  // Check if user already applied for this IPO
  const existingApplication = await Application.findOne({
    user: req.user.id,
    ipo: ipoId
  });

  if (existingApplication) {
    return res.status(400).json({
      status: 'error',
      message: 'You have already applied for this IPO',
      code: 'ALREADY_APPLIED'
    });
  }

  // Validate price range
  if (pricePerShare < ipo.priceRange.min || pricePerShare > ipo.priceRange.max) {
    return res.status(400).json({
      status: 'error',
      message: `Price must be between ₹${ipo.priceRange.min} and ₹${ipo.priceRange.max}`,
      code: 'INVALID_PRICE_RANGE'
    });
  }

  // Validate quantity (should be multiple of lot size)
  if (quantity % ipo.lotSize !== 0) {
    return res.status(400).json({
      status: 'error',
      message: `Quantity must be a multiple of lot size (${ipo.lotSize})`,
      code: 'INVALID_QUANTITY'
    });
  }

  // Determine category based on investment amount
  const totalAmount = quantity * pricePerShare;
  let category = 'retail';
  if (totalAmount > 1000000) { // 10 lakhs
    category = 'hni';
  }

  // Create application
  const application = await Application.create({
    user: req.user.id,
    ipo: ipoId,
    category,
    quantity,
    pricePerShare,
    totalAmount,
    upiId,
    bankAccount: req.user.bankDetails
  });

  // Populate the application data
  await application.populate([
    { path: 'user', select: 'firstName lastName email' },
    { path: 'ipo', select: 'companyName symbol priceRange lotSize' }
  ]);

  res.status(201).json({
    status: 'success',
    message: 'IPO application submitted successfully',
    data: {
      application
    }
  });
});

/**
 * @desc    Get user's applications
 * @route   GET /api/applications
 * @access  Private
 */
export const getUserApplications = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter
  const filter = { user: req.user.id };
  if (status) {
    filter.status = status;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute query
  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate('ipo', 'companyName symbol status priceRange listingDate')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit)),
    Application.countDocuments(filter)
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: 'success',
    data: {
      applications,
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
 * @desc    Get single application
 * @route   GET /api/applications/:id
 * @access  Private
 */
export const getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate('user', 'firstName lastName email phone')
    .populate('ipo');

  if (!application) {
    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
      code: 'APPLICATION_NOT_FOUND'
    });
  }

  // Check if user owns this application or is admin
  if (application.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied',
      code: 'ACCESS_DENIED'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

/**
 * @desc    Update application (only before confirmation)
 * @route   PUT /api/applications/:id
 * @access  Private
 */
export const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
      code: 'APPLICATION_NOT_FOUND'
    });
  }

  // Check ownership
  if (application.user.toString() !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied',
      code: 'ACCESS_DENIED'
    });
  }

  // Check if application can be updated
  if (application.status !== 'pending') {
    return res.status(400).json({
      status: 'error',
      message: 'Application cannot be updated after confirmation',
      code: 'CANNOT_UPDATE'
    });
  }

  // Check if IPO is still open
  const ipo = await IPO.findById(application.ipo);
  if (ipo.status !== 'open') {
    return res.status(400).json({
      status: 'error',
      message: 'IPO is no longer open for updates',
      code: 'IPO_NOT_OPEN'
    });
  }

  const allowedUpdates = ['quantity', 'pricePerShare', 'upiId'];
  const updates = {};

  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  // Validate updates
  if (updates.pricePerShare) {
    if (updates.pricePerShare < ipo.priceRange.min || updates.pricePerShare > ipo.priceRange.max) {
      return res.status(400).json({
        status: 'error',
        message: `Price must be between ₹${ipo.priceRange.min} and ₹${ipo.priceRange.max}`,
        code: 'INVALID_PRICE_RANGE'
      });
    }
  }

  if (updates.quantity) {
    if (updates.quantity % ipo.lotSize !== 0) {
      return res.status(400).json({
        status: 'error',
        message: `Quantity must be a multiple of lot size (${ipo.lotSize})`,
        code: 'INVALID_QUANTITY'
      });
    }
  }

  // Update application
  updates.modifiedAt = new Date();
  const updatedApplication = await Application.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  ).populate('ipo', 'companyName symbol');

  res.status(200).json({
    status: 'success',
    message: 'Application updated successfully',
    data: {
      application: updatedApplication
    }
  });
});

/**
 * @desc    Cancel application
 * @route   DELETE /api/applications/:id
 * @access  Private
 */
export const cancelApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
      code: 'APPLICATION_NOT_FOUND'
    });
  }

  // Check ownership
  if (application.user.toString() !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied',
      code: 'ACCESS_DENIED'
    });
  }

  // Check if application can be cancelled
  if (['allocated', 'refunded'].includes(application.status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Application cannot be cancelled at this stage',
      code: 'CANNOT_CANCEL'
    });
  }

  // Update status to rejected (cancelled by user)
  application.status = 'rejected';
  application.notes = 'Cancelled by user';
  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Application cancelled successfully'
  });
});

/**
 * @desc    Get all applications (Admin only)
 * @route   GET /api/applications/admin/all
 * @access  Private (Admin only)
 */
export const getAllApplications = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    category,
    ipoId,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter
  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (ipoId) filter.ipo = ipoId;

  // Calculate pagination
  const skip = (page - 1) * limit;
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute query
  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate('user', 'firstName lastName email phone')
      .populate('ipo', 'companyName symbol status')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit)),
    Application.countDocuments(filter)
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      applications,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalRecords: total
      }
    }
  });
});

/**
 * @desc    Update application status (Admin only)
 * @route   PUT /api/applications/:id/status
 * @access  Private (Admin only)
 */
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus, allocationDetails, notes } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
      code: 'APPLICATION_NOT_FOUND'
    });
  }

  // Update fields
  if (status) application.status = status;
  if (paymentStatus) application.paymentStatus = paymentStatus;
  if (allocationDetails) application.allocationDetails = allocationDetails;
  if (notes) application.notes = notes;

  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Application status updated successfully',
    data: {
      application
    }
  });
});

/**
 * @desc    Get application statistics
 * @route   GET /api/applications/stats
 * @access  Private (Admin only)
 */
export const getApplicationStats = asyncHandler(async (req, res) => {
  const { ipoId } = req.query;

  const matchStage = ipoId ? { ipo: new mongoose.Types.ObjectId(ipoId) } : {};

  const stats = await Application.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);

  const categoryStats = await Application.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' },
        totalQuantity: { $sum: '$quantity' }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      byStatus: stats,
      byCategory: categoryStats
    }
  });
});
