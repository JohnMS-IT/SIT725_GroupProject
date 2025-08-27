# ShoeMart - MVC Web Application

A modern shoe e-commerce website built with Node.js, Express, and following the Model-View-Controller (MVC) architectural pattern.

## 🏗️ MVC Architecture

This project follows a proper MVC structure:

### 📁 Project Structure
```
Shop Website/
├── models/                 # Data layer (M)
│   ├── Product.js         # Product data model
│   └── Message.js         # Contact message model
├── views/                 # Presentation layer (V)
│   ├── layouts/
│   │   └── main.ejs       # Main layout template
│   ├── partials/
│   │   ├── navbar.ejs     # Navigation component
│   │   └── footer.ejs     # Footer component
│   ├── index.ejs          # Home page
│   ├── shop.ejs           # Shop page
│   ├── product-detail.ejs # Product detail page
│   ├── contact.ejs        # Contact page
│   ├── about.ejs          # About page
│   ├── search.ejs         # Search page
│   └── error.ejs          # Error page
├── controllers/           # Business logic layer (C)
│   ├── homeController.js  # Home & About pages
│   ├── productController.js # Product-related operations
│   └── contactController.js # Contact form handling
├── config/
│   └── database.js        # Database configuration
├── public_html/           # Static assets (CSS, images)

├── app.js                 # Main application file
└── package.json
```

## 🚀 Features

### Model Layer (Data)
- **Product Model**: Handles product CRUD operations
  - Get all products
  - Get by ID, category
  - Search functionality
  - Product creation/updates
- **Message Model**: Manages contact form submissions
  - Save contact messages
  - Retrieve messages (admin functionality)

### View Layer (Presentation)
- **EJS Templates**: Dynamic server-side rendering
- **Responsive Design**: Bootstrap-based UI
- **Reusable Components**: Partials for navbar, footer
- **Dynamic Content**: Product listings, search results

### Controller Layer (Business Logic)
- **Home Controller**: Homepage and about page logic
- **Product Controller**: Shop, search, product detail pages
- **Contact Controller**: Contact form processing

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Database**: SQLite3
- **Frontend**: Bootstrap 5, Vanilla JavaScript
- **Architecture**: MVC Pattern

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Application**
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and go to: `http://localhost:3002`

## 🎯 Available Pages

- **Home** (`/`) - Featured products and categories
- **Shop** (`/shop`) - All products with category filtering
- **Product Detail** (`/product/:id`) - Individual product information
- **Search** (`/search`) - Product search functionality
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form

## 🔌 API Endpoints

### Product APIs
- `GET /api/products/category/:category` - Get products by category
- `GET /api/search?q=query` - Search products

### Contact APIs (Admin)
- `GET /api/messages` - Get all messages
- `GET /api/messages/recent` - Get recent messages
- `DELETE /api/messages/:id` - Delete message

## 🗃️ Database Schema

### Products Table
- `id` - Primary key
- `name` - Product name
- `price` - Product price
- `category` - Product category
- `image` - Image filename
- `description` - Product description
- `created_at` - Creation timestamp

### Messages Table
- `id` - Primary key
- `name` - Contact name
- `email` - Contact email
- `phone` - Contact phone
- `topic` - Message topic
- `message` - Message content
- `created_at` - Creation timestamp

## 🔄 Migration from Old Structure

The application has been migrated from a basic Express app to a proper MVC architecture:

### Before (Non-MVC)
- Static HTML files
- Basic route handlers
- Mixed business logic
- Limited scalability

### After (MVC)
- Dynamic EJS templates
- Separated concerns
- Proper model classes
- Scalable architecture
- Better maintainability

## 🚀 Future Enhancements

- User authentication system
- Shopping cart functionality
- Payment integration
- Admin panel for product management
- Product reviews and ratings
- Inventory management
- Order tracking

## 📝 Notes

- All old deprecated files have been removed for a clean MVC structure
- Static assets (images, CSS) are served from `public_html/`
- Database file (`shoehouse.db`) is created automatically on first run
- Sample data is inserted automatically if the database is empty

## 🧑‍💻 Development

To extend this application:

1. **Add new Models**: Create new files in `models/` directory
2. **Add new Views**: Create new EJS templates in `views/` directory
3. **Add new Controllers**: Create new controller files in `controllers/` directory
4. **Update Routes**: Add new routes in `app.js`

The MVC structure makes it easy to maintain separation of concerns and add new features systematically.

