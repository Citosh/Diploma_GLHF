import {$adminHost} from "./index"

export const getAllUsers = async () => {
    try {
        const response = await $adminHost.get('/admin/users',
        {
            headers: {
            "Authorization": `Bearer ${localStorage.token}`
            }
        }
        )
        if (response && response.data) {
            let responseData = JSON.stringify(response.data);
            console.log(responseData)
            localStorage.setItem('users', responseData);
        }
        return response 
    } catch (error) {
        console.log(error) 
    }

}

export const banUserById = async (userId) => {
    try {
        const response = await $adminHost.put('admin/banuser/'+userId, {},
        {
            headers: {
            "Authorization": `Bearer ${localStorage.token}`
            }
        })
    } catch (error) {
        console.log(error) 
    }

}


export const unbanUserById = async (userId) => {
    try {
        const response = await $adminHost.put('admin/unbanuser/'+userId,{},
        {
            headers: {
            "Authorization": `Bearer ${localStorage.token}`
            }
        })
    } catch (error) {
        console.log(error) 
    }

}

export const setRoleById = async (userId, role) => {
    try {
        const response = await $adminHost.put('admin/setrole/'+ userId, { role }, {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error); 
    }
};