"use strict";

const { BadRequestError } = require("../core/error.response");
const PostRepository = require("../models/repository/post.repo");
const WorkRepository = require("../models/repository/work.repo");

class WorkService {
    static getAllWorkByAdmin({ ofset, limit, search }) {
        return WorkRepository.getAllWorkByAdmin({ ofset, limit, search })
    }
    static getWorkById(id) {
        return WorkRepository.getWorkById(id)
    }
    static createWork(data) {
        return WorkRepository.createWork(data)
    }

    static updateWork(id, data) {
        return WorkRepository.updateWork(id, data)
    }
    static deleteWork(id) {
        return WorkRepository.deleteWork(id)
    }

    static changeStatusPost(id, status) {
        if (status !== "publish" && status !== "draft") {
            throw new BadRequestError("Status not exist")
        }
        return PostRepository.changeStatusPost(id, status)
    }
    static getPostById(id) {
        return PostRepository.getPostById(id)
    }
}
module.exports = WorkService