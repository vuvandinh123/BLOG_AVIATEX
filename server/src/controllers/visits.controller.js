// controller
"use strict";
const { OK } = require("../core/success.response");
const knex = require("../database/database");
const TopicService = require("../service/topic.service");

class VisitsController {
    static async getVisits(req, res) {
        const today = knex.raw('CURDATE()');
        const yesterday = knex.raw('CURDATE() - INTERVAL 1 DAY');
        const startOfWeek = knex.raw('DATE_SUB(CURDATE(), INTERVAL (DAYOFWEEK(CURDATE()) - 1) DAY)');
        const startOfYear = knex.raw('DATE_FORMAT(CURDATE(), "%Y-01-01")');
        const thirtyMinutesAgo = knex.raw('DATE_SUB(NOW(), INTERVAL 30 MINUTE)');
        const counts = await Promise.all([
            knex('visits').count('* as count').where('created_at', '>=', today).first(),
            knex('visits').count('* as count').where('created_at', '>=', yesterday).andWhere('created_at', '<', today).first(),
            knex('visits').count('* as count').where('created_at', '>=', startOfWeek).first(),
            knex('visits').count('* as count').where('created_at', '>=', startOfYear).first(),
            knex('visits').count('* as count').first(),
        ]);
        new OK({
            message: "Get all successfully",
            data: {
                today: counts[0].count,
                yesterday: counts[1].count,
                thisWeek: counts[2].count,
                thisYear: counts[3].count,
                allTime: counts[4].count,
            },
        }).send(res)
    }
    static async getDataCountDashboard(req, res) {
        const data = await Promise.all([
            knex("posts").count("* as count").where("status", "publish").first(),
            knex("recruitment").count("* as count").where("status", "publish").first(),
            knex("activities").count("* as count").first(),
            knex("contact").count("* as count").where("status", "pending").first(),
            knex("contact").count("* as count").where("status", "active").first(),

        ])
        new OK({
            message: "Get all successfully",
            data: {
                col1: {
                    posts: data[0].count,
                    recruitment: data[1].count,
                    activities: data[2].count,
                    total: data[0].count + data[1].count + data[2].count
                },
                col2: {
                    contact_pending: data[3].count,
                    contact_active: data[4].count,
                    total: data[3].count + data[4].count
                }
            },
        }).send(res)
    }
}
module.exports = VisitsController