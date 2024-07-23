// controller
"use strict";
const { OK } = require("../core/success.response");
const DepartmentService = require("../service/department.service");

class DepartmentController {
    static async getAllDepartmentByAdmin(req, res) {
        const { data } = await DepartmentService.getAllDepartmentByAdmin()
        new OK({
            message: "Get all Department successfully",
            data,
        }).send(res)
    }
    static async createDepartment(req, res) {
        const data = await DepartmentService.createDepartment(req.body)
        new OK({
            message: "Create Department successfully",
            data
        }).send(res)
    }
    static async updateDepartment(req, res) {
        const data = await DepartmentService.updateDepartment(req.params.id, req.body)
        new OK({
            message: "Update Department successfully",
            data
        }).send(res)
    }
    static async deleteDepartment(req, res) {
        const data = await DepartmentService.deleteDepartment(req.params.id)
        new OK({
            message: "Delete Department successfully",
            data
        }).send(res)
    }
}
module.exports = DepartmentController