"use strict";
const { OK, CREATED } = require("../core/success.response");
const SubscriberService = require("../service/subscriber.service");
class SubscriberController {

    static async subscribe(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        const data = await SubscriberService.create({ email })
        return new CREATED({
            message: "Subscribe successfully",
            data
        }).send(res)
    }
}

module.exports = SubscriberController