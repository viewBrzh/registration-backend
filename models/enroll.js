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
};
