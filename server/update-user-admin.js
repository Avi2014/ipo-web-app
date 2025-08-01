// Script to update a user to admin role
// Run this with: node update-user-admin.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// User schema (simplified for this script)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  dateOfBirth: Date,
  panNumber: String,
  role: { type: String, default: 'user' },
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
  kycStatus: { type: String, default: 'pending' },
  isEmailVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Update user to admin function
const updateUserToAdmin = async (email) => {
  try {
    await connectDB();

    // Find and update the user
    const user = await User.findOneAndUpdate(
      { email: email },
      { 
        role: 'admin',
        kycStatus: 'verified',
        isEmailVerified: true
      },
      { new: true }
    );

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    console.log('✅ User updated successfully!');
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Role: ${user.role}`);
    console.log(`🔍 KYC Status: ${user.kycStatus}`);
    console.log(`📧 Email Verified: ${user.isEmailVerified}`);
    console.log('');
    console.log('🎯 User can now login to the admin panel');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating user:', error);
    process.exit(1);
  }
};

// Get email from command line argument or use default
const email = process.argv[2] || 'avinash.ranjan@example.com';

console.log(`Updating user ${email} to admin role...`);
updateUserToAdmin(email);
