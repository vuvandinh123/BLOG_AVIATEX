'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const DepartmentController = require('../../controllers/department.controller');

const router = express.Router();

router.get('/', asyncHandler(DepartmentController.getAllDepartmentByAdmin))
module.exports = router