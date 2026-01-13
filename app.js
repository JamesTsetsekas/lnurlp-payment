// LNURLP Configuration
const LNURLP_ENDPOINT = 'https://btc.jamestsetsekas.com/.well-known/lnurlp/btcpayservertest';
const LNURLP_ADDRESS = 'btcpayservertest@btc.jamestsetsekas.com';

let lnurlpData = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch LNURLP data to get amount limits
        await fetchLNURLPData();
        
        // Generate and display LNURLP QR code
        await generateLNURLPQRCode();
    } catch (error) {
        showError('Failed to initialize: ' + error.message);
    }
});

// Fetch LNURLP metadata
async function fetchLNURLPData() {
    try {
        const response = await fetch(LNURLP_ENDPOINT);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        lnurlpData = await response.json();
        
        if (lnurlpData.status === 'ERROR') {
            throw new Error(lnurlpData.reason || 'Unknown error from LNURLP endpoint');
        }

        console.log('LNURLP Data:', lnurlpData);

        // Update amount range display
        if (lnurlpData.minSendable && lnurlpData.maxSendable) {
            const minSats = Math.ceil(lnurlpData.minSendable / 1000);
            const maxSats = Math.floor(lnurlpData.maxSendable / 1000);
            document.getElementById('amountRange').textContent = `${minSats} - ${maxSats} sats`;
        }
    } catch (error) {
        console.error('Error fetching LNURLP data:', error);
        throw error;
    }
}

// Simple bech32 encoding for LNURL
function encodeLNURL(url) {
    // Many wallets support plain HTTPS URLs for LNURLP
    // For better compatibility, we'll use the plain URL
    // Some wallets prefer the bech32 encoded version, but plain URL works too
    return url;
}

// Generate LNURLP QR code
async function generateLNURLPQRCode() {
    try {
        // Create LNURLP URL - use the endpoint URL
        const lnurlpUrl = LNURLP_ENDPOINT;
        
        // Use the LNURLP endpoint URL directly
        // Most modern Lightning wallets support HTTPS URLs for LNURLP
        // The wallet will fetch the metadata and allow user to choose amount
        let qrData = lnurlpUrl;
        
        // Some wallets prefer the lightning: protocol prefix
        // Try using it, but plain HTTPS URL also works
        qrData = lnurlpUrl;

        // Display the URL
        document.getElementById('lnurlUrl').textContent = qrData;

        // Generate QR code
        const qrCanvas = document.getElementById('qrCode');
        
        // Wait for QRCode library to load if needed
        if (typeof QRCode === 'undefined') {
            try {
                await loadQRCodeLibrary();
            } catch (error) {
                console.warn('QRCode library failed to load, using API fallback:', error);
                await generateQRCodeViaAPI(qrCanvas, qrData);
                return;
            }
        }
        
        try {
            await QRCode.toCanvas(qrCanvas, qrData, {
                width: 400,
                margin: 3,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
        } catch (error) {
            console.warn('QRCode.toCanvas failed, using API fallback:', error);
            await generateQRCodeViaAPI(qrCanvas, qrData);
        }

        console.log('LNURLP QR Code generated:', qrData);

    } catch (error) {
        console.error('Error generating LNURLP QR code:', error);
        showError('Failed to generate QR code: ' + error.message);
    }
}


// Load QR code library from alternative CDN if needed
function loadQRCodeLibrary() {
    return new Promise((resolve, reject) => {
        if (typeof QRCode !== 'undefined') {
            resolve();
            return;
        }

        // Try cdnjs as fallback
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js';
        script.onload = () => {
            if (typeof QRCode !== 'undefined') {
                resolve();
            } else {
                reject(new Error('QRCode library failed to load'));
            }
        };
        script.onerror = () => {
            reject(new Error('Failed to load QRCode library from CDN'));
        };
        document.head.appendChild(script);
    });
}

// Generate QR code using API as fallback
async function generateQRCodeViaAPI(canvas, text) {
    try {
        // Use QR Server API (free, no API key needed)
        const encodedText = encodeURIComponent(text);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodedText}`;
        
        // Load the QR code image into the canvas
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        return new Promise((resolve, reject) => {
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                canvas.width = 400;
                canvas.height = 400;
                ctx.drawImage(img, 0, 0);
                resolve();
            };
            img.onerror = () => {
                reject(new Error('Failed to load QR code image'));
            };
            img.src = qrUrl;
        });
    } catch (error) {
        console.error('QR code API fallback failed:', error);
        throw error;
    }
}

// Show error message
function showError(message) {
    const errorSection = document.getElementById('errorSection');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
}
