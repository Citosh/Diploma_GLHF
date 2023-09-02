import {$authHost, $host} from "./index.js"
import jwt_decode from "jwt-decode"

export const registration = async (email, password) => {
    const {data} = await $host.post('/auth/reg', {email, password})
    return data

}

export const login = async (email, password) => {
    const {data} = await $host.post('/auth/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUserById = async () => {
    try {
        const {id} = jwt_decode(localStorage.token)
        const response = await $authHost.get('/admin/user/'+id, { headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }})
        let responseData = JSON.stringify(response.data)
        localStorage.setItem('user', responseData)  
    } catch (error) {
        console.log(error)
    }

}

export const check = async () => {
    const response = await $authHost.post('/reg',)
    return response
}