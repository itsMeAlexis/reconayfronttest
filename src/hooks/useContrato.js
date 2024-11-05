import {useState} from "react";
import {getContratosApi, addContratoApi, updateContratoApi, deleteContratoApi} from "../api/contrato";
import {useAuth} from "./";

export function useContrato() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [contratos, setContratos] = useState(null);
    const {auth} = useAuth();

    const getContratos = async () => {
        try {
            setLoading(true);
            const response = await getContratosApi();
            setLoading(false);
            setContratos(response);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const addContrato = async (data) => {
        try {
            setLoading(true);
            await addContratoApi(data, auth.token);           
            setLoading(false);            
        } catch (error) {
            setLoading(false);
            setError(error);
            
        }
    };

    
    const updateContrato = async (id,data) => {
        try {
            setLoading(true);
            await updateContratoApi(id, data, auth.token);           
            setLoading(false);            
        } catch (error) {
            setError(error);
            setLoading(false);      
        }
    };

    const deleteContrato = async (id) => {
        try {
            setLoading(true);
            await deleteContratoApi(id, auth.token);           
            setLoading(false);            
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    return{
        loading,
        error,
        contratos,
        getContratos,
        addContrato,
        updateContrato,
        deleteContrato,
    };
}