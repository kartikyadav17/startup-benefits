# StartupBenefits Platform - Complete Full Stack Application

A premium SaaS deal marketplace platform for early-stage startups built with modern technologies.

## 📋 Project Structure

```
assignment/
├── README.md                          # Main documentation
├── startup-benefits-backend/          # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/                   # Database schemas
│   │   ├── controllers/              # Business logic
│   │   ├── routes/                   # API endpoints
│   │   ├── middleware/               # Authentication & error handling
│   │   ├── utils/                    # JWT utilities
│   │   ├── config/                   # Database configuration
│   │   └── index.ts                  # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── SETUP.md
│   └── .env.example
│
└── startup-benefits-frontend/        # Next.js 14 + TypeScript + Tailwind
    ├── app/
    │   ├── page.tsx                  # Landing page
    │   ├── layout.tsx                # Root layout
    │   ├── auth/                     # Authentication pages
    │   ├── deals/                    # Deal browsing & details
    │   └── dashboard/                # User dashboard
    ├── components/                   # Reusable components
    ├── hooks/                        # Custom React hooks
    ├── lib/                          # Utilities & API client
    ├── types/                        # TypeScript types
    ├── tailwind.config.ts
    ├── package.json
    ├── SETUP.md
    └── .env.local.example
```

## 🚀 Quick Start

### Backend
```bash
cd startup-benefits-backend
npm install
cp .env.example .env
npm run dev  # Runs on http://localhost:5000
```

### Frontend
```bash
cd startup-benefits-frontend
npm install
cp .env.local.example .env.local
npm run dev  # Runs on http://localhost:3000
```

## ✨ Features

### 🔐 User Management
- Secure JWT authentication
- User registration & login
- Profile management
- Email verification support
- Password hashing with bcrypt

### 📦 Deal Management
- Browse 500+ exclusive deals
- Filter by category (Cloud, Marketing, Analytics, etc.)
- Search functionality
- Public and restricted access levels
- Featured deals highlighting

### 🎁 Deal Claiming System
- One-click deal claiming
- Claim status tracking (Pending, Approved, Rejected)
- Duplicate claim prevention
- Verification requirements for restricted deals
- Dashboard with claimed deals list

### 🎨 UI/UX Excellence
- Animated page transitions
- Smooth micro-interactions
- Loading skeleton screens
- Responsive design (mobile, tablet, desktop)
- Dark theme with gradient accents
- High-quality motion design with Framer Motion

### 📊 User Dashboard
- Profile information and editing
- Verification status badge
- Claimed deals overview
- Status statistics
- Quick access to deals

## 🛠 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Axios** - HTTP client
- **js-cookie** - Cookie management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 🔑 Key Design Decisions

### Architecture
- **Separation of Concerns**: Controllers handle business logic, models define data structure
- **Middleware Pattern**: Authentication and error handling as middleware
- **API-First**: Frontend communicates via REST APIs only
- **Component-Based**: Frontend uses reusable, composable components

### Security
- JWT tokens with 7-day expiration
- Password hashing before storage
- Validation on client and server
- Protected routes with authentication checks
- CORS enabled for cross-origin requests

### Performance
- Debounced search (300ms)
- Lazy loading components
- Optimized animations (GPU-accelerated)
- Skeleton loading screens
- Database indexing on frequently queried fields

### User Experience
- Clear error messages
- Loading states during async operations
- Smooth transitions between pages
- Intuitive navigation
- Responsive design for all devices

## 📱 Pages & Routes

| Page | Route | Protected | Features |
|------|-------|-----------|----------|
| Landing | `/` | ❌ | Hero section, features, CTA |
| Register | `/auth/register` | ❌ | Account creation |
| Login | `/auth/login` | ❌ | User authentication |
| Deals | `/deals` | ❌ | Browse, filter, search |
| Deal Details | `/deals/:id` | ❌ | Full info, claim button |
| Dashboard | `/dashboard` | ✅ | Profile, claimed deals |

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update profile (protected)
- `POST /verify-email` - Verify email address

### Deals (`/api/deals`)
- `GET /` - Get all deals (with filters)
- `GET /:id` - Get deal details

### Claims (`/api/claims`)
- `POST /` - Claim a deal (protected)
- `GET /user/claims` - Get user's claims (protected)
- `GET /status/:dealId` - Check claim status (protected)
- `GET /:id` - Get claim details (protected)

## 🔄 Application Flow

1. **User Visits Platform**
   - Lands on animated homepage
   - Can browse public deals without login

2. **Registration/Login**
   - Creates account or logs in
   - JWT token stored in cookies
   - Redirected to dashboard

3. **Browse Deals**
   - Filters by category, search
   - Views deal details
   - Sees restrictions for locked deals

4. **Claim Deal**
   - Clicks "Claim This Deal"
   - Backend verifies eligibility
   - Claim recorded in database
   - User redirected to dashboard

5. **Dashboard**
   - Views all claimed deals
   - Tracks claim status
   - Manages profile information

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with validation
- [ ] Login with stored token
- [ ] Browse deals with filters
- [ ] Search functionality
- [ ] Claim deal as verified user
- [ ] Claim restricted deal with unverified user (should fail)
- [ ] View dashboard
- [ ] Edit profile
- [ ] Logout clears token

### API Testing
Use provided cURL commands in backend SETUP.md

## 📈 Scalability Considerations

### Current Bottlenecks
- No caching layer (Redis)
- No pagination on deals list
- No API rate limiting
- Basic search implementation

### Improvements for Scale
- Implement Redis caching
- Add pagination to deal listings
- Rate limiting per user
- Full-text search indices
- Message queue for async operations
- Database replication

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token validation
- ✅ Input validation on server
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Unique constraint on email
- ✅ Verification checks for restricted deals

## 📝 Documentation

- [Main README.md](./README.md) - Comprehensive documentation
- [Backend Setup](./startup-benefits-backend/SETUP.md) - Backend configuration
- [Frontend Setup](./startup-benefits-frontend/SETUP.md) - Frontend configuration

## 🚢 Deployment

### Backend
- Deploy to Heroku, AWS, or DigitalOcean
- Set environment variables
- Connect MongoDB Atlas
- Enable HTTPS

### Frontend
- Deploy to Vercel (recommended)
- Set NEXT_PUBLIC_API_URL
- Enable automatic deployments from Git

## 📊 Database Schema

All details in main README.md including:
- User schema with verification fields
- Deal schema with categories and access levels
- Claim schema with status tracking
- Proper indexing strategy

## 🎯 Future Enhancements

- [ ] Admin dashboard for deal management
- [ ] Email verification system
- [ ] Payment integration for premium features
- [ ] Real-time notifications
- [ ] User ratings and reviews
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Partner dashboard

## 📞 Support

For issues or questions, refer to:
1. Main README.md for architecture
2. Backend SETUP.md for backend issues
3. Frontend SETUP.md for frontend issues
4. API documentation in main README.md

## 📄 License

MIT License - Feel free to use this project

---

**Version**: 1.0.0  
**Last Updated**: January 28, 2024  
**Status**: Production Ready (with noted limitations)
