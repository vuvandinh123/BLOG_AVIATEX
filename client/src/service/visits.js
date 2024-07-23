import verifyToken from "../api/AuthVerify"
import { axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllVisits = async () => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/visits')
    return resposeve.data
}
export const GetDataCountDashboard = async () => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/visits/dashboard')
    return resposeve.data
}