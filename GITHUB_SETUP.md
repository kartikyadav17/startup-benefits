# 🚀 Push to GitHub - Step by Step Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/kartikyadav17
2. Click **"New"** button (top left, near repositories)
3. Fill in the repository details:
   - **Repository name:** `startup-benefits-platform`
   - **Description:** "Full-stack platform for startup benefit deals with in-memory database support"
   - **Visibility:** Public
   - **Do NOT initialize with README** (we already have one)
4. Click **"Create repository"**

## Step 2: Get Your GitHub Repository URL

After creating the repository, you'll see a page with commands. Your repository URL will be:
```
https://github.com/kartikyadav17/startup-benefits-platform.git
```

## Step 3: Add Remote and Push

Run these commands in PowerShell (in the assignment folder):

```powershell
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment"

# Add the remote repository
git remote add origin https://github.com/kartikyadav17/startup-benefits-platform.git

# Set the branch name to main
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

## Step 4: Authenticate with GitHub

When you run `git push`, you'll be prompted to authenticate. Choose one option:

### Option A: Personal Access Token (Recommended)
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Set expiration to 90 days or more
4. Check these scopes:
   - ☑ repo (all)
   - ☑ admin:repo_hook
5. Click **"Generate token"**
6. Copy the token (you'll only see it once!)
7. When Git asks for password, paste the token

### Option B: GitHub CLI
1. Install GitHub CLI: https://cli.github.com/
2. Run: `gh auth login`
3. Follow the prompts
4. Then run `git push -u origin main`

## Step 5: Verify on GitHub

1. Go to https://github.com/kartikyadav17/startup-benefits-platform
2. You should see all your files and folders
3. The README.md should display on the repository page

## Complete Commands Summary

```powershell
# Navigate to project directory
cd "c:\Users\KARTIK YADAV\OneDrive\Desktop\assignment"

# Configure git (one time)
git config --global user.name "Kartik Yadav"
git config --global user.email "your-email@gmail.com"

# Add remote repository
git remote add origin https://github.com/kartikyadav17/startup-benefits-platform.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## After Push: Update Repository Settings

1. Go to your repository: https://github.com/kartikyadav17/startup-benefits-platform
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source:** GitHub Actions
   - This enables GitHub Pages if needed

## Make Further Changes

After the initial push, use these commands for any future changes:

```powershell
# Check what changed
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message here"

# Push to GitHub
git push origin main
```

## Troubleshooting

### "fatal: A git repository already exists"
If you get this error, the repository is already initialized. Just add remote and push:
```powershell
git remote add origin https://github.com/kartikyadav17/startup-benefits-platform.git
git branch -M main
git push -u origin main
```

### "Repository not found"
- Check the URL is correct
- Verify you're authenticated with GitHub
- Make sure the repository exists on GitHub

### "Permission denied (publickey)"
- Check your SSH keys: https://github.com/settings/keys
- Or use HTTPS instead of SSH (recommended)

## Ready?

Now run the commands from Step 3 in your PowerShell terminal!

---

**Need help?** Contact GitHub Support or visit https://docs.github.com/
