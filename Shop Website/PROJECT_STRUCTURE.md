# ShoeMart Project Structure

## 📁 MVC Architecture Overview

This project follows the **Model-View-Controller (MVC)** architectural pattern with a clean separation of concerns and organized asset management.

```
Shop Website/
├── 📁 assets/                    # Static assets (images, CSS, JS)
│   ├── 📁 images/               # All website images
│   │   ├── basketball.jpg
│   │   ├── Jordans.webp
│   │   ├── NikeAir.jpg
│   │   ├── running.webp
│   │   ├── Sneakers.jpg
│   │   ├── ultraboost.jpg
│   │   ├── vans.webp
│   │   └── ... (all other images)
│   ├── 📁 css/                  # Stylesheets
│   │   └── style.css
│   └── 📁 js/                   # Client-side JavaScript
│       └── main.js
├── 📁 config/                   # Configuration files
│   └── database.js              # MongoDB connection & setup
├── 📁 controllers/              # Business logic (Controller layer)
│   ├── contactController.js     # Contact form handling
│   ├── homeController.js        # Home page logic
│   └── productController.js     # Product-related operations
├── 📁 models/                   # Data models (Model layer)
│   ├── Message.js               # Message/Contact schema
│   └── Product.js               # Product schema
├── 📁 views/                    # Templates (View layer)
│   ├── 📁 layouts/              # Layout templates
│   │   └── main.ejs             # Main layout template
│   ├── 📁 partials/             # Reusable components
│   │   ├── footer.ejs           # Footer component
│   │   └── navbar.ejs           # Navigation component
│   ├── about.ejs                # About page
│   ├── contact.ejs              # Contact page
│   ├── error.ejs                # Error page
│   ├── index.ejs                # Home page
│   ├── product-detail.ejs       # Product details page
│   ├── search.ejs               # Search results page
│   └── shop.ejs                 # Shop/Products listing page
├── app.js                       # Main application entry point
├── package.json                 # Dependencies and scripts
└── test-mongodb.js              # Database connection test
```

## 🎯 MVC Pattern Implementation

### **Model Layer** (`/models/`)
- **Product.js**: Defines product schema with validation, indexing, and methods
- **Message.js**: Defines contact message schema with validation and status tracking
- Uses **Mongoose** for MongoDB integration
- Includes data validation, virtual fields, and static methods

### **View Layer** (`/views/`)
- **EJS Templates**: Server-side rendering with dynamic content
- **Layout System**: Main layout with partials for reusability
- **Responsive Design**: Bootstrap-based responsive layouts
- **Component-Based**: Reusable partials (navbar, footer)

### **Controller Layer** (`/controllers/`)
- **ProductController**: Handles product listing, details, search, and category filtering
- **ContactController**: Manages contact form submission and message handling
- **HomeController**: Controls home page logic and featured content
- **Separation of Concerns**: Each controller handles specific business logic

## 🎨 Asset Organization

### **Images** (`/assets/images/`)
- All product images, banners, and graphics
- Organized by type: product photos, category images, banners
- Optimized formats: JPG, WebP, AVIF for performance

### **CSS** (`/assets/css/`)
- **style.css**: Main stylesheet with custom styling
- Bootstrap integration for responsive design
- Custom components and animations

### **JavaScript** (`/assets/js/`)
- **main.js**: Client-side functionality
- Search functionality, form validation, UI interactions
- Modular and organized code structure

## 🗄️ Database Structure

### **MongoDB Collections**

#### Products Collection
```javascript
{
  name: String (required),
  price: Number (required),
  category: String (required, enum),
  image: String (required),
  description: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

#### Messages Collection
```javascript
{
  name: String (required),
  email: String (required, validated),
  phone: String (optional),
  topic: String (required),
  message: String (required),
  status: String (enum: new, read, replied, archived),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Key Features

### **MVC Benefits**
- ✅ **Separation of Concerns**: Clear division between data, presentation, and logic
- ✅ **Maintainability**: Easy to modify and extend
- ✅ **Testability**: Each layer can be tested independently
- ✅ **Scalability**: Easy to add new features and components

### **Asset Management**
- ✅ **Organized Structure**: Logical folder hierarchy
- ✅ **Performance**: Optimized asset loading
- ✅ **Maintainability**: Easy to locate and update assets
- ✅ **Scalability**: Easy to add new assets

### **Database Features**
- ✅ **MongoDB Integration**: Full compliance with SIT725 requirements
- ✅ **Data Validation**: Mongoose schemas with validation
- ✅ **Indexing**: Optimized queries with proper indexes
- ✅ **Relationships**: Proper data modeling

## 🔧 Development Guidelines

### **Adding New Features**
1. **Model**: Create/update schema in `/models/`
2. **Controller**: Add business logic in `/controllers/`
3. **View**: Create/update templates in `/views/`
4. **Assets**: Add images/CSS/JS to appropriate `/assets/` folders

### **File Naming Conventions**
- **Controllers**: `[feature]Controller.js` (camelCase)
- **Models**: `[ModelName].js` (PascalCase)
- **Views**: `[page-name].ejs` (kebab-case)
- **Assets**: `[descriptive-name].[extension]` (kebab-case)

### **Code Organization**
- **Controllers**: One controller per major feature
- **Models**: One model per database collection
- **Views**: One template per page/component
- **Assets**: Organized by type and purpose

## 📋 Compliance Status

✅ **SIT725 Mandated Stack Requirements**
- 🟢 **Node.js**: Express.js server
- 🟡 **Vanilla JavaScript**: No frontend frameworks
- 🔵 **HTML & CSS**: EJS templating + Bootstrap
- 🟣 **MongoDB**: Mongoose integration
- ✅ **Permitted Libraries**: EJS, Express, Bootstrap, Mongoose

This structure provides a solid foundation for a scalable, maintainable web application that follows industry best practices and academic requirements.
