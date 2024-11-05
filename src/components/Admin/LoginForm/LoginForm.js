import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi } from "../../../api/user";
import { useAuth } from "../../../hooks";
import "./LoginForm.css";
import logotipo from "./imagenes/favicon.ico";

export function LoginForm() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  // Valores de animation-delay para cada cuadro
  const animationDelays = [-1, -2, -3, -4, -5];

  return (
    <div className="section"> 
        
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="todo">
        {animationDelays.map((delay, index) => (
          <div
            key={index}
            className="cuadrado"
            style={{ animationDelay: `${delay}s` }}
          ></div>
        ))}     
        <div className="container">
          <div className="form">
            <div className="logo">
              <img src={logotipo} alt="Logo" />
              Bivenidos a RECONAY
            </div>
            <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
              <Form.Input
                className='field'
                name="username" //"email"
                placeholder="Nombre de Usuario2" //"Correo electronico"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
                autoComplete="username"                
                
              />
              <Form.Input
                className='field'
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                content="Iniciar Sesión "
                primary
                fluid
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

function initialValues() {
  return {
    username: "", //email:"",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}