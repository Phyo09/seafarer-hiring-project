const express = require('express');
const router = express.Router();
const { saveProfile } = require('../controllers/profileController');
const { getProfile } = require('../controllers/profileController');

router.post('/save', saveProfile);
router.get('/:firebase_uid', getProfile); //

module.exports = router;
