import verifyToken from "../api/AuthVerify"
import { axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAccount = async () => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/account')
    return resposeve.data
}
export const UpdateUsernameAndNameUser = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.patch('/account', data)
    return resposeve.data
}