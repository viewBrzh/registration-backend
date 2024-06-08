const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill');

// Get all skills
router.get('/', skillController.getAllSkills);

// Add a new skill
router.post('/', skillController.addSkill);

// Get a skill by ID
router.get('/:skill_id', skillController.getSkillById);

// Update a skill by ID
router.put('/:skill_id', skillController.update);

module.exports = router;
