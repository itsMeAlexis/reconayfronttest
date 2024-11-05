import { BASE_API } from "../utils/constants";

export async function getDependenciasApi() {
  try {
    const url = `${BASE_API}/api/dependencias/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addDependenciaApi(data, token) {
  try {
    const formData = new FormData();
    /*formData.append("image", data.image);*/
    formData.append("nombreDependencia", data.nombreDependencia);
    formData.append("DP", data.DP);
    formData.append("UR", data.UR);
    formData.append("nombreSecretario", data.nombreSecretario); 
    formData.append("puestoSecretario", data.puestoSecretario);
    formData.append("nombreCoordinador", data.nombreCoordinador);
    formData.append("puestoCoordinador", data.puestoCoordinador);
    //formData.append("NoUR", data.NoUR);

    const url = `${BASE_API}/api/dependencias/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateDependenciaApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("nombreDependencia", data.nombreDependencia);
    formData.append("DP", data.DP);
    formData.append("UR", data.UR);
    formData.append("nombreSecretario", data.nombreSecretario); 
    formData.append("puestoSecretario", data.puestoSecretario);
    formData.append("nombreCoordinador", data.nombreCoordinador);
    formData.append("puestoCoordinador", data.puestoCoordinador);
    //formData.append("NoUR", data.NoUR);
    if(data.image) formData.append("image",data.image);

    
    const url = `${BASE_API}/api/dependencias/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteDependenciaApi(id, token){
  try {
    const url = `${BASE_API}/api/dependencias/${id}/`;
    const params = {
      method: "DELETE",
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