import { verifyJWT, requireAdmin, requireUser, requireKYC, requireEmailVerification, optionalJWT } from '../middleware/verifyJWT.js';
import { authenticate, authorize } from '../middleware/auth.js';

/**
 * Middleware configuration guide for different route protection levels:
 * 
 * 1. Public routes (no authentication required):
 *    - No middleware needed
 *    - Example: GET /api/ipos (for browsing IPOs)
 * 
 * 2. Optional authentication (user info if available, but not required):
 *    - Use: optionalJWT
 *    - Example: GET /api/ipos (with user-specific data if logged in)
 * 
 * 3. Basic authentication required:
 *    - Use: verifyJWT or authenticate
 *    - Example: GET /api/auth/me
 * 
 * 4. Role-based authentication:
 *    - Use: verifyJWT + requireAdmin
 *    - Or: authenticate + authorize('admin')
 *    - Example: POST /api/ipos (admin only)
 * 
 * 5. User with KYC verification:
 *    - Use: verifyJWT + requireKYC
 *    - Or: authenticate + requireKYC
 *    - Example: POST /api/applications
 * 
 * 6. User with email verification:
 *    - Use: verifyJWT + requireEmailVerification
 *    - Or: authenticate + requireEmailVerification
 *    - Example: Critical user actions
 * 
 * 7. Full verification (Auth + Email + KYC):
 *    - Use: verifyJWT + requireEmailVerification + requireKYC
 *    - Or: authenticate + requireEmailVerification + requireKYC
 *    - Example: IPO applications
 */

// Example usage patterns:

// Pattern 1: Public route
// router.get('/public', controller);

// Pattern 2: Optional auth
// router.get('/optional', optionalJWT, controller);

// Pattern 3: Basic auth
// router.get('/protected', verifyJWT, controller);

// Pattern 4: Admin only
// router.post('/admin-only', verifyJWT, requireAdmin, controller);

// Pattern 5: User with KYC
// router.post('/kyc-required', verifyJWT, requireKYC, controller);

// Pattern 6: User with email verification
// router.post('/email-verified', verifyJWT, requireEmailVerification, controller);

// Pattern 7: Full verification
// router.post('/full-verification', verifyJWT, requireEmailVerification, requireKYC, controller);

export {
  verifyJWT,
  requireAdmin,
  requireUser,
  requireKYC,
  requireEmailVerification,
  optionalJWT,
  authenticate,
  authorize
};
