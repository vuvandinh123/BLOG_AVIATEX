"use strict"

const knex = require("../../database/database")

class SettingRepository {
    static async updateSetting(id, data) {
        return await knex("settings").where({ id }).update(data)
    }
    static async getSetting() {
        return await knex("settings").first()
    }
}
module.exports = SettingRepository