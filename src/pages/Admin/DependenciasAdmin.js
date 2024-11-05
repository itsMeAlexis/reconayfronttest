import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableDependenciaAdmin, AddEditDependenciaForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useDependencia } from "../../hooks";

export function DependenciasAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, dependencias, getDependencias, deleteDependencia } = useDependencia();

  useEffect(() => {
    getDependencias();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addDependencia = () => {
    setTitleModal("Nueva Dependencia");
    setContentModal(<AddEditDependenciaForm onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  };

  const updateDependencia = (data) => {
    setTitleModal("Actualizar Categoria");
    setContentModal(
      <AddEditDependenciaForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        dependencia={data}
      />  
    );
    openCloseModal();
  }

  const onDeleteDependencia = async (data) =>{
    const result = window.confirm(`Eliminar Dependencia? ${data.nombreDependencia}?`);
    if(result){
      await deleteDependencia(data.id);
      onRefetch();
    }
  }

  return (
    <div>
      <HeaderPage title="Dependencia" btnTitle="Nueva Dependencia"  btnClick={addDependencia}/>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableDependenciaAdmin 
          dependencias={dependencias} 
          updateDependencia={updateDependencia}  
          deleteDependencia={onDeleteDependencia} 
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </div>
  );
}
