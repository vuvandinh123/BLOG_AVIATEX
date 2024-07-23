import verifyToken from "../api/AuthVerify"
import { axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const LoginAdmin = async (data) => {
    const resposeve = await axiosInstanceAdmin.post('/auth/login', data)
    return resposeve.data
}
export const RefreshTokenByUser = async (config) => {
    try {
        const response = await axiosInstanceAdmin.post("/auth/refresh", {}, {
            headers: {
                ...config
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
export const LogOut = async () => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.post('/auth/logout')
    return resposeve.data
}

export const ChangePasswordByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.patch('/auth/change-password', data)
    return resposeve.data
}