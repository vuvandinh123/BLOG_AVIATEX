import verifyToken from "../api/AuthVerify"
import { axiosInstanceAdmin } from "../api/axiosInstanceConfig"

export const UploadImage = async (file) => {
    verifyToken(axiosInstanceAdmin)

    const formData = new FormData();
    formData.append('image', file);
    const resposeve = await axiosInstanceAdmin.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return resposeve.data
}
export const DeleteImage = async (fileName) => {
    verifyToken(axiosInstanceAdmin)
    const resposeve = await axiosInstanceAdmin.delete(`/upload/${fileName}`)
    return resposeve.data
}