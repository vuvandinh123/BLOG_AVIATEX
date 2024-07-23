import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllContactByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/contacts', {
        params
    })
    return resposeve.data
}
export const CreateContactByAdmin = async (data) => {
    const resposeve = await axiosInstance.post('/contacts', data)
    return resposeve.data
}
export const UpdateContactByAdmin = async (id, data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.put(`/contacts/${id}`, data)
    return resposeve.data
}
export const DeleteContactByAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/contacts/${id}`)
    return resposeve.data
}
export const getContactById = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get(`/contacts/${id}`)
    return resposeve.data
}
export const ChangeStatusContact = async (id, status) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.patch(`/contacts/${id}/status`, { status })
    return resposeve.data
}