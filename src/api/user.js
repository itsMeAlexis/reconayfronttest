import { BASE_API} from "../utils/constants";

export async function loginApi(formValue){
    try{
        const url = `${BASE_API}/api/auth/login/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formValue),
        };

        const response = await fetch(url, params);

        if(response.status !== 200){
            throw new Error("Usuario o contraseña incorrectos");
        }
        
        const result = await response.json();
        return result;
    }catch(error){
        throw error;
    }
}

export async function getMeApi(token){
    try {
        const url = `${BASE_API}/api/auth/me`;
        const params = {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;      
    }
}

export async function getUsersApi(token){
    try {
        const url = `${BASE_API}/api/users/`;
        const params = {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
        
    } catch (error) {
        throw error;
    }
}

export async function addUserApi(data,token){
    try {
        
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nombreDependencia", data.nombreDependencia);       
        formData.append("puesto", data.puesto);
        formData.append("telefono", data.telefono);
        //formData.append("correo", data.correo);
        formData.append("password", data.password);
        formData.append("is_active", data.is_active);
        formData.append("is_staff", data.is_staff);
        formData.append("DP", data.DP);
        //formData.append("clave", data.clave);
        

        const url = `${BASE_API}/api/users/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            //body: formData,
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function updateUserApi(id, data, token){
    try {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nombreDependencia", data.nombreDependencia);       
        formData.append("puesto", data.puesto);
        formData.append("telefono", data.telefono);
        //formData.append("correo", data.correo);
        formData.append("password", data.password);
        formData.append("is_active", data.is_active);
        formData.append("is_staff", data.is_staff);
        formData.append("DP", data.DP);
        //formData.append("clave", data.clave);

        const url = `${BASE_API}/api/users/${id}/`
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserApi(id, token){
    try {
        const url = `${BASE_API}/api/users/${id}/`;
        const params = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}