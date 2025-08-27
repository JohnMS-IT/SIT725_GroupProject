const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { initDatabase } = require('./config/database');

// Import Controllers
const HomeController = require('./controllers/homeController');
const ProductController = require('./controllers/productController');
const ContactController = require('./controllers/contactController');

const app = express();

// View Engine Setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files middleware - serve from public_html for images and CSS
app.use(express.static(path.join(__dirname, 'public_html')));

// Initialize database
initDatabase()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });

// =======================
// ROUTES (MVC Pattern)
// =======================

// Home Routes
app.get('/', HomeController.index);
app.get('/about', HomeController.about);

// Product Routes
app.get('/shop', ProductController.shop);
app.get('/product/:id', ProductController.show);
app.get('/search', ProductController.search);

// API Routes for AJAX calls
app.get('/api/products/category/:category', ProductController.getByCategory);
app.get('/api/search', ProductController.search);

// Contact Routes
app.get('/contact', ContactController.index);
app.post('/contact', ContactController.submit);

// Admin API Routes (for future admin panel)
app.get('/api/messages', ContactController.getMessages);
app.get('/api/messages/recent', ContactController.getRecentMessages);
app.delete('/api/messages/:id', ContactController.deleteMessage);

// =======================
// ERROR HANDLING
// =======================

// 404 Handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    error: '404 - Page Not Found',
    currentPage: ''
  });
});

// Global Error Handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Don't show error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(error.status || 500).render('error', {
    title: 'Server Error',
    message: 'An unexpected error occurred.',
    error: isDevelopment ? error.message : 'Internal Server Error',
    currentPage: ''
  });
});

// =======================
// SERVER STARTUP
// =======================

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`🚀 ShoeMart Server running at: http://localhost:${port}`);
  console.log('📁 MVC Architecture:');
  console.log('   Models: ./models/');
  console.log('   Views: ./views/');
  console.log('   Controllers: ./controllers/');
  console.log('   Database: ./config/database.js');
  console.log('Type Ctrl+C to shut down the web server');
});

module.exports = app;
