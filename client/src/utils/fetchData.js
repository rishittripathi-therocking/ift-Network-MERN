import axios from 'axios';


export const getDataAPI = async(url, token) => {
    
    const res = await axios.get(`${process.env.BASE_URL}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}

export const postDataAPI = async(url,post, token) => {
    const res = await axios.post(`${process.env.BASE_URL}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const putDataAPI = async(url,post, token) => {
    const res = await axios.put(`${process.env.BASE_URL}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const patchDataAPI = async(url,post, token) => {
    const res = await axios.patch(`${process.env.BASE_URL}/socialapi/${url}`,post,{
        headers: {Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async(url, token) => {
    const res = await axios.delete(`${process.env.BASE_URL}/socialapi/${url}`,{
        headers: {Authorization: token}
    })
    return res;
}
