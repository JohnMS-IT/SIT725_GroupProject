const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoemart';

// Initialize database connection
const initDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
    
    // Check if we need to seed the database
    await seedDatabase();
    
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

// Seed database with sample data if empty
const seedDatabase = async () => {
  try {
    const Product = require('../models/Product');
    
    // Check if products exist
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      console.log('🌱 Seeding database with sample products...');
      
      const sampleProducts = [
        {
          name: 'Nike Air Max',
          price: 120,
          category: 'Running',
          image: 'NikeAir.jpg',
          description: 'Comfortable running shoes with excellent cushioning'
        },
        {
          name: 'Ultraboost',
          price: 220,
          category: 'Running',
          image: 'ultraboost.jpg',
          description: 'Premium running shoes with boost technology'
        },
        {
          name: 'Jordans',
          price: 100,
          category: 'Basketball',
          image: 'Jordans.webp',
          description: 'Classic basketball shoes with iconic style'
        },
        {
          name: 'Vans',
          price: 90,
          category: 'Casual',
          image: 'vans.webp',
          description: 'Casual lifestyle shoes perfect for everyday wear'
        },
        {
          name: 'Nike Pegasus',
          price: 110,
          category: 'Running',
          image: 'Pegasus.jpg',
          description: 'Versatile running shoes for all distances'
        },
        {
          name: 'Vomero',
          price: 140,
          category: 'Running',
          image: 'Vomero.webp',
          description: 'Max cushioning for long-distance running'
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products inserted successfully');
    } else {
      console.log(`📊 Database already contains ${productCount} products`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

module.exports = { initDatabase, mongoose };