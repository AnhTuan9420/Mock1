const express = require ("express");
const admin = require ("../controllers/adminController");
const router = express.Router();

router.post('/newQuestion', admin.newQuestion);
router.post('/correctAnswer', admin.newCorrectAnswer);
router.post('/inCorrectAnswer', admin.newInCorrectAnswer);
router.post('/updateQuestion', admin.updateQuestion);
router.delete('/deleteQuestion', admin.deleteQuestion);
router.delete('/deleteCorrectAnswer', admin.deleteCorrectAnswer);
router.delete('/deleteInCorrectAnswer', admin.deleteInCorrectAnswer);
router.get('/getDetailQuestion', admin.getDetailQuestion);

module.exports = router;