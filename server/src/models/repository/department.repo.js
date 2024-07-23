"use strict"

const knex = require("../../database/database")

class DepartmentRepository {

    static async getAllDepartmentByAdmin() {
        const query = knex("department")
            .select("department.*")
        const data = await query
        return { data: data }
    }
    static async createDepartment(data) {
        return await knex("department").insert(data)
    }

    static async updateDepartment(id, data) {
        return await knex("department").where({ id }).update(data)
    }

    static async deleteDepartment(id) {
        return await knex("department").where({ id }).del()
    }
    static async changeStatusDepartment(id, status) {
        return await knex("department").where({ id }).update({ status })
    }
    static async getDepartmentById(id) {
        return await knex("department").where({ id }).first()
    }

}
module.exports = DepartmentRepository