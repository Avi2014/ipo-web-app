# Authentication & Authorization System

## Issues Fixed

### 1. Mongoose Duplicate Index Warnings
**Problem:** Duplicate schema index warnings were occurring because indexes were defined both in the schema field definitions (`unique: true`) and separately using `schema.index()`.

**Solution:** 
- Removed `unique: true` from schema field definitions
- Kept unique indexes defined using `schema.index({ field: 1 }, { unique: true })`
- This approach provides better control and avoids duplication

**Files Modified:**
- `src/models/User.js` - Email field
- `src/models/IPO.js` - Symbol field  
- `src/models/Application.js` - ApplicationNumber and BidId fields

### 2. JWT Middleware Implementation
**Problem:** The `verifyJWT.js` file was empty and needed implementation.

**Solution:** Created a comprehensive JWT middleware system with:
- JWT token verification
- Role-based authorization
- KYC verification checks
- Email verification checks
- Optional authentication for public routes

**File Created:** `src/middleware/verifyJWT.js`

## Authentication System Overview

### Available Middleware Functions

#### 1. `verifyJWT`
- **Purpose:** Core JWT verification middleware
- **Usage:** Verifies JWT tokens and adds user info to request
- **Response:** 401 if token invalid/missing, 500 for server errors

#### 2. `requireRole(...roles)`
- **Purpose:** Role-based authorization
- **Usage:** `requireRole('admin', 'user')`
- **Response:** 403 if insufficient permissions

#### 3. `requireAdmin`
- **Purpose:** Admin-only access (shorthand)
- **Usage:** `requireAdmin`
- **Equivalent to:** `requireRole('admin')`

#### 4. `requireUser` 
- **Purpose:** User or admin access (shorthand)
- **Usage:** `requireUser`
- **Equivalent to:** `requireRole('user', 'admin')`

#### 5. `requireKYC`
- **Purpose:** Requires verified KYC status
- **Usage:** `requireKYC`
- **Response:** 403 if KYC not verified

#### 6. `requireEmailVerification`
- **Purpose:** Requires verified email
- **Usage:** `requireEmailVerification`
- **Response:** 403 if email not verified

#### 7. `optionalJWT`
- **Purpose:** Optional authentication
- **Usage:** Adds user info if token provided, continues if not
- **Use Case:** Public routes that can show user-specific data

## Route Protection Patterns

### Pattern 1: Public Routes
```javascript
// No authentication required
router.get('/public-data', controller);
```

### Pattern 2: Optional Authentication
```javascript
// User data if available, but not required
router.get('/browse-ipos', optionalJWT, controller);
```

### Pattern 3: Basic Authentication
```javascript
// Must be logged in
router.get('/profile', verifyJWT, controller);
```

### Pattern 4: Admin Only
```javascript
// Admin role required
router.post('/admin-action', verifyJWT, requireAdmin, controller);
```

### Pattern 5: KYC Required
```javascript
// Must have verified KYC
router.post('/invest', verifyJWT, requireKYC, controller);
```

### Pattern 6: Email Verification Required
```javascript
// Must have verified email
router.post('/sensitive-action', verifyJWT, requireEmailVerification, controller);
```

### Pattern 7: Full Verification (Recommended for IPO Applications)
```javascript
// Must be logged in, email verified, and KYC verified
router.post('/apply-ipo', verifyJWT, requireEmailVerification, requireKYC, controller);
```

## Current Route Protection Status

### Auth Routes (`/api/auth/*`)
- `POST /register` - Public ✅
- `POST /login` - Public ✅
- `POST /logout` - Authenticated ✅
- `GET /me` - Authenticated ✅
- `PUT /me` - Authenticated ✅
- `PUT /change-password` - Authenticated ✅
- `POST /forgot-password` - Public ✅
- `PUT /reset-password` - Public ✅
- `PUT /verify-email` - Public ✅
- `POST /refresh` - Public ✅

### IPO Routes (`/api/ipos/*`)
- `GET /stats` - Public ✅
- `GET /upcoming` - Public ✅
- `GET /open` - Public ✅
- `GET /` - Public (with optional auth) ✅
- `POST /` - Admin only ✅
- `GET /:id` - Public ✅
- `PUT /:id` - Admin only ✅
- `DELETE /:id` - Admin only ✅
- `PUT /:id/subscription` - Admin only ✅
- `PUT /:id/gmp` - Admin only ✅

### Application Routes (`/api/applications/*`)
- `GET /stats` - Admin only ✅
- `GET /admin/all` - Admin only ✅
- `POST /` - Authenticated + Email verified + KYC verified ✅
- `GET /` - Authenticated ✅
- `GET /:id` - Authenticated ✅
- `PUT /:id` - Authenticated ✅
- `DELETE /:id` - Authenticated ✅
- `PUT /:id/status` - Admin only ✅

### User Routes (`/api/users/*`)
All routes require admin authentication:
- `GET /stats` - Admin only ✅
- `GET /search` - Admin only ✅
- `GET /` - Admin only ✅
- `GET /:id` - Admin only ✅
- `PUT /:id` - Admin only ✅
- `DELETE /:id` - Admin only ✅
- `PUT /:id/kyc` - Admin only ✅

## Error Codes Reference

### Authentication Errors
- `NO_TOKEN` - No authorization token provided
- `INVALID_TOKEN_TYPE` - Wrong token type (refresh instead of access)
- `USER_NOT_FOUND` - Valid token but user doesn't exist
- `ACCOUNT_DEACTIVATED` - User account is deactivated
- `INVALID_TOKEN` - Malformed token
- `TOKEN_EXPIRED` - Token has expired
- `TOKEN_NOT_ACTIVE` - Token not active yet
- `VERIFICATION_ERROR` - Server error during verification

### Authorization Errors
- `AUTH_REQUIRED` - Authentication required for this action
- `INSUFFICIENT_PERMISSIONS` - User lacks required role
- `KYC_REQUIRED` - KYC verification required
- `EMAIL_VERIFICATION_REQUIRED` - Email verification required

## Request Object Extensions

When authenticated, the following properties are added to `req`:
- `req.user` - Full user object (excluding sensitive fields)
- `req.userId` - User ID for convenience
- `req.userRole` - User role for convenience

## Security Features

1. **Token Validation:** Comprehensive JWT validation with proper error handling
2. **User Status Checks:** Verifies user is active before granting access
3. **Role-Based Access:** Granular control over route access
4. **KYC Integration:** Ensures financial compliance for investments
5. **Email Verification:** Prevents unauthorized account usage
6. **Sensitive Data Protection:** Excludes passwords and tokens from responses

## Testing the System

### Test Authentication Required Routes
```bash
# Should return 401 - No token
curl http://localhost:5000/api/auth/me

# Should return 200 - Public route
curl http://localhost:5000/api/ipos/stats
```

### Test with Valid Token
```bash
# Login first to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Use token in subsequent requests
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Migration Notes

- Existing route protection using `authenticate` and `authorize` middleware continues to work
- New `verifyJWT` middleware can be used alongside or instead of existing middleware
- No breaking changes to existing API responses
- All route protection levels are maintained or enhanced

## Best Practices

1. **Always use HTTPS in production** to protect tokens in transit
2. **Set appropriate token expiration times** in environment variables
3. **Implement token refresh logic** on the client side
4. **Log authentication attempts** for security monitoring
5. **Use KYC and email verification** for sensitive financial operations
6. **Implement rate limiting** on authentication endpoints (already configured)
