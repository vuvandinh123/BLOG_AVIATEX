'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const WorkController = require('../../controllers/works.controller');
const ContactController = require('../../controllers/contact.controller');

const router = express.Router();

router.post('/', asyncHandler(ContactController.createContact))

module.exports = router