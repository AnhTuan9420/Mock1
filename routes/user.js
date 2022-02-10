const express = require ("express");
const user = require ("../controllers/userController");
const router = express.Router();

router.get('/getRandomQuestions', user.getRandomQuestions);

module.exports = router;