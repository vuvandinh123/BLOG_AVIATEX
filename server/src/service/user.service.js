"use strict";

const UserRepository = require("../models/repository/user.repo");
const { findById } = require("../models/repository/user.repo");

class UserService {
    static getAllUser() {
        const dataDemo = [
            {
                id: 1,
                name: 'Nguyen Van A'
            },
            {
                id: 2,
                name: 'Nguyen Van B'
            },
            {
                id: 3,
                name: 'Nguyen Van C'
            }
        ]
        return dataDemo
    }
    static async getUser(user) {
        const data = await findById(user.id)
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            username: data.username,
            avatar: data.avatar
        }
    }
    static async updateUsernameAndNameUser(id, data) {
        const res = await UserRepository.updateUser(id, {
            name: data.name,
            email: data.email,
            avatar: data.avatar
        })
        return res
    }
}
module.exports = UserService