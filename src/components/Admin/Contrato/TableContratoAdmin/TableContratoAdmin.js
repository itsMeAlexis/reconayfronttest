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
import {BASE_API} from "../../../../utils/constants";
//import {} from "./"

export function TableContratoAdmin(props) {
  const { contratos, updateContrato, deleteContrato } = props;
  const { auth } = useAuth();
  
  //console.log(auth.me);


  const userId = auth.me ? auth.me.id : null; // Obtener el ID del usuario actual
  const userAdmin = auth.me ? auth.me.is_staff : null;
  
  const userIdToFilter = userId; // El valor específico de user_id que deseas filtrar

  // Codigo para filtrar los usuarios por dependencia
  const userAdminToFilter = userAdmin;

  const filteredAndSortedContratos = [...contratos]
    .filter((contrato) =>  userAdminToFilter ? true : contrato.user_id == userIdToFilter)
    .sort((a, b) => a.nombrePdS.localeCompare(b.nombrePdS));

  // Estado para el término de búsqueda
  //const [fechaOficioSearchTerm, setFechaOficioSearchTerm] = useState("");
  const [mesSearchTerm, setMesSearchTerm] = useState("")
  const [semestreSearchTerm, setSemestreSearchTerm] = useState("");
  const [anioSearchTerm, setAnioSearchTerm] = useState("");
  //const [fechaInicioSearchTerm, setFechaInicioSearchTerm] = useState("");
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
  // Definición de semestres
  const semestre1 = ["01", "02", "03", "04", "05", "06"];
  const semestre2 = ["07", "08", "09", "10", "11", "12"];

  // Definición de meses
  const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const mesesPrimerSemestre = ["01", "02", "03", "04", "05", "06"];
  const mesesSegundoSemestre = ["07", "08", "09", "10", "11", "12"];

  // Determinar los meses a mostrar según el semestre seleccionado
  const obtenerMesesPorSemestre = () => {
    if (semestreSearchTerm === "1") {
      return mesesPrimerSemestre;
    } else if (semestreSearchTerm === "2") {
      return mesesSegundoSemestre;
    } else {
      return meses; // Si no hay semestre seleccionado, retorna todos los meses
    }
  };

  const mesesDisponibles = obtenerMesesPorSemestre();

  //filtro con mes y año
  const filteredContratos = filteredAndSortedContratos.filter((contrato) => {
    // Convertir fechaOficio a un objeto Date si existe y manejar nulos o indefinidos
    //const fechaOficio = contrato.fechaOficio ? new Date(contrato.fechaOficio) : null;
    // const mesAnioOficio = fechaOficio
    //   ? `${fechaOficio.getFullYear()}-${String(fechaOficio.getMonth() + 1).padStart(2, '0')}`
    //   : "";

    // Obtener fechaInicioContrato y dividirlo en anio y mes
    const fechaInicioContrato = contrato.fechaInicioContrato ? contrato.fechaInicioContrato : null;
    if (!fechaInicioContrato) return false;

    // Dividir fecha en año y mes
    const [anioInicioContrato, mesInicioContrato] = fechaInicioContrato.split('-');
    
    // Formato mes-año para comparaciones
    //const mesAnioInicioContrato = `${anioInicioContrato}-${mesInicioContrato}`;
      
    // Determinación del semestre
    const isSemestre1 = semestre1.includes(mesInicioContrato);
    const isSemestre2 = semestre2.includes(mesInicioContrato);


    // Determinación del semestre
    const semestre = isSemestre1 ? "1" : isSemestre2 ? "2" : "0"; // "0" si no es semestre 1 o 2
    //  console.log(fechaInicioContrato , mesAnioInicioContrato);
    
  
    return (
      (mesInicioContrato === mesSearchTerm || mesSearchTerm === "") && // Permitir todos si no hay mes
      (anioInicioContrato === anioSearchTerm || anioSearchTerm === "") && // Permitir todos si no hay año
      (semestre === semestreSearchTerm || semestreSearchTerm === "") && // Permitir todos si semestreSearchTerm es "0"
      // anioOficio.includes(anioSearchTerm) &&
      //mesAnioOficio.includes(fechaOficioSearchTerm) &&
      (contrato.nombrePdS?.toLowerCase() || "").includes(nombrePdSSearchTerm.toLowerCase()) &&
      (contrato.nombreSecretaria?.toLowerCase() || "").includes(nombreDependenciaSearchTerm.toLowerCase())
    );
  });
  
  

  const downloadPDFFIN = async (contratoId,nombrePrestador) => {
    try {
      //const url = `https://reconay-api.nayarit.gob.mx/api/generar_pdf_fin/${contratoId}/`;
      const url = `${BASE_API}/api/generar_pdf_fin/${contratoId}/`;
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
      const url = `${BASE_API}/api/generar_pdf/${contratoId}/`;
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
        

        {/* Búsqueda por Ejercicio Fiscal */}
        <div className="search-input">
          <label htmlFor="semestreSearchInput">Ejercicio Fiscal:</label>
          <div className="ui action input" id="filtro-fiscal">
            <select
              id="anioSearchInput"
              value={anioSearchTerm}
              onChange={(event) => {
                const selectedAnio = event.target.value;
                setAnioSearchTerm(selectedAnio);
              }}
              className="ui dropdown"
            >
              <option value="">Selecciona un año(Todos los años)</option>
              {Array.from({ length: 5 }).map((_, index) => (
                <option key={index} value={new Date().getFullYear() + 1 - index}>
                  {new Date().getFullYear() + 1 - index}
                </option>
              ))}
            </select>
            <select
              id="semestreSearchInput"
              value={semestreSearchTerm}
              onChange={(event) => {
                setSemestreSearchTerm(event.target.value);
                setMesSearchTerm("");
              }}
              className="ui dropdown"
            >
              <option value="">Seleccione un semestre (Todos los semestres)</option>
              <option value="1">1° Semestre</option>
              <option value="2">2° Semestre</option>
            </select>
            <select
              id="mesSearchInput"
              value={mesSearchTerm}
              onChange={(event) => setMesSearchTerm(event.target.value)}
              className="ui dropdown"
              disabled={mesesDisponibles.length === 0} // Deshabilitar si no hay meses disponibles
            >
              <option value="">Seleccione un mes (Todos los meses)</option>
              {mesesDisponibles.map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
            <button className="ui icon button">
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
