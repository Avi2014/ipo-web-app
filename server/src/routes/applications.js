import express from 'express';
import {
  applyForIPO,
  getUserApplications,
  getApplication,
  updateApplication,
  cancelApplication,
  getAllApplications,
  updateApplicationStatus,
  getApplicationStats
} from '../controllers/applicationController.js';
import { authenticate, authorize, requireKYC, requireEmailVerification } from '../middleware/auth.js';
import { validateIPOApplication, validateMongoId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route   GET /api/applications/stats
 * @desc    Get application statistics
 * @access  Private (Admin only)
 */
router.get('/stats', authenticate, authorize('admin'), getApplicationStats);

/**
 * @route   GET /api/applications/admin/all
 * @desc    Get all applications (Admin only)
 * @access  Private (Admin only)
 */
router.get('/admin/all', authenticate, authorize('admin'), validatePagination, getAllApplications);

/**
 * @route   POST /api/applications
 * @desc    Apply for IPO
 * @access  Private (Requires KYC and Email verification)
 */
router.post('/', authenticate, requireEmailVerification, requireKYC, validateIPOApplication, applyForIPO);

/**
 * @route   GET /api/applications
 * @desc    Get user's applications
 * @access  Private
 */
router.get('/', authenticate, validatePagination, getUserApplications);

/**
 * @route   GET /api/applications/:id
 * @desc    Get single application
 * @access  Private
 */
router.get('/:id', authenticate, validateMongoId, getApplication);

/**
 * @route   PUT /api/applications/:id
 * @desc    Update application (only before confirmation)
 * @access  Private
 */
router.put('/:id', authenticate, validateMongoId, updateApplication);

/**
 * @route   DELETE /api/applications/:id
 * @desc    Cancel application
 * @access  Private
 */
router.delete('/:id', authenticate, validateMongoId, cancelApplication);

/**
 * @route   PUT /api/applications/:id/status
 * @desc    Update application status (Admin only)
 * @access  Private (Admin only)
 */
router.put('/:id/status', authenticate, authorize('admin'), validateMongoId, updateApplicationStatus);

export default router;
