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

export const updateInformation = async (companyname, phonenumber) => {
    try {
        const response = await $authHost.put('/user/changedetails',            
        {
            companyname: companyname,
            phonenumber: phonenumber
        },
        {
            headers: {
            "Authorization": `Bearer ${localStorage.token}`
            }
        } )
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

export const sendUserTable = async (data) => {
    try {
        const response = await $authHost.put('/user/filedata',             
        {
            fileObj: data.fileObj,
            fileName: data.fileName
        },         
        {
            headers: 
            {
            "Authorization": `Bearer ${localStorage.token}`
            }
        })
        return response
    } catch (error) {
        return error

    }
}

export const getTablesName = async () => {
    try {
        const response = await $authHost.put('/user/filenames',  {},   
        {
            headers: 
            {
            "Authorization": `Bearer ${localStorage.token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getTableDataByName = async (fileName) => {
    try {
        const response = await $authHost.post('/user/filedata',               
        { 
            fileName: fileName
        }, 
        
        {
            headers: 
            {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteTable = async (fileName) =>{
    try {
        const respose = await $authHost.patch('/user/filedata',
        {
            fileName: fileName
        },
        {
            headers: 
            {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        return respose.status
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