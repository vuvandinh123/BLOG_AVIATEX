"use strict";

const { BadRequestError } = require("../core/error.response");
const PostRepository = require("../models/repository/post.repo");
const SettingRepository = require("../models/repository/setting.repo");
const WorkRepository = require("../models/repository/work.repo");

class SettingService {

    static getSetting() {
        return SettingRepository.getSetting()
    }
    static updateSetting(id = 1, data) {
        return SettingRepository.updateSetting(id, data)
    }
}
module.exports = SettingService