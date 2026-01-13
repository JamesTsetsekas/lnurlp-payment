# LNURLP Payment Page

A simple web page for testing Lightning Network payments using LNURLP (Lightning Network URL Pay).

## Features

- Fetches LNURLP metadata from the configured endpoint
- Allows users to select payment amounts between 50-100 sats
- Generates Bolt 11 invoices via LNURLP callback
- Displays QR codes for easy payment scanning
- Modern, responsive UI

## Usage

1. Open `index.html` in a web browser
2. Select an amount (50-100 sats) using the slider or quick buttons
3. Click "Generate Invoice" to create a Bolt 11 invoice
4. Scan the QR code with a Lightning wallet to pay

## Configuration

The LNURLP endpoint is configured in `app.js`:
```javascript
const LNURLP_ENDPOINT = 'https://btc.jamestsetsekas.com/.well-known/lnurlp/btcpayservertest';
```

## How It Works

1. **Fetch LNURLP Metadata**: The page fetches the LNURLP endpoint to get payment metadata including the callback URL
2. **User Selects Amount**: User chooses an amount between 50-100 sats
3. **Generate Invoice**: The page calls the callback URL with the selected amount (in millisats)
4. **Display Invoice**: The returned Bolt 11 invoice is displayed along with a QR code

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `app.js` - LNURLP logic and invoice generation
- `README.md` - This file

## Dependencies

- QRCode.js (loaded via CDN) - For generating QR codes from Bolt 11 invoices

## Browser Compatibility

Works in all modern browsers that support:
- Fetch API
- ES6+ JavaScript
- Canvas API (for QR code generation)
