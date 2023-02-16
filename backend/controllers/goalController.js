const asyncHandler = require('express-async-handler');

//@desc Get Goals
//@route GET /api/goals
//@cccess Private
const getGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text to textfield');
  }

  res.status(200).json({ message: 'Get Goals' });
});

//@desc Set Goals
//@route Post /api/goals
//@cccess Private
const setGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Create Goals' });
});

//@desc Update Goals
//@route PUT /api/goals/:id
//@cccess Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal${req.params.id}` });
});

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@cccess Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoal,
};
