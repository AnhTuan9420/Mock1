const express = require ("express");
const user = require ("../controllers/userController");
const router = express.Router();
const { verifyToken } = require ("../middleware/verifyToken");

router.get('/getRandomQuestions', verifyToken, user.getRandomQuestions);
router.get('/getScoreBoard/:id', verifyToken, user.getScoreBoard);
router.post('/submitQuestion/:id', verifyToken, user.submitQuestion);
router.post('/refreshToken', user.refreshToken);
router.put('/updateProfile/:id', verifyToken, user.updateProfile);

module.exports = router;