import React from "react";
import {LoginForm} from "../../../components/Admin";
import "./LoginAdmin.css";

export function LoginAdmin() {
  return (  
    <div className="login-admin">
      <div className="login-admin__content">
        <LoginForm />
      </div>
    </div>   
  );
}
