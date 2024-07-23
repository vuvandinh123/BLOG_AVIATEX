"use strict";

const { BadRequestError } = require("../core/error.response");
const SubscriberRepository = require("../models/repository/subscriber.repo");

class SubscriberService {
    static async create(data) {
        const isEmail = await SubscriberRepository.isEmailExist(data.email);
        if (isEmail) {
            throw new BadRequestError("Email already exist");
        }
        return await SubscriberRepository.create(data);
    }
}

module.exports = SubscriberService