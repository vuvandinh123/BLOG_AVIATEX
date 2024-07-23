'use strict';

const { NotFoundError, ForbiddenError, AuthFailureError } = require("../core/error.response");
const KeyTokenRepository = require("../models/repository/keyToken.repo");
const asyncHandler = require("./asyncHandle");
const JWT = require('jsonwebtoken');

const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTH: 'auth',
    REFRESH_TOKEN: 'x-refresh-token'
}
const checkAuthencation = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new NotFoundError("Missing Client Id");
    const keyToken = await KeyTokenRepository.findKeyTokenByUserId(userId);

    if (!keyToken) throw new ForbiddenError("Missing Key Token");

    const refreshToken = req.headers[HEADER.REFRESH_TOKEN]?.toString();
    if (refreshToken) {

        if (keyToken.refresh_token !== refreshToken) throw new ForbiddenError("Invalid Refresh Token");

        try {
            const decodedUser = JWT.verify(refreshToken, keyToken.private_key);
            if (userId !== decodedUser.id.toString()) throw new ForbiddenError("Invalid Refresh Token");
            req.keyStore = keyToken;
            req.user = decodedUser;
            req.refreshToken = refreshToken;
            return next();
        } catch (e) {
            if (e instanceof JWT.TokenExpiredError) {
                // Throw a 401 Unauthorized error if the refresh token is expired
                throw new ForbiddenError("Refresh Token Expired");
            }
        }

    }
    const accessToken = req.headers[HEADER.AUTH]?.toString();
    // If the refresh token is missing, throw a ForbiddenError
    if (!accessToken) throw new ForbiddenError("Missing Authorization");
    try {
        const decodedUser = JWT.verify(accessToken, keyToken.public_key);
        if (userId !== decodedUser.id.toString()) throw new ForbiddenError("Invalid Refresh Token11");

        req.keyStore = keyToken;
        req.user = decodedUser;
        return next();
    } catch (e) {
        if (e instanceof JWT.TokenExpiredError) {
            throw new AuthFailureError("Access Token Expired");
        }
        console.log(e);
        throw new AuthFailureError("Invalid Access Token");
    }
})
module.exports = checkAuthencation