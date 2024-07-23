"use strict";

const { BadRequestError } = require("../core/error.response");
const PostRepository = require("../models/repository/post.repo");
const { sendNodemail } = require("../utils");
const { renderHtmlBlog } = require("../utils/mailer/blog");

class PostService {

    static getAllPostByUser({ offset, limit, topic_id, search, status }) {
        return PostRepository.getAllPostByAdmin({ offset, limit, topic_id, search, status })
    }
    static getSearch({ offset, limit, search }) {
        return PostRepository.getSearch({ offset, limit, search })
    }
    static getAllPostByAdmin({ offset, limit, topic_id, search, status }) {
        return PostRepository.getAllPostByAdmin({ offset, limit, topic_id, search, status })
    }
    static getPostById(id) {
        return PostRepository.getPostById(id)
    }
    static createPost(data) {
        const res = PostRepository.createPost(data)
        // sendNodemail({
        //     email: "vuvandinh203@gmail.com", title: "AVIATEK - " + data.title.toUpperCase(), html: renderHtmlBlog(data)
        // })
        return res
    }

    static updatePost(id, data) {
        return PostRepository.updatePost(id, data)
    }
    static deletePost(id) {
        return PostRepository.deletePost(id)
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
module.exports = PostService