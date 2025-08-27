const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, '..', 'shoehouse.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create Products table
      db.run(`
        CREATE TABLE IF NOT EXISTS Products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          category TEXT NOT NULL,
          image TEXT,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating Products table:', err);
          reject(err);
        }
      });

      // Create Messages table
      db.run(`
        CREATE TABLE IF NOT EXISTS Messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          topic TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating Messages table:', err);
          reject(err);
        }
      });

      // Insert sample data if Products table is empty
      db.all(`SELECT COUNT(*) AS count FROM Products`, (err, rows) => {
        if (err) {
          console.error('Error checking Products table:', err);
          reject(err);
          return;
        }

        if (rows[0].count === 0) {
          const stmt = db.prepare(`
            INSERT INTO Products (name, price, category, image, description) 
            VALUES (?, ?, ?, ?, ?)
          `);
          
          stmt.run('Nike Air Max', 120, 'Running', 'NikeAir.jpg', 'Comfortable running shoes with excellent cushioning');
          stmt.run('Ultraboost', 220, 'Running', 'ultraboost.jpg', 'Premium running shoes with boost technology');
          stmt.run('Jordans', 100, 'Basketball', 'Jordans.webp', 'Classic basketball shoes with iconic style');
          stmt.run('Vans', 90, 'Casual', 'vans.webp', 'Casual lifestyle shoes perfect for everyday wear');
          stmt.run('Nike Pegasus', 110, 'Running', 'Pegasus.jpg', 'Versatile running shoes for all distances');
          stmt.run('Vomero', 140, 'Running', 'Vomero.webp', 'Max cushioning for long-distance running');
          
          stmt.finalize((err) => {
            if (err) {
              console.error('Error inserting sample data:', err);
              reject(err);
            } else {
              console.log('Sample data inserted successfully');
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
  });
};

module.exports = { db, initDatabase };

