"use strict";

const { BadRequestError } = require("../core/error.response");
const knex = require("../database/database");
const DepartmentRepository = require("../models/repository/department.repo");

class DepartmentService {
    static getAllDepartmentByAdmin() {
        return DepartmentRepository.getAllDepartmentByAdmin()
    }
    static getDepartmentById(id) {
        return DepartmentRepository.getDepartmentById(id)
    }
    static createDepartment(data) {
        return DepartmentRepository.createDepartment(data)
    }

    static updateDepartment(id, data) {
        return DepartmentRepository.updateDepartment(id, data)
    }
    static async deleteDepartment(id) {
        const countPost = await knex("recruitment").where({ department_id: id }).count("id as total")
        if (countPost[0].total > 0) {
            throw new BadRequestError("Can not delete department has post")
        }
        return DepartmentRepository.deleteDepartment(id)
    }

    static changeStatusDepartment(id, status) {
        if (status !== "publish" && status !== "draft") {
            throw new BadRequestError("Status not exist")
        }
        return DepartmentRepository.changeStatusDepartment(id, status)
    }
    static getDepartmentById(id) {
        return DepartmentRepository.getDepartmentById(id)
    }
}
module.exports = DepartmentService