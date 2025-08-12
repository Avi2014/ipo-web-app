# Deployment Guide for IPO Web App

This guide will help you deploy your IPO Web App to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster for production
3. **GitHub Repository**: Push your code to GitHub

## Environment Variables Setup

1. **MongoDB Atlas**:
   - Create a new cluster on MongoDB Atlas
   - Get your connection string
   - Whitelist Vercel's IP addresses (or use 0.0.0.0/0 for all IPs)

2. **Environment Variables for Vercel**:
   Go to your Vercel project settings and add these environment variables:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ipoapp?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters_long
   JWT_EXPIRE=7d
   NODE_ENV=production
   CORS_ORIGIN=https://your-project-name.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   MAX_FILE_SIZE=10mb
   ```

## Deployment Steps

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new one
   - Choose your settings
   - Deploy!

### Option 2: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

## Post-Deployment Configuration

1. **Update API Base URL**:
   - Update your client API calls to use your Vercel domain
   - Environment variable: `VITE_API_URL=https://your-project.vercel.app/api`

2. **Database Seeding**:
   - Run your seed scripts after deployment
   - Access your functions via Vercel dashboard

3. **Domain Configuration**:
   - Add custom domain if needed
   - Update CORS_ORIGIN environment variable

## File Structure for Deployment

```
ipo/
├── vercel.json           # Vercel configuration
├── .vercelignore        # Files to ignore during deployment
├── .env.example         # Environment variables template
├── client/              # React frontend
│   ├── dist/           # Build output (generated)
│   ├── package.json
│   └── vite.config.js
├── server/              # Node.js backend
│   ├── src/
│   │   └── server.js   # Main server file
│   └── package.json
└── README.md
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
