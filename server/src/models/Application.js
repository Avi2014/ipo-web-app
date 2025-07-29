import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  ipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IPO',
    required: [true, 'IPO is required']
  },
  category: {
    type: String,
    enum: ['retail', 'hni', 'qib'],
    required: [true, 'Application category is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  pricePerShare: {
    type: Number,
    required: [true, 'Price per share is required'],
    min: [1, 'Price must be greater than 0']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  upiId: {
    type: String,
    required: [true, 'UPI ID is required'],
    match: [/^[\w\.-]+@[\w\.-]+$/, 'Please enter a valid UPI ID']
  },
  bankAccount: {
    accountNumber: {
      type: String,
      required: [true, 'Account number is required']
    },
    ifscCode: {
      type: String,
      required: [true, 'IFSC code is required']
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'allocated', 'rejected', 'refunded'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'blocked', 'debited', 'refunded', 'failed'],
    default: 'pending'
  },
  allocationDetails: {
    sharesAllocated: {
      type: Number,
      default: 0
    },
    allocationPrice: {
      type: Number
    },
    refundAmount: {
      type: Number,
      default: 0
    }
  },
  applicationNumber: {
    type: String
  },
  bidId: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for application display number
applicationSchema.virtual('displayNumber').get(function() {
  return this.applicationNumber || `APP${this._id.toString().slice(-8).toUpperCase()}`;
});

// Indexes for better performance
applicationSchema.index({ user: 1 });
applicationSchema.index({ ipo: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ applicationNumber: 1 }, { unique: true, sparse: true });
applicationSchema.index({ bidId: 1 }, { unique: true, sparse: true });
applicationSchema.index({ user: 1, ipo: 1 }, { unique: true }); // One application per user per IPO

// Pre-save middleware to generate application number
applicationSchema.pre('save', function(next) {
  if (!this.applicationNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.applicationNumber = `IPO${timestamp}${random}`;
  }
  
  if (!this.bidId) {
    this.bidId = `BID${this._id.toString().slice(-12).toUpperCase()}`;
  }
  
  // Calculate total amount
  this.totalAmount = this.quantity * this.pricePerShare;
  
  next();
});

// Static method to get user's applications
applicationSchema.statics.getUserApplications = function(userId) {
  return this.find({ user: userId }).populate('ipo').sort({ createdAt: -1 });
};

// Static method to get IPO applications
applicationSchema.statics.getIPOApplications = function(ipoId) {
  return this.find({ ipo: ipoId }).populate('user').sort({ createdAt: -1 });
};

const Application = mongoose.model('Application', applicationSchema);

export default Application;
