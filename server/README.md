# IPO Portal Backend API

A comprehensive REST API for IPO (Initial Public Offering) management built with Node.js, Express, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication & Authorization** with JWT tokens
- **Role-based Access Control** (User, Admin)
- **IPO Management** (CRUD operations)
- **IPO Application System** with validation
- **User Profile Management** with KYC verification
- **Comprehensive Input Validation**
- **Error Handling & Logging**
- **Rate Limiting & Security**
- **RESTful API Design**

## 📋 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| POST | `/logout` | User logout | Private |
| GET | `/me` | Get current user profile | Private |
| PUT | `/me` | Update user profile | Private |
| PUT | `/change-password` | Change password | Private |
| POST | `/forgot-password` | Send password reset email | Public |
| PUT | `/reset-password` | Reset password with token | Public |
| PUT | `/verify-email` | Verify email address | Public |
| POST | `/refresh` | Refresh access token | Public |

### IPO Management (`/api/ipos`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all IPOs with filters | Public |
| GET | `/stats` | Get IPO statistics | Public |
| GET | `/upcoming` | Get upcoming IPOs | Public |
| GET | `/open` | Get currently open IPOs | Public |
| GET | `/:id` | Get single IPO by ID | Public |
| POST | `/` | Create new IPO | Admin |
| PUT | `/:id` | Update IPO | Admin |
| DELETE | `/:id` | Delete IPO | Admin |
| PUT | `/:id/subscription` | Update subscription data | Admin |
| PUT | `/:id/gmp` | Update GMP | Admin |

### Applications (`/api/applications`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Apply for IPO | Private (KYC Required) |
| GET | `/` | Get user's applications | Private |
| GET | `/:id` | Get single application | Private |
| PUT | `/:id` | Update application | Private |
| DELETE | `/:id` | Cancel application | Private |
| GET | `/admin/all` | Get all applications | Admin |
| PUT | `/:id/status` | Update application status | Admin |
| GET | `/stats` | Get application statistics | Admin |

### User Management (`/api/users`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all users with filters | Admin |
| GET | `/stats` | Get user statistics | Admin |
| GET | `/search` | Search users | Admin |
| GET | `/:id` | Get single user by ID | Admin |
| PUT | `/:id` | Update user | Admin |
| DELETE | `/:id` | Delete user (soft delete) | Admin |
| PUT | `/:id/kyc` | Update KYC status | Admin |

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-jwt-token-here
```

### Token Types
- **Access Token**: Used for API requests (expires in 7 days)
- **Refresh Token**: Used to refresh access tokens (expires in 30 days)

## 🏗️ Data Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  dateOfBirth: Date,
  panNumber: String (unique),
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String
  },
  kycStatus: String (pending/verified/rejected),
  isEmailVerified: Boolean,
  isActive: Boolean
}
```

### IPO Model
```javascript
{
  companyName: String,
  symbol: String (unique),
  description: String,
  sector: String,
  priceRange: {
    min: Number,
    max: Number
  },
  lotSize: Number,
  totalShares: Number,
  sharesForRetail: Number,
  openDate: Date,
  closeDate: Date,
  listingDate: Date,
  status: String (upcoming/open/closed/listed/cancelled),
  leadManager: String,
  registrar: String,
  exchange: [String],
  documents: {
    drhp: String,
    rhp: String,
    prospectus: String
  },
  subscription: {
    retail: Number,
    qib: Number,
    hni: Number,
    overall: Number
  },
  gmp: Number
}
```

### Application Model
```javascript
{
  user: ObjectId (User),
  ipo: ObjectId (IPO),
  category: String (retail/hni/qib),
  quantity: Number,
  pricePerShare: Number,
  totalAmount: Number,
  upiId: String,
  status: String (pending/confirmed/allocated/rejected/refunded),
  paymentStatus: String (pending/blocked/debited/refunded/failed),
  allocationDetails: {
    sharesAllocated: Number,
    allocationPrice: Number,
    refundAmount: Number
  },
  applicationNumber: String (unique)
}
```

## 🔒 Security Features

- **JWT Authentication** with secure secret key
- **Password Hashing** using bcrypt with salt rounds
- **Rate Limiting** to prevent abuse
- **Input Validation** using express-validator
- **CORS Configuration** for cross-origin requests
- **Helmet** for security headers
- **Error Handling** without exposing sensitive data

## 🌐 Environment Variables

Create a `.env` file in the server directory:

```env
# Application
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/ipo_portal

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Security
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

3. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running locally or update MONGODB_URI
   mongod
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

## 📝 API Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE",
  "errors": [
    // Validation errors (if any)
  ]
}
```

### Paginated Response
```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": [
    // Array of data
  ],
  "pagination": {
    "current": 1,
    "total": 10,
    "hasNext": true,
    "hasPrev": false,
    "totalRecords": 95,
    "limit": 10
  }
}
```

## 🧪 Testing

The API includes comprehensive validation and error handling. You can test endpoints using:

- **Postman** or **Insomnia** for manual testing
- **Jest** for automated testing (coming soon)
- **curl** for command-line testing

### Example curl commands:

```bash
# Health check
curl http://localhost:5000/health

# API info
curl http://localhost:5000/api

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "phone": "+919876543210",
    "dateOfBirth": "1990-01-01",
    "panNumber": "ABCDE1234F",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    },
    "bankDetails": {
      "accountNumber": "1234567890",
      "ifscCode": "HDFC0000123",
      "bankName": "HDFC Bank"
    }
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Get IPOs
curl http://localhost:5000/api/ipos
```

## 📚 Additional Features

### Validation Rules
- **Email**: Valid email format
- **Password**: Minimum 6 characters with uppercase, lowercase, and number
- **PAN**: Valid Indian PAN format (ABCDE1234F)
- **IFSC**: Valid Indian IFSC format (HDFC0001234)
- **Phone**: Valid international phone format
- **Age**: Minimum 18 years old

### Business Logic
- **IPO Applications**: Users can only apply once per IPO
- **Investment Categories**: Automatic categorization (Retail: up to ₹2L, HNI: above ₹2L)
- **KYC Verification**: Required for IPO applications
- **Email Verification**: Required for sensitive operations
- **Status Updates**: Automatic IPO status updates based on dates

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check MONGODB_URI in .env file
   - For development, the server will continue running without DB

2. **Port Already in Use**
   - Change PORT in .env file
   - Or kill the process using the port: `taskkill /PID <pid> /F`

3. **JWT Token Issues**
   - Make sure JWT_SECRET is set in .env
   - Check token expiration
   - Verify Authorization header format

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- **Avinash Ranjan** - Initial development

---

For more information, contact: avinashranjan2074@gmail.com
