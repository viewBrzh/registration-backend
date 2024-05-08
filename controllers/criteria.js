const Criteria = require('../models/criteria');

exports.get = async (req, res) => {
    try {
        const response = await Criteria.get();
        res.status(200).json(response);
    } catch (error) {
        throw error;
    }
}

exports.set = async (req, res) => {
    const { number } = req.params; // Extract number from req.params
    try {
        Criteria.set(number); // Pass number to Criteria.set
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json(error);
    }
}
