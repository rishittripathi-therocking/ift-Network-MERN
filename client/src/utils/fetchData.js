import axios from 'axios';
import {API_ENDPOINT} from './config';


export const getDataAPI = async(url, token) => {
    
    const res = await axios.get(`${process.env.API_ENDPOINT}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}

export const postDataAPI = async(url,post, token) => {
    const res = await axios.post(`${process.env.API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const putDataAPI = async(url,post, token) => {
    const res = await axios.put(`${process.env.API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const patchDataAPI = async(url,post, token) => {
    const res = await axios.patch(`${process.env.API_ENDPOINT}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async(url, token) => {
    const res = await axios.delete(`${process.env.API_ENDPOINT}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}
