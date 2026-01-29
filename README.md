# 🚀 Startup Benefits Platform

A full-stack web application that helps startups discover and claim exclusive benefit deals from top technology providers.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Demo Credentials](#demo-credentials)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 👥 User Management
- User registration and authentication
- Email verification
- Profile management
- JWT-based session management
- Secure password hashing with bcryptjs

### 🎁 Deal Management
- Browse startup benefit deals from top providers
- Filter deals by category and access level
- Detailed deal information and requirements
- Support for different deal types (credits, free trials, discounts)

### 📋 Claim System
- Claim startup benefit deals
- Track claim status (pending, approved, rejected)
- User dashboard with claimed deals
- Auto-approval system for demo mode

### 🎨 Responsive UI
- Mobile-friendly design with Tailwind CSS
- Smooth animations with Framer Motion
- Professional landing page
- Intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14
- **UI Library:** React 18
- **Language:** TypeScript 5.2
- **Styling:** Tailwind CSS 3.3
- **Animations:** Framer Motion 10.16
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.18
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose (or in-memory fallback)
- **Authentication:** JWT + bcryptjs
- **Validation:** express-validator

### Database
- **Primary:** MongoDB 7.5+ with Mongoose ODM
- **Fallback:** In-Memory Database (zero dependencies)

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- (Optional) MongoDB 5.x or higher

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kartikyadav17/startup-benefits-platform.git
cd startup-benefits-platform
```

2. **Backend Setup**
```bash
cd startup-benefits-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/startup-benefits
# JWT_SECRET=your-secret-key
# PORT=5000

# Start development server
npm run dev
```

3. **Frontend Setup**
```bash
cd ../startup-benefits-frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Start development server
npm run dev
```

### Running Both Servers

**Option 1: Manual (Two Terminal Windows)**

Terminal 1 - Backend:
```bash
cd startup-benefits-backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd startup-benefits-frontend
npm run dev
```

**Option 2: Using Script**
```bash
# Windows
RUN_ALL.bat

# Or manually with PowerShell
RUN_ALL.ps1
```

### Access the Application
- **Frontend:** http://localhost:3001 (or 3000 if available)
- **Backend API:** http://localhost:5000

## 📁 Project Structure

```
startup-benefits-platform/
├── startup-benefits-backend/
│   ├── src/
│   │   ├── controllers/         # Route handlers
│   │   │   ├── authController.ts
│   │   │   ├── dealController.ts
│   │   │   └── claimController.ts
│   │   ├── models/             # Database schemas
│   │   │   ├── User.ts
│   │   │   ├── Deal.ts
│   │   │   └── Claim.ts
│   │   ├── routes/             # API routes
│   │   │   ├── auth.ts
│   │   │   ├── deals.ts
│   │   │   └── claims.ts
│   │   ├── middleware/         # Custom middleware
│   │   │   └── auth.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── dbOps.ts       # Database abstraction layer
│   │   │   └── memoryDb.ts    # In-memory database
│   │   ├── config/
│   │   │   └── database.ts     # Database configuration
│   │   └── index.ts            # Entry point
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── startup-benefits-frontend/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   └── login/
│   │   ├── deals/              # Deals pages
│   │   ├── dashboard/          # User dashboard
│   │   └── profile/            # Profile pages
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── DealCard.tsx
│   │   └── ...
│   ├── lib/
│   │   └── api.ts              # API client
│   ├── .env.local
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

**Get Profile** (Requires Auth)
```
GET /api/auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "company": "...", "website": "..." }
}
```

**Update Profile** (Requires Auth)
```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "company": "Acme Corp",
  "website": "https://example.com"
}

Response: 200 OK
```

### Deal Endpoints

**Get All Deals**
```
GET /api/deals?category=cloud&accessLevel=public

Response: 200 OK
{
  "count": 8,
  "deals": [
    {
      "id": "...",
      "title": "AWS Credits",
      "description": "Up to $1000 in AWS credits",
      "provider": "Amazon",
      "category": "cloud",
      "value": "$1000",
      "requirements": "...",
      "accessLevel": "public"
    },
    ...
  ]
}
```

**Get Deal by ID**
```
GET /api/deals/:id

Response: 200 OK
{
  "deal": { "id": "...", "title": "...", "description": "...", ... }
}
```

### Claim Endpoints

**Claim a Deal** (Requires Auth)
```
POST /api/claims/claim
Authorization: Bearer <token>
Content-Type: application/json

{
  "dealId": "..."
}

Response: 201 Created
{
  "message": "Deal claimed successfully",
  "claim": { "id": "...", "userId": "...", "dealId": "...", "status": "approved", "claimedAt": "..." }
}
```

**Get User Claims** (Requires Auth)
```
GET /api/claims
Authorization: Bearer <token>

Response: 200 OK
{
  "count": 3,
  "claims": [
    { "id": "...", "dealId": "...", "status": "approved", "claimedAt": "..." },
    ...
  ]
}
```

**Get Claim Status** (Requires Auth)
```
GET /api/claims/status/:dealId
Authorization: Bearer <token>

Response: 200 OK
{
  "claimed": true,
  "status": "approved",
  "claimedAt": "2024-01-15T10:30:00Z"
}
```

## 👤 Demo Credentials

The application comes pre-seeded with a test account:

**Email:** `test@startup.com`  
**Password:** `Test@1234`

This account has immediate access to all 8 pre-loaded startup benefit deals.

## 💾 Database

### MongoDB Setup (Optional)

If MongoDB is not running, the application automatically falls back to an **in-memory database**.

**To use MongoDB:**

1. **Local MongoDB**
   ```bash
   # Install MongoDB Community Edition
   # https://docs.mongodb.com/manual/installation/
   
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas (Cloud)**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a cluster
   - Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/startup-benefits
   ```

### In-Memory Database Features

- ✅ Zero external dependencies
- ✅ Full CRUD operations
- ✅ Email-indexed user lookups
- ✅ Deal filtering and search
- ✅ Claim status tracking
- ✅ Auto-approval system
- 📌 Data persists during session only

**Pre-loaded Sample Data:**
- 8 startup benefit deals
- 1 test user account
- Auto-verified email
- All claims auto-approved

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect GitHub repo to Vercel
# Visit: https://vercel.com/dashboard

# 3. Import project and configure:
# - Framework: Next.js
# - Root Directory: startup-benefits-frontend
# - Environment Variables:
#   NEXT_PUBLIC_API_BASE_URL=<your-backend-url>

# 4. Deploy!
```

### Backend Deployment (Railway/Heroku)

**Using Railway:**
```bash
# 1. Create railway.json in backend root
# 2. Push to GitHub
# 3. Connect GitHub to Railway: https://railway.app/dashboard
# 4. Configure environment variables:
#    - MONGODB_URI
#    - JWT_SECRET
#    - NODE_ENV=production
# 5. Deploy!
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/startup-benefits
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kartik Yadav**  
GitHub: [@kartikyadav17](https://github.com/kartikyadav17)

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the author.

---

**Made with ❤️ for startups**
