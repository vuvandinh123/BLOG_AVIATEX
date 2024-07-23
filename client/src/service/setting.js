import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const UpdateHomePage = async (data) => {
    const resposeve = await axiosInstanceAdmin.put('/settings', data)
    return resposeve.data
}
export const GetHomePage = async () => {
    const resposeve = await axiosInstance.get('/settings')
    return resposeve.data
}