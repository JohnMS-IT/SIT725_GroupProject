const { db } = require('../config/database');

class Product {
  constructor(id, name, price, category, image, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.description = description;
  }

  // Get all products
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Products ORDER BY name';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const products = rows.map(row => new Product(
            row.id, row.name, row.price, row.category, row.image, row.description
          ));
          resolve(products);
        }
      });
    });
  }

  // Get product by ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Products WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const product = new Product(
            row.id, row.name, row.price, row.category, row.image, row.description
          );
          resolve(product);
        } else {
          resolve(null);
        }
      });
    });
  }

  // Get products by category
  static getByCategory(category) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Products WHERE category = ? ORDER BY name';
      db.all(sql, [category], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const products = rows.map(row => new Product(
            row.id, row.name, row.price, row.category, row.image, row.description
          ));
          resolve(products);
        }
      });
    });
  }

  // Search products by name
  static search(query) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Products WHERE name LIKE ? ORDER BY name';
      db.all(sql, [`%${query}%`], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const products = rows.map(row => new Product(
            row.id, row.name, row.price, row.category, row.image, row.description
          ));
          resolve(products);
        }
      });
    });
  }

  // Get unique categories
  static getCategories() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT category FROM Products ORDER BY category';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const categories = rows.map(row => row.category);
          resolve(categories);
        }
      });
    });
  }

  // Create new product
  static create(name, price, category, image, description) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Products (name, price, category, image, description) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db.run(sql, [name, price, category, image, description], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  // Update product
  static update(id, name, price, category, image, description) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Products 
        SET name = ?, price = ?, category = ?, image = ?, description = ? 
        WHERE id = ?
      `;
      db.run(sql, [name, price, category, image, description, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Delete product
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM Products WHERE id = ?';
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }
}

module.exports = Product;

