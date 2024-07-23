const { CREATED, OK } = require("../core/success.response")
const AccessService = require("../service/access.service")

class AccessController {

    static async login(req, res) {
        const data = await AccessService.login(req.body)
        return new OK({
            message: "Login successfully",
            data
        }).send(res)
    }
    static async signUp(req, res) {
        const data = await AccessService.sigup(req.body)
        return new CREATED({
            message: "Sign up successfully",
            data
        }).send(res)
    }
    static async logOut(req, res) {
        const data = await AccessService.logout(req.user)
        return new OK({
            message: "Logout successfully",
            data
        }).send(res)
    }
    static refreshToken = async (req, res) => {
        const data = await AccessService.refreshToken({
            keyStore: req.keyStore,
            refreshToken: req.refreshToken,
            user: req.user
        })
        req.refreshToken = data.token.refreshToken
        return new OK({
            message: "Refresh token successfully",
            data
        }).send(res)
    }
    static sendEmail = async (req, res) => {
        const data = await AccessService.sendEmail(req)
        return new OK({
            message: "Send email successfully",
            data
        }).send(res)
    }
    static changeEmail = async (req, res) => {
        const { email, code } = req.body
        const data = await AccessService.changeEmail({ email, code, user: req.user })
        return new OK({
            message: "Verify email successfully",
            data
        }).send(res)
    }
    static changePassword = async (req, res) => {
        const { oldPassword, newPassword } = req.body
        const data = await AccessService.changePassword({ oldPassword, newPassword, user: req.user })
        return new OK({
            message: "Change password successfully",
            data
        }).send(res)
    }
}
module.exports = AccessController