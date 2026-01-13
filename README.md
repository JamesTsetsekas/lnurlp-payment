# LNURLP Payment Page

A simple web page for Lightning Network payments using LNURLP (Lightning Network URL Pay). Users can scan a QR code with their Lightning wallet and choose the payment amount (50-100 sats) directly in their wallet.

## Features

- Displays LNURLP QR code that wallets can scan
- Wallet handles amount selection (50-100 sats)
- Fetches LNURLP metadata to show payment limits
- Modern, responsive UI
- Works with all major Lightning wallets

## Usage

1. Open the page (hosted on GitHub Pages or locally)
2. Scan the QR code with your Lightning wallet
3. Choose amount (50-100 sats) in your wallet
4. Complete the payment

## Configuration

The LNURLP endpoint is configured in `app.js`:
```javascript
const LNURLP_ENDPOINT = 'https://btc.jamestsetsekas.com/.well-known/lnurlp/btcpayservertest';
```

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `lnurlp-payment-page`)
3. **Don't** initialize with README, .gitignore, or license (we already have these)

### Step 2: Push Your Code

Run these commands in your terminal (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create YOUR_REPO_NAME --public
git push -u origin main
gh repo view --web
# Then enable Pages in Settings
```

## How It Works

1. **Page Loads**: Fetches LNURLP metadata from the endpoint
2. **QR Code Display**: Generates QR code with LNURLP endpoint URL
3. **Wallet Scan**: User scans QR code with Lightning wallet
4. **Amount Selection**: Wallet fetches metadata and shows amount selector (50-100 sats)
5. **Payment**: User completes payment in wallet

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `app.js` - LNURLP logic and QR code generation
- `README.md` - This file

## Dependencies

- QRCode.js (loaded via CDN) - For generating QR codes
- Fallback to QR code API if CDN fails

## Browser Compatibility

Works in all modern browsers that support:
- Fetch API
- ES6+ JavaScript
- Canvas API (for QR code generation)

## Local Development

Simply open `index.html` in a web browser. No build process required!
