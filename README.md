# IPO Web App

A comprehensive IPO (Initial Public Offering) management platform built with the MERN stack for production-level deployment.

## 🚀 Project Overview

This is a full-stack IPO portal application that allows users to:
- Browse and track IPO listings
- Apply for IPO investments
- Manage their investment portfolio
- View market analytics and insights
- Handle user authentication and authorization

## 📁 Project Structure

```
ipo/
├── client/                 # React Frontend Application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── common/    # Shared components
│   │   │   ├── layout/    # Layout components (Header, Footer, etc.)
│   │   │   └── ui/        # UI library components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── utils/         # Utility functions
│   │   ├── constants/     # App constants
│   │   └── assets/        # Images, icons, etc.
│   ├── package.json
│   └── vite.config.js
└── server/                # Node.js Backend API
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   ├── middleware/    # Custom middleware
    │   ├── services/      # Business logic services
    │   ├── utils/         # Helper utilities
    │   └── config/        # Configuration files
    ├── package.json
    └── .env
```

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Custom components
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Charts**: Recharts

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **File Upload**: Multer
- **Email**: Nodemailer
- **Environment**: dotenv

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ipo
   ```

2. **Setup Client**
   ```bash
   cd client
   npm install
   ```

3. **Setup Server**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Configuration**
   - Copy `.env.example` to `.env` in the server directory
   - Update the environment variables with your configuration
   - Ensure MongoDB is running

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend Application**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:3000

## 📊 Features (Planned Components)

1. **Authentication System**
   - User registration and login
   - JWT-based authentication
   - Password reset functionality

2. **IPO Listings**
   - Browse upcoming IPOs
   - View IPO details and documents
   - Filter and search functionality

3. **Investment Management**
   - Apply for IPO investments
   - Track application status
   - Portfolio management

4. **Market Analytics**
   - Market trends and insights
   - Performance charts
   - Historical data

5. **Admin Panel**
   - Manage IPO listings
   - User management
   - Analytics dashboard

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation and sanitization
- Security headers with Helmet

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Production Build

1. **Build Client**
   ```bash
   cd client
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd server
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact [avinashranjan2074@gmail.com]

---

**Note**: This is a production-level application structure designed for scalability and maintainability. Make sure to update environment variables and security configurations before deploying to production.
