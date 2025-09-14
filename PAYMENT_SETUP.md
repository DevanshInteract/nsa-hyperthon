# Payment Integration Setup

## ✅ Current Setup

Your Hyperthon registration system is now configured to use your Razorpay payment link:

**Payment Link**: [https://rzp.io/rzp/JWc9fAnC](https://rzp.io/rzp/JWc9fAnC)

## 🔄 How It Works

1. **User fills registration form** → Submits data
2. **System generates registration ID** → Shows success message
3. **User redirected to payment link** → [https://rzp.io/rzp/JWc9fAnC](https://rzp.io/rzp/JWc9fAnC)
4. **User completes payment** → On Razorpay's secure platform
5. **User returns to success page** → With payment confirmation

## 🚀 Testing the Flow

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Open browser** and go to: `http://localhost:3001`

3. **Fill out the registration form** with test data

4. **Click "Submit Registration"**

5. **You'll be redirected** to your Razorpay payment link

6. **Complete the payment** (or cancel to test)

7. **You'll return** to the success page

## 🔧 Razorpay Configuration

To set up proper payment callbacks, you'll need to:

1. **Log into your Razorpay Dashboard**
2. **Go to Settings → Webhooks**
3. **Add a webhook URL**: `http://your-domain.com/api/payment-success`
4. **Select events**: `payment.captured`, `payment.failed`

## 📱 Current Features

- ✅ **Registration form** with validation
- ✅ **Payment link integration** with your Razorpay link
- ✅ **Success page** with payment status
- ✅ **Event venue information**
- ✅ **Partners & sponsors section**
- ✅ **Schedule timeline**
- ✅ **Animated background** with interactive elements

## 🌐 Production Deployment

When deploying to production:

1. **Update the callback URL** in Razorpay dashboard
2. **Set up proper webhook verification**
3. **Add your domain** to the payment link settings
4. **Test the complete flow** before going live

## 💡 Benefits of This Setup

- **No API keys required** - Uses your existing payment link
- **Secure payment processing** - Handled by Razorpay
- **Easy to manage** - All payments in your Razorpay dashboard
- **Mobile friendly** - Works on all devices
- **Professional appearance** - Clean, modern design

Your registration system is ready to use! 🎉
