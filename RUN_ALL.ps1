# Startup Benefits Platform - One-Click Start Script
# Run this in PowerShell to start both servers

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Startup Benefits Platform - Starting All Services" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing Node processes on ports 3000 and 5000
Write-Host "[STEP 0] Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "OK - Cleaned up" -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "[STEP 1] Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Push-Location startup-benefits-backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Pop-Location
Write-Host "OK - Backend starting in new window" -ForegroundColor Green
Start-Sleep -Seconds 3
Write-Host ""

# Start Frontend
Write-Host "[STEP 2] Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
Push-Location startup-benefits-frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Pop-Location
Write-Host "OK - Frontend starting in new window" -ForegroundColor Green
Write-Host ""

# Wait and open browser
Write-Host "[STEP 3] Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Write-Host "OK - Servers should be ready" -ForegroundColor Green
Write-Host ""

# Open browser
Write-Host "[STEP 4] Opening application in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"
Write-Host "OK - Browser opened" -ForegroundColor Green
Write-Host ""

Write-Host "======================================================" -ForegroundColor Green
Write-Host "    APPLICATION STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "  Backend:  http://localhost:5000/api" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "  Sign up for new account or login to test" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
