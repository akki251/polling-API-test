const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  votes: Number,
  link_to_vote: String,
});

optionSchema.pre('save', function (next) {
  this.link_to_vote = `/api/option/${this._id}/add_vote`;
  next();
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
