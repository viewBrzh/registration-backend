const db = require('../util/database');

module.exports = class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async findAll() {
    try {
      const [results, fields] = await db.execute('SELECT * FROM users');
      return results;
    } catch (error) {
      throw error;
    }
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (results.length === 0) {
          reject('User not found');
          return;
        }
        resolve(results[0]);
      });
    });
  }

  // findOne method
  static findOne(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }

  static create(username, email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  }

  static update(userId, username, email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
        [username, email, password, userId],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.affectedRows === 0) {
            reject('User not found');
            return;
          }
          resolve(results);
        }
      );
    });
  }

  static delete(userId) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }
};
