
const express = require('express');
const checkAuthencation = require('../../middlewares/checkAuthencation');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use(checkAuthencation)
router.use('/posts', require('./post'))
router.use('/topics', require('./topic'))
router.use('/upload', require('./upload'))
router.use('/works', require('./work'))
router.use('/recruitments', require('./recuitment'))
router.use('/departments', require('./department'))
router.use("/contacts", require('./contact'))
router.use('/visits', require('./visits'))
router.use('/account', require('./user'))
router.use('/settings', require('./setting'))
module.exports = router