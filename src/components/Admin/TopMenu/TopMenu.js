import React, { useState, useEffect } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import {useAuth} from "../../../hooks";
import "./TopMenu.css";


export function TopMenu() {
    const { auth, logout } = useAuth();
    const [logoutTimer, setLogoutTimer] = useState(null);
  
    const renderName = () => {
      if (auth.me && auth.me.first_name && auth.me.last_name) {
        return `${auth.me.first_name} ${auth.me.last_name}`;
      }
      return auth.me ? auth.me.email : '';
    };
  
    /*const resetLogoutTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      const newLogoutTimer = setTimeout(logout, 30 * 60 * 1000); // 10 minutos en milisegundos
      setLogoutTimer(newLogoutTimer);
    };
  
    useEffect(() => {
      resetLogoutTimer();
  
      // Agregar event listeners para reiniciar el temporizador en interacciones del usuario
      window.addEventListener('click', resetLogoutTimer);
      window.addEventListener('mousemove', resetLogoutTimer);
  
      return () => {
        // Limpiar event listeners cuando el componente se desmonte
        window.removeEventListener('click', resetLogoutTimer);
        window.removeEventListener('mousemove', resetLogoutTimer);
        clearTimeout(logoutTimer);
      };
    }, [auth, logoutTimer]);*/

  return (
    <Menu fixed = "top" className = "top-menu-admin">
        <Menu.Item className = "top-menu-admin__logo" >
            <p>Menu Administrador</p>
        </Menu.Item>

        <Menu.Menu position = "right">
            <Menu.Item>Hola, {renderName()}</Menu.Item>
        
            <Menu.Item onClick={logout}>
                 <Icon name="sign-out" size="large" />
            </Menu.Item>
        </Menu.Menu>
    </Menu>     
  );
}
