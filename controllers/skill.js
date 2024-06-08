const Skill = require('../models/skill');
const multer = require('multer');
const path = require('path');

// Set up multer for skill image uploads
const storageSkill = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/skills');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const uploadSkill = multer({ storage: storageSkill }).single('file');

exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.getAll();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch skills',
            error: error.message
        });
    }
}

exports.addSkill = async (req, res) => {
    uploadSkill(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to upload image',
                error: err.message
            });
        }
        
        const { name, description } = req.body;
        const image = req.file ? req.file.filename : null;

        try {
            const result = await Skill.add(name, description, image);
            res.status(200).json({
                message: 'Skill added successfully',
                skill_id: result.insertId
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to add skill',
                error: error.message
            });
        }
    });
}

exports.getSkillById = async (req, res) => {
    const skillId = req.params.skill_id;
    try {
        const result = await Skill.get(skillId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get skill',
            error: error.message
        });
    }
}

exports.update = async (req, res) => {
    uploadSkill(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to upload image',
                error: err.message
            });
        }
        
        const skillId = req.params.skill_id;
        const { name, description } = req.body;
        const image = req.file ? req.file.filename : null;

        try {
            const result = await Skill.update(skillId, name, description, image);
            res.status(200).json({
                message: 'Skill updated successfully',
                result
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to update skill',
                error: error.message
            });
        }
    });
}
