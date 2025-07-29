import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateKYCStatus,
  getUserStats,
  searchUsers
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateMongoId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// All routes in this file require admin authentication
router.use(authenticate);
router.use(authorize('admin'));

/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics
 * @access  Private (Admin only)
 */
router.get('/stats', getUserStats);

/**
 * @route   GET /api/users/search
 * @desc    Search users
 * @access  Private (Admin only)
 */
router.get('/search', searchUsers);

/**
 * @route   GET /api/users
 * @desc    Get all users with filters and pagination
 * @access  Private (Admin only)
 */
router.get('/', validatePagination, getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get single user by ID
 * @access  Private (Admin only)
 */
router.get('/:id', validateMongoId, getUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private (Admin only)
 */
router.put('/:id', validateMongoId, updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (soft delete)
 * @access  Private (Admin only)
 */
router.delete('/:id', validateMongoId, deleteUser);

/**
 * @route   PUT /api/users/:id/kyc
 * @desc    Update KYC status
 * @access  Private (Admin only)
 */
router.put('/:id/kyc', validateMongoId, updateKYCStatus);

export default router;
