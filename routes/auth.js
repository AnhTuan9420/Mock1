const express = require ("express");
const auth = require ("../controllers/authController");

const router = express.Router();

router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.get('/logout', auth.Logout);

module.exports = router;