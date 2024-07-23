import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllRecruitmentByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/recruitments', {
        params
    })
    return resposeve.data
}
export const GetAllRecruitment = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstance.get('/recruitments', {
        params
    })
    return resposeve.data
}
export const CreateRecruitmentByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.post('/recruitments', data)
    return resposeve.data
}
export const UpdateRecruitmentByAdmin = async (id, data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.put(`/recruitments/${id}`, data)
    return resposeve.data
}
export const DeleteRecruitmentByAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/recruitments/${id}`)
    return resposeve.data
}
export const getRecruitmentById = async (id) => {
    const resposeve = await axiosInstance.get(`/recruitments/${id}`)
    return resposeve.data
}
export const ChangeStatusRecruitment = async (id, status) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.patch(`/recruitments/${id}/status`, { status })
    return resposeve.data
}