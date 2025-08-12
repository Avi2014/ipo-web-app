# Deployment Guide for IPO Web App

This guide will help you deploy your IPO Web App to Vercel with separate frontend and backend deployments.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster for production
3. **GitHub Repository**: Push your code to GitHub (or deploy directly)

## Deployment Architecture

This app uses **separate deployments**:
- **Frontend**: React app deployed as static site
- **Backend**: Node.js API deployed as serverless functions

## Environment Variables Setup

### Backend Environment Variables:
Set these in your **server** Vercel project:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ipoapp?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10mb
```

### Frontend Environment Variables:
Set these in your **client** Vercel project:

```
VITE_API_URL=https://your-backend-domain.vercel.app
```

## Deployment Steps

### Step 1: Deploy Backend (Server)

1. **Navigate to server folder**:
   ```bash
   cd server
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
3. **Configure settings**:
   - Project name: `ipo-api` (or similar)
   - Add environment variables listed above
   - Note the deployed URL (e.g., `https://ipo-api.vercel.app`)

### Step 2: Deploy Frontend (Client)

1. **Navigate to client folder**:
   ```bash
   cd ../client
   ```

2. **Update API URL**:
   - Set `VITE_API_URL` environment variable to your backend URL
   
3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
4. **Configure settings**:
   - Project name: `ipo-app` (or similar)
   - Add environment variables listed above

### Step 3: Update CORS Configuration

1. **Update backend CORS_ORIGIN**:
   - Go to your backend Vercel project settings
   - Update `CORS_ORIGIN` to your frontend URL

## File Structure for Separate Deployments

```
ipo/
├── client/                 # Frontend deployment
│   ├── vercel.json        # Frontend Vercel config
│   ├── .vercelignore      # Frontend ignore file
│   ├── dist/              # Build output
│   ├── package.json
│   └── src/
├── server/                 # Backend deployment
│   ├── vercel.json        # Backend Vercel config
│   ├── .vercelignore      # Backend ignore file
│   ├── package.json
│   └── src/
│       └── server.js
├── .env.example
└── DEPLOYMENT.md
```

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check that all dependencies are in package.json
   - Ensure Node.js version compatibility

2. **API Routes Not Working**:
   - Verify vercel.json routing configuration
   - Check environment variables are set

3. **Database Connection Issues**:
   - Verify MongoDB connection string
   - Check IP whitelist settings

4. **CORS Errors**:
   - Update CORS_ORIGIN environment variable
   - Check that frontend and backend origins match

### Logs and Debugging:

- View function logs in Vercel dashboard
- Use `vercel logs` command for real-time logging
- Check Network tab in browser dev tools

## Performance Optimization

1. **Enable Compression**: Already configured in server
2. **Static Asset Caching**: Handled by Vercel automatically
3. **Database Indexing**: Ensure proper indexes in MongoDB
4. **Rate Limiting**: Already configured

## Security Checklist

- ✅ Environment variables secured
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Helmet security headers
- ✅ MongoDB Atlas network security
- ✅ JWT secrets are secure

## Monitoring

- Use Vercel Analytics for frontend monitoring
- Set up MongoDB Atlas monitoring for database
- Consider adding error tracking (Sentry, etc.)

---

For more help, refer to [Vercel Documentation](https://vercel.com/docs) or [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/).
