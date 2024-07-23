import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export function getCookieAuth() {
    const userId = Cookies.get("userId") ?? null;
    const accessToken = Cookies.get("accessToken") ?? '';
    const refreshToken = Cookies.get("refreshToken") ?? '';
    return { userId, accessToken, refreshToken };
}

export function setCookieAuth({ userId, accessToken, refreshToken }) {
    Cookies.set("userId", userId);
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
}
export function removeCookieAuth() {
    Cookies.remove("userId");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
}
export function getDataUser() {
    const { accessToken } = getCookieAuth();
    if (!accessToken) return 0
    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken
    } catch (error) {
        return 0
    }
}
export function checkRole(role) {
    const { accessToken } = getCookieAuth();
    if (!accessToken) return 0
    try {
        const decodedToken = jwtDecode(accessToken);
        // Lấy thông tin từ token đó
        const roleStr = decodedToken.role;
        // Kiểm tra quyền
        if (roleStr !== role) {
            return 0;
        }
        return 1
    } catch (error) {
        return 0
    }

}
export function getUrlSearchParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
export function setUrlSearchParam(key, value) {
    const currentUrl = new URL(window.location.href);
    const urlParams = new URLSearchParams(currentUrl.search);
    urlParams.set(key, value);
    currentUrl.search = urlParams.toString();
    window.history.pushState({}, '', currentUrl);

}