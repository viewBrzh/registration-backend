const db = require('../util/database');

module.exports = class Interest {
    constructor(id, user_id, skills) {
        this.id = id;
        this.user_id = user_id;
        this.skills = skills;
    }

    static async getByUser(userId) {
        try {
            const query = 'SELECT * FROM user_interest WHERE user_id = ?';
            const [results, fields] = await db.execute(query, [userId]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async addUserInterest(user_id, skills) {
        try {
            const query = 'INSERT INTO user_interest (user_id, skills) VALUES (?, ?)';
            const [results, fields] = await db.execute(query, [user_id, skills]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async updateUserInterest(user_id, skills) {
        try {
            const query = 'UPDATE user_interest SET skills = ? WHERE user_id = ?';
            const [results, fields] = await db.execute(query, [skills, user_id]);
            return results;
        } catch (error) {
            throw error;
        }
    }

};
