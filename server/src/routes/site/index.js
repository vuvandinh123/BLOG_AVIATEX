
const express = require('express');
const countVisits = require('../../middlewares/countVisits');
const router = express.Router();
router.use(countVisits)
router.use('/posts', require('./post'))
router.use('/topics', require('./topic'))
router.use('/departments', require('./department'))
router.use('/recruitments', require('./recuitment'))
router.use('/works', require('./work'))
router.use('/contacts', require('./contact'))
router.use("/settings", require('./setting'))
router.use("/subscribers", require('./subscriber'))
module.exports = router