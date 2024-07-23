import { axiosInstance } from "../api/axiosInstanceConfig"

export const Subscribe = async (data) => {
    const resposeve = await axiosInstance.post('/subscribers', data)
    return resposeve.data
}