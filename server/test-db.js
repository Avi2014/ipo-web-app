import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('Connection String:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database Host:', conn.connection.host);
    console.log('📦 Database Name:', conn.connection.name);
    console.log('🔌 Connection State:', conn.connection.readyState);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ name: 'Connection Test' });
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('🧹 Test document cleaned up');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.log('\n📝 Troubleshooting Steps:');
    console.log('1. Check if MongoDB is running (for local installation)');
    console.log('2. Verify MONGODB_URI in .env file');
    console.log('3. For MongoDB Atlas, check network access and credentials');
    console.log('4. Make sure firewall allows MongoDB connections');
  }
};

// Run the test
testConnection();
