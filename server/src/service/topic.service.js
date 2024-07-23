"use strict";
const { NotFoundError, BadRequestError } = require("../core/error.response");
const TopicRepository = require("../models/repository/topic.repo");
class TopicService {
    static getAllTopicByAdmin() {
        return TopicRepository.getAllTopicByAdmin()
    }
    static createTopic(data) {
        return TopicRepository.createTopic(data)
    }
    static updateTopic(id, data) {
        return TopicRepository.updateTopic(id, data)
    }
    static async deleteTopic(id) {
        const countPost = await TopicRepository.countPostByTopicId(id)
        if (countPost[0].total > 0) {
            throw new BadRequestError("Can not delete topic has post")
        }
        return await TopicRepository.deleteTopic(id)
    }
}
module.exports = TopicService