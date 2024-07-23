// controller
"use strict";
const { OK } = require("../core/success.response");
const TopicService = require("../service/topic.service");

class TopicController {
    static async getAllTopicByAdmin(req, res) {
        const data = await TopicService.getAllTopicByAdmin()
        new OK({
            message: "Get all topic successfully",
            data,
        }).send(res)
    }
    static async createTopic(req, res) {
        const data = await TopicService.createTopic(req.body)
        new OK({
            message: "Create topic successfully",
            data
        }).send(res)
    }
    static async updateTopic(req, res) {
        const data = await TopicService.updateTopic(req.params.id, req.body)
        new OK({
            message: "Update topic successfully",
            data
        }).send(res)
    }
    static async deleteTopic(req, res) {
        const data = await TopicService.deleteTopic(req.params.id)
        new OK({
            message: "Delete topic successfully",
            data
        }).send(res)
    }
}
module.exports = TopicController