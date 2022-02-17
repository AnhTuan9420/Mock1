const express = require ("express");
const admin = require ("../controllers/adminController");
const auth = require ("../middleware/auth");

const router = express.Router();

router.get('/getAllUser', auth('admin'), admin.getAllUser);
router.post('/newQuestion', auth('admin'), admin.newQuestion);
router.post('/correctAnswer', auth('admin'), admin.newCorrectAnswer);
router.post('/inCorrectAnswer', auth('admin'), admin.newInCorrectAnswer);
router.post('/updateQuestion', auth('admin'), admin.updateQuestion);
router.delete('/deleteQuestion', auth('admin'), admin.deleteQuestion);
router.delete('/deleteCorrectAnswer', auth('admin'), admin.deleteCorrectAnswer);
router.delete('/deleteInCorrectAnswer', auth('admin'), admin.deleteInCorrectAnswer);
router.get('/getDetailQuestion/:id', auth('admin'), admin.getDetailQuestion);

module.exports = router;