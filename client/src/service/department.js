import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllDepartmentByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/departments', {
        params
    })
    return resposeve.data
}
export const GetAllDepartment = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstance.get('/departments', {
        params
    })
    return resposeve.data
}
export const CreateDepartmentByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.post('/departments', data)
    return resposeve.data
}
export const UpdateDepartmentByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.put(`/departments/${data.id}`, data)
    return resposeve.data
}
export const DeleteDepartmentByAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/departments/${id}`)
    return resposeve.data
}