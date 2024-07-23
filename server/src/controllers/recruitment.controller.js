// controller
"use strict";

const { OK } = require("../core/success.response");
const RecruitmentService = require("../service/recruitment.service");
const { getParamsPagination } = require("../utils");

class RecruitmentController {
    static async getAllRecruitmentByAdmin(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { department_id, search, status } = req.query
        const { data, total } = await RecruitmentService.getAllRecruitmentByAdmin({ offset, limit, department_id, search, status })
        const totalPage = Math.ceil(total / limit)
        new OK({
            message: "Get all Recruitment successfully",
            data,
            options: {
                total,
                pagination: { page, limit, totalPage }
            }
        }).send(res)
    }
    static async getAllRecruitment(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { department_id, search, status } = req.query
        const { data, total } = await RecruitmentService.getAllRecruitment({ offset, limit, department_id, search, status })
        const totalPage = Math.ceil(total / limit)
        new OK({
            message: "Get all Recruitment successfully",
            data,
            options: {
                total,
                pagination: { page, limit, totalPage }
            }
        }).send(res)
    }
    static async getRecruitmentById(req, res) {
        const data = await RecruitmentService.getRecruitmentById(req.params.id)
        new OK({
            message: "Get Recruitment successfully",
            data
        }).send(res)
    }
    static async createRecruitment(req, res) {
        const data = await RecruitmentService.createRecruitment(req.body, req.user)
        new OK({
            message: "Create Recruitment successfully",
            data
        }).send(res)
    }

    static async updateRecruitment(req, res) {
        const data = await RecruitmentService.updateRecruitment(req.params.id, req.body)
        new OK({
            message: "Update Recruitment successfully",
            data
        }).send(res)
    }

    static async deleteRecruitment(req, res) {
        const data = await RecruitmentService.deleteRecruitment(req.params.id)
        new OK({
            message: "Delete Recruitment successfully",
            data
        }).send(res)
    }

    static async changeStatusRecruitment(req, res) {
        const data = await RecruitmentService.changeStatusRecruitment(req.params.id, req.body.status)
        new OK({
            message: "Change status Recruitment successfully",
            data
        }).send(res)
    }
}
module.exports = RecruitmentController