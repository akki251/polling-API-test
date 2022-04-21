const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Question must have a title'],
  },
  options: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Option',
    },
  ],
});

questionSchema.pre(/^find/, function (next) {
  this.populate('options');
  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
