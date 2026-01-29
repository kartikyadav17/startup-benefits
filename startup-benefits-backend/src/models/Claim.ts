import mongoose, { Schema, Document } from 'mongoose';

export interface IClaim extends Document {
  user: mongoose.Types.ObjectId;
  deal: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  claimedAt: Date;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const claimSchema = new Schema<IClaim>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deal: {
      type: Schema.Types.ObjectId,
      ref: 'Deal',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one user can only claim a deal once
claimSchema.index({ user: 1, deal: 1 }, { unique: true });
claimSchema.index({ user: 1 });
claimSchema.index({ deal: 1 });
claimSchema.index({ status: 1 });

export default mongoose.model<IClaim>('Claim', claimSchema);
