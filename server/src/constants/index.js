/**
 * Application constants
 */

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// KYC status
export const KYC_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

// IPO status
export const IPO_STATUS = {
  UPCOMING: 'upcoming',
  OPEN: 'open',
  CLOSED: 'closed',
  LISTED: 'listed',
  CANCELLED: 'cancelled'
};

// Application status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ALLOCATED: 'allocated',
  REJECTED: 'rejected',
  REFUNDED: 'refunded'
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  BLOCKED: 'blocked',
  DEBITED: 'debited',
  REFUNDED: 'refunded',
  FAILED: 'failed'
};

// Application categories
export const APPLICATION_CATEGORIES = {
  RETAIL: 'retail',
  HNI: 'hni',
  QIB: 'qib'
};

// Stock exchanges
export const EXCHANGES = {
  NSE: 'NSE',
  BSE: 'BSE',
  BOTH: 'Both'
};

// Industry sectors
export const SECTORS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Energy',
  'Real Estate',
  'Telecommunications',
  'Consumer Goods',
  'Pharmaceuticals',
  'Banking',
  'Insurance',
  'Other'
];

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  NO_TOKEN: 'NO_TOKEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN_TYPE: 'INVALID_TOKEN_TYPE',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  ACCOUNT_DEACTIVATED: 'ACCOUNT_DEACTIVATED',
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_FAILED: 'AUTH_FAILED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  
  // User errors
  USER_EXISTS: 'USER_EXISTS',
  PAN_EXISTS: 'PAN_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_CURRENT_PASSWORD: 'INVALID_CURRENT_PASSWORD',
  INVALID_RESET_TOKEN: 'INVALID_RESET_TOKEN',
  INVALID_VERIFICATION_TOKEN: 'INVALID_VERIFICATION_TOKEN',
  KYC_REQUIRED: 'KYC_REQUIRED',
  EMAIL_VERIFICATION_REQUIRED: 'EMAIL_VERIFICATION_REQUIRED',
  CANNOT_DELETE_SELF: 'CANNOT_DELETE_SELF',
  INVALID_KYC_STATUS: 'INVALID_KYC_STATUS',
  INVALID_SEARCH_QUERY: 'INVALID_SEARCH_QUERY',
  
  // IPO errors
  IPO_NOT_FOUND: 'IPO_NOT_FOUND',
  IPO_NOT_OPEN: 'IPO_NOT_OPEN',
  INVALID_PRICE_RANGE: 'INVALID_PRICE_RANGE',
  INVALID_QUANTITY: 'INVALID_QUANTITY',
  
  // Application errors
  APPLICATION_NOT_FOUND: 'APPLICATION_NOT_FOUND',
  ALREADY_APPLIED: 'ALREADY_APPLIED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  CANNOT_UPDATE: 'CANNOT_UPDATE',
  CANNOT_CANCEL: 'CANNOT_CANCEL',
  
  // General errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DUPLICATE_FIELD: 'DUPLICATE_FIELD',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
};

// Success messages
export const SUCCESS_MESSAGES = {
  // Authentication
  USER_REGISTERED: 'User registered successfully. Please verify your email.',
  LOGIN_SUCCESSFUL: 'Login successful',
  LOGOUT_SUCCESSFUL: 'Logout successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  PASSWORD_RESET_SENT: 'Password reset token sent to email',
  PASSWORD_RESET_SUCCESSFUL: 'Password reset successful',
  EMAIL_VERIFIED: 'Email verified successfully',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  
  // IPO
  IPO_CREATED: 'IPO created successfully',
  IPO_UPDATED: 'IPO updated successfully',
  IPO_DELETED: 'IPO deleted successfully',
  SUBSCRIPTION_UPDATED: 'Subscription data updated successfully',
  GMP_UPDATED: 'GMP updated successfully',
  
  // Application
  APPLICATION_SUBMITTED: 'IPO application submitted successfully',
  APPLICATION_UPDATED: 'Application updated successfully',
  APPLICATION_CANCELLED: 'Application cancelled successfully',
  APPLICATION_STATUS_UPDATED: 'Application status updated successfully',
  
  // User management
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  KYC_STATUS_UPDATED: 'KYC status updated successfully',
  
  // General
  DATA_RETRIEVED: 'Data retrieved successfully'
};

// Default pagination
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100
};

// Investment limits (in INR)
export const INVESTMENT_LIMITS = {
  RETAIL_MAX: 200000, // 2 lakhs
  HNI_MIN: 200001, // Above 2 lakhs
  QIB_MIN: 1000000 // 10 lakhs
};

// File upload limits
export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf']
};

// Date formats
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  DATE_ONLY: 'YYYY-MM-DD',
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm:ss'
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PINCODE: /^\d{6}$/,
  UPI: /^[\w\.-]+@[\w\.-]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};
