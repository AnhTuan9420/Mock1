const express = require ("express");
const auth = require ("../controllers/authController");
const { verifyToken, refreshToken } = require ("../middleware/verifyToken");

const router = express.Router();

router.get('/user', verifyToken, auth.getUser);
router.get('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/token', refreshToken);
router.delete('/logout', auth.Logout);

module.exports = router;