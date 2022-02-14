const express = require ("express");
const admin = require ("../controllers/adminController");
const { verifyToken } = require ("../middleware/verifyToken");

const router = express.Router();

router.get('/getAllUser', verifyToken, admin.getAllUser);
router.post('/newQuestion', verifyToken, admin.newQuestion);
router.post('/correctAnswer', verifyToken, admin.newCorrectAnswer);
router.post('/inCorrectAnswer', verifyToken, admin.newInCorrectAnswer);
router.post('/updateQuestion', verifyToken, admin.updateQuestion);
router.delete('/deleteQuestion', verifyToken, admin.deleteQuestion);
router.delete('/deleteCorrectAnswer', verifyToken, admin.deleteCorrectAnswer);
router.delete('/deleteInCorrectAnswer', verifyToken, admin.deleteInCorrectAnswer);
router.get('/getDetailQuestion/:id', verifyToken, admin.getDetailQuestion);

module.exports = router;