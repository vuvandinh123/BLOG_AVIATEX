// controller
"use strict";

const { OK } = require("../core/success.response");
const ContactService = require("../service/contact.service");
const UserService = require("../service/user.service");
const { getParamsPagination } = require("../utils");

class ContactController {
    static async getAllContactByAdmin(req, res) {
        const { offset, limit, page } = getParamsPagination(req)
        const { search, status } = req.query
        const { data, total } = await ContactService.getAllContactByAdmin({ offset, limit, search, status })
        const totalPage = Math.ceil(total / limit)
        new OK({
            message: "Get all Contact successfully",
            data,
            options: {
                total,
                pagination: { page, limit, totalPage }
            }
        }).send(res)
    }
    static async getContactById(req, res) {
        const data = await ContactService.getContactById(req.params.id)
        new OK({
            message: "Get Contact successfully",
            data
        }).send(res)
    }
    static async createContact(req, res) {
        const data = await ContactService.createContact(req.body)
        new OK({
            message: "Create Contact successfully",
            data
        }).send(res)
    }

    static async updateContact(req, res) {
        const data = await ContactService.updateContact(req.params.id, req.body)
        new OK({
            message: "Update Contact successfully",
            data
        }).send(res)
    }

    static async deleteContact(req, res) {
        const data = await ContactService.deleteContact(req.params.id)
        new OK({
            message: "Delete Contact successfully",
            data
        }).send(res)
    }

    static async changeStatusContact(req, res) {
        const data = await ContactService.changeStatusContact(req.params.id, req.body.status)
        new OK({
            message: "Change status Contact successfully",
            data
        }).send(res)
    }
}
module.exports = ContactController