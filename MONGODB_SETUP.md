# MongoDB Setup Guide

## 🚀 Quick Setup Options

### Option 1: MongoDB Atlas (Recommended - Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hyperthon
   ```

### Option 2: Local MongoDB Installation
1. Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Server
3. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Or run manually
   mongod
   ```
4. Update `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hyperthon
   ```

### Option 3: Docker (If you have Docker)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🔧 Current Status

**The application is currently running with in-memory storage** (no database required).

### Features with Memory Storage:
- ✅ Registration form works
- ✅ Payment links are generated
- ✅ Basic functionality works
- ❌ Data is lost when server restarts
- ❌ No persistent storage

### Features with MongoDB:
- ✅ All memory storage features
- ✅ Data persists between restarts
- ✅ Full database functionality
- ✅ Better for production use

## 🧪 Testing Without MongoDB

The application works perfectly without MongoDB for testing purposes. All registrations are stored in memory and will work for:
- Form submission testing
- Payment link generation
- Basic functionality testing

## 🚀 To Enable MongoDB

1. Choose one of the setup options above
2. Update your `.env` file with the correct MongoDB URI
3. Restart the server: `npm run dev`
4. You'll see "Connected to MongoDB" in the console

## 💡 Pro Tips

- **For Development**: Memory storage is fine
- **For Production**: Always use MongoDB Atlas
- **For Testing**: Memory storage works great
- **For Demo**: Either option works
