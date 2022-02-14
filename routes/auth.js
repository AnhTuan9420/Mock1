const express = require ("express");
const auth = require ("../controllers/authController");
const { refreshToken } = require ("../middleware/verifyToken");

const router = express.Router();

router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/token', refreshToken);
router.get('/logout', auth.Logout);

module.exports = router;