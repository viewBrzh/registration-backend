const db = require('../util/database');

module.exports = class Course {
  constructor(course_detail_name, course_id, train_detail, train_place, start_date, finish_date) {
    this.course_detail_name = course_detail_name;
    this.course_id = course_id;
    this.train_detail = train_detail;
    this.train_place = train_place;
    this.start_date = start_date;
    this.finish_date = finish_date;
  }

  static async findAll() {
    try {
      const [results, fields] = await db.execute('SELECT * FROM trn_course_detail');
      return results;
    } catch (error) {
      throw error;
    }
  }

  static findById(courseId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM trn_course_detail WHERE train_course_id = ?', [courseId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (results.length === 0) {
          reject('Course not found');
          return;
        }
        resolve(results[0]);
      });
    });
  }

  static findOne(courseId) {
    return db.execute('SELECT * FROM trn_course_detail WHERE train_course_id = ?', [courseId]);
  }


  static create(course_detail_name, course_id, train_detail, train_place, start_date, finish_date) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO trn_course_detail (course_detail_name, course_id, train_detail, train_place, start_date, finish_date) VALUES (?, ?, ?, ?, ?, ?)',
        [course_detail_name, course_id, train_detail, train_place, start_date, finish_date],
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

  static update(courseId, course_id, course_detail_name, train_detail, train_place, start_date, finish_date) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE trn_course_detail SET course_id = ?, course_detail_name = ?, train_detail = ?, train_place = ?, start_date = ?, finish_date = ? WHERE train_course_id = ?',
        [course_id, course_detail_name, train_detail, train_place, start_date, finish_date, courseId],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.affectedRows === 0) {
            reject('Course not found');
            return;
          }
          resolve(results);
        }
      );
    });
  }

  static setPublish(courseId, isPublish) {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE trn_course_detail SET isPublish = ? WHERE train_course_id = ?',
            [isPublish ? 1 : 0, courseId],
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.affectedRows === 0) {
                    reject('Course not found');
                    return;
                }
                resolve(results);
            }
        );
    });
}


  static delete(courseId) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM trn_course_detail WHERE train_course_id = ?', [courseId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }
};