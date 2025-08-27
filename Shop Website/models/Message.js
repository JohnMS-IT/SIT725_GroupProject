const { db } = require('../config/database');

class Message {
  constructor(id, name, email, phone, topic, message, created_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.topic = topic;
    this.message = message;
    this.created_at = created_at;
  }

  // Get all messages
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Messages ORDER BY created_at DESC';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const messages = rows.map(row => new Message(
            row.id, row.name, row.email, row.phone, row.topic, row.message, row.created_at
          ));
          resolve(messages);
        }
      });
    });
  }

  // Get message by ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Messages WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const message = new Message(
            row.id, row.name, row.email, row.phone, row.topic, row.message, row.created_at
          );
          resolve(message);
        } else {
          resolve(null);
        }
      });
    });
  }

  // Create new message
  static create(name, email, phone, topic, message) {
    return new Promise((resolve, reject) => {
      // Validate required fields
      if (!name || !email || !topic || !message) {
        reject(new Error('Name, email, topic, and message are required'));
        return;
      }

      const sql = `
        INSERT INTO Messages (name, email, phone, topic, message) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db.run(sql, [name, email, phone, topic, message], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  // Delete message
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM Messages WHERE id = ?';
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Get messages by topic
  static getByTopic(topic) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Messages WHERE topic = ? ORDER BY created_at DESC';
      db.all(sql, [topic], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const messages = rows.map(row => new Message(
            row.id, row.name, row.email, row.phone, row.topic, row.message, row.created_at
          ));
          resolve(messages);
        }
      });
    });
  }

  // Get recent messages (last N messages)
  static getRecent(limit = 10) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Messages ORDER BY created_at DESC LIMIT ?';
      db.all(sql, [limit], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const messages = rows.map(row => new Message(
            row.id, row.name, row.email, row.phone, row.topic, row.message, row.created_at
          ));
          resolve(messages);
        }
      });
    });
  }
}

module.exports = Message;

