import React from 'react'
import {Table, Image, Button, Icon} from "semantic-ui-react";
import { map } from "lodash";
import "./TableDependenciaAdmin.css";

export function TableDependenciaAdmin(props) {
    const { dependencias, updateDependencia, deleteDependencia} = props;

  return (
    <Table className = "table-dependencia-admin">
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Dependencia</Table.HeaderCell>
                <Table.HeaderCell>Secretario</Table.HeaderCell>
                <Table.HeaderCell>Coordinador</Table.HeaderCell>
                <Table.HeaderCell>Imagen</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {map(dependencias, (dependencia, index) =>(
              <Table.Row key={index}>
                <Table.Cell>{dependencia.nombreDependencia}</Table.Cell>
                <Table.Cell>{dependencia.nombreSecretario}</Table.Cell>
                <Table.Cell>{dependencia.nombreCoordinador}</Table.Cell>
                <Table.Cell width={2}><Image src= {dependencia.image} /></Table.Cell>
                
                <Actions 
                  dependencia = {dependencia} 
                  updateDependencia={updateDependencia} 
                  deleteDependencia={deleteDependencia}/>
              </Table.Row>
            ))}
        </Table.Body>

    </Table>
  );
}

function Actions(props){
  const {dependencia, updateDependencia, deleteDependencia } = props;


return(
  <Table.Cell textAlign='right'>
    <Button icon onClick = {() => updateDependencia(dependencia)}>
      <Icon name="pencil"/>
    </Button>
    <Button icon negative onClick = {() => deleteDependencia(dependencia)}>
      <Icon name="close"/>
    </Button>
  </Table.Cell>
);
}
