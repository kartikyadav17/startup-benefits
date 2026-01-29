# 🚀 COMPLETE SETUP & RUN GUIDE

## ✅ Fixes Applied

1. **Typo Fixed**: "StartuBenefits" → "StartupBenefits" in Navigation
2. **Registration Improved**: Better error messages and token handling

---

## 🔑 TEST CREDENTIALS

### Pre-created Test Account:
```
Email:    test@startup.com
Password: Test@1234
```

### OR Create New Account:
Any email/password combo will work (auto-verified in demo mode)

---

## 📋 SIMPLE RUN COMMAND (Copy & Paste)

Open **ONE PowerShell** window and paste this entire command:

```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-backend"; npm run dev & Start-Sleep -Seconds 2; Start-Process powershell -ArgumentList "-NoExit -Command cd 'c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-frontend'; npm run dev"
```

---

## 🎯 MANUAL METHOD (Recommended for Beginners)

### Terminal 1 - Start Backend:
```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-backend"
npm run dev
```

**You should see:**
```
Server is running on port 5000
Connected to MongoDB successfully
```

### Terminal 2 - Start Frontend:
Open a NEW PowerShell window and run:
```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-frontend"
npm run dev
```

**You should see:**
```
▲ Next.js 14.0.0
  - Local: http://localhost:3000
```

### Then Open Browser:
```
http://localhost:3000
```

---

## 🧪 TEST FLOW

### Step 1: Register New Account
- Click **"Get Started"** on homepage
- Click **"Sign Up"**
- Fill in details:
  - Name: Your Name
  - Email: `your@email.com` (any email)
  - Password: `Test@1234`
  - Confirm: `Test@1234`
- Click **Register**
- Should redirect to `/dashboard` ✅

### Step 2: Login (if needed)
- Email: `test@startup.com` (or your created email)
- Password: `Test@1234`

### Step 3: Browse Deals
- Click **"Explore Deals"** or go to `/deals`
- See all startup benefits
- Filter by category
- Search deals

### Step 4: Claim Deal
- Click any deal
- Click **"Claim Deal"** button
- See it in your dashboard

### Step 5: Dashboard
- See claimed deals
- Edit profile
- View statistics

---

## 🔍 WHAT'S BEEN FIXED

✅ **Registration Form** - Now properly connects to backend
✅ **API URL** - Correct environment variable configured
✅ **Right Side Image** - Now visible on all screens
✅ **Typo** - "StartuBenefits" fixed to "StartupBenefits"
✅ **Error Messages** - Better debugging info

---

## 📊 API ENDPOINTS READY

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get user info |
| GET | `/api/deals` | Get all deals |
| GET | `/api/deals/:id` | Get deal details |
| POST | `/api/claims` | Claim a deal |
| GET | `/api/claims/user/claims` | Get your claims |

---

## 🆘 IF STILL NOT WORKING

### Check 1: MongoDB Running
```powershell
Get-Process mongod -ErrorAction SilentlyContinue
```

If nothing shows, MongoDB isn't running. Either:
1. Start MongoDB locally (if installed)
2. Use MongoDB Atlas (cloud):
   - Edit `startup-benefits-backend\.env`
   - Change MONGODB_URI to cloud connection string

### Check 2: Kill Stuck Processes
```powershell
Get-Process node | Stop-Process -Force
```

Then restart both servers.

### Check 3: Clear Cache
```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-frontend"
rm -r .next
npm run dev
```

### Check 4: Browser Cache
- Press `Ctrl+Shift+Delete`
- Select "All time"
- Click "Clear"

---

## ✅ QUICK CHECKLIST

Before running, verify:
- [ ] You're in assignment folder (when running script)
- [ ] MongoDB is running (or using cloud)
- [ ] Port 3000 and 5000 are free
- [ ] Node.js is installed (`node -v`)
- [ ] npm is installed (`npm -v`)

---

## 🎉 YOU'RE READY!

### Quick Start (Copy & Paste):

**Terminal 1:**
```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-backend"
npm run dev
```

**Terminal 2:**
```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment\startup-benefits-frontend"
npm run dev
```

**Then:**
- Open: http://localhost:3000
- Use credentials above to login/register
- Test all features!

---

**Status: ✅ READY TO RUN**
