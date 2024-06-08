const db = require('../util/database');

module.exports = class Feedback {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    static async getAll() {
        try {
            const query = 'SELECT * from skill';
            const [results, fields] = await db.execute(query);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async add(name, description, image) {
        try {
            const query = 'INSERT INTO skill (name, description, image) VALUES (?, ?, ?)';
            const [results, fields] = await db.execute(query, [name, description, image]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, name, description, image) {
        try {
            const query = 'UPDATE skill SET name = ?, description = ?, image = ? WHERE id = ?';
            const [results, fields] = await db.execute(query, [name, description, image, id]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async get(name) {
        try {
            const query = `SELECT * FROM skill WHERE name = ?`;
            const [results, fields] = await db.execute(query, [name]);
            if (results.length === 0) {
                return null;
            }
            return results;
        } catch (error) {
            throw error;
        }
    }
}