require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');
const Registration = require('./models/Registration');
const RazorpayService = require('./services/razorpayService');
const MemoryStorage = require('./storage/memoryStorage');

// Check if we're using memory storage
let useMemoryStorage = false;

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'https://hyperthon.interstella.in', 'https://www.hyperthon.interstella.in'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static('.'));

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
  useMemoryStorage = false;
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('⚠️  Running without database - using memory storage');
  console.log('💡 To enable database: Install MongoDB or use MongoDB Atlas');
  useMemoryStorage = true;
});

// Routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Hyperthon Backend is running',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV || 'development',
    database: useMemoryStorage ? 'Memory Storage' : 'MongoDB',
    version: '1.0.0'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'API is operational',
    endpoints: {
      register: 'POST /api/register',
      paymentSuccess: 'GET /api/payment-success',
      registration: 'GET /api/registration/:id',
      registrations: 'GET /api/registrations'
    }
  });
});

// Register participant and create payment link
app.post('/api/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    console.log('Request headers:', req.headers);
    console.log('Request origin:', req.get('origin'));
    
    const { name, institution, year, email, phone } = req.body;

    // Validate required fields
    if (!name || !institution || !year || !email || !phone) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Generate unique registration ID
    const registrationId = Date.now().toString();
    
    // Store registration data
    const registrationData = {
      name,
      institution,
      year,
      email,
      phone,
      paymentStatus: 'pending',
      registrationDate: new Date()
    };

    let savedRegistration;
    if (useMemoryStorage) {
      // Store in memory storage if MongoDB is not available
      savedRegistration = await MemoryStorage.create({...registrationData, _id: registrationId});
      console.log('Registration stored in memory:', savedRegistration);
    } else {
      // Store in MongoDB
      savedRegistration = await Registration.create(registrationData);
      console.log('Registration stored in MongoDB:', savedRegistration);
    }
    
    // Use the provided Razorpay payment link
    res.json({
      success: true,
      message: 'Registration successful! Please complete payment.',
      registrationId: savedRegistration._id || registrationId,
      paymentLink: 'https://rzp.io/rzp/JWc9fAnC',
      testMode: false
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// Payment success callback (called by Razorpay)
app.get('/api/payment-success', async (req, res) => {
  try {
    const { registration_id, payment_id, payment_link_id } = req.query;

    console.log('Payment success callback received:', req.query);

    // For now, just redirect to success page
    // In a real implementation, you would verify the payment with Razorpay
    const successRegistrationId = registration_id || Date.now().toString();
    
    res.redirect(`/success.html?registration_id=${successRegistrationId}&payment_completed=true`);

  } catch (error) {
    console.error('Payment success callback error:', error);
    res.status(500).send('Payment processing error');
  }
});

// Verify payment and update registration (keeping for backward compatibility)
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Find registration
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Verify payment signature
    const isSignatureValid = RazorpayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Update registration with payment details
    registration.paymentStatus = 'completed';
    registration.razorpayPaymentId = razorpayPaymentId;
    registration.razorpaySignature = razorpaySignature;
    await registration.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      registration: {
        id: registration._id,
        name: registration.name,
        email: registration.email,
        paymentStatus: registration.paymentStatus
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
});

// Get registration status
app.get('/api/registration/:id', async (req, res) => {
  try {
    let registration;
    if (useMemoryStorage) {
      registration = await MemoryStorage.findById(req.params.id);
    } else {
      registration = await Registration.findById(req.params.id);
    }
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      registration: {
        id: registration._id,
        name: registration.name,
        email: registration.email,
        institution: registration.institution,
        year: registration.year,
        phone: registration.phone,
        paymentStatus: registration.paymentStatus,
        registrationDate: registration.registrationDate
      }
    });

  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration details'
    });
  }
});

// Get all registrations (admin endpoint)
app.get('/api/registrations', async (req, res) => {
  try {
    let registrations;
    if (useMemoryStorage) {
      registrations = await MemoryStorage.findAll();
    } else {
      registrations = await Registration.find({})
        .sort({ registrationDate: -1 })
        .select('-razorpaySignature');
    }

    res.json({
      success: true,
      count: registrations.length,
      registrations
    });

  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = config.PORT || process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Environment: ${config.NODE_ENV || 'development'}`);
  console.log(`💾 Database: ${useMemoryStorage ? 'Memory Storage' : 'MongoDB'}`);
});
