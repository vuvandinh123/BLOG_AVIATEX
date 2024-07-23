const { CREATED, OK } = require("../core/success.response")
const AccessService = require("../service/access.service")
const SettingService = require("../service/setting.service")

class SettingController {

    static async getSetting(req, res) {
        const data = await SettingService.getSetting()
        return new OK({
            message: "Login successfully",
            data
        }).send(res)
    }
    static async updateSetting(req, res) {
        const data = await SettingService.updateSetting(1, req.body)
        return new CREATED({
            message: "Update setting successfully",
            data
        }).send(res)
    }
}
module.exports = SettingController