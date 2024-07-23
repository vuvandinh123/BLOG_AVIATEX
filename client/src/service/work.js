import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllWorkByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/works', {
        params
    })
    return resposeve.data
}
export const GetAllWork = async (params) => {
    const resposeve = await axiosInstance.get('/works', {
        params
    })
    return resposeve.data
}
export const CreateWorkByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.post('/works', data)
    return resposeve.data
}
export const UpdateWorkByAdmin = async (id, data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.put(`/works/${id}`, data)
    return resposeve.data
}
export const DeleteWorkByAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/works/${id}`)
    return resposeve.data
}
export const getWorkById = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get(`/works/${id}`)
    return resposeve.data
}
export const ChangeStatusPost = async (id, status) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.patch(`/posts/${id}/status`, { status })
    return resposeve.data
}