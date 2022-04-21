const express = require('express');

const apiControllers = require('../controllers/apiControllers');

const router = express.Router();

router.route('/questions').get(apiControllers.getAllQuestions);
router.route('/question/create').post(apiControllers.createQuestion);
router.route('/question/:id/delete').delete(apiControllers.deleteQuestion);
router.route('/question/:id/options/create').post(apiControllers.createOptions);
router.route('/question/:id').get(apiControllers.getQuestion);
router.route('/option/:id/delete').delete(apiControllers.deleteOption);
router.route('/option/:id/add_vote').post(apiControllers.addVote);

//
// ──────────────────────────────────────────────────────────────────── I ──────────
//   :::::: B A C K E N D   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//

// ///AUTH ROUTES

module.exports = router;
