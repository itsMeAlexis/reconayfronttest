import {useState} from "react";
import {getContratoOperativosApi, addContratoOperativoApi, updateContratoOperativoApi, deleteContratoOperativoApi} from "../api/contratoperativo";
import {useAuth} from "./";

export function useContratoOperativo() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [contratoOperativos, setContratoOperativos] = useState(null);
    const {auth} = useAuth();

    const getContratoOperativos = async () => {
        try {
            setLoading(true);
            const response = await getContratoOperativosApi();
            setLoading(false);
            setContratoOperativos(response);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const addContratoOperativo = async (data) => {
        try {
            setLoading(true);
            await addContratoOperativoApi(data, auth.token);           
            setLoading(false);            
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    
    const updateContratoOperativo = async (id,data) => {
        try {
            setLoading(true);
            await updateContratoOperativoApi(id, data, auth.token);           
            setLoading(false);            
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const deleteContratoOperativo = async (id) => {
        try {
            setLoading(true);
            await deleteContratoOperativoApi(id, auth.token);           
            setLoading(false);            
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    return{
        loading,
        error,
        contratoOperativos,
        getContratoOperativos,
        addContratoOperativo,
        updateContratoOperativo,
        deleteContratoOperativo,
    };
}