'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const AccessController = require('../../controllers/access.controller');
const checkAuthencation = require('../../middlewares/checkAuthencation');

const router = express.Router();

router.post('/login', asyncHandler(AccessController.login))
router.use(checkAuthencation)
router.post('/signup', asyncHandler(AccessController.signUp))
router.post('/logout', asyncHandler(AccessController.logOut))
router.post('/refresh', asyncHandler(AccessController.refreshToken))
router.patch('/change-password', asyncHandler(AccessController.changePassword))

module.exports = router