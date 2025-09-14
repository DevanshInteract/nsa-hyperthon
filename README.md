# Hyperthon Registration Backend

A complete backend solution for Hyperthon registration with MongoDB storage and Razorpay payment integration.

## Features

- ✅ Participant registration with form validation
- ✅ MongoDB database integration
- ✅ Razorpay payment gateway integration
- ✅ Payment verification and status tracking
- ✅ RESTful API endpoints
- ✅ Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Razorpay account with API keys

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hyperthon
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   PORT=3000
   PAYMENT_AMOUNT=500
   CURRENCY=INR
   ```

3. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your system
   - Atlas: Use your MongoDB Atlas connection string

4. **Run the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### 1. Health Check
- **GET** `/health`
- Returns server status

### 2. Register Participant
- **POST** `/api/register`
- **Body:** `{ name, institution, year, email, phone }`
- **Response:** Registration details and Razorpay order

### 3. Verify Payment
- **POST** `/api/verify-payment`
- **Body:** `{ registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature }`
- **Response:** Payment verification status

### 4. Get Registration
- **GET** `/api/registration/:id`
- **Response:** Registration details

### 5. Get All Registrations (Admin)
- **GET** `/api/registrations`
- **Response:** List of all registrations

## Frontend Integration

The HTML form is already integrated with the backend. When a user submits the form:

1. Form data is sent to `/api/register`
2. A Razorpay order is created
3. Payment modal opens
4. After successful payment, `/api/verify-payment` is called
5. Registration status is updated to "completed"

## Razorpay Setup

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add the keys to your `.env` file
4. Test with Razorpay test mode first

## Database Schema

```javascript
{
  name: String,
  institution: String,
  year: String,
  email: String (unique),
  phone: String,
  paymentStatus: String (pending/completed/failed),
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount: Number,
  currency: String,
  registrationDate: Date
}
```

## Testing

1. Start the server: `npm run dev`
2. Open `index.html` in your browser
3. Fill out the registration form
4. Complete payment using Razorpay test mode
5. Check MongoDB for the registration record

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance
3. Use Razorpay live mode keys
4. Deploy to your preferred hosting platform (Heroku, AWS, etc.)

## Troubleshooting

- **MongoDB Connection Error:** Check your MongoDB URI and ensure MongoDB is running
- **Razorpay Error:** Verify your API keys and ensure they're correct
- **CORS Error:** Make sure the frontend is served from the correct domain
- **Payment Verification Failed:** Check Razorpay webhook configuration

## Support

For issues and questions, please check the logs and ensure all environment variables are correctly set.
