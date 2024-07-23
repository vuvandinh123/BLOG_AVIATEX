import axios from "axios";
import { AppURL } from "./AppURL";
const axiosInstance = axios.create({
    baseURL: AppURL.BaseURL,
    headers: {
        accept: 'application/json',
    }
});
const axiosInstanceAdmin = axios.create({
    baseURL: AppURL.BaseURL + 'admin',
    headers: {
        accept: 'application/json',
    }
});
export { axiosInstance, axiosInstanceAdmin }