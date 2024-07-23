"use strict"

const knex = require("../../database/database")

class SubscriberRepository {

    static async create({ email }) {
        return knex('subscribers').insert({ email }).returning('*')
    }
    static async isEmailExist(email) {
        return knex('subscribers').where({ email }).first()
    }
}

module.exports = SubscriberRepository