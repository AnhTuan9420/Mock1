const express = require ("express");
const user = require ("../controllers/userController");
const router = express.Router();
const { verifyToken } = require ("../middleware/verifyToken");

router.get('/getRandomQuestions', verifyToken, user.getRandomQuestions);
router.get('/getScoreBoard/:id', verifyToken, user.getScoreBoard);
router.post('/submitQuestion', verifyToken, user.submitQuestion);
router.post('/refreshToken', user.refreshToken);

module.exports = router;