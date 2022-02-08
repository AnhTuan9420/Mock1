const express = require ("express");
const auth = require ("../controllers/authController");
const { verifyToken } = require ("../middleware/verifyToken");

const router = express.Router();

router.get('/user', verifyToken, auth.getUser);
router.get('/register', auth.Register);
router.post('/login', auth.Login);
// router.post('/token', auth.refreshToken);
router.delete('/logout', auth.Logout);

module.exports = router;