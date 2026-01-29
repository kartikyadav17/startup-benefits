// In-memory database mock for demo purposes
// This allows the app to run without MongoDB

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  company?: string;
  website?: string;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Deal {
  _id: string;
  title: string;
  description: string;
  category: string;
  partner: string;
  discount: string;
  benefit: string;
  accessLevel: 'public' | 'restricted';
  eligibilityRequirements?: string[];
  featured: boolean;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Claim {
  _id: string;
  user: string;
  deal: string;
  status: 'pending' | 'approved' | 'rejected';
  claimedAt: Date;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

class InMemoryDB {
  private users: Map<string, User> = new Map();
  private deals: Map<string, Deal> = new Map();
  private claims: Map<string, Claim> = new Map();
  private emailIndex: Map<string, string> = new Map();
  private userDealIndex: Map<string, string> = new Map();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // USER OPERATIONS
  createUser(data: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): User {
    const id = this.generateId();
    const user: User = {
      ...data,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    this.emailIndex.set(data.email.toLowerCase(), id);
    return user;
  }

  findUserByEmail(email: string): User | null {
    const id = this.emailIndex.get(email.toLowerCase());
    return id ? this.users.get(id) || null : null;
  }

  findUserById(id: string): User | null {
    return this.users.get(id) || null;
  }

  updateUser(id: string, data: Partial<User>): User | null {
    const user = this.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...data, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }

  // DEAL OPERATIONS
  createDeal(data: Omit<Deal, '_id' | 'createdAt' | 'updatedAt'>): Deal {
    const id = this.generateId();
    const deal: Deal = {
      ...data,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.deals.set(id, deal);
    return deal;
  }

  findDealById(id: string): Deal | null {
    return this.deals.get(id) || null;
  }

  getAllDeals(filters?: {
    category?: string;
    search?: string;
    accessLevel?: string;
  }): Deal[] {
    let results = Array.from(this.deals.values());

    if (filters?.category) {
      results = results.filter(d => d.category === filters.category);
    }

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      results = results.filter(
        d =>
          d.title.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query) ||
          d.partner.toLowerCase().includes(query)
      );
    }

    if (filters?.accessLevel) {
      results = results.filter(d => d.accessLevel === filters.accessLevel);
    }

    return results;
  }

  // CLAIM OPERATIONS
  createClaim(data: Omit<Claim, '_id' | 'createdAt' | 'updatedAt'>): Claim | null {
    // Check if claim already exists
    const key = `${data.user}_${data.deal}`;
    if (this.userDealIndex.has(key)) {
      return null; // Duplicate claim
    }

    const id = this.generateId();
    const claim: Claim = {
      ...data,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.claims.set(id, claim);
    this.userDealIndex.set(key, id);
    return claim;
  }

  findClaimById(id: string): Claim | null {
    return this.claims.get(id) || null;
  }

  getUserClaims(userId: string): Claim[] {
    return Array.from(this.claims.values()).filter(c => c.user === userId);
  }

  getClaimByUserAndDeal(userId: string, dealId: string): Claim | null {
    const key = `${userId}_${dealId}`;
    const id = this.userDealIndex.get(key);
    return id ? this.claims.get(id) || null : null;
  }

  updateClaim(id: string, data: Partial<Claim>): Claim | null {
    const claim = this.claims.get(id);
    if (!claim) return null;
    const updated = { ...claim, ...data, updatedAt: new Date() };
    this.claims.set(id, updated);
    return updated;
  }
}

// Singleton instance
let dbInstance: InMemoryDB | null = null;

export function getDB(): InMemoryDB {
  if (!dbInstance) {
    dbInstance = new InMemoryDB();
    // Load seed data
    seedData(dbInstance);
  }
  return dbInstance;
}

// Seed initial data
function seedData(db: InMemoryDB) {
  // Create sample deals
  const deals = [
    {
      title: 'AWS Startup Credits',
      description: 'Get $5,000 in AWS credits for your startup',
      category: 'Cloud Services',
      partner: 'Amazon Web Services',
      discount: '$5,000 credits',
      benefit: 'Free cloud infrastructure for 12 months',
      accessLevel: 'public' as const,
      eligibilityRequirements: ['Founded in last 5 years', 'Active product'],
      featured: true,
    },
    {
      title: 'GitHub Pro for Teams',
      description: 'Professional GitHub accounts for your entire team',
      category: 'Developer Tools',
      partner: 'GitHub',
      discount: '50% off',
      benefit: 'Unlimited private repositories and CI/CD',
      accessLevel: 'public' as const,
      featured: true,
    },
    {
      title: 'Stripe Payment Processing',
      description: 'Low-cost payment processing for startups',
      category: 'Fintech',
      partner: 'Stripe',
      discount: '2.2% + $0.30 per transaction',
      benefit: 'Preferred pricing for startups',
      accessLevel: 'public' as const,
      featured: false,
    },
    {
      title: 'Figma Design License',
      description: 'Professional design tool for your team',
      category: 'Design',
      partner: 'Figma',
      discount: '30% discount',
      benefit: 'UI/UX design and prototyping',
      accessLevel: 'public' as const,
      featured: true,
    },
    {
      title: 'Slack Workspace',
      description: 'Team communication platform',
      category: 'Productivity',
      partner: 'Slack',
      discount: '20% off annual',
      benefit: 'Unlimited message history',
      accessLevel: 'public' as const,
      featured: false,
    },
    {
      title: 'HubSpot CRM',
      description: 'Customer relationship management',
      category: 'Sales & Marketing',
      partner: 'HubSpot',
      discount: '40% discount on Pro plan',
      benefit: 'Sales automation and analytics',
      accessLevel: 'public' as const,
      featured: true,
    },
    {
      title: 'Mailchimp Email Marketing',
      description: 'Email marketing automation',
      category: 'Sales & Marketing',
      partner: 'Mailchimp',
      discount: 'Free up to 10,000 contacts',
      benefit: 'Email campaigns and automation',
      accessLevel: 'public' as const,
      featured: false,
    },
    {
      title: 'Notion Workspace',
      description: 'All-in-one workspace for documentation',
      category: 'Productivity',
      partner: 'Notion',
      discount: 'Teams plan free for 3 months',
      benefit: 'Knowledge base and project management',
      accessLevel: 'public' as const,
      featured: false,
    },
  ];

  deals.forEach(deal => {
    db.createDeal(deal);
  });

  // Create sample user
  db.createUser({
    name: 'Demo User',
    email: 'test@startup.com',
    password: '$2a$10$demo', // This is just a placeholder - will be hashed properly
    isVerified: true,
    company: 'Tech Startup Inc',
    website: 'https://techstartup.com',
  });
}

export type { User, Deal, Claim };
