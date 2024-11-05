import React, { useState, useCallback } from "react";
import {
  Table,
  Button,
  Icon,
  Image,
  Modalk,
  Pagination,
} from "semantic-ui-react";
import { map } from "lodash";
import "./TableContratoAdmin.css";
import { useAuth } from "../../../../hooks";
import { saveAs } from "file-saver";
import numeral from "numeral";
//import {} from "./"

export function TableContratoAdmin(props) {
  const { contratos, updateContrato, deleteContrato } = props;
  const { auth } = useAuth();
  
  console.log(auth.me);


  const userId = auth.me ? auth.me.id : null; // Obtener el ID del usuario actual
  const userAdmin = auth.me ? auth.me.is_staff : null;
  
  const userIdToFilter = userId; // El valor específico de user_id que deseas filtrar

  // Codigo para filtrar los usuarios por dependencia
  const userAdminToFilter = userAdmin;

  const filteredAndSortedContratos = [...contratos]
    .filter((contrato) =>  userAdminToFilter ? true : contrato.user_id == userIdToFilter)
    .sort((a, b) => a.nombrePdS.localeCompare(b.nombrePdS));

  // Estado para el término de búsqueda
  const [fechaOficioSearchTerm, setFechaOficioSearchTerm] = useState("");
  const [fechaInicioSearchTerm, setFechaInicioSearchTerm] = useState("");
  const [nombrePdSSearchTerm, setnombrePdSSearchTerm] = useState("");
  const [nombreDependenciaSearchTerm, setNombreDependenciaSearchTerm] =
    useState("");

  // Función para manejar cambios en el término de búsqueda
  const handleSearchChange = useCallback((event) => {
    setnombrePdSSearchTerm(event.target.value);
    //setActivePage(1); // Reiniciar la página activa al cambiar la búsqueda
  }, []);

  // Función para realizar la búsqueda al presionar Enter
  const handleSearchKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      //setActivePage(1); // Reiniciar la página activa al realizar una búsqueda
    }
  }, []);

  // Filtrar los contratos según el término de búsqueda
  // const filteredContratos = filteredAndSortedContratos.filter(
  //   (contrato) =>
  //     contrato.nombrePdS
  //       .toLowerCase()
  //       .includes(nombrePdSSearchTerm.toLowerCase()) &&
  //     contrato.nombreSecretaria
  //       .toLowerCase()
  //       .includes(nombreDependenciaSearchTerm.toLowerCase())
  // );

  //Filtro con día, mes y año
  // const filteredContratos = filteredAndSortedContratos.filter((contrato) => {
  //   // Convertir la fechaOficio a un objeto Date si existe, y manejar nulos o indefinidos
  //   const fechaOficio = contrato.fechaOficio
  //     ? new Date(contrato.fechaOficio).toISOString().slice(0, 10)
  //     : "";

  //   // Convertir la fechaInicioContrato a un objeto Date si existe, y manejar nulos o indefinidos
  //   const fechaInicioContrato = contrato.fechaInicioContrato
  //     ? new Date(contrato.fechaInicioContrato).toISOString().slice(0, 10)
  //     : "";

  //   return (
  //     fechaInicioContrato.includes(fechaInicioContratoSearchTerm) &&
  //     fechaOficio.includes(fechaOficioSearchTerm) &&
  //     (contrato.nombrePdS?.toLowerCase() || "").includes(
  //       nombrePdSSearchTerm.toLowerCase()
  //     ) &&
  //     (contrato.nombreSecretaria?.toLowerCase() || "").includes(
  //       nombreDependenciaSearchTerm.toLowerCase()
  //     )
  //   );
  // });

  //filtro con mes y año
  const filteredContratos = filteredAndSortedContratos.filter((contrato) => {
    // Convertir fechaOficio a un objeto Date si existe y manejar nulos o indefinidos
    const fechaOficio = contrato.fechaOficio ? new Date(contrato.fechaOficio) : null;
    const mesAnioOficio = fechaOficio
      ? `${fechaOficio.getFullYear()}-${String(fechaOficio.getMonth() + 1).padStart(2, '0')}`
      : "";
  
    // Convertir fechaInicioContrato a un objeto Date si existe y manejar nulos o indefinidos
    const fechaInicioContrato = contrato.fechaInicioContrato ? new Date(contrato.fechaInicioContrato) : null;
    const mesAnioInicioContrato = fechaInicioContrato
      ? `${fechaInicioContrato.getFullYear()}-${String(fechaInicioContrato.getMonth() + 1).padStart(2, '0')}`
      : "";
    
  
    return (
      mesAnioInicioContrato.includes(fechaInicioSearchTerm) &&
      mesAnioOficio.includes(fechaOficioSearchTerm) &&
      (contrato.nombrePdS?.toLowerCase() || "").includes(nombrePdSSearchTerm.toLowerCase()) &&
      (contrato.nombreSecretaria?.toLowerCase() || "").includes(nombreDependenciaSearchTerm.toLowerCase())
    );
  });
  
  

  const downloadPDFFIN = async (contratoId,nombrePrestador) => {
    try {
      //const url = `https://reconay-api.nayarit.gob.mx/api/generar_pdf_fin/${contratoId}/`;
      const url = `http://:8000/api/generar_pdf_fin/${contratoId}/`;
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, `${nombrePrestador}_Prof_FT.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const downloadPDF = async (contratoId, nombrePrestador) => {
    try {
      //const url = `https://reconay-api.nayarit.gob.mx/api/generar_pdf/${contratoId}/`;
      const url = `http://localhost:8000/api/generar_pdf/${contratoId}/`;
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, `${nombrePrestador}_Prof_FT.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      {/* Campo de búsqueda para Nombre de Prestador de Servicio */}
      <div className="search-container">
        <div className="search-input">
          <label htmlFor="nombrePdSSearchInput">Prestador de Servicio:</label>
          <div className="ui action input">
            <input
              id="nombrePdSSearchInput"
              type="text"
              placeholder="Ingrese el nombre del Prestador de Servicio..."
              value={nombrePdSSearchTerm}
              onChange={(event) => setnombrePdSSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown} // Manejar la pulsación de tecla Enter
              className="wider-input" // Agrega la clase "big" para hacer el input más grande
            />
            <button className="ui icon button">
              <i className="search icon"></i>
            </button>
          </div>
        </div>

        {/* Campo de búsqueda para Nombre de la Dependencia */}
        <div className="search-input">
          <label htmlFor="nombreDependenciaSearchInput">Dependencia:</label>
          <div className="ui action input">
            <input
              id="nombreDependenciaSearchInput"
              type="text"
              placeholder="Ingrese el nombre de la Dependencia..."
              value={nombreDependenciaSearchTerm}
              onChange={(event) =>
                setNombreDependenciaSearchTerm(event.target.value)
              }
              onKeyDown={handleSearchKeyDown} // Manejar la pulsación de tecla Enter
              className="wider-input" // Agrega la clase "big" para hacer el input más grande
            />
            <button className="ui icon button">
              <i className="search icon"></i>
            </button>
          </div>
        </div>
        {/* Busqueda por fecha "fechaOficio" con dia, mes y año
        <div className="search-input">
          <label htmlFor="fechaOficioSearchInput">Fecha de Oficio:</label>
          <div className="ui action input">
            <input
              id="fechaOficioSearchInput"
              type="date"
              placeholder="Ingrese la fecha de oficio..."
              value={fechaOficioSearchTerm}
              onChange={(event) => setFechaOficioSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown} // Manejar la pulsación de tecla Enter
              className="wider-input" // Agrega la clase "wider-input" para hacer el input más grande
            />
            <button className="ui icon button">
              <i className="search icon"></i>
            </button>
          </div>
        </div> */}
        {/* Búsqueda por fecha "fechaOficio" con mes y año */}
        <div className="search-input">
          <label htmlFor="fechaOficioSearchInput">Fecha de Oficio (Mes y Año):</label>
          <div className="ui action input">
            <input
              id="fechaOficioSearchInput"
              type="month" // Cambia el tipo a "month" para permitir la selección de mes y año
              placeholder="Ingrese el mes y año de oficio..."
              value={fechaOficioSearchTerm}
              onChange={(event) => setFechaOficioSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown} // Mantén la función para manejar Enter
              className="wider-input" // Clase para el estilo personalizado
            />
            <button className="ui icon button"> {/* Asocia la búsqueda al botón */}
              <i className="search icon"></i>
            </button>
          </div>
        </div>

        {/* Busqueda por fecha "fechaInicioContrato" por mes y año*/}
        <div className="search-input">
          <label htmlFor="fechaInicioSearchInput">Fecha de Inicio (Mes y Año):</label>
          <div className="ui action input">
            <input
              id="fechaInicioSearchInput"
              type="month" // Cambia el tipo a "month" para permitir la selección de mes y año
              placeholder="Ingrese el mes y año de inicio de contrato..."
              value={fechaInicioSearchTerm}
              onChange={(event) => setFechaInicioSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown} // Mantén la función para manejar Enter
              className="wider-input" // Clase para el estilo personalizado
            />
            <button className="ui icon button"> {/* Asocia la búsqueda al botón */}
              <i className="search icon"></i>
            </button>
          </div>
        </div>
      </div>

      <Table className="table-contrato-admin">
        <Table.Header>
          <Table.Row>
            {auth.me && auth.me.is_staff && (
            <Table.HeaderCell className="center aligned">
              Firmado
            </Table.HeaderCell>
            )}
            <Table.HeaderCell className="center aligned">
              Capturado
            </Table.HeaderCell>
            <Table.HeaderCell>Prestador de Servicio</Table.HeaderCell>
            <Table.HeaderCell>Dependencia</Table.HeaderCell>
            <Table.HeaderCell>Titular del Área Solicitante</Table.HeaderCell>
            <Table.HeaderCell className="center aligned">
              Monto del Contrato
            </Table.HeaderCell>            
            <Table.HeaderCell>Usuario</Table.HeaderCell>
            {/*<Table.HeaderCell>Id Usuario</Table.HeaderCell>*/}
            {auth.me && auth.me.is_staff && (             
              <Table.HeaderCell className="center aligned">Ficha Técnica</Table.HeaderCell>
              )}
            {auth.me && auth.me.is_staff && (
            <Table.HeaderCell className="center aligned">
              Contrato
            </Table.HeaderCell>
            )}
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredContratos.map((contrato, index) => (
            <Table.Row key={index}>
            {auth.me && auth.me.is_staff && (
              <Table.Cell className="status" style={{ textAlign: "center" }}>
                {contrato.statusFirma ? (
                  <Icon name="check" />
                ) : (
                  <Icon name="close" />
                )}
              </Table.Cell>
              )}
              <Table.Cell className="status" style={{ textAlign: "center" }}>
                {contrato.statusCaptura ? (
                  <Icon name="check" />
                ) : (
                  <Icon name="close" />
                )}
              </Table.Cell>
              <Table.Cell>{contrato.nombrePdS}</Table.Cell>
              <Table.Cell>{contrato.nombreSecretaria}</Table.Cell>
              <Table.Cell>{contrato.nombreSolicitante}</Table.Cell>
              <Table.Cell style={{ textAlign: "center" }}>
                {numeral(contrato.impMensualBruto).format("$0,0.00")}
              </Table.Cell>
              <Table.Cell>{contrato.user_nombre}</Table.Cell>
              {/*<Table.Cell>{contrato.user_id}</Table.Cell>*/}

              {auth.me && auth.me.is_staff && (
                <Table.Cell style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => downloadPDFFIN(contrato.id, contrato.nombrePdS)}
                  >
                    <Icon name="download" />
                  </Button>
                </Table.Cell>
              )}
              {auth.me && auth.me.is_staff && (            
                <Table.Cell style={{ textAlign: "center" }}>
                  <Button onClick={() => downloadPDF(contrato.id, contrato.nombrePdS)}>
                      <Icon name="download" />
                  </Button>
                </Table.Cell>
                )}

              <Actions
                contrato={contrato}
                updateContrato={updateContrato}
                deleteContrato={deleteContrato}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/*} <Pagination
          activePage={activePage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
                ></Pagination>*/}

      {filteredContratos.length === 0 && <p>No se encontraron contratos.</p>}
    </div>
  );
}

function Actions(props) {
  const { contrato, updateContrato, deleteContrato } = props;
  return (
    <Table.Cell textAlign="right">
      <Button
        icon
        onClick={() => updateContrato(contrato)}
        style={{ backgroundColor: "#F6AF19", color: "#fff" }}
      >
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteContrato(contrato)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
