const Interest = require('../models/interest');

exports.getByUser = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const userInterest = await Interest.getByUser(userId);
        res.status(200).json(userInterest);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch userInterest',
            error: error.message
        });
    }
}

exports.addUserInterest = async (req, res) => {
    const userId = req.params.user_id;
    const skills = req.body.skills;
    try {
        const result = await Interest.addUserInterest(userId, skills);
        res.status(200).json({
            message: 'User interest added successfully',
            interest_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add user interest',
            error: error.message
        });
    }
}

exports.updateUserInterest = async (req, res) => {
    const userId = req.params.user_id;
    const skills = req.body.skills;

    try {
        const existingInterests = await Interest.getByUser(userId);

        if (existingInterests.length > 0) {
            // Update existing interest
            await Interest.updateUserInterest(userId, skills);
            res.status(200).json({
                message: 'User interest updated successfully'
            });
        } else {
            // Add new interest
            const result = await Interest.addUserInterest(userId, skills);
            res.status(200).json({
                message: 'User interest added successfully',
                interest_id: result.insertId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update user interest',
            error: error.message
        });
    }
};

