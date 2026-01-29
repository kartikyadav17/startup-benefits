@echo off
REM Automated GitHub Push Script for Startup Benefits Platform

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     STARTUP BENEFITS PLATFORM - GITHUB AUTO PUSH          ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo ⏱️  This script will push your code to GitHub automatically
echo.

REM Navigate to project directory
cd /d "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment"

echo ✓ Project directory: %cd%
echo.

REM Check if .git exists
if not exist ".git" (
    echo ❌ ERROR: Git repository not found!
    echo.
    echo Run "git init" first
    pause
    exit /b 1
)

echo ✓ Git repository found
echo.

REM Get GitHub token from user
echo 📌 STEP 1: Get Your Personal Access Token
echo.
echo Go to: https://github.com/settings/tokens
echo 1. Click "Generate new token" ^(classic^)
echo 2. Select: repo, admin:repo_hook
echo 3. Copy the token
echo.
set /p TOKEN="🔑 Paste your Personal Access Token here (it won't show): "

if "%TOKEN%"=="" (
    echo.
    echo ❌ ERROR: No token provided!
    pause
    exit /b 1
)

echo.
echo ✓ Token received
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 📌 STEP 2: Adding remote repository
    echo.
    git remote add origin https://github.com/kartikyadav17/startup-benefits-platform.git
    echo ✓ Remote added
    echo.
)

REM Ensure main branch
echo 📌 STEP 3: Preparing branch
git branch -M main
echo ✓ Branch set to main
echo.

REM Push to GitHub
echo 📌 STEP 4: Pushing code to GitHub
echo.
echo This may take a minute...
echo.

REM Use echo to pipe the token as password
echo %TOKEN% | git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push failed! Possible reasons:
    echo - Token is invalid or expired
    echo - Repository doesn't exist on GitHub
    echo - Invalid token format
    echo.
    echo Please:
    echo 1. Go to https://github.com/new
    echo 2. Create repository: "startup-benefits-platform"
    echo 3. Make it PUBLIC
    echo 4. Create a new Personal Access Token at:
    echo    https://github.com/settings/tokens
    echo 5. Run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║  ✅ SUCCESS! YOUR CODE IS NOW ON GITHUB! ✅               ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Repository: https://github.com/kartikyadav17/startup-benefits-platform
echo.
echo 📋 Next steps:
echo    1. Visit your GitHub repository
echo    2. Verify all files are there
echo    3. Check the README displays correctly
echo    4. Share the link with recruiters/portfolio
echo    5. Optional: Deploy to Vercel (frontend) and Railway (backend)
echo.
pause
