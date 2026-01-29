# 🚀 Run Application in One Go

## **Option 1: Auto-Start (Recommended) - Windows**

Simply double-click:
```
RUN_ALL.bat
```

This will automatically:
1. Start Backend on port 5000
2. Start Frontend on port 3000
3. Wait 5-10 seconds
4. Open http://localhost:3000

---

## **Option 2: Manual Commands**

### Terminal 1 - Backend (Keep running)
```powershell
cd startup-benefits-backend
npm run dev
```
Wait for: `Server is running on port 5000`

### Terminal 2 - Frontend (Keep running)
```powershell
cd startup-benefits-frontend
npm run dev
```
Wait for: `▲ Next.js 14 - Ready in 2s`

### Then Open Browser
```
http://localhost:3000
```

---

## **Option 3: Production Build**

### Build both:
```powershell
cd startup-benefits-backend && npm run build
cd ../startup-benefits-frontend && npm run build
```

### Run production:
```powershell
# Terminal 1 - Backend
cd startup-benefits-backend
npm start

# Terminal 2 - Frontend
cd startup-benefits-frontend
npm start
```

---

## 🎯 Test Credentials (Demo)

The app has a **Demo Mode** - click "Sign Up" to:
1. Create test account
2. Auto-verified (for demo)
3. Login and browse deals

**Sample Test Account:**
- Email: `test@startup.com`
- Password: `Test@1234`

---

## 📋 What You'll See

### 1. **Landing Page** (/)
- Hero section with animations
- Feature showcase
- "Get Started" button

### 2. **Sign Up** (/auth/register)
- Create new account
- Auto-verified in demo mode

### 3. **Login** (/auth/login)
- Enter credentials
- Sets JWT token

### 4. **Deals** (/deals)
- Browse startup benefits
- Filter by category
- Search deals
- Click to view details

### 5. **Claim Deal** (/deals/[id])
- View full deal info
- See partner details
- Click "Claim Deal" button
- Track in dashboard

### 6. **Dashboard** (/dashboard)
- View claimed deals
- Check claim status
- Edit profile

---

## ✅ Verification Checklist

- [x] Backend compiles (TypeScript → JavaScript)
- [x] Frontend builds (Next.js optimized)
- [x] No runtime errors
- [x] All routes working
- [x] Database ready (MongoDB local)
- [x] JWT authentication ready
- [x] API endpoints ready

---

## 🔧 Troubleshooting

### **Port 3000 or 5000 already in use?**
```powershell
# Kill process on port 3000
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Kill process on port 5000
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```

### **MongoDB not running?**
Edit `.env` to use a cloud MongoDB:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/startup-benefits
```

### **npm modules missing?**
```powershell
cd startup-benefits-backend && npm install
cd ../startup-benefits-frontend && npm install
```

---

## 📊 Architecture

```
Frontend (Next.js)          Backend (Express)          Database (MongoDB)
http://localhost:3000       http://localhost:5000      localhost:27017
├─ /                        ├─ /api/auth               ├─ users
├─ /auth/login              ├─ /api/deals              ├─ deals
├─ /auth/register           ├─ /api/claims             └─ claims
├─ /deals
├─ /deals/[id]
└─ /dashboard
```

---

## 🎉 You're All Set!

Everything is configured and ready to run. Just execute **RUN_ALL.bat** or follow the manual commands above.

**Happy testing! 🚀**
