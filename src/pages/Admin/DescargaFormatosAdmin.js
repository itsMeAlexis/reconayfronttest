import React, { useState, useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {
  HeaderPage, 
  TableContratoOperativoAdmin, 
  AddEditContratoOperativoForm
} from "../../components/Admin";
//import {ModalBasic} from "../../components/Common";
import {useContratoOperativo} from "../../hooks";


export function DescargaFormatosAdmin() {
 
  const [refetch, setRefetch] = useState(false);
  const { 
    loading, 
    contratoOperativos, 
    getContratoOperativos, 
    addContratoOperativo,
    updateContratoOperativo,
    deleteContratoOperativo
   } = useContratoOperativo();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(null);

 
  useEffect(()=>{
    getContratoOperativos();
  },[refetch]);


  const onRefetch = () => setRefetch((prev) => !prev);

   const handleAddContrato = async (formValue) => {
    await addContratoOperativo(formValue);
    onRefetch();
    setShowAddForm(false);
  };

  const handleUpdateContrato = async (formValue) => {
    await updateContratoOperativo(selectedContrato.id, formValue);
    onRefetch();
    setShowAddForm(false);
  };

  const handleDeleteContrato = async (data) => {
    const result = window.confirm(`Eliminar Contrato? ${data.NoOficio}?`);
    if (result) {
      await deleteContratoOperativo(data.id);
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
        title = "CONTRATO DE PERSONAL OPERATIVO" 
       btnTitle={showAddForm ? "Cancelar Cambios" : "Nuevo Contrato"}
        btnClick={showAddForm ? handleCancelForm : openAddForm}
    />
      {loading ? (
        <Loader active inline = "centered">
          Cargando...
        </Loader>
      ) : (
         <>
          {!showAddForm && (
            <TableContratoOperativoAdmin
            contratoOperativos={contratoOperativos}
            updateContratoOperativo={openUpdateForm}
            deleteContratoOperativo={handleDeleteContrato}
            />
          )}

          {showAddForm && (
            <AddEditContratoOperativoForm
              onClose={handleCancelForm}
              onRefetch={onRefetch}
              onAddContratoOperativo={handleAddContrato}
              onUpdateContratoOperativo={handleUpdateContrato}
              contratoOperativo={selectedContrato}
              
            />
          )}
        </>    
      )}
    </div>
  );
}
