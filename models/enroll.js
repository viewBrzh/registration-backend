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
        SELECT COUNT(DISTINCT trn_enroll.user_id) AS enrollCount
        FROM trn_enroll
        JOIN users ON trn_enroll.user_id = users.user_id
        WHERE YEAR(trn_enroll.enroll_date) = ? AND trn_enroll.status = 1 AND users.role != 'admin'`;
      const [results, fields] = await db.execute(query, [year]);
      return results[0].enrollCount;
    } catch (error) {
      throw error;
    }
  }


  static async getDepartmentByYear(department, year) {
    try {
      if (department === undefined || year === undefined) {
        throw new Error('Department and year must be provided');
      }
  
      const query = `
        SELECT 
          COUNT(DISTINCT trn_enroll.user_id) AS enrollCount,
          (SELECT COUNT(DISTINCT users.user_id) 
           FROM users 
           WHERE users.department = ? 
             AND users.role != 'admin') AS userCount
        FROM 
          trn_enroll
        JOIN 
          users ON trn_enroll.user_id = users.user_id
        WHERE 
          users.department = ? 
          AND YEAR(enroll_date) = ? 
          AND trn_enroll.status = 1 
          AND users.role != 'admin';
        `;
      const [results, fields] = await db.execute(query, [department, department, year]);
      return results[0];
    } catch (error) {
      console.error('Error in getDepartmentByYear:', error);
      throw error;
    }
  }
  

  static async getFacultyByYear(faculty, year) {
    try {
      if (faculty === undefined || year === undefined) {
        throw new Error('Department and year must be provided');
      }

      const query = `
        SELECT COUNT(DISTINCT trn_enroll.user_id) AS enrollCount
        FROM trn_enroll
        JOIN users ON trn_enroll.user_id = users.user_id
        WHERE users.faculty = ? 
          AND YEAR(enroll_date) = ? 
          AND trn_enroll.status = 1 
          AND users.role != 'admin'`;
      const [results, fields] = await db.execute(query, [faculty, year]);
      return results[0].enrollCount;
    } catch (error) {
      console.error('Error in getFacultyByYear:', error);
      throw error;
    }
  }

  static async getNotiByUserId(userId) {
    try {
      const query = `
            SELECT e.*, c.course_detail_name, c.finish_date
            FROM trn_enroll e
            JOIN trn_course_detail c ON e.train_course_id = c.train_course_id
            WHERE user_id = ? AND status = 1
            AND NOT EXISTS (
                SELECT 1
                FROM feedback
                WHERE feedback.enroll_id = e.enroll_id
            )`;
      const [results, fields] = await db.execute(query, [userId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseTypeByFaculty(faculty, year) {
    try {
      const query = `
      SELECT e.*, c.course_id
      FROM trn_enroll e
      JOIN users u ON e.user_id = u.user_id
      JOIN trn_course_detail c ON e.train_course_id = c.train_course_id
      WHERE u.faculty = ? AND YEAR(e.enroll_date) = ?`;
      const [results, fields] = await db.execute(query, [faculty, year]);

      const resultWithType = results.map(result => {
        const type = result.course_id === 1 ? 'Basic Counseling' : 'Retreat';
        return { ...result, type };
      });

      return resultWithType;
    } catch (error) {
      throw error;
    }
  }

  static async getUserStatusByFacultys(faculty, year) {
    try {
      const query = `
        SELECT u.user_id, username, email, phone, role, department, faculty,
               CASE 
                 WHEN MAX(e.status) = 1 THEN 'Pass'
                 WHEN MAX(e.status) = 0 THEN 'Enrolled'
                 ELSE 'Not Enrolled Yet' 
               END AS status
        FROM users u
        LEFT JOIN trn_enroll e ON u.user_id = e.user_id
        AND YEAR(e.enroll_date) = ?
        LEFT JOIN trn_course_detail c ON e.train_course_id = c.train_course_id AND c.course_id = 1
        WHERE u.faculty = ? AND u.role != 'admin'
        GROUP BY u.user_id, username, email, phone, role, department, faculty`;
      const [results, fields] = await db.execute(query, [year, faculty]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getCountByCourse(courseId) {
    try {
      const query = `
      SELECT COUNT(*) AS count
            FROM trn_enroll
            WHERE train_course_id = ?
        `;
      const [results, fields] = await db.execute(query, [courseId]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseLimit(courseId) {
    try {
      const query = `
        SELECT \`limit\`
        FROM trn_course_detail
        WHERE train_course_id = ?
      `;
      const [results, fields] = await db.execute(query, [courseId]);
      if (results.length === 0) {
        return null;
      }
      return results[0].limit;
    } catch (error) {
      throw error;
    }
  }

  static async getDateNotiByUserId(userId) {
    try {
      const query = `
        SELECT e.*, c.start_date, c.course_detail_name, c.train_place
        FROM trn_enroll e
        JOIN trn_course_detail c ON e.train_course_id = c.train_course_id
        WHERE e.user_id = ? AND c.start_date > CURDATE() AND c.start_date <= CURDATE() + INTERVAL 7 DAY`;
      const [results, fields] = await db.execute(query, [userId]);
      return results;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }




};
