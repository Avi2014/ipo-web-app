import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Clean up deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('📝 Please make sure MongoDB is running or update MONGODB_URI in .env file');
    console.log('💡 For local development, install MongoDB or use MongoDB Atlas cloud service');
    
    // Don't exit the process, let the app run without DB for testing API structure
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Server will continue running without database connection for API testing...');
    } else {
      process.exit(1);
    }
  }
};

export default connectDB;
