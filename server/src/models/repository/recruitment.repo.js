"use strict"

const knex = require("../../database/database")

class RecruitmentRepository {

    static async getAllRecruitmentByAdmin({ offset = 0, limit = 10, department_id = 'all', search, status = 'all' }) {
        const query = knex("recruitment")
            .select("recruitment.*", "department.name as department_name")
            .join("department", "department.id", "=", "recruitment.department_id")
            .offset(offset).limit(limit).orderBy("recruitment.created_at", "desc")
        const queryTotal = knex("recruitment").count("recruitment.id as total")
        if (department_id !== 'all') {
            query.where({ department_id })
            queryTotal.where({ department_id })
        }
        if (search) {
            query.where("recruitment.title", "like", `%${search}%`)
            queryTotal.where("recruitment.title", "like", `%${search}%`)
        }
        if (status !== 'all') {
            query.where({ status })
            queryTotal.where({ status })
        }
        const data = await query
        const count = await queryTotal
        return { data: data, total: count[0].total }
    }
    static async getAllRecruitment({ offset = 0, limit = 10, department_id = 'all', search, status = 'publish' }) {
        const query = knex("recruitment")
            .select("recruitment.*", "department.name as department_name")
            .join("department", "department.id", "=", "recruitment.department_id")
            .offset(offset).limit(limit).orderBy("recruitment.created_at", "desc")
        const queryTotal = knex("recruitment").count("recruitment.id as total")
        if (department_id !== 'all') {
            query.where({ department_id })
            queryTotal.where({ department_id })
        }
        if (search) {
            query.where("recruitment.title", "like", `%${search}%`)
            queryTotal.where("recruitment.title", "like", `%${search}%`)
        }
        const data = await query
        const count = await queryTotal
        
        return { data: data, total: count[0].total }
    }
    static async createRecruitment(data) {
        return await knex("recruitment").insert(data)
    }

    static async updateRecruitment(id, data) {
        return await knex("recruitment").where({ id }).update(data)
    }

    static async deleteRecruitment(id) {
        return await knex("recruitment").where({ id }).del()
    }
    static async changeStatusRecruitment(id, status) {
        return await knex("recruitment").where({ id }).update({ status })
    }
    static async getRecruitmentById(id) {
        return await knex("recruitment").where({ id }).first()
    }

}
module.exports = RecruitmentRepository