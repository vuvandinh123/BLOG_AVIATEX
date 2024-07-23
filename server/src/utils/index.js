// src/utils/index.js
"use strict";
const crypto = require("node:crypto");
const { createTokenPeir } = require("../auth");
const KeyTokenRepository = require("../models/repository/keyToken.repo");
const { BadRequestError } = require("../core/error.response");
require('dotenv').config()
const nodemailer = require('nodemailer');
const createPrivateKeyAndPublicKey = (size = 64) => {
    // Generate a random private key
    const privateKey = crypto.randomBytes(size).toString('hex');
    // Generate a random public key
    const publicKey = crypto.randomBytes(size).toString('hex');
    return {
        privateKey,
        publicKey
    };
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const authLogin = async ({ user, refreshToken }) => {
    const { privateKey, publicKey } = createPrivateKeyAndPublicKey()
    const token = await createTokenPeir({ id: user.id, email: user.email, role: user.role, username: user.username, name: user.name, avatar: user.avatar }, publicKey, privateKey, refreshToken)
    // add key publickey and privatekey to database
    const isTokenKey = await KeyTokenRepository.findKeyTokenByUserId(user.id)
    const objKey = {
        user_id: user.id,
        public_key: publicKey,
        private_key: privateKey,
        refresh_token: token.refreshToken
    }
    if (!isTokenKey) {
        const keyStore = await KeyTokenRepository.createKeyToken(objKey)
        if (!keyStore) {
            throw new BadRequestError("Failed to update key")
        }
    }
    else {
        const keyStore = await KeyTokenRepository.updateKeyToken(user.id, objKey)
        if (!keyStore) {
            throw new BadRequestError("Failed to create key")
        }
    }
    return token
}
const sendNodemail = async ({ email, title, html },) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_ADDRESS, // địa chỉ email người gửi
        to: email, // địa chỉ email người nhận
        subject: title || 'Verify email Vu Dinh Shop',
        html: html
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const getParamsPagination = (req) => {
    // get params
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    const offset = (page - 1) * limit
    return { limit, page, offset }
}
module.exports = { createPrivateKeyAndPublicKey, isValidEmail, authLogin, getParamsPagination, sendNodemail }