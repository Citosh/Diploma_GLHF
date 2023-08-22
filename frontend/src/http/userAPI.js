import {$authHost, $host} from "./index.js"

export const registration = async (email, password) => {
    const response = await $host.post('/auth/reg', {email, password})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('/login', {email, password})
    return response
}

export const check = async () => {
    const response = await $host.post('/reg',)
    return response
}