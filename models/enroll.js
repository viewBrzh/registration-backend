const db = require('../util/database');

module.exports = class Enrollment {
  constructor(enrollId, courseId, userId, enrollDate) {
    this.enrollId = enrollId;
    this.courseId = courseId;
    this.userId = userId;
    this.enrollDate = enrollDate;
  }

  static async findByCourseIdAndUserId(courseId, userId) {
    try {
      const [results, fields] = await db.execute('SELECT * FROM trn_enroll WHERE train_course_id = ? AND user_id = ?', [courseId, userId]);
      if (results.length === 0) {
        return null;
      }
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async enroll(courseId, userId) {
    try {
      const [results, fields] = await db.execute('INSERT INTO trn_enroll (train_course_id, user_id, enroll_date) VALUES (?, ?, NOW())', [courseId, userId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const [results, fields] = await db.execute('SELECT * FROM trn_enroll');
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const [results, fields] = await db.execute('SELECT * FROM trn_enroll WHERE user_id = ?', [userId]);
      if (results.length === 0) {
        return null;
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findByCourseId(courseId) {
    try {
      const [results, fields] = await db.execute('SELECT * FROM trn_enroll WHERE train_course_id = ?', [courseId]);
      if (results.length === 0) {
        return null;
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async delete(enrollId) {
    try {
      const [results, fields] = await db.execute('DELETE FROM trn_enroll WHERE enroll_id = ?', [enrollId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async countByDepartment(departmentName) {
    try {
      const query = `
        SELECT COUNT(*) AS enrollCount
        FROM trn_enroll
        JOIN users ON trn_enroll.user_id = users.user_id
        WHERE users.department = ?`;
      const [results, fields] = await db.execute(query, [departmentName]);
      return results[0].enrollCount;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseByUserId(userId) {
    try {
      const query = `
        SELECT c.*, e.status
        FROM trn_enroll e
        JOIN trn_course_detail c ON e.train_course_id = c.train_course_id
        WHERE e.user_id = ?`;
      const [results, fields] = await db.execute(query, [userId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(enrollId, newStatus) {
    try {
      const [results, fields] = await db.execute('UPDATE trn_enroll SET status = ? WHERE enroll_id = ?', [newStatus, enrollId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getCount() {
    try {
      const query = `
        SELECT COUNT(DISTINCT user_id) AS enrollCount
        FROM trn_enroll
        WHERE status = 1`;
      const [results, fields] = await db.execute(query);
      return results[0].enrollCount;
    } catch (error) {
      throw error;
    }
  }

  static async getErollByYear(year) {
    try {
      const query = `
        SELECT * FROM trn_enroll WHERE YEAR(enroll_date) = ?`;
      const [results, fields] = await db.execute(query, [year]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getCountByYear(year) {
    try {
      const query = `
        SELECT COUNT(DISTINCT user_id) AS enrollCount FROM trn_enroll WHERE YEAR(enroll_date) = ? AND status = 1`;
      const [results, fields] = await db.execute(query, [year]);
      return results[0].enrollCount;
    } catch (error) {
      throw error;
    }
  }

  static async getDepartmentByYear(department, year) {
    try {
      const query = `
            SELECT COUNT(*) AS enrollCount
            FROM trn_enroll
            JOIN users ON trn_enroll.user_id = users.user_id
            WHERE users.department = ? AND YEAR(enroll_date) = ? AND status = 1`;
      const [results, fields] = await db.execute(query, [department, year]);
      return results[0].enrollCount;
    } catch (error) {
      console.error('Error in getDepartmentByYear:', error);
      throw error;
    }
  }

  static async getNotiByUserId(userId) {
    try {
      const query = `
            SELECT *
            FROM trn_enroll
            WHERE user_id = ? AND status = 1
            AND NOT EXISTS (
                SELECT 1
                FROM feedback
                WHERE feedback.enroll_id = trn_enroll.enroll_id
            )`;
      const [results, fields] = await db.execute(query, [userId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseTypeByDepartment(department, year) {
    try {
      const query = `
      SELECT e.*, c.course_id
      FROM trn_enroll e
      JOIN users u ON e.user_id = u.user_id
      JOIN trn_course_detail c ON e.train_course_id = c.train_course_id
      WHERE u.department = ? AND YEAR(e.enroll_date) = ?`;
      const [results, fields] = await db.execute(query, [department, year]);

      const resultWithType = results.map(result => {
        const type = result.course_id === 1 ? 'Basic Counseling' : 'Retreat';
        return { ...result, type };
      });

      return resultWithType;
    } catch (error) {
      throw error;
    }
  }

  static async getUserStatusByDepartments(department, year) {
    try {
      const query = `
        SELECT u.*, 
               CASE 
                 WHEN e.status = 1 THEN 'Pass'
                 WHEN e.status = 0 THEN 'Enrolled'
                 ELSE 'Not Enrolled Yet' 
               END AS status
        FROM users u
        LEFT JOIN trn_enroll e ON u.user_id = e.user_id
        AND YEAR(e.enroll_date) = ?
        LEFT JOIN trn_course_detail c ON e.train_course_id = c.train_course_id AND c.course_id = 1
        WHERE u.department = ? AND u.role != 'admin'`;
      const [results, fields] = await db.execute(query, [year, department]);
  
      return results;
    } catch (error) {
      throw error;
    }
  }

};
