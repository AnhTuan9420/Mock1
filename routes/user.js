const express = require ("express");
const user = require ("../controllers/userController");
const router = express.Router();
const auth = require ("../middleware/auth");

router.get('/getRandomQuestions', auth('user'), user.getRandomQuestions);
router.get('/getScoreBoard/:id', auth('user'), user.getScoreBoard);
router.post('/submitQuestion/:id', auth('user'), user.submitQuestion);
router.post('/refreshToken', user.refreshToken);
router.put('/updateProfile/:id', auth('user'), user.updateProfile);

module.exports = router;