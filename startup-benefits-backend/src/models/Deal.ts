import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
  title: string;
  description: string;
  category: string;
  partner: string;
  logoUrl?: string;
  discount: string;
  benefit: string;
  accessLevel: 'public' | 'restricted';
  eligibilityRequirements?: string[];
  claimUrl?: string;
  expiryDate?: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dealSchema = new Schema<IDeal>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a deal title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'cloud',
        'marketing',
        'analytics',
        'productivity',
        'design',
        'development',
      ],
    },
    partner: {
      type: String,
      required: [true, 'Please provide partner name'],
    },
    logoUrl: {
      type: String,
    },
    discount: {
      type: String,
      required: [true, 'Please provide discount'],
    },
    benefit: {
      type: String,
      required: [true, 'Please provide benefit details'],
    },
    accessLevel: {
      type: String,
      enum: ['public', 'restricted'],
      default: 'public',
    },
    eligibilityRequirements: {
      type: [String],
    },
    claimUrl: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
dealSchema.index({ category: 1 });
dealSchema.index({ accessLevel: 1 });
dealSchema.index({ featured: 1 });

export default mongoose.model<IDeal>('Deal', dealSchema);
