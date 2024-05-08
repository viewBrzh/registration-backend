const db = require('../util/database');

module.exports = class Feedback {
    constructor(number) {
        this.number = number;
    }

    static async get() {
        try {
            const [rows] = await db.execute('SELECT number FROM criteria');
            return rows[0].number;
        } catch (error) {
            console.error('Error getting criteria:', error);
            throw error;
        }
    }

    static async set(number) {
        try {
            await db.execute('UPDATE criteria SET number = ?', [number]);
        } catch (error) {
            console.error('Error updating criteria number:', error);
            throw error;
        }
    }
}