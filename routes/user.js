const express = require ("express");
const user = require ("../controllers/userController");
const router = express.Router();

router.get('/getRandomQuestions', user.getRandomQuestions);
router.get('/getScoreBoard/:id', user.getScoreBoard);
router.post('/submitQuestion', user.submitQuestion);

module.exports = router;