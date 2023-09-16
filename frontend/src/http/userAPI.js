import {$authHost, $host} from "./index.js"
import jwt_decode from "jwt-decode"

export const registration = async (email, password) => {
    try {
        const response = await $host.post('/auth/reg', {email, password})
        return response
    } catch (error) {
        return error
    }


}

export const login = async (email, password) => {
    try {
        const response = await $host.post('/auth/login', {email, password})
        localStorage.setItem('token', response.data.token)
        return response
    } catch (error) {
        return error
    }

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

export const changePassword = async (prev_pass, new_pass) =>{
    try {
        const response = await $authHost.put('/user/changepass',  
            {
                prev_pass: prev_pass,
                new_pass: new_pass
            },
            {
                headers: {
                "Authorization": `Bearer ${localStorage.token}`
                }
            }
        )
        return response
    } catch (error) {
        return error
    }
}

export const changeEmail = async (newEmail, password) =>{
    try {
        const response = await $authHost.put('/user/changeemail',  
            {
                new_email: newEmail,
                password: password
            },
            {
                headers: {
                "Authorization": `Bearer ${localStorage.token}`
                }
            }
        )
        return response
    } catch (error) {
        return error
    }
}

export const check = async () => {
    try {
        const response = await $authHost.get('/auth/check',{ headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }})
        let decodedData = jwt_decode(response.data.token)
        localStorage.setItem('token', response.data.token)
        return {status: response.status,
                role: decodedData.role
        }
    } catch (error) {
        return error.response
    }

}