// controller
"use strict";

const { OK } = require("../core/success.response");
const UserService = require("../service/user.service");

class UserController {
    static async getAllUser(req, res) {
        const data = UserService.getAllUser()
        res.status(200).json(data)
    }
    static async getUser(req, res) {
        const data = await UserService.getUser(req.user)
        new OK({
            data,
            message: "Get user successfully"
        }).send(res)
    }
    static async updateUsernameAndNameUser(req, res) {
        const data = await UserService.updateUsernameAndNameUser(req.user?.id, req.body)
        new OK({
            data,
            message: "Update user successfully"
        }).send(res)
    }
}
module.exports = UserController