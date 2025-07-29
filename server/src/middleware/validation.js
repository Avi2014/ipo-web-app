import { body, param, query, validationResult } from 'express-validator';

/**
 * Handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// User validation rules
export const validateUserRegistration = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
    
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
    
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    
  body('phone')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Valid phone number is required'),
    
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Valid date of birth is required')
    .custom((value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 18) {
        throw new Error('Must be at least 18 years old');
      }
      return true;
    }),
    
  body('panNumber')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage('Valid PAN number is required'),
    
  body('address.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
    
  body('address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
    
  body('address.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
    
  body('address.pincode')
    .matches(/^\d{6}$/)
    .withMessage('Valid 6-digit pincode is required'),
    
  body('bankDetails.accountNumber')
    .trim()
    .notEmpty()
    .withMessage('Account number is required'),
    
  body('bankDetails.ifscCode')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage('Valid IFSC code is required'),
    
  body('bankDetails.bankName')
    .trim()
    .notEmpty()
    .withMessage('Bank name is required'),
    
  handleValidationErrors
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
    
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
    
  handleValidationErrors
];

export const validatePasswordReset = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
    
  handleValidationErrors
];

export const validatePasswordUpdate = [
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
    
  handleValidationErrors
];

// IPO validation rules
export const validateIPOCreation = [
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
    
  body('symbol')
    .trim()
    .notEmpty()
    .withMessage('Company symbol is required')
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be between 1 and 10 characters')
    .isAlphanumeric()
    .withMessage('Symbol must contain only letters and numbers'),
    
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
    
  body('sector')
    .isIn([
      'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
      'Energy', 'Real Estate', 'Telecommunications', 'Consumer Goods',
      'Pharmaceuticals', 'Banking', 'Insurance', 'Other'
    ])
    .withMessage('Valid sector is required'),
    
  body('priceRange.min')
    .isFloat({ min: 1 })
    .withMessage('Minimum price must be greater than 0'),
    
  body('priceRange.max')
    .isFloat({ min: 1 })
    .withMessage('Maximum price must be greater than 0')
    .custom((value, { req }) => {
      if (value <= req.body.priceRange?.min) {
        throw new Error('Maximum price must be greater than minimum price');
      }
      return true;
    }),
    
  body('lotSize')
    .isInt({ min: 1 })
    .withMessage('Lot size must be at least 1'),
    
  body('totalShares')
    .isInt({ min: 1 })
    .withMessage('Total shares must be at least 1'),
    
  body('sharesForRetail')
    .isInt({ min: 1 })
    .withMessage('Shares for retail must be at least 1')
    .custom((value, { req }) => {
      if (value > req.body.totalShares) {
        throw new Error('Shares for retail cannot exceed total shares');
      }
      return true;
    }),
    
  body('openDate')
    .isISO8601()
    .withMessage('Valid open date is required')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Open date must be in the future');
      }
      return true;
    }),
    
  body('closeDate')
    .isISO8601()
    .withMessage('Valid close date is required')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.openDate)) {
        throw new Error('Close date must be after open date');
      }
      return true;
    }),
    
  body('listingDate')
    .isISO8601()
    .withMessage('Valid listing date is required')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.closeDate)) {
        throw new Error('Listing date must be after close date');
      }
      return true;
    }),
    
  body('leadManager')
    .trim()
    .notEmpty()
    .withMessage('Lead manager is required'),
    
  body('registrar')
    .trim()
    .notEmpty()
    .withMessage('Registrar is required'),
    
  body('exchange')
    .isArray()
    .withMessage('Exchange must be an array')
    .custom((value) => {
      const validExchanges = ['NSE', 'BSE'];
      const isValid = value.every(exchange => validExchanges.includes(exchange));
      if (!isValid) {
        throw new Error('Exchange must contain valid values: NSE, BSE');
      }
      return true;
    }),
    
  body('documents.drhp')
    .isURL()
    .withMessage('Valid DRHP document URL is required'),
    
  body('financials.revenue')
    .isFloat({ min: 0 })
    .withMessage('Revenue must be a positive number'),
    
  body('financials.profit')
    .isFloat()
    .withMessage('Profit must be a number'),
    
  handleValidationErrors
];

// Application validation rules
export const validateIPOApplication = [
  body('ipoId')
    .isMongoId()
    .withMessage('Valid IPO ID is required'),
    
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
    
  body('pricePerShare')
    .isFloat({ min: 1 })
    .withMessage('Price per share must be greater than 0'),
    
  body('upiId')
    .matches(/^[\w\.-]+@[\w\.-]+$/)
    .withMessage('Valid UPI ID is required'),
    
  handleValidationErrors
];

// Common validation rules
export const validateMongoId = [
  param('id')
    .isMongoId()
    .withMessage('Valid ID is required'),
    
  handleValidationErrors
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  handleValidationErrors
];
