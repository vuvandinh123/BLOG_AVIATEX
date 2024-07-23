import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllTopicByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/topics', {
        params
    })
    return resposeve.data
}
export const GetAllTopic = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstance.get('/topics', {
        params
    })
    return resposeve.data
}
export const CreateTopicByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.post('/topics', data)
    return resposeve.data
}
export const UpdateTopicByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.put(`/topics/${data.id}`, data)
    return resposeve.data
}
export const DeleteTopicByAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/topics/${id}`)
    return resposeve.data
}