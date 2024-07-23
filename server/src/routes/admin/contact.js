'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const ContactController = require('../../controllers/contact.controller');

const router = express.Router();
router.get('/', asyncHandler(ContactController.getAllContactByAdmin))
router.get('/:id', asyncHandler(ContactController.getContactById))
router.post('/', asyncHandler(ContactController.createContact))
router.put('/:id', asyncHandler(ContactController.updateContact))
router.delete('/:id', asyncHandler(ContactController.deleteContact))
router.patch('/:id/status', asyncHandler(ContactController.changeStatusContact))

module.exports = router