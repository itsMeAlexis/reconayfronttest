import React, {useState, useEffect} from 'react';
import {Form, Button, Checkbox, Dropdown} from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import {useUser, useDependencia} from "../../../../hooks";
import "./AddEditUserForm.css"
import { map } from "lodash";

export function AddEditUserForm(props) {
  const {onClose, onRefetch, user} = props;  
  const {addUser, updateUser} = useUser();

  const [dependenciasFormat, setDependenciasFormat] = useState([]);
  const { dependencias, getDependencias } = useDependencia(); // Obtén las dependencias aquí
  
  
  useEffect(() => {
    getDependencias();
  }, []);
  //useEffect(() => getDependencias(), []);
  useEffect(() => {
    setDependenciasFormat(formatDropdownData(dependencias));
  },[dependencias]);
  
  
  console.log("Dependencias",dependenciasFormat);
 
  
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async(formValue) => {
      try {
        if(user) await updateUser(user.id, formValue);
        else await addUser(formValue);
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error)
      }
    },
  });
  
  return (
    <Form className='add-edit-user-form' onSubmit={formik.handleSubmit} >

        <Form.Input 
          label="Nombre"
          name="first_name" 
          placeholder="Nombre" 
          value = {formik.values.first_name} 
          onChange = {formik.handleChange}  
          error = {formik.errors.first_name}
        />
       {/* {getHelpPopup('first_name')}*/}

        <Form.Input 
          label="Apellido"
          name="last_name" 
          placeholder="Apellido"
          value = {formik.values.last_name} 
          onChange = {formik.handleChange}  
          error = {formik.errors.last_name}
        />

        <Form.Input 
          label="Cargo que Desempeña"
          name="puesto" 
          placeholder="Cargo"
          value = {formik.values.puesto} 
          onChange = {formik.handleChange}  
          error = {formik.errors.puesto}
        />     

        <Form.Input 
          label="Nombre de la Dependencias"
          name="nombreDependencia" 
          placeholder="Nombre de la Dependencias"
          value = {formik.values.nombreDependencia} 
          onChange = {formik.handleChange}  
          error = {formik.errors.nombreDependencia}
        /> 

        <Form.Input 
          label="DP"
          name="DP" 
          placeholder="DP"
          value = {formik.values.DP} 
          onChange = {formik.handleChange}  
          error = {formik.errors.DP}
        />

        <Form.Input 
          label="Teléfono"
          name="telefono" 
          placeholder="Telefono"
          value = {formik.values.telefono} 
          onChange = {formik.handleChange}  
          error = {formik.errors.telefono}
        />  

        <Form.Input 
           label="Email"
          name="email" 
          placeholder="email" 
          value = {formik.values.email} 
          onChange = {formik.handleChange}  
          error = {formik.errors.email}
        />

        <Form.Input 
          label="Nombre de Usuario"
          name="username" 
          placeholder="Nombre de Usuario" 
          value = {formik.values.username} 
          onChange = {formik.handleChange}  
          error = {formik.errors.username}
        />
      
        <Form.Input
          label="Contraseña"
          name="password" 
          type="password"
          placeholder="Contraseña"
          value = {formik.values.password} 
          onChange = {formik.handleChange}  
          error = {formik.errors.password}
        />

        <div className="add-edit-user-form__active">
            <Checkbox 
              toggle 
              checked={formik.values.is_active}
              onChange={(_, data) =>
                 formik.setFieldValue("is_active", data.checked) 
              }
            /> 
            Usuario Activo
        </div>

        <div className="add-edit-user-form__staff">
            <Checkbox 
              toggle 
              checked={formik.values.is_staff}
              onChange={(_, data) =>
                 formik.setFieldValue("is_staff", data.checked )}
            /> 
            Usuario administrador
        </div>

        <Button type="submit" primary fluid content={user ? "Actualizar" : "Crear" }/>

    </Form>
  )
}
function formatDropdownData(data){
  return map(data, (item)=> ({
    key: item.id,
    text: item.nombreDependencia,
    value: item.DP,
  }));
}

function initialValues(data){
  return{
    username: data && data.username || "",        //  username: data.username || "",
    email: data && data.email || "",             // data.email || "",
    first_name: data && data.first_name || "",    //data.first_name || "", 
    last_name: data && data.last_name || "", 
    nombreDependencia: data && data.nombreDependencia || "",
    puesto: data && data.puesto || "",
    telefono: data && data.telefono || "",
    //correo: data && data.correo || "",  
    password: "",
    is_active: data && data.is_active ? true : false,
    is_staff: data && data.is_staff ? true : false,
    DP: data && data.DP || "",
    //clave: data && data.clave || "",    
  };
  }


function newSchema(){
  return{
    username: Yup.string(),
    email: Yup.string(),
    first_name: Yup.string(),
    last_name: Yup.string(),
    nombreDependencia: Yup.string(),
    puesto: Yup.string(),
    telefono: Yup.string(),
    //correo: Yup.string(),  
    password: Yup.string(),
    is_active: Yup.bool(),
    is_staff: Yup.bool(),
    DP: Yup.string(),
    //clave: Yup.string(),    
    
  };
}

function updateSchema(){
  return{
    username: Yup.string(),
    email: Yup.string(),
    first_name: Yup.string(),
    last_name: Yup.string(),
    nombreDependencia: Yup.string(),
    puesto: Yup.string(),
    telefono: Yup.string(),
    //correo: Yup.string(),  
    password: Yup.string(),
    is_active: Yup.bool(),
    is_staff: Yup.bool(),
    DP: Yup.string(),
    //clave: Yup.string(),    
    
  };
}