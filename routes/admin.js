const express = require ("express");
const api = require ("../controllers/adminController");
const router = express.Router();

router.get('/newQuestion', api.newQuestion);

module.exports = router;