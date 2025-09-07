# MongoDB Migration Guide

## Prerequisites

Before running the application, you need to have MongoDB installed and running on your system.

### Option 1: Install MongoDB Locally

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the appropriate version for your operating system
   - Follow the installation instructions

2. **Start MongoDB Service:**
   - **Windows:** MongoDB should start automatically as a service
   - **macOS:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

### Option 2: Use MongoDB Atlas (Cloud)

1. **Create a free MongoDB Atlas account:**
   - Visit: https://www.mongodb.com/atlas
   - Sign up for a free account
   - Create a new cluster

2. **Get your connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Set environment variable:**
   ```bash
   export MONGODB_URI="your-atlas-connection-string"
   ```

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

3. **Verify the migration:**
   - Check the console for "✅ Connected to MongoDB successfully"
   - Visit http://localhost:3002 to see your application
   - The database will be automatically seeded with sample products

## Database Structure

The application now uses MongoDB with the following collections:

### Products Collection
- `name`: Product name
- `price`: Product price
- `category`: Product category (Running, Basketball, Casual, etc.)
- `image`: Image filename
- `description`: Product description
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Messages Collection
- `name`: Contact person's name
- `email`: Contact email
- `phone`: Contact phone (optional)
- `topic`: Message topic
- `message`: Message content
- `status`: Message status (new, read, replied, archived)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh` (should connect successfully)
- Check if the default port 27017 is available
- For Atlas, verify your IP is whitelisted

### Application Issues
- Check console logs for error messages
- Ensure all dependencies are installed: `npm install`
- Verify the database connection string is correct

## Migration Benefits

✅ **Full compliance** with SIT725 mandated stack requirements
✅ **Better performance** with MongoDB's indexing
✅ **Scalability** for future growth
✅ **Data validation** with Mongoose schemas
✅ **Automatic timestamps** for all records
✅ **Advanced querying** capabilities
