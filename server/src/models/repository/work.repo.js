"use strict"

const knex = require("../../database/database")

class WorkRepository {

    static async getAllWorkByAdmin({ ofset = 0, limit = 10, search }) {
        const query = knex("activities")
            .select("activities.*")
            .offset(ofset).limit(limit).orderBy("activities.created_at", "desc")
        const queryTotal = knex("activities").count("activities.id as total")
        if (search) {
            query.where("activities.name", "like", `%${search}%`)
            queryTotal.where("activities.name", "like", `%${search}%`)
        }
        const data = await query
        const count = await queryTotal
        return { data: data, total: count[0].total }
    }
    static async createWork(data) {
        return await knex("activities").insert(data)
    }

    static async updateWork(id, data) {
        return await knex("activities").where({ id }).update(data)
    }

    static async deleteWork(id) {
        return await knex("activities").where({ id }).del()
    }
    static async changeStatusPost(id, status) {
        return await knex("activities").where({ id }).update({ status })
    }
    static async getWorkById(id) {
        return await knex("activities").where({ id }).first()
    }

}
module.exports = WorkRepository