// controller
"use strict";

const { OK } = require("../core/success.response");
const PostService = require("../service/post.service");
const UserService = require("../service/user.service");
const WorkService = require("../service/work.service");
const { getParamsPagination } = require("../utils");

class WorkController {
    static async getAllWorkByAdmin(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { search } = req.query
        const { data, total } = await WorkService.getAllWorkByAdmin({ offset, limit, search })
        const totalPage = Math.ceil(total / limit)
        new OK({
            message: "Get all post successfully",
            data,
            options: {
                total,
                pagination: { page, limit, totalPage }
            }
        }).send(res)
    }
    static async getWorkById(req, res) {
        const data = await WorkService.getWorkById(req.params.id)
        new OK({
            message: "Get post successfully",
            data
        }).send(res)
    }
    static async createWork(req, res) {
        const data = await WorkService.createWork(req.body)
        new OK({
            message: "Create post successfully",
            data
        }).send(res)
    }

    static async updateWork(req, res) {
        const data = await WorkService.updateWork(req.params.id, req.body)
        new OK({
            message: "Update post successfully",
            data
        }).send(res)
    }

    static async deleteWork(req, res) {
        const data = await WorkService.deleteWork(req.params.id)
        new OK({
            message: "Delete post successfully",
            data
        }).send(res)
    }

    static async changeStatusPost(req, res) {
        const data = await PostService.changeStatusPost(req.params.id, req.body.status)
        new OK({
            message: "Change status post successfully",
            data
        }).send(res)
    }
}
module.exports = WorkController