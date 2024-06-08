const db = require('../util/database');

module.exports = class Feedback {
    constructor(rating, comment, date, enroll_id) {
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.enroll_id = enroll_id;
    }

    static async getAll() {
        try {
            const query = 'SELECT * from feedback';
            const [results, fields] = await db.execute(query);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async addFeedback(rating, comment, date, enroll_id) {
        try {
            const query = 'INSERT INTO feedback (rating, comment, date, enroll_id) VALUES (?, ?, ?, ?)';
            const [results, fields] = await db.execute(query, [rating, comment, date, enroll_id]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async getFeedbackByCourse(courseId) {
        try {
            const query = `
                SELECT f.* 
                FROM feedback f 
                JOIN trn_enroll e ON e.enroll_id = f.enroll_id 
                WHERE e.train_course_id = ?
            `;
            const [results, fields] = await db.execute(query, [courseId]);

            if (results.length === 0) {
                return null;
            }

            return results;
        } catch (error) {
            throw error;
        }
    }

}