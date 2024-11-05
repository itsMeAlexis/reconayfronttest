import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import "./SideMenu.css";

export function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();
  console.log(useLocation);
  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  const { auth } = useAuth();

  const navigate = useNavigate(); // Agrega useNavigate
  console.log(auth);

  return (
    <Menu fixed="left" borderless className="side" vertical>
      <Menu.Item
        onClick={() => navigate("/admin")}
        active={pathname === "/admin"}
      >
        <Icon name="home" size="large" className="home" /> Inicio
      </Menu.Item>

      {/*<Menu.Item onClick={() => navigate("/admin/contrato_operativo")} active={pathname === "/admin/contrato_operativo"}>
        <Icon name="file alternate outline" className='file' size="large"/> Oficio de Solicitud Dep.
  </Menu.Item>*/}

      {/*<Menu.Item onClick={() => navigate("/admin/contrato_operativo")} active={pathname === "/admin/contrato_operativo"}>
        <Icon name="file alternate outline" className='file' size="large"/> Oficio de Solicitud SAF
</Menu.Item>*/}

      {/*} <Menu.Item onClick={() => navigate("/admin/contrato_operativo")} active={pathname === "/admin/contrato_operativo"}>
        <Icon name="file alternate outline" className='file' size="large"/> Ficha Técnica de Validación
</Menu.Item>*/}

      <Menu.Item
        onClick={() => navigate("/admin/contrato_operativo")}
        active={pathname === "/admin/contrato_operativo"}
      >
        <Icon name="file alternate outline" className="file" size="large" />{" "}
        Contratos Operativos
      </Menu.Item>

      <Menu.Item
        onClick={() => navigate("/admin/contrato_profesional")}
        active={pathname === "/admin/contrato_profesional"}
      >
        <Icon name="file alternate" className="alternate" size="large" />{" "}
        Contratos Profesionales
      </Menu.Item>

      {/*auth.me && auth.me.is_staff && (
          <Menu.Item 
            as={Link} 
            to={'/admin/reportes'} 
            active={pathname === "/admin"}>
            <Icon name="download" /> Reportes  
          </Menu.Item>

      )*/}
      {auth.me && auth.me.is_staff && (
        <Menu.Item
          onClick={() => navigate("/admin/dependencias")} // Utiliza navigate para redirigir
          active={pathname === "/admin/dependencias"}
        >
          <Icon name="university" className="university" size="large" />{" "}
          Dependencias
        </Menu.Item>
      )}
      {auth.me && auth.me.is_staff && (
        <Menu.Item
          onClick={() => navigate("/admin/users")} // Utiliza navigate para redirigir
          active={pathname === "/admin/users"}
        >
          <Icon name="users" className="users" size="large" /> Usuarios
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => navigate("/admin/descargar_formatos")}
        active={pathname === "/admin/descargar_formatos"}
      >
        <Icon name="cloud download" className="file" size="large" /> Descargar
        Formatos
      </Menu.Item>
    </Menu>
  ); //return
}
