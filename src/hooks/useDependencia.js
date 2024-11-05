import {useState} from "react";
import { getDependenciasApi, addDependenciaApi, updateDependenciaApi, deleteDependenciaApi} from "../api/dependencia";
import { useAuth } from "./";

export function useDependencia(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dependencias, setDependencias] = useState(null);
    const {auth} = useAuth();

    
    //combo dependencias
    const getDependencias = async () => {
        try {
            setLoading(true);
            const response = await getDependenciasApi();
            setLoading(false);
            setDependencias(response);
        } catch (error) {
            setError(error);
            setLoading(false);
           
        }
    };

    const addDependencia = async (data) =>{
        try {
            setLoading(true);
            await addDependenciaApi(data, auth.token);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false) ;
        }
    }

    const updateDependencia = async(id, data) =>{
        try {
            setLoading(true);
            await updateDependenciaApi(id, data, auth.token);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            
        }
    }

    const deleteDependencia = async (id) => {
        try {
            setLoading(true);
            await deleteDependenciaApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
            
    }

    return{
        loading,
        error,
        dependencias,
        getDependencias,
        addDependencia,
        updateDependencia,
        deleteDependencia,
       
    };
    
}


