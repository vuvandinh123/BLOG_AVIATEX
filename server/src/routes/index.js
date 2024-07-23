
const express = require('express');
const asyncHandler = require('../middlewares/asyncHandle');
const UserController = require('../controllers/user.controller');
const router = express.Router();

// router
router.use('/', require('./site'));
router.use('/admin',require('./admin'))

module.exports = router