"use strict"

const knex = require("../../database/database")

class UserRepository {

    static async findById(id) {
        return await knex("users").where({ id: id }).first()
    }
    static async findUserByEmail(email) {
        return await knex("users").where({ email: email }).first()
    }
    static async findUserByUsername(username) {
        return await knex("users").where({ username: username }).first()
    }
    static async createUser(data) {
        return await knex("users").insert(data)
    }
    static async updateUser(id, data) {
        return await knex("users").where({ id: id }).update(data)
    }
}
module.exports = UserRepository