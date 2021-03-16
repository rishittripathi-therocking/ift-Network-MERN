
export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER'
}

export const getProfileUsers = ({users,id,auth}) =>(dispatch)=> {
    console.log({users,id,auth})
}