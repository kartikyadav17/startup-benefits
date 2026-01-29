# Quick Start Reference

## 📦 Installation

### Backend
```bash
cd startup-benefits-backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
# Server runs on http://localhost:5000
```

### Frontend
```bash
cd startup-benefits-frontend
npm install
cp .env.local.example .env.local
npm run dev
# Frontend runs on http://localhost:3000
```

## 🌐 Access the Application

- **Homepage**: http://localhost:3000
- **Browse Deals**: http://localhost:3000/deals
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register
- **Dashboard**: http://localhost:3000/dashboard (protected)

## 🧪 Test Credentials

Register a new account for testing:
- Email: test@example.com
- Password: password123

## 📡 API Base URL

All API requests go to: `http://localhost:5000/api`

## 🔑 Key Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `GET /auth/profile` - Get user info
- `PUT /auth/profile` - Update profile

### Deals
- `GET /deals` - Get all deals
- `GET /deals/:id` - Get deal details

### Claims
- `POST /claims` - Claim a deal
- `GET /claims/user/claims` - Get user's claims
- `GET /claims/status/:dealId` - Check if deal is claimed

## 🗂️ Project Files to Review

### Critical Files
1. **Backend Entry**: `startup-benefits-backend/src/index.ts`
2. **Frontend Entry**: `startup-benefits-frontend/app/page.tsx`
3. **Auth Middleware**: `startup-benefits-backend/src/middleware/auth.ts`
4. **API Client**: `startup-benefits-frontend/lib/api.ts`
5. **User Model**: `startup-benefits-backend/src/models/User.ts`
6. **Deal Model**: `startup-benefits-backend/src/models/Deal.ts`
7. **Claim Model**: `startup-benefits-backend/src/models/Claim.ts`

### Main Pages
1. **Landing**: `startup-benefits-frontend/app/page.tsx`
2. **Auth**: `startup-benefits-frontend/app/auth/login/page.tsx`
3. **Deals List**: `startup-benefits-frontend/app/deals/page.tsx`
4. **Deal Details**: `startup-benefits-frontend/app/deals/[id]/page.tsx`
5. **Dashboard**: `startup-benefits-frontend/app/dashboard/page.tsx`

### Components
1. **Navigation**: `startup-benefits-frontend/components/Navigation.tsx`
2. **Footer**: `startup-benefits-frontend/components/Footer.tsx`

### Hooks
1. **Auth Hook**: `startup-benefits-frontend/hooks/useAuth.ts`

## 💡 Architecture Overview

```
Frontend (Next.js)
    ↓ (API Calls via Axios)
Backend (Express.js)
    ↓ (Database Queries)
Database (MongoDB)
```

### Data Flow
1. User interacts with Frontend UI
2. Frontend makes API call to Backend
3. Backend validates request & checks permissions
4. Backend queries/modifies Database
5. Backend returns response to Frontend
6. Frontend updates UI based on response

## 🔐 Authentication Flow

1. User registers → Backend creates account → JWT token returned
2. Token stored in browser cookie
3. Frontend includes token in Authorization header
4. Backend validates token on protected routes
5. Logout removes token from cookies

## 📊 Database Collections

### Users
- Stores user accounts and profiles
- Passwords are hashed
- Verification status tracked

### Deals
- Stores all available deals
- Categorized (cloud, marketing, analytics, etc.)
- Public or restricted access

### Claims
- Tracks which user claimed which deal
- Status: pending, approved, rejected
- One claim per user per deal (unique constraint)

## ⚡ Performance Tips

- Search is debounced (300ms)
- Animations use GPU acceleration
- Database queries use indexes
- Skeleton screens show while loading
- Code splits per route

## 🐛 Debugging

### Backend Issues
- Check `.env` file for correct MongoDB URI
- Ensure MongoDB is running
- Check console for error logs
- Verify port 5000 is available

### Frontend Issues
- Check browser console for errors
- Clear cookies if auth issues
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

### Connection Issues
- Both services must run simultaneously
- Check firewalls/ports
- Verify CORS is enabled
- Check API URL in frontend config

## 📋 Feature Testing Checklist

- [ ] Register new user
- [ ] Login with email/password
- [ ] Browse all deals
- [ ] Filter deals by category
- [ ] Search deals
- [ ] View deal details
- [ ] Claim a deal
- [ ] View claimed deals in dashboard
- [ ] Edit user profile
- [ ] Logout

## 🚀 Production Deployment

### Backend
```bash
npm run build
npm start
# Set environment variables on server
# Connect to MongoDB Atlas
```

### Frontend
```bash
npm run build
npm start
# Or deploy to Vercel
```

## 📖 Documentation Files

1. **README.md** - Complete system documentation
2. **PROJECT_OVERVIEW.md** - Project structure overview
3. **IMPLEMENTATION_SUMMARY.md** - What was implemented
4. **startup-benefits-backend/SETUP.md** - Backend setup
5. **startup-benefits-frontend/SETUP.md** - Frontend setup
6. **This file** - Quick reference

## 🎯 Key Features Summary

✅ User registration & authentication  
✅ Deal browsing with filters & search  
✅ Deal claiming system  
✅ User dashboard  
✅ High-quality animations  
✅ Responsive design  
✅ Protected routes  
✅ Database persistence  
✅ Error handling  
✅ Input validation  

## 📞 Troubleshooting Quick Fixes

**Port Already in Use**
```bash
# Kill process on port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

**MongoDB Connection Error**
```bash
# Check MongoDB is running
# Verify connection string
# Check network access if using cloud DB
```

**API Not Responding**
```bash
# Check both services are running
# Check environment variables
# Clear browser cache/cookies
```

**Token Not Working**
```bash
# Logout and login again
# Clear cookies in browser
# Check JWT_SECRET in backend .env
```

## 🎨 Customization Points

### Colors (Frontend)
Edit `tailwind.config.ts`:
```typescript
primary: '#0066ff'
secondary: '#00d4ff'
dark: '#0f0f1e'
```

### API URL (Frontend)
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Database (Backend)
Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/startup-benefits
```

### Port (Backend)
Edit `.env`:
```
PORT=5000
```

---

**Happy Coding! 🚀**

For more details, see main README.md
