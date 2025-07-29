import mongoose from 'mongoose';

const ipoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  symbol: {
    type: String,
    required: [true, 'Company symbol is required'],
    uppercase: true,
    trim: true,
    maxlength: [10, 'Symbol cannot exceed 10 characters']
  },
  description: {
    type: String,
    required: [true, 'Company description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  sector: {
    type: String,
    required: [true, 'Sector is required'],
    enum: [
      'Technology',
      'Healthcare',
      'Finance',
      'Manufacturing',
      'Retail',
      'Energy',
      'Real Estate',
      'Telecommunications',
      'Consumer Goods',
      'Pharmaceuticals',
      'Banking',
      'Insurance',
      'Other'
    ]
  },
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: [1, 'Minimum price must be greater than 0']
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: [1, 'Maximum price must be greater than 0']
    }
  },
  lotSize: {
    type: Number,
    required: [true, 'Lot size is required'],
    min: [1, 'Lot size must be at least 1']
  },
  totalShares: {
    type: Number,
    required: [true, 'Total shares is required'],
    min: [1, 'Total shares must be at least 1']
  },
  sharesForRetail: {
    type: Number,
    required: [true, 'Shares for retail investors is required'],
    min: [1, 'Shares for retail must be at least 1']
  },
  openDate: {
    type: Date,
    required: [true, 'IPO open date is required']
  },
  closeDate: {
    type: Date,
    required: [true, 'IPO close date is required']
  },
  listingDate: {
    type: Date,
    required: [true, 'Expected listing date is required']
  },
  status: {
    type: String,
    enum: ['upcoming', 'open', 'closed', 'listed', 'cancelled'],
    default: 'upcoming'
  },
  leadManager: {
    type: String,
    required: [true, 'Lead manager is required']
  },
  registrar: {
    type: String,
    required: [true, 'Registrar is required']
  },
  exchange: {
    type: [String],
    required: [true, 'Exchange is required'],
    enum: ['NSE', 'BSE', 'Both']
  },
  documents: {
    drhp: {
      type: String, // URL to DRHP document
      required: [true, 'DRHP document is required']
    },
    rhp: {
      type: String // URL to RHP document
    },
    prospectus: {
      type: String // URL to prospectus
    }
  },
  companyLogo: {
    type: String // URL to company logo
  },
  financials: {
    revenue: {
      type: Number,
      required: [true, 'Revenue is required']
    },
    profit: {
      type: Number,
      required: [true, 'Profit is required']
    },
    marketCap: {
      type: Number
    }
  },
  riskFactors: [{
    type: String,
    maxlength: [500, 'Risk factor cannot exceed 500 characters']
  }],
  objectives: [{
    type: String,
    maxlength: [500, 'Objective cannot exceed 500 characters']
  }],
  subscription: {
    retail: {
      type: Number,
      default: 0
    },
    qib: {
      type: Number,
      default: 0
    },
    hni: {
      type: Number,
      default: 0
    },
    overall: {
      type: Number,
      default: 0
    }
  },
  gmp: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for price range display
ipoSchema.virtual('priceRangeDisplay').get(function() {
  return `₹${this.priceRange.min} - ₹${this.priceRange.max}`;
});

// Virtual for investment range
ipoSchema.virtual('investmentRange').get(function() {
  return {
    min: this.priceRange.min * this.lotSize,
    max: this.priceRange.max * this.lotSize
  };
});

// Virtual for days remaining
ipoSchema.virtual('daysRemaining').get(function() {
  if (this.status === 'upcoming') {
    const today = new Date();
    const diffTime = this.openDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Indexes for better performance
ipoSchema.index({ symbol: 1 }, { unique: true });
ipoSchema.index({ status: 1 });
ipoSchema.index({ openDate: 1 });
ipoSchema.index({ closeDate: 1 });
ipoSchema.index({ sector: 1 });

// Pre-save middleware to update status based on dates
ipoSchema.pre('save', function(next) {
  const today = new Date();
  
  if (today < this.openDate) {
    this.status = 'upcoming';
  } else if (today >= this.openDate && today <= this.closeDate) {
    this.status = 'open';
  } else if (today > this.closeDate && today < this.listingDate) {
    this.status = 'closed';
  } else if (today >= this.listingDate) {
    this.status = 'listed';
  }
  
  next();
});

const IPO = mongoose.model('IPO', ipoSchema);

export default IPO;
