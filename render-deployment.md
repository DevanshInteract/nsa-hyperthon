# Deploy Backend to Render.com

## Quick Deployment Steps

### 1. Create Render.com Account
- Go to [render.com](https://render.com)
- Sign up with your GitHub account

### 2. Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `DevanshInteract/nsa-hyperthon`
3. Configure:
   - **Name**: `hyperthon-backend`
   - **Root Directory**: Leave empty (uses root)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Node Version**: `18` or `20`

### 3. Set Environment Variables
In Render dashboard, go to Environment tab and add:
```
MONGODB_URI=mongodb+srv://devanshdbowner1:dkwashere@nasaspaceapps2025.0zndqzt.mongodb.net/?retryWrites=true&w=majority&appName=NasaSpaceApps2025
NODE_ENV=production
PORT=3001
```

### 4. Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Copy the URL (e.g., `https://hyperthon-backend.onrender.com`)

### 5. Update Frontend
The frontend will automatically detect production and use the Render.com backend URL.

## Alternative: Use Static Version

If you don't want to deploy a backend, use `index-static.html` instead:

1. Rename `index-static.html` to `index.html`
2. This version works without any backend
3. Form data is stored in localStorage
4. Direct redirect to Razorpay payment

## Testing

1. **Backend Health Check**: `https://your-app.onrender.com/health`
2. **API Status**: `https://your-app.onrender.com/api/status`
3. **Test Registration**: Fill form and check if it redirects to payment

## Troubleshooting

### Common Issues:
- **Build Fails**: Check Node.js version (use 18 or 20)
- **Database Error**: Verify MongoDB URI is correct
- **CORS Error**: Check if your domain is in CORS origins

### Debug Steps:
1. Check Render logs in dashboard
2. Test health endpoint
3. Verify environment variables
4. Check MongoDB Atlas connection

## Cost
- Render.com free tier: 750 hours/month
- Sufficient for small to medium traffic
- Auto-sleeps after 15 minutes of inactivity
