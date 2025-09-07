const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Running', 'Basketball', 'Casual', 'Skateboarding', 'Kids', 'Women'],
      message: 'Category must be one of: Running, Basketball, Casual, Skateboarding, Kids, Women'
    }
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });

// Static method to find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category: new RegExp(category, 'i') });
};

// Static method to search products
productSchema.statics.searchProducts = function(query) {
  return this.find({
    $or: [
      { name: new RegExp(query, 'i') },
      { description: new RegExp(query, 'i') },
      { category: new RegExp(query, 'i') }
    ]
  });
};

// Instance method to check if product is on sale
productSchema.methods.isOnSale = function() {
  return this.price < 100; // Example: products under $100 are on sale
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;