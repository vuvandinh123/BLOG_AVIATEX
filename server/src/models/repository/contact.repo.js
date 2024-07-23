"use strict"

const knex = require("../../database/database")

class ContactRepository {

    static async getAllContactByAdmin({ ofset = 0, limit = 10, search, status = 'all' }) {
        const query = knex("contact")
            .select("contact.*")
            .offset(ofset).limit(limit)
            .orderBy("contact.created_at", "desc")
        const queryTotal = knex("contact").count("contact.id as total")

        if (search) {
            query.where("contact.name", "like", `%${search}%`)
            queryTotal.where("contact.name", "like", `%${search}%`)
        }
        if (status !== 'all') {
            query.where({ status })
            queryTotal.where({ status })
        }
        const data = await query
        const count = await queryTotal
        return { data: data, total: count[0].total }
    }
    static async createContact(data) {
        return await knex("contact").insert(data)
    }

    static async updateContact(id, data) {
        return await knex("contact").where({ id }).update(data)
    }

    static async deleteContact(id) {
        return await knex("contact").where({ id }).del()
    }
    static async changeStatusContact(id, status) {
        return await knex("contact").where({ id }).update({ status })
    }
    static async getContactById(id) {
        return await knex("contact").where({ id }).first()
    }

}
module.exports = ContactRepository