const Razorpay = require('razorpay');
const config = require('../config');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET
});

class RazorpayService {
  // Create payment link
  static async createPaymentLink(amount, currency = 'INR', customerDetails) {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        description: 'Hyperthon Registration Fee',
        customer: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone
        },
        notify: {
          sms: true,
          email: true
        },
        reminder_enable: true,
        callback_url: `${config.CALLBACK_BASE_URL || 'http://localhost:3000'}/api/payment-success?registration_id=${customerDetails.registrationId}`,
        callback_method: 'get'
      };

      const paymentLink = await razorpay.paymentLink.create(options);
      return paymentLink;
    } catch (error) {
      console.error('Error creating Razorpay payment link:', error);
      throw new Error('Failed to create payment link');
    }
  }

  // Create order for payment (keeping for backward compatibility)
  static async createOrder(amount, currency = 'INR', receipt) {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        receipt: receipt,
        payment_capture: 1 // Auto capture payment
      };

      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  // Verify payment signature
  static verifyPaymentSignature(orderId, paymentId, signature) {
    try {
      const body = orderId + '|' + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', config.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === signature;
    } catch (error) {
      console.error('Error verifying payment signature:', error);
      return false;
    }
  }

  // Get payment details
  static async getPaymentDetails(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw new Error('Failed to fetch payment details');
    }
  }

  // Refund payment
  static async refundPayment(paymentId, amount) {
    try {
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount * 100 // Convert to paise
      });
      return refund;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }
}

module.exports = RazorpayService;
