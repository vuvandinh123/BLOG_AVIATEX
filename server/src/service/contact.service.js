"use strict";

const { BadRequestError } = require("../core/error.response");
const ContactRepository = require("../models/repository/contact.repo");

class ContactService {
    static getAllContactByAdmin({ ofset, limit, search, status }) {
        return ContactRepository.getAllContactByAdmin({ ofset, limit, search, status })
    }
    static getContactById(id) {
        return ContactRepository.getContactById(id)
    }
    static createContact(data) {
        return ContactRepository.createContact(data)
    }

    static updateContact(id, data) {
        return ContactRepository.updateContact(id, data)
    }
    static deleteContact(id) {
        return ContactRepository.deleteContact(id)
    }

    static changeStatusContact(id, status) {
        if (status !== "pending" && status !== "active") {
            throw new BadRequestError("Status not exist")
        }
        return ContactRepository.changeStatusContact(id, status)
    }
    static getContactById(id) {
        return ContactRepository.getContactById(id)
    }
}
module.exports = ContactService