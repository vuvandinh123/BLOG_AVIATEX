"use strict"

const knex = require("../../database/database")

class KeyTokenRepository {
    static async createKeyToken(data) {
        return await knex("key_tokens").insert(data)
    }
    static async findKeyTokenByUserId(id) {
        return await knex("key_tokens").where({ user_id: id }).first()
    }
    static async updateKeyToken(user_id, data) {
        return await knex("key_tokens").where({ user_id }).update(data)
    }
    static async deleteKeyToken(user_id) {
        return await knex("key_tokens").where({ user_id }).del()
    }
}

module.exports = KeyTokenRepository