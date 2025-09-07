const mongoose = require('mongoose');
const Product = require('./models/Product');
const Message = require('./models/Message');

// Test MongoDB connection and models
async function testMongoDB() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/shoemart');
    console.log('✅ Connected to MongoDB successfully');
    
    // Test Product model
    console.log('\n📦 Testing Product model...');
    const productCount = await Product.countDocuments();
    console.log(`✅ Found ${productCount} products in database`);
    
    if (productCount > 0) {
      const sampleProduct = await Product.findOne();
      console.log(`✅ Sample product: ${sampleProduct.name} - $${sampleProduct.price}`);
    }
    
    // Test Message model
    console.log('\n💬 Testing Message model...');
    const messageCount = await Message.countDocuments();
    console.log(`✅ Found ${messageCount} messages in database`);
    
    // Test Product categories
    console.log('\n🏷️  Testing Product categories...');
    const categories = await Product.distinct('category');
    console.log(`✅ Available categories: ${categories.join(', ')}`);
    
    // Test search functionality
    console.log('\n🔍 Testing search functionality...');
    const searchResults = await Product.searchProducts('Nike');
    console.log(`✅ Search for 'Nike' returned ${searchResults.length} results`);
    
    console.log('\n🎉 All MongoDB tests passed successfully!');
    console.log('✅ Your application is ready to use MongoDB');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running on your system');
    console.log('2. Check if the default port 27017 is available');
    console.log('3. Run: npm install (to install mongoose)');
    console.log('4. Start your app with: npm start');
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the test
testMongoDB();
