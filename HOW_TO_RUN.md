# How to Run Hyperthon Registration

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
# Install dependencies (first time only)
npm install

# Start the server
npm run dev
```

### 2. Access the Application
**IMPORTANT**: Don't open the HTML file directly in your browser!

Instead, open your browser and go to:
```
http://localhost:3001
```

### 3. Test Registration
1. Fill out the registration form
2. Click "Submit Registration"
3. You'll be redirected to Razorpay payment page
4. Complete payment
5. You'll be redirected back to success page

## 🔧 Troubleshooting

### If you get HTTP 405 Error:
- Make sure you're accessing `http://localhost:3000` (not opening the HTML file directly)
- Check that the server is running (`npm run dev`)
- Check the console for any error messages

### If you get CORS Error:
- The server is configured to allow all origins
- Make sure you're using the correct URL

### If payment doesn't work:
- Check your Razorpay API keys in the `.env` file
- Make sure you're using test mode keys for testing

## 📁 File Structure
```
nsa-hyperthon/
├── index.html          # Main registration page
├── success.html        # Success page after payment
├── server.js           # Backend server
├── package.json        # Dependencies
├── config.js           # Configuration
├── models/             # Database models
├── services/           # Razorpay service
└── .env               # Environment variables (create this)
```

## 🌐 URLs
- **Main Page**: http://localhost:3001
- **API Health**: http://localhost:3001/health
- **Registration API**: http://localhost:3001/api/register
