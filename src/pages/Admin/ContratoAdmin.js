import React, { useState, useEffect } from "react";
import { Loader, Icon } from "semantic-ui-react";
import {
  HeaderPage,
  TableContratoAdmin,
  AddEditContratoForm,
} from "../../components/Admin";
//import { ModalBasic } from "../../components/Common";
import { useContrato } from "../../hooks";
import "./estilos.css";

export function ContratoAdmin() {
  const [refetch, setRefetch] = useState(false);
  const {
    loading,
    contratos,
    getContratos,
    addContrato,
    updateContrato,
    deleteContrato,
  } = useContrato();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(null);

  useEffect(() => {
    getContratos();
  }, [refetch]);

  const onRefetch = () => setRefetch((prev) => !prev);

  const handleAddContrato = async (formValue) => {
    await addContrato(formValue);
    onRefetch();
    setShowAddForm(false);
  };

  const handleUpdateContrato = async (formValue) => {
    await updateContrato(selectedContrato.id, formValue);
    onRefetch();
    setShowAddForm(false);
  };

  const handleDeleteContrato = async (data) => {
    const result = window.confirm(`Eliminar Contrato? ${data.NoOficio}?`);
    if (result) {
      await deleteContrato(data.id);
      onRefetch();
    }
  };

  const openAddForm = () => {
    setSelectedContrato(null);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setSelectedContrato(null);
    setShowAddForm(false);
  };

  const openUpdateForm = (data) => {
    setSelectedContrato(data);
    setShowAddForm(true);
  };

  return (
    <div>
      <HeaderPage
        title="CONTRATO DE PERSONAL PROFESIONAL"
        btnTitle={showAddForm ? "Cancelar Cambios" : "Nuevo Contrato"}
        btnClick={showAddForm ? handleCancelForm : openAddForm}
        //btnClassName={showAddForm ? "btn-cancelar" : "btn-nuevo"}       
      />
      
 
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <>
          {!showAddForm && (
            <TableContratoAdmin
              contratos={contratos}
              updateContrato={openUpdateForm}
              deleteContrato={handleDeleteContrato}
            />
          )}

          {showAddForm && (
            <AddEditContratoForm
              onClose={handleCancelForm}
              onRefetch={onRefetch}
              onAddContrato={handleAddContrato}
              onUpdateContrato={handleUpdateContrato}
              contrato={selectedContrato}
              
            />
          )}
        </>
      )}
    </div>
  );
}
