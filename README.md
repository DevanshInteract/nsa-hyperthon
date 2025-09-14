# 🚀 Hyperthon Registration System

A modern, full-stack registration system for Hyperthon coding competition featuring MongoDB integration, Razorpay payment processing, and an interactive animated UI.

## ✨ Features

- **🎨 Modern UI**: Responsive design with animated coding-themed background
- **📝 Form Validation**: Client-side and server-side validation
- **🗄️ Database Integration**: MongoDB Atlas for data persistence
- **💳 Payment Processing**: Razorpay payment gateway integration
- **📊 Real-time Tracking**: Live registration monitoring
- **🎯 Interactive Elements**: Mouse-responsive floating symbols
- **📱 Mobile Responsive**: Works on all device sizes

## 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Payment**: Razorpay Payment Links
- **Deployment**: Ready for Heroku, Vercel, or any Node.js hosting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/nsa-hyperthon.git
cd nsa-hyperthon
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3001
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. **Start the development server**
```bash
npm start
# or
node server.js
```

5. **Open your browser**
Navigate to `http://localhost:3001`

## 📁 Project Structure

```
nsa-hyperthon/
├── models/
│   └── Registration.js          # Mongoose schema
├── services/
│   └── razorpayService.js       # Razorpay integration
├── storage/
│   └── memoryStorage.js         # Fallback storage
├── index.html                   # Main frontend page
├── success.html                 # Payment success page
├── server.js                    # Express server
├── config.js                    # Configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🔧 Configuration

### MongoDB Setup
- Create a MongoDB Atlas cluster
- Get your connection string
- Add it to `.env` file

### Razorpay Setup
- Create a Razorpay account
- Get your API keys
- Add them to `.env` file
- Or use the provided payment link for testing

## 📝 API Endpoints

- `POST /api/register` - Register a new participant
- `GET /api/registration/:id` - Get registration details
- `GET /api/registrations` - Get all registrations (admin)
- `GET /api/payment-success` - Payment success callback
- `GET /health` - Health check

## 🎨 Customization

### Styling
- Modify `index.html` for UI changes
- Update Tailwind classes for styling
- Customize animations in the `<style>` section

### Database
- Modify `models/Registration.js` for schema changes
- Update validation in `server.js`

### Payment
- Update Razorpay configuration in `config.js`
- Modify payment flow in `server.js`

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables
3. Deploy with Git

### Vercel
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Other Platforms
- Any Node.js hosting platform
- Ensure MongoDB Atlas is accessible
- Set up environment variables

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email your-email@example.com or create an issue on GitHub.

---

**Made with ❤️ for the Hyperthon community**