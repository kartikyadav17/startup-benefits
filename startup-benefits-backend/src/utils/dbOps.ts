// Database abstraction layer - works with both MongoDB and in-memory DB
import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { getDB, User as MemoryUser, Deal as MemoryDeal, Claim as MemoryClaim } from './memoryDb';

const USE_MEMORY_DB = process.env.USE_MEMORY_DB !== 'false';

// Check if we should use memory DB (when MongoDB is not available)
let usingMemoryDB = false;

export function isUsingMemoryDB(): boolean {
  return usingMemoryDB || USE_MEMORY_DB;
}

export function setUsingMemoryDB(value: boolean): void {
  usingMemoryDB = value;
}

// User operations
export const UserOps = {
  async create(data: {
    name: string;
    email: string;
    password: string;
    company?: string;
    website?: string;
  }) {
    if (isUsingMemoryDB()) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(data.password, salt);
      const db = getDB();
      return db.createUser({
        ...data,
        password: hashedPassword,
        isVerified: false,
      });
    }

    // Use MongoDB
    const User = mongoose.model('User');
    return new User(data).save();
  },

  async findByEmail(email: string) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.findUserByEmail(email);
    }
    const User = mongoose.model('User');
    return User.findOne({ email: email.toLowerCase() }).select('+password');
  },

  async findById(id: string) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.findUserById(id);
    }
    const User = mongoose.model('User');
    return User.findById(id);
  },

  async updateById(id: string, data: any) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.updateUser(id, data);
    }
    const User = mongoose.model('User');
    return User.findByIdAndUpdate(id, data, { new: true });
  },

  async comparePassword(userDoc: any, password: string): Promise<boolean> {
    if (isUsingMemoryDB()) {
      return bcryptjs.compare(password, userDoc.password);
    }
    return userDoc.comparePassword(password);
  },
};

// Deal operations
export const DealOps = {
  async create(data: any) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.createDeal(data);
    }
    const Deal = mongoose.model('Deal');
    return new Deal(data).save();
  },

  async findById(id: string) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.findDealById(id);
    }
    const Deal = mongoose.model('Deal');
    return Deal.findById(id);
  },

  async findAll(filters?: {
    category?: string;
    search?: string;
    accessLevel?: string;
  }) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.getAllDeals(filters);
    }
    const Deal = mongoose.model('Deal');
    let query: any = {};

    if (filters?.category) query.category = filters.category;
    if (filters?.accessLevel) query.accessLevel = filters.accessLevel;

    let deals = Deal.find(query);

    if (filters?.search) {
      deals = deals.or([
        { title: new RegExp(filters.search, 'i') },
        { description: new RegExp(filters.search, 'i') },
        { partner: new RegExp(filters.search, 'i') },
      ]);
    }

    return deals;
  },

  async updateById(id: string, data: any) {
    if (isUsingMemoryDB()) {
      // In-memory doesn't support updates yet
      return null;
    }
    const Deal = mongoose.model('Deal');
    return Deal.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteById(id: string) {
    if (isUsingMemoryDB()) {
      // In-memory doesn't support deletion yet
      return null;
    }
    const Deal = mongoose.model('Deal');
    return Deal.findByIdAndDelete(id);
  },
};

// Claim operations
export const ClaimOps = {
  async create(data: { userId: string; dealId: string; status?: string; claimedAt?: Date; approvedAt?: Date }) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      const claim = db.createClaim({
        user: data.userId,
        deal: data.dealId,
        status: (data.status || 'pending') as 'pending' | 'approved' | 'rejected',
        claimedAt: data.claimedAt || new Date(),
        approvedAt: data.approvedAt,
      });
      return claim;
    }
    const Claim = mongoose.model('Claim');
    return new Claim({
      user: data.userId,
      deal: data.dealId,
      status: data.status || 'pending',
      claimedAt: data.claimedAt || new Date(),
      approvedAt: data.approvedAt,
    }).save();
  },

  async findById(id: string) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.findClaimById(id);
    }
    const Claim = mongoose.model('Claim');
    return Claim.findById(id);
  },

  async findByUserAndDeal(userId: string, dealId: string) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.getClaimByUserAndDeal(userId, dealId);
    }
    const Claim = mongoose.model('Claim');
    return Claim.findOne({ user: userId, deal: dealId });
  },

  async findByUserId(userId: string) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.getUserClaims(userId);
    }
    const Claim = mongoose.model('Claim');
    return Claim.find({ user: userId }).populate('deal');
  },

  async updateById(id: string, data: any) {
    if (isUsingMemoryDB()) {
      const db = getDB();
      return db.updateClaim(id, data);
    }
    const Claim = mongoose.model('Claim');
    return Claim.findByIdAndUpdate(id, data, { new: true });
  },
};
