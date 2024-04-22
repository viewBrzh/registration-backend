const db = require('../util/database');

module.exports = class User {
  constructor(username, email, password, role, department) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.department = department;
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
    return db.execute('SELECT user_id, username, email, role, department FROM users WHERE user_id = ?', [userId]);
  }

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

  static update(userId, username, email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE user_id = ?',
        [username, email, password, role, userId],
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
      db.query('DELETE FROM users WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  static async login(username, password) {
    try {
      const [results, fields] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      if (results.length === 0) {
        throw new Error('Invalid credentials');
      }
      return results[0];
    } catch (error) {
      throw error;
    }
  }
};
