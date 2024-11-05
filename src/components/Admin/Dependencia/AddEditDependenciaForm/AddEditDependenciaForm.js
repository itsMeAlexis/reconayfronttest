import React, { useState, useEffect } from 'react';
import {Form, Button, Dropdown} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import "./AddEditDependenciaForm.css";
import {useDependencia} from "../../../../hooks";


export function AddEditDependenciaForm(props) {

    const {onClose, onRefetch, dependencia } = props;
    const {addDependencia, updateDependencia, fetchDependenciasApi} = useDependencia();
    //const [dependencias, setDependencias] = useState([]);

    //Cargar combo
    /*useEffect(() => {
        const fetchDependencias = async () => {
          try {
            const dependenciasData = await fetchDependenciasApi(dependencia.DP, dependencia.UR);
            setDependencias(dependenciasData);
          } catch (error) {
            console.error(error);
          }
        };
        fetchDependencias();
    }, [dependencia.DP, dependencia.UR]);*/
    //Cargar combo

    //console.log(dependencia);

    const formik = useFormik({
        initialValues: initialValues(dependencia),
        validationSchema: Yup.object(dependencia ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {

                if(dependencia) await updateDependencia(dependencia.id, formValue);
                else await addDependencia(formValue);
                
                onRefetch();
                onClose();
               
            } catch (error) {
                console.error(error);
            }
            
        },

    });

  return (
    <div>
      <Form className='add-edit-dependencia-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
            label="Nombre de la Dependencia"
            name="nombreDependencia" 
            placeholder="Nombre de la Dependencia" 
            value={formik.values.nombreDependencia} 
            onChange={formik.handleChange} 
            error={formik.errors.nombreDependencia}
         />
        
        <Form.Input 
            label="DP" 
            name="DP" 
            placeholder="DP" 
            value={formik.values.DP} 
            onChange={formik.handleChange} 
            error={formik.errors.DP}
            />

        <Form.Input 
            label="UR" 
            name="UR" 
            placeholder="UR" 
            value={formik.values.UR} 
            onChange={formik.handleChange} 
            error={formik.errors.UR}
            />

        <Form.Input 
            label="Nombre del Secretario" 
            name="nombreSecretario" 
            placeholder="Nombre del Secretario" 
            value={formik.values.nombreSecretario} 
            onChange={formik.handleChange} 
            error={formik.errors.nombreSecretario}
            />   

        <Form.Input 
            label="Puesto del Secretario" 
            name="puestoSecretario" 
            placeholder="Puesto del Secretario" 
            value={formik.values.puestoSecretario} 
            onChange={formik.handleChange} 
            error={formik.errors.puestoSecretario}
            />

        <Form.Input 
            label="Nombre del Coordinador" 
            name="nombreCoordinador" 
            placeholder="Nombre del Coordinador" 
            value={formik.values.nombreCoordinador} 
            onChange={formik.handleChange} 
            error={formik.errors.nombreCoordinador}
            />

        <Form.Input 
            label="Puesto del Coordinador" 
            name="puestoCoordinador" 
            placeholder="Puesto del Coordinador" 
            value={formik.values.puestoCoordinador} 
            onChange={formik.handleChange} 
            error={formik.errors.puestoCoordinador}
            />
        
        

        <Button type='submit' primary fluid content= {dependencia ? "Actualizar Dependencia" : "Crear Dependencia"} />
      </Form>
    </div>
  )
}

function initialValues(data){
    return {
        nombreDependencia: data && data.nombreDependencia || "",
        DP: data && data.DP || "",
        UR: data && data.UR || "",
        nombreSecretario: data && data.nombreSecretario || "",        
        puestoSecretario: data && data.puestoSecretario || "",
        nombreCoordinador: data && data.nombreCoordinador || "",
        puestoCoordinador: data && data.puestoCoordinador || "",
        //NoUR: data && data.NoUR || "",
        image: '',
    };
}

function newSchema(){
    return{
        nombreDependencia:Yup.string().required(true),
        DP:Yup.string().required(true),
        nombreSecretario:Yup.string().required(true),
        puestoSecretario:Yup.string().required(true),
        nombreCoordinador:Yup.string().required(true),
        puestoCoordinador:Yup.string().required(true),
        //NoUR:Yup.string().required(true),
    };
}

function updateSchema(){
    return{
        nombreDependencia:Yup.string().required(true),
        DP:Yup.string().required(true),
        UR:Yup.string().required(true),
        nombreSecretario:Yup.string().required(true),
        puestoSecretario:Yup.string().required(true),
        nombreCoordinador:Yup.string().required(true),
        puestoCoordinador:Yup.string().required(true),
        //NoUR:Yup.string().required(true),
    };
}