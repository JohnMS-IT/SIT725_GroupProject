const Product = require('../models/Product');

class ProductController {
  // Display all products (shop page)
  static async shop(req, res) {
    try {
      const category = req.query.category;
      let products;
      let categories = await Product.distinct('category');

      if (category) {
        products = await Product.findByCategory(category);
      } else {
        products = await Product.find().sort({ createdAt: -1 });
      }

      res.render('shop', {
        title: 'Shop - ShoeMart',
        products,
        categories,
        selectedCategory: category,
        currentPage: 'shop'
      });
    } catch (error) {
      console.error('Error in ProductController.shop:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Unable to load shop page',
        error: error.message
      });
    }
  }

  // Display single product details
  static async show(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).render('error', {
          title: 'Product Not Found',
          message: 'The product you are looking for does not exist.',
          error: 'Product not found'
        });
      }

      // Get related products from same category
      const relatedProducts = await Product.findByCategory(product.category);
      const filteredRelated = relatedProducts.filter(p => p._id.toString() !== product._id.toString()).slice(0, 4);

      res.render('product-detail', {
        title: `${product.name} - ShoeMart`,
        product,
        relatedProducts: filteredRelated,
        currentPage: 'shop'
      });
    } catch (error) {
      console.error('Error in ProductController.show:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Unable to load product details',
        error: error.message
      });
    }
  }

  // Search products
  static async search(req, res) {
    try {
      const query = req.query.q || '';
      let products = [];
      let categories = await Product.distinct('category');

      if (query.trim()) {
        products = await Product.searchProducts(query);
      } else {
        products = await Product.find().sort({ createdAt: -1 });
      }

      // If it's an AJAX request, return JSON
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({
          products,
          query,
          count: products.length
        });
      }

      // Otherwise render search page
      res.render('search', {
        title: 'Search Results - ShoeMart',
        products,
        categories,
        query,
        currentPage: 'search'
      });
    } catch (error) {
      console.error('Error in ProductController.search:', error);
      
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(500).json({ error: 'Search failed' });
      }

      res.status(500).render('error', {
        title: 'Error',
        message: 'Unable to perform search',
        error: error.message
      });
    }
  }

  // Get products by category (API endpoint)
  static async getByCategory(req, res) {
    try {
      const category = req.params.category;
      const products = await Product.findByCategory(category);

      res.json({
        category,
        products,
        count: products.length
      });
    } catch (error) {
      console.error('Error in ProductController.getByCategory:', error);
      res.status(500).json({ error: 'Unable to fetch products by category' });
    }
  }
}

module.exports = ProductController;