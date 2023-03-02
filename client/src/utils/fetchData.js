import axios from 'axios';
import {API_ENDPOINT} from './config';

const instance = axios.create({
   withCredentials: true,
   baseURL: API_ENDPOINT
})


export const getDataAPI = async(url, token) => {
    const res = await instance.get(`${API_ENDPOINT}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}

export const postDataAPI = async(url,post, token) => {
    const res = await instance.post(`${API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const putDataAPI = async(url,post, token) => {
    const res = await instance.put(`${API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const patchDataAPI = async(url,post, token) => {
    const res = await instance.patch(`${API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async(url, token) => {
    const res = await instance.delete(`${API_ENDPOINT}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}
