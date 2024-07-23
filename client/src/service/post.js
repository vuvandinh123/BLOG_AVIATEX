import verifyToken from "../api/AuthVerify"
import { axiosInstance, axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const GetAllPostByUser = async (params) => {
    const resposeve = await axiosInstance.get('/posts', {
        params
    })
    return resposeve.data
}
export const getBlogById = async (id) => {
    const resposeve = await axiosInstance.get(`/posts/${id}`)
    return resposeve.data
}
export const getSearch = async (params) => {
    const resposeve = await axiosInstance.get(`/posts/search`, {
        params
    })
    return resposeve.data
}
export const GetAllPostByAdmin = async (params) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get('/posts', {
        params
    })
    return resposeve.data
}
export const CreatePostByAdmin = async (data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.post('/posts', data)
    return resposeve.data
}
export const UpdatePostByAdmin = async (id, data) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.put(`/posts/${id}`, data)
    return resposeve.data
}
export const DeletePostByAdmin = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/posts/${id}`)
    return resposeve.data
}
export const getPostById = async (id) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.get(`/posts/${id}`)
    return resposeve.data
}
export const ChangeStatusPost = async (id, status) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.patch(`/posts/${id}/status`, { status })
    return resposeve.data
}