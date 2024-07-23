"use strict";
const bcrypt = require("bcrypt")
const { createTokenPeir } = require("../auth");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const UserRepository = require("../models/repository/user.repo");
const { createPrivateKeyAndPublicKey, isValidEmail, authLogin } = require("../utils");
const KeyTokenRepository = require("../models/repository/keyToken.repo");
const NodeCache = require('node-cache');
const cache = new NodeCache();
class AccessService {

    // đăng nhập
    static async login({ username, password, refreshToken = null }) {
        // kiểm tra username, email đã tồn tại hay chua
        let user = null
        if (isValidEmail(username)) {
            user = await UserRepository.findUserByEmail(username)
        } else {
            user = await UserRepository.findUserByUsername(username)
        }
        if (!user) throw new BadRequestError("Username or email not exist")
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new BadRequestError("Password not match")
        }
        const token = await authLogin({ user, password, refreshToken })
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                username: user.username,
            },
            token
        }
    }
    // đăng ký 
    static async sigup({ email, password, name, username }) {
        // kiểm tra email, username đã tồn tại hay chua
        const isEmailExits = await UserRepository.findUserByEmail(email)
        const isUsernameExits = await UserRepository.findUserByUsername(username)
        if (isEmailExits) throw new BadRequestError("Email already exist")
        if (isUsernameExits) throw new BadRequestError("Username already exist")

        // hash password và tạo user
        const passwordHast = await bcrypt.hash(password, 10)
        const newUser = await UserRepository.createUser({ name, username, email, password: passwordHast })
        if (!newUser) {
            throw new BadRequestError("Failed to create user")
        }
        // tao key
        const { privateKey, publicKey } = createPrivateKeyAndPublicKey()
        const token = await createTokenPeir({ id: newUser[0], email, name, username }, publicKey, privateKey)
        // luu key
        const keyStore = await KeyTokenRepository.createKeyToken({
            user_id: newUser[0],
            public_key: publicKey,
            private_key: privateKey,
            refresh_token: token.refreshToken
        })
        if (!keyStore) {
            throw new BadRequestError("Failed to create key")
        }
        return {
            user: {
                id: newUser[0],
                email,
                username,
                name,
            },
            token
        }

    }
    static refreshToken = async ({ keyStore, refreshToken, user }) => {
        const { id, email, role, username, name } = user;
        if (keyStore.refresh_token !== refreshToken) throw new AuthFailureError("User is not authenticated")

        // check user
        const isUser = await UserRepository.findById(id)
        if (!isUser) throw new AuthFailureError("User not found")

        // create new token
        const token = await createTokenPeir({ id, email, role, username, name }, keyStore.public_key, keyStore.private_key)

        // update token in database
        const keyUpdate = await KeyTokenRepository.updateKeyToken(id, { refresh_token: token.refreshToken })
        if (!keyUpdate) throw new BadRequestError("Failed to update key")
        return {
            user: {
                id,
                email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        }
    }
    static async logout(user) {
        return await KeyTokenRepository.deleteKeyToken(user.id)
    }
    static async changePassword({ oldPassword, newPassword, user }) {
        const userData = await UserRepository.findById(user.id)
        const isMatch = await bcrypt.compare(oldPassword, userData.password)
        if (!isMatch) throw new BadRequestError("Old password not match")
        const passwordHast = await bcrypt.hash(newPassword, 10)
        const updateUser = await UserRepository.updateUser(user.id, { password: passwordHast })
        if (!updateUser) throw new BadRequestError("Failed to update user")
        return true
    }
    static sendEmail = async (req) => {
        const user = await UserRepository.findUserByEmail(req.user.email)
        if (!user) throw new BadRequestError("User not found")
        const code = Math.random().toString(6).substring(2, 8)
        const codeExpiration = 60; // 60 giây
        const codeStartDateTime = new Date();
        cache.set(req.user.email, code, codeExpiration);
        let html = `<p>Mã xác thực: ${code}</p>`
        sendNodemail({ email: req.user.email, title: "Vu Dinh Shop - Verify email", html: html })
        return {
            expiration: codeExpiration,
            codeStartDateTimeStr: codeStartDateTime.toString(),
        }
    }
    static async changeEmail({ email, code, user }) {
        const codeCache = cache.get(user.email)
        if (codeCache !== code) throw new BadRequestError("Code not match")
        const updateUser = await UserRepository.updateUser(user.id, { email: email })
        if (!updateUser) throw new BadRequestError("Failed to update user")
        cache.del(user.email)
        return true
    }

}
module.exports = AccessService