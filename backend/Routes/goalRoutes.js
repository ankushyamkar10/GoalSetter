const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoal,
} = require('../controllers/goalController');

router.route('/').get(protect, getGoals).post(protect, setGoal);

router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoal);

module.exports = router;
