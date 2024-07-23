import axios from "axios";

import { getCookieAuth, removeCookieAuth, setCookieAuth } from "../utils";
import { RefreshTokenByUser } from "../service/auth";
const verifyToken = async (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const { userId, accessToken } = getCookieAuth();
            config.headers['x-client-id'] = userId ?? '';
            config.headers['auth'] = accessToken ?? '';
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true;
                // get cookie 
                const { userId, refreshToken } = getCookieAuth();
                try {
                    const response = await RefreshTokenByUser({ 'x-client-id': userId ?? "", 'x-refresh-token': refreshToken ?? "" })
                    setCookieAuth({
                        userId: response.data.user.id,
                        accessToken: response.data.token.accessToken,
                        refreshToken: response.data.token.refreshToken,
                        remember: true
                    })
                    if (response?.status === 200) {
                        console.log("refresh token success");
                    }
                    originalRequest.headers.auth = `${response.data.token.accessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    //  đẩy người dùng về trang đăng nhập
                    // removeCookieAuth();
                }
            }
            return Promise.reject(error);
        }
    )
}
export default verifyToken