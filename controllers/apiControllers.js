const Question = require('../models/Question');
const catchAsync = require('../utils/catchAsync');
const Option = require('../models/Option');
const appError = require('../utils/appError');

exports.createQuestion = catchAsync(async (req, res) => {
  const { title, opt1, opt2, opt3, opt4 } = req.body;

  const question = {
    title: title,
    options: [],
  };

  for (let i = 0; i < 4; i++) {
    const opt = await Option.create({
      text: `opt${i + 1}`,
      votes: 1,
    });
    question.options.push(opt);
  }

  const createdQuestion = await Question.create(question);

  res.status(200).json({
    message: 'status',
    data: question,
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find().populate('options');

  res.status(200).json({
    message: 'success',
    results: questions.length,
    data: questions,
  });
});

exports.createOptions = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  const { optionTitle } = req.body;

  const opt = await Option.create({
    text: optionTitle,
    votes: 0,
  });
  question.options.push(opt);

  await question.save();

  res.status(200).json({
    message: 'success',
    data: question,
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  const options = question.options;

  const votes = options.filter((opt) => {
    return opt.votes >= 1;
  });
  if (votes.length >= 1) {
    return next(new appError('Positive votes detected', '401'));
  }

  return res.status(200).json({
    status: 'success',
    message: 'question deleted',
  });
});

// deleteOption

exports.deleteOption = catchAsync(async (req, res, next) => {
  let id = req.params.id;

  let option = await Option.findById(id);

  if (option && option.votes >= 1) {
    return next(new appError('Cannot delete option', '401'));
  } else {
    option = await Option.findByIdAndDelete(req.params.id);
  }

  return res.status(200).json({
    status: 'success',
    message: 'option deleted',
    option,
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  let id = req.params.id;

  const question = await Question.findById(id);

  return res.status(200).json({
    status: 'success',
    question,
  });
});

exports.addVote = catchAsync(async (req, res, next) => {
  let id = req.params.id;

  const option = await Option.findById(id);

  option.votes++;

  await option.save();

  return res.status(200).json({
    status: 'success',
    option,
  });
});
