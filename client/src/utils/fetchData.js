import axios from 'axios';
import {API_ENDPOINT} from './config';


export const getDataAPI = async(url, token) => {
    const res = await axios.get(`${API_ENDPOINT}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}

export const postDataAPI = async(url,post, token) => {
    const res = await axios.post(`${API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const putDataAPI = async(url,post, token) => {
    const res = await axios.put(`${API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const patchDataAPI = async(url,post, token) => {
    const res = await axios.patch(`${API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async(url, token) => {
    const res = await axios.delete(`${API_ENDPOINT}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}
