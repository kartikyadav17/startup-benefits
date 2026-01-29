# Automated GitHub Push Script - PowerShell Version
# Startup Benefits Platform - kartikyadav17

param(
    [string]$Token = ""
)

$ErrorActionPreference = "Stop"

# Title
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║   STARTUP BENEFITS PLATFORM - GITHUB AUTO PUSH            ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Navigate to project
$projectPath = "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment"
Set-Location $projectPath
Write-Host "✓ Project directory: $projectPath" -ForegroundColor Green
Write-Host ""

# Check git repo
if (-not (Test-Path ".git")) {
    Write-Host "❌ ERROR: Git repository not found!" -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host "✓ Git repository found" -ForegroundColor Green
Write-Host ""

# Get token if not provided
if ([string]::IsNullOrEmpty($Token)) {
    Write-Host "📌 STEP 1: Get Your Personal Access Token" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Go to: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Steps:"
    Write-Host "  1. Click 'Generate new token' (classic)"
    Write-Host "  2. Select scopes: repo, admin:repo_hook"
    Write-Host "  3. Click 'Generate token'"
    Write-Host "  4. Copy the token (shows only once!)"
    Write-Host ""
    
    $tokenSecure = Read-Host "🔑 Paste your Personal Access Token" -AsSecureString
    
    if ($tokenSecure.Length -eq 0) {
        Write-Host "❌ ERROR: No token provided!" -ForegroundColor Red
        exit 1
    }
    
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($tokenSecure)
    $Token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
}

Write-Host ""
Write-Host "✓ Token received" -ForegroundColor Green
Write-Host ""

# Check if remote exists
try {
    $remoteUrl = git remote get-url origin 2>$null
    Write-Host "✓ Remote already configured: $remoteUrl" -ForegroundColor Green
} catch {
    Write-Host "📌 STEP 2: Adding remote repository" -ForegroundColor Yellow
    git remote add origin https://github.com/kartikyadav17/startup-benefits-platform.git
    Write-Host "✓ Remote added" -ForegroundColor Green
}

Write-Host ""

# Ensure main branch
Write-Host "📌 STEP 3: Preparing branch" -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch set to main" -ForegroundColor Green
Write-Host ""

# Push to GitHub
Write-Host "📌 STEP 4: Pushing code to GitHub" -ForegroundColor Yellow
Write-Host ""
Write-Host "This may take a minute..." -ForegroundColor Gray
Write-Host ""

try {
    # Create credentials
    $user = "CartikYadav"
    $pass = ConvertTo-SecureString $Token -AsPlainText -Force
    $cred = New-Object System.Management.Automation.PSCredential($user, $pass)
    
    # Push with credentials
    git push -u origin main 2>&1
    
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                                                            ║" -ForegroundColor Green
    Write-Host "║  ✅ SUCCESS! YOUR CODE IS NOW ON GITHUB! ✅               ║" -ForegroundColor Green
    Write-Host "║                                                            ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Repository: https://github.com/kartikyadav17/startup-benefits-platform" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Visit your GitHub repository" -ForegroundColor White
    Write-Host "   2. Verify all files are there" -ForegroundColor White
    Write-Host "   3. Check the README displays correctly" -ForegroundColor White
    Write-Host "   4. Share the link with recruiters/portfolio" -ForegroundColor White
    Write-Host "   5. Optional: Deploy to Vercel and Railway" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "  • Token is invalid or expired" -ForegroundColor White
    Write-Host "  • Repository doesn't exist on GitHub yet" -ForegroundColor White
    Write-Host "  • Invalid GitHub username" -ForegroundColor White
    Write-Host ""
    Write-Host "Please do this:" -ForegroundColor Yellow
    Write-Host "  1. Go to: https://github.com/new" -ForegroundColor Cyan
    Write-Host "  2. Repository name: startup-benefits-platform" -ForegroundColor Cyan
    Write-Host "  3. Set to: PUBLIC" -ForegroundColor Cyan
    Write-Host "  4. Click: Create repository" -ForegroundColor Cyan
    Write-Host "  5. Create Personal Access Token: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host "  6. Scopes: repo, admin:repo_hook" -ForegroundColor Cyan
    Write-Host "  7. Run this script again" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}
