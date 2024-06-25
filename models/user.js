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
    return db.execute('SELECT user_id, username, email, role, department, faculty, phone, image FROM users WHERE user_id = ?', [userId]);
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

  static update(userId, username, email, phone, image) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET username = ?, email = ?, phone = ?, image = ? WHERE user_id = ?',
        [username, email, phone, image, userId],
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
      const [results, fields] = await db.execute('SELECT user_id, username, email, phone, department, faculty, role, image FROM users WHERE username = ? AND password = ?', [username, password]);
      if (results.length === 0) {
        throw new Error('Invalid credentials');
      }
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async getDepartmentByUserId(userId) {
    try {
      const [results, fields] = await db.execute('SELECT department FROM users WHERE user_id = ?', [userId]);
      if (results.length === 0) {
        throw new Error('Invalid credentials');
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDepartments(faculty) {
    return db.execute('SELECT DISTINCT department FROM users Where faculty = ?', [faculty]);
  }

  static async getAllFaculties() {
    return db.execute('SELECT faculty, COUNT(*) as userCount FROM users WHERE role != "admin" GROUP BY faculty');
  }
  
  

  static async getCount() {
    try {
      const [results, fields] = await db.execute('SELECT COUNT(*) AS userCount FROM users WHERE role = "teacher" OR role = "executive"');
      return results[0].userCount;
    } catch (error) {
      console.error('Error getting user count:', error);
      throw error;
    }
  };

  static async getUserStatus(userId, year) {
    try {
      const [results, fields] = await db.execute(
        'SELECT trn_enroll.status FROM users LEFT JOIN trn_enroll ON users.user_id = trn_enroll.user_id WHERE users.user_id = ? AND YEAR(trn_enroll.enroll_date) = ?',
        [userId, year]
      );

      if (results.length === 0) {
        return 'not enroll yet';
      }

      const statuses = results.map(result => result.status);

      if (statuses.includes(1)) {
        return 'pass';
      } else if (statuses.includes(0)) {
        return 'enrolled';
      } else {
        return 'not enroll yet';
      }
    } catch (error) {
      console.error('Error getting user status:', error);
      throw error;
    }
  }

};