import IPO from '../models/IPO.js';
import { asyncHandler } from '../middleware/error.js';

/**
 * @desc    Get all IPOs with filters and pagination
 * @route   GET /api/ipos
 * @access  Public
 */
export const getIPOs = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    sector,
    search,
    sortBy = 'openDate',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (status) {
    filter.status = status;
  }

  if (sector) {
    filter.sector = sector;
  }

  if (search) {
    filter.$or = [
      { companyName: { $regex: search, $options: 'i' } },
      { symbol: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute query
  const [ipos, total] = await Promise.all([
    IPO.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'firstName lastName email'),
    IPO.countDocuments(filter)
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  res.status(200).json({
    status: 'success',
    data: {
      ipos,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        hasNext,
        hasPrev,
        totalRecords: total
      }
    }
  });
});

/**
 * @desc    Get single IPO by ID
 * @route   GET /api/ipos/:id
 * @access  Public
 */
export const getIPO = asyncHandler(async (req, res) => {
  const ipo = await IPO.findById(req.params.id)
    .populate('createdBy', 'firstName lastName email');

  if (!ipo) {
    return res.status(404).json({
      status: 'error',
      message: 'IPO not found',
      code: 'IPO_NOT_FOUND'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      ipo
    }
  });
});

/**
 * @desc    Create new IPO
 * @route   POST /api/ipos
 * @access  Private (Admin only)
 */
export const createIPO = asyncHandler(async (req, res) => {
  // Add creator to IPO data
  req.body.createdBy = req.user.id;

  const ipo = await IPO.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'IPO created successfully',
    data: {
      ipo
    }
  });
});

/**
 * @desc    Update IPO
 * @route   PUT /api/ipos/:id
 * @access  Private (Admin only)
 */
export const updateIPO = asyncHandler(async (req, res) => {
  const ipo = await IPO.findById(req.params.id);

  if (!ipo) {
    return res.status(404).json({
      status: 'error',
      message: 'IPO not found',
      code: 'IPO_NOT_FOUND'
    });
  }

  // Update IPO
  const updatedIPO = await IPO.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'IPO updated successfully',
    data: {
      ipo: updatedIPO
    }
  });
});

/**
 * @desc    Delete IPO (soft delete)
 * @route   DELETE /api/ipos/:id
 * @access  Private (Admin only)
 */
export const deleteIPO = asyncHandler(async (req, res) => {
  const ipo = await IPO.findById(req.params.id);

  if (!ipo) {
    return res.status(404).json({
      status: 'error',
      message: 'IPO not found',
      code: 'IPO_NOT_FOUND'
    });
  }

  // Soft delete by setting isActive to false
  await IPO.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json({
    status: 'success',
    message: 'IPO deleted successfully'
  });
});

/**
 * @desc    Get IPO statistics
 * @route   GET /api/ipos/stats
 * @access  Public
 */
export const getIPOStats = asyncHandler(async (req, res) => {
  const stats = await IPO.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalValue: { $sum: { $multiply: ['$totalShares', '$priceRange.max'] } }
      }
    }
  ]);

  const sectorStats = await IPO.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: '$sector',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  const total = await IPO.countDocuments({ isActive: true });

  res.status(200).json({
    status: 'success',
    data: {
      total,
      byStatus: stats,
      bySector: sectorStats
    }
  });
});

/**
 * @desc    Get upcoming IPOs
 * @route   GET /api/ipos/upcoming
 * @access  Public
 */
export const getUpcomingIPOs = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const ipos = await IPO.find({
    status: 'upcoming',
    isActive: true,
    openDate: { $gte: new Date() }
  })
    .sort({ openDate: 1 })
    .limit(parseInt(limit))
    .populate('createdBy', 'firstName lastName');

  res.status(200).json({
    status: 'success',
    data: {
      ipos
    }
  });
});

/**
 * @desc    Get currently open IPOs
 * @route   GET /api/ipos/open
 * @access  Public
 */
export const getOpenIPOs = asyncHandler(async (req, res) => {
  const today = new Date();

  const ipos = await IPO.find({
    status: 'open',
    isActive: true,
    openDate: { $lte: today },
    closeDate: { $gte: today }
  })
    .sort({ closeDate: 1 })
    .populate('createdBy', 'firstName lastName');

  res.status(200).json({
    status: 'success',
    data: {
      ipos
    }
  });
});

/**
 * @desc    Update IPO subscription data
 * @route   PUT /api/ipos/:id/subscription
 * @access  Private (Admin only)
 */
export const updateSubscription = asyncHandler(async (req, res) => {
  const { retail, qib, hni, overall } = req.body;

  const ipo = await IPO.findById(req.params.id);

  if (!ipo) {
    return res.status(404).json({
      status: 'error',
      message: 'IPO not found',
      code: 'IPO_NOT_FOUND'
    });
  }

  // Update subscription data
  ipo.subscription = {
    retail: retail || ipo.subscription.retail,
    qib: qib || ipo.subscription.qib,
    hni: hni || ipo.subscription.hni,
    overall: overall || ipo.subscription.overall
  };

  await ipo.save();

  res.status(200).json({
    status: 'success',
    message: 'Subscription data updated successfully',
    data: {
      ipo
    }
  });
});

/**
 * @desc    Update IPO GMP (Grey Market Premium)
 * @route   PUT /api/ipos/:id/gmp
 * @access  Private (Admin only)
 */
export const updateGMP = asyncHandler(async (req, res) => {
  const { gmp } = req.body;

  const ipo = await IPO.findById(req.params.id);

  if (!ipo) {
    return res.status(404).json({
      status: 'error',
      message: 'IPO not found',
      code: 'IPO_NOT_FOUND'
    });
  }

  ipo.gmp = gmp;
  await ipo.save();

  res.status(200).json({
    status: 'success',
    message: 'GMP updated successfully',
    data: {
      ipo
    }
  });
});
