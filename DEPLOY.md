# Quick Deployment Guide

## Option 1: Using GitHub Web Interface

1. **Create Repository on GitHub**
   - Go to https://github.com/new
   - Name your repository (e.g., `lnurlp-payment`)
   - Make it public
   - Click "Create repository"

2. **Upload Files**
   - On the new repository page, click "uploading an existing file"
   - Drag and drop all files: `index.html`, `styles.css`, `app.js`, `README.md`, `.gitignore`
   - Commit with message "Initial commit"
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `(root)`
   - Click Save
   - Your site will be at: `https://YOUR_USERNAME.github.io/lnurlp-payment/`

## Option 2: Using Git Command Line

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main

# Then enable Pages in GitHub Settings → Pages
```

## Option 3: Using GitHub CLI

```bash
# Create repo and push
gh repo create lnurlp-payment --public --source=. --remote=origin --push

# Enable Pages (or do it in web interface)
gh repo view --web
# Then go to Settings → Pages
```

Your site will be live in 1-2 minutes after enabling Pages!
