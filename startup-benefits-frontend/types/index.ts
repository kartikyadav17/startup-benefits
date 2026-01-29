export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  isVerified: boolean;
  createdAt?: string;
}

export interface Deal {
  _id: string;
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
  expiryDate?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  _id: string;
  user: string;
  deal: Deal;
  status: 'pending' | 'approved' | 'rejected';
  claimedAt: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}
