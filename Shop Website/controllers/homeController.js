const Product = require('../models/Product');

class HomeController {
  // Display home page
  static async index(req, res) {
    try {
      // Get featured products (first 6 products)
      const allProducts = await Product.getAll();
      const featuredProducts = allProducts.slice(0, 6);
      
      // Get categories for navigation
      const categories = await Product.getCategories();

      res.render('index', {
        title: 'ShoeMart - Home',
        featuredProducts,
        categories,
        currentPage: 'home'
      });
    } catch (error) {
      console.error('Error in HomeController.index:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Unable to load home page',
        error: error.message
      });
    }
  }

  // Display about page
  static async about(req, res) {
    try {
      res.render('about', {
        title: 'About Us - ShoeMart',
        currentPage: 'about'
      });
    } catch (error) {
      console.error('Error in HomeController.about:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Unable to load about page',
        error: error.message
      });
    }
  }
}

module.exports = HomeController;

