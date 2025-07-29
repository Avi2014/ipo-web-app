import express from 'express';
import {
  getIPOs,
  getIPO,
  createIPO,
  updateIPO,
  deleteIPO,
  getIPOStats,
  getUpcomingIPOs,
  getOpenIPOs,
  updateSubscription,
  updateGMP
} from '../controllers/ipoController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { validateIPOCreation, validateMongoId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route   GET /api/ipos/stats
 * @desc    Get IPO statistics
 * @access  Public
 */
router.get('/stats', getIPOStats);

/**
 * @route   GET /api/ipos/upcoming
 * @desc    Get upcoming IPOs
 * @access  Public
 */
router.get('/upcoming', getUpcomingIPOs);

/**
 * @route   GET /api/ipos/open
 * @desc    Get currently open IPOs
 * @access  Public
 */
router.get('/open', getOpenIPOs);

/**
 * @route   GET /api/ipos
 * @desc    Get all IPOs with filters and pagination
 * @access  Public
 */
router.get('/', validatePagination, optionalAuth, getIPOs);

/**
 * @route   POST /api/ipos
 * @desc    Create new IPO
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorize('admin'), validateIPOCreation, createIPO);

/**
 * @route   GET /api/ipos/:id
 * @desc    Get single IPO by ID
 * @access  Public
 */
router.get('/:id', validateMongoId, getIPO);

/**
 * @route   PUT /api/ipos/:id
 * @desc    Update IPO
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorize('admin'), validateMongoId, updateIPO);

/**
 * @route   DELETE /api/ipos/:id
 * @desc    Delete IPO (soft delete)
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorize('admin'), validateMongoId, deleteIPO);

/**
 * @route   PUT /api/ipos/:id/subscription
 * @desc    Update IPO subscription data
 * @access  Private (Admin only)
 */
router.put('/:id/subscription', authenticate, authorize('admin'), validateMongoId, updateSubscription);

/**
 * @route   PUT /api/ipos/:id/gmp
 * @desc    Update IPO GMP (Grey Market Premium)
 * @access  Private (Admin only)
 */
router.put('/:id/gmp', authenticate, authorize('admin'), validateMongoId, updateGMP);

export default router;
