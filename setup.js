const fs = require('fs');
const path = require('path');

console.log('🚀 Hyperthon Backend Setup');
console.log('========================\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/hyperthon
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/hyperthon

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server Configuration
PORT=3000
NODE_ENV=development

# Payment Configuration
PAYMENT_AMOUNT=500
CURRENCY=INR

# Callback Configuration (for production)
CALLBACK_BASE_URL=http://localhost:3000
`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created! Please update with your actual values.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  console.log('Run: npm install\n');
} else {
  console.log('✅ Dependencies already installed.\n');
}

console.log('🔧 Setup Instructions:');
console.log('1. Update .env file with your MongoDB URI and Razorpay keys');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Open index.html in your browser');
console.log('\n🎉 Setup complete!');
