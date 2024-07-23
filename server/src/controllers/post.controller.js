// controller
"use strict";

const { OK } = require("../core/success.response");
const PostService = require("../service/post.service");
const UserService = require("../service/user.service");
const { getParamsPagination } = require("../utils");

class PostController {
    static async getAllPostByAdmin(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { topic_id, search, status } = req.query
        const { data, total } = await PostService.getAllPostByAdmin({ offset, limit, topic_id, search, status })
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
    static async getSearch(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { search } = req.query
        const { data, total } = await PostService.getSearch({ offset, limit, search })
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
    static async getAllPostByUser(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { topic_id, search, status } = req.query
        const { data, total } = await PostService.getAllPostByUser({ offset, limit, topic_id, search, status })
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
    static async getPostById(req, res) {
        const data = await PostService.getPostById(req.params.id)
        new OK({
            message: "Get post successfully",
            data
        }).send(res)
    }
    static async createPost(req, res) {
        const data = await PostService.createPost(req.body)
        new OK({
            message: "Create post successfully",
            data
        }).send(res)
    }

    static async updatePost(req, res) {
        const data = await PostService.updatePost(req.params.id, req.body)
        new OK({
            message: "Update post successfully",
            data
        }).send(res)
    }

    static async deletePost(req, res) {
        const data = await PostService.deletePost(req.params.id)
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
module.exports = PostController