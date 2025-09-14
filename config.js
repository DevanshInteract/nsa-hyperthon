module.exports = {
  // MongoDB Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://devanshdbowner1:dkwashere@nasaspaceapps2025.0zndqzt.mongodb.net/?retryWrites=true&w=majority&appName=NasaSpaceApps2025',
  
  // Razorpay Configuration
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'your_razorpay_key_id',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_key_secret',
  
  // Server Configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Payment Configuration
  PAYMENT_AMOUNT: process.env.PAYMENT_AMOUNT || 500,
  CURRENCY: process.env.CURRENCY || 'INR',
  
  // Callback Configuration
  CALLBACK_BASE_URL: process.env.CALLBACK_BASE_URL || 'http://localhost:3001'
};
