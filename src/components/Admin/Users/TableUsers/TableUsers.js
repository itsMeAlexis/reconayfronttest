import React, {useState} from 'react';
import { Table, Icon, Button, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import ReactPaginate from 'react-js-pagination';
import "./TableUsers.css"
import { useAuth } from "../../../../hooks";

export function TableUsers(props) {
    const {users, updateUser, onDeleteUser} = props;

    // Ordenar los usuarios por el campo "username"
    const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));
    
    const { auth } = useAuth();
    console.log(auth);
    const filteredUsuarios = users.filter((user) =>
    auth.me.is_staff ? true : user.user_id == auth.me.id
     );
   
    // Código para la paginación
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10; // Número de elementos por página

    const handlePageChange = (e, { activePage }) => {
        setActivePage(activePage);
    };

    /*const paginatedUsuarios = filteredUsuarios.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    ); // Fin de la paginación*/

    // codigo para ordenar los registros por el campo username
    const paginatedUsuarios = sortedUsers.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );
    
    return (

    <div>
    <Table className='table-users-admin'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell className="center aligned">Usuario</Table.HeaderCell>
                <Table.HeaderCell >Nombre</Table.HeaderCell>
                <Table.HeaderCell >Apellidos</Table.HeaderCell>
                <Table.HeaderCell >Dependencia</Table.HeaderCell>
                <Table.HeaderCell >Teléfono</Table.HeaderCell>
                {/*<Table.HeaderCell >Email</Table.HeaderCell>*/}
                <Table.HeaderCell className="center aligned">Activo</Table.HeaderCell>
                <Table.HeaderCell className="center aligned">Administrador</Table.HeaderCell>
                <Table.HeaderCell className="center aligned"></Table.HeaderCell>
                
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {paginatedUsuarios.map((user,index) => (
                <Table.Row key = {index}>
                    <Table.Cell style={{ textAlign: "center" }}>{user.username}</Table.Cell>
                    <Table.Cell >{user.first_name}</Table.Cell>
                    <Table.Cell >{user.last_name}</Table.Cell>
                    <Table.Cell >{user.dependencia}</Table.Cell>
                    <Table.Cell >{user.telefono}</Table.Cell>
                    {/*<Table.Cell >{user.email}</Table.Cell>*/}
                    <Table.Cell className='status' style={{ textAlign: "center" }}>
                        {user.is_active ? <Icon name = "check" /> : <Icon name = "close" />}
                    </Table.Cell>

                    <Table.Cell className='status' style={{ textAlign: "center" }}>
                        {user.is_staff ? <Icon name = "check" /> : <Icon name = "close" />}
                    </Table.Cell>
                        <Actions 
                        user= {user} 
                        updateUser={updateUser} 
                        onDeleteUser={onDeleteUser}
                        />                   
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
         
        {filteredUsuarios.length === 0 && <p>No se encontraron usuarios.</p>}
   </div>
    
  );


}

function Actions(props){
    const {user, updateUser, onDeleteUser} = props;
    return(
        <Table.Cell textAlign = "right">
            <Button icon onClick = {() => updateUser(user)}>
                <Icon name = "pencil" />
            </Button>
            <Button 
                icon 
                negative 
                onClick={ () => onDeleteUser(user)}>
                <Icon name="close" />
            </Button>
        </Table.Cell>
    );
}

