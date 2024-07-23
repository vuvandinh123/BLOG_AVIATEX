"use strict";

const { BadRequestError } = require("../core/error.response");
const PostRepository = require("../models/repository/post.repo");
const RecruitmentRepository = require("../models/repository/recruitment.repo");

class RecruitmentService {
    static getAllRecruitmentByAdmin({ offset, limit, department_id, search, status }) {
        return RecruitmentRepository.getAllRecruitmentByAdmin({ offset, limit, department_id, search, status })
    }
    static getAllRecruitment({ offset, limit, department_id, search, status }) {
        return RecruitmentRepository.getAllRecruitment({ offset, limit, department_id, search, status })
    }
    static getRecruitmentById(id) {
        return RecruitmentRepository.getRecruitmentById(id)
    }
    static createRecruitment(data, user) {
        return RecruitmentRepository.createRecruitment({ ...data, user_id: user.id })
    }

    static updateRecruitment(id, data) {
        return RecruitmentRepository.updateRecruitment(id, data)
    }
    static deleteRecruitment(id) {
        return RecruitmentRepository.deleteRecruitment(id)
    }

    static changeStatusRecruitment(id, status) {
        if (status !== "publish" && status !== "draft") {
            throw new BadRequestError("Status not exist")
        }
        return RecruitmentRepository.changeStatusRecruitment(id, status)
    }
    static getRecruitmentById(id) {
        return RecruitmentRepository.getRecruitmentById(id)
    }
}
module.exports = RecruitmentService