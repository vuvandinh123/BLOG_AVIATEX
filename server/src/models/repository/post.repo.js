"use strict"

const knex = require("../../database/database")

class PostRepository {

    static async getAllPostByAdmin({ offset = 0, limit = 10, topic_id = 'all', search, status = 'all' }) {
        const query = knex("posts")
            .select("posts.*", "topic.name as topic_name")
            .join("topic", "topic.id", "=", "posts.topic_id")
            .offset(offset).limit(limit).orderBy("posts.created_at", "desc")
        const queryTotal = knex("posts").count("posts.id as total")

        if (topic_id !== 'all') {
            query.where({ topic_id })
            queryTotal.where({ topic_id })
        }
        if (search) {
            query.where("posts.title", "like", `%${search}%`)
            queryTotal.where("posts.title", "like", `%${search}%`)
        }
        if (status !== 'all') {
            query.where({ status })
            queryTotal.where({ status })
        }
        const data = await query
        const count = await queryTotal
        return { data: data, total: count[0].total }
    }
    static async getSearch({ offset = 0, limit = 10, search }) {
        const query = knex("posts")
            .select("posts.*", "topic.name as topic_name")
            .join("topic", "topic.id", "=", "posts.topic_id")
            .offset(offset).limit(limit).orderBy("posts.created_at", "desc")
            .where("posts.status", "publish")
        const queryTotal = knex("posts").count("posts.id as total").where("posts.status", "publish")
        if (search) {
            query.where("posts.title", "like", `%${search}%`)
            queryTotal.where("posts.title", "like", `%${search}%`)
        }
        const data = await query
        const count = await queryTotal
        console.log(data);
        return { data: data, total: count[0].total }
    }
    static async createPost(data) {
        return await knex("posts").insert(data)
    }

    static async updatePost(id, data) {
        return await knex("posts").where({ id }).update(data)
    }

    static async deletePost(id) {
        return await knex("posts").where({ id }).del()
    }
    static async changeStatusPost(id, status) {
        return await knex("posts").where({ id }).update({ status })
    }
    static async getPostById(id) {
        return await knex("posts").where({ id }).first()
    }

}
module.exports = PostRepository