// Test script to create an admin user
// Run this with: node create-admin.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

// Create admin user function
const createAdminUser = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ipo.com' });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with email: admin@ipo.com');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ipo.com',
      password: hashedPassword,
      phone: '+911234567890',
      dateOfBirth: new Date('1990-01-01'),
      panNumber: 'ABCDE1234F',
      role: 'admin',
      address: {
        street: '123 Admin Street',
        city: 'Admin City',
        state: 'Admin State',
        pincode: '123456',
        country: 'India'
      },
      bankDetails: {
        accountNumber: '1234567890',
        ifscCode: 'ABCD0123456',
        bankName: 'Admin Bank'
      },
      kycStatus: 'verified',
      isEmailVerified: true,
      isActive: true
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@ipo.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('');
    console.log('🎯 You can now login to the admin panel with these credentials');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the script
createAdminUser();
