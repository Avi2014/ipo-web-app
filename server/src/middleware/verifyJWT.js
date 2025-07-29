import User from '../models/User.js';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.js';

/**
 * JWT Verification Middleware
 * This middleware verifies JWT tokens and adds user information to the request object
 */
export const verifyJWT = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }

    // Verify the token
    const decoded = verifyToken(token);
    
    // Check if token is an access token
    if (decoded.type !== 'access') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token type. Access token required.',
        code: 'INVALID_TOKEN_TYPE'
      });
    }

    // Find the user and exclude sensitive fields
    const user = await User.findById(decoded.id).select('-password -refreshToken -passwordResetToken -emailVerificationToken');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is valid but user not found.',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account has been deactivated.',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Add user information to request object
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;
    
    next();
    
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token format.',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token has expired.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'NotBeforeError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token not active yet.',
        code: 'TOKEN_NOT_ACTIVE'
      });
    }
    
    // Generic server error
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error during token verification.',
      code: 'VERIFICATION_ERROR'
    });
  }
};

/**
 * Role-based Authorization Middleware
 * Checks if the authenticated user has the required role(s)
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required.',
        code: 'AUTH_REQUIRED'
      });
    }

    // Check if user has required role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions for this action.',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
};

/**
 * Admin Authorization Middleware
 * Shorthand for requiring admin role
 */
export const requireAdmin = requireRole('admin');

/**
 * User Authorization Middleware  
 * Shorthand for requiring user or admin role
 */
export const requireUser = requireRole('user', 'admin');

/**
 * KYC Verification Middleware
 * Checks if user has completed KYC verification
 */
export const requireKYC = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required.',
      code: 'AUTH_REQUIRED'
    });
  }

  if (req.user.kycStatus !== 'verified') {
    return res.status(403).json({
      status: 'error',
      message: 'KYC verification is required for this action.',
      code: 'KYC_REQUIRED',
      kycStatus: req.user.kycStatus
    });
  }

  next();
};

/**
 * Email Verification Middleware
 * Checks if user has verified their email address
 */
export const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required.',
      code: 'AUTH_REQUIRED'
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      status: 'error',
      message: 'Email verification is required for this action.',
      code: 'EMAIL_VERIFICATION_REQUIRED'
    });
  }

  next();
};

/**
 * Optional JWT Verification Middleware
 * Adds user to request if valid token is provided, but doesn't require authentication
 */
export const optionalJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      
      if (decoded.type === 'access') {
        const user = await User.findById(decoded.id).select('-password -refreshToken -passwordResetToken -emailVerificationToken');
        
        if (user && user.isActive) {
          req.user = user;
          req.userId = user._id;
          req.userRole = user.role;
        }
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication on error
    next();
  }
};

export default verifyJWT;
