const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add the text'],
    },
  },
  {
    timestamps: true,
  }
);
mongoose.set('strictQuery', true);

module.exports = mongoose.model('Goal', goalSchema);
