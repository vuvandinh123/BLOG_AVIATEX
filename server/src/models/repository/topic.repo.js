"use strict"

const knex = require("../../database/database")

class TopicRepository {

    static async getAllTopicByAdmin() {
        const res2 = await knex("topic")
            .select("topic.*")
        return res2
    }
    static async findTopicById(id) {
        return await knex("topic").where({ id }).first()
    }
    static async countPostByTopicId(id) {
        return await knex("posts").where({ topic_id: id }).count("id as total")
    }
    static async createTopic(data) {
        return await knex("topic").insert(data)
    }
    static async updateTopic(id, data) {
        return await knex("topic").where({ id }).update(data)
    }
    static async deleteTopic(id) {
        return await knex("topic").where({ id }).del()
    }

}
module.exports = TopicRepository