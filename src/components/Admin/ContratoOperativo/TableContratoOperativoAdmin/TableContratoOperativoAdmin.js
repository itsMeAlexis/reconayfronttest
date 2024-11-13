import React, { useState, useCallback }  from "react";
import { Table,
  Button,
  Icon,
  Image,
  Modalk,
  Pagination, } from "semantic-ui-react";
import { map } from "lodash";
import "./TableContratoOperativoAdmin.css";
import {useAuth} from "../../../../hooks";
import { Link } from 'react-router-dom'; //link
import { saveAs } from "file-saver";
import numeral from 'numeral';
import {BASE_API} from "../../../../utils/constants";

export function TableContratoOperativoAdmin(props) {
  const {contratoOperativos, updateContratoOperativo, deleteContratoOperativo} = props;

  const {auth} = useAuth();

  const userId = auth.me ? auth.me.id : null; // Obtener el ID del usuario actual
  const userAdmin = auth.me ? auth.me.is_staff : null;
  
  const userIdToFilter = userId; // El valor específico de user_id que deseas filtrar

  // Codigo para filtrar los usuarios por dependencia
  const userAdminToFilter = userAdmin;

  const filteredAndSortedContratoOperativos = [...contratoOperativos]
    .filter((contratoOperativos) =>  userAdminToFilter ? true : contratoOperativos.user_id == userIdToFilter)
    .sort((a, b) => a.nombrePdS.localeCompare(b.nombrePdS));


  const sortedContratoOperativos = [...contratoOperativos].sort((a, b) => a.nombrePdS.localeCompare(b.nombrePdS));
  
  
  //console.log(auth);

  // Estado para el término de búsqueda
  //const [fechaOficioSearchTerm, setFechaOficioSearchTerm] = useState("");
  const [mesSearchTerm, setMesSearchTerm] = useState("")
  const [semestreSearchTerm, setSemestreSearchTerm] = useState("");
  const [anioSearchTerm, setAnioSearchTerm] = useState("");
  //const [fechaInicioSearchTerm, setFechaInicioSearchTerm] = useState("");
  const [nombrePdSSearchTerm, setnombrePdSSearchTerm] = useState("");
  const [nombreDependenciaSearchTerm, setNombreDependenciaSearchTerm] = useState("");


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
//   const filteredContratoOperativos = filteredAndSortedContratoOperativos.filter((contrato) =>
//   contrato.nombrePdS.toLowerCase().includes(nombrePdSSearchTerm.toLowerCase()) &&
//   contrato.nombreSecretaria.toLowerCase().includes(nombreDependenciaSearchTerm.toLowerCase())
// );
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


const filteredContratoOperativos = filteredAndSortedContratoOperativos.filter((contrato) => {
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


const downloadPDF_OperativoFIN = async (contratoOperativoId,nombrePdS) => {
  try {
    const url = `${BASE_API}/api/generar_pdf_operativofin/${contratoOperativoId}/`;
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, `${nombrePdS}_OP_FT.pdf`);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
   
  const downloadPDF_Operativo = async (contratoOperativoId,nombrePdS) => {
    try {
      const url = `${BASE_API}/api/generar_pdf_operativo/${contratoOperativoId}/`;
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, `${nombrePdS}_OP_FT.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  

  /*const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };*/

  return (
      <div>
        {/* Agregar el input de búsqueda */}
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
                style={{ backgroundColor: "#EB6A42" }}
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
              onChange={(event) => setNombreDependenciaSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown} // Manejar la pulsación de tecla Enter
              className="wider-input" // Agrega la clase "big" para hacer el input más grande
            />
            <button className="ui icon button">
                <i className="search icon"></i>
            </button>
          </div>
        </div>
        {/* Búsqueda por fecha "fechaOficio" con mes y año */}
        {/* <div className="search-input">
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
            <button className="ui icon button"> 
              <i className="search icon"></i>
            </button>
          </div>
        </div> */}

        {/* Búsqueda por semestre y año */}
        <div className="search-input">
          <label htmlFor="semestreSearchInput">Ejercicio Fiscal:</label>
          <div className="ui action input">
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
              <option value="">Todo el año (semestre)</option>
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



        {/* Busqueda por fecha "fechaInicioContrato" por mes y año*/}
        {/* <div className="search-input">
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
            <button className="ui icon button">
              <i className="search icon"></i>
            </button>
          </div>
        </div>  */}
      </div>
        <Table className="tab-contratooperativo-admin">
          <Table.Header>
            <Table.Row>
              {auth.me && auth.me.is_staff && ( 
              <Table.HeaderCell className="center aligned">Firmado</Table.HeaderCell>
              )}
              <Table.HeaderCell className="center aligned">Capturado</Table.HeaderCell>
              <Table.HeaderCell >Prestador de Servicios</Table.HeaderCell>
              <Table.HeaderCell >Dependencia</Table.HeaderCell>
              <Table.HeaderCell >Titular del Área Solicitante</Table.HeaderCell>              
              <Table.HeaderCell className="center aligned">Monto del Contrato</Table.HeaderCell>
              <Table.HeaderCell >Usuario</Table.HeaderCell> 
              {auth.me && auth.me.is_staff && (             
              <Table.HeaderCell className="center aligned">Ficha Técnica</Table.HeaderCell>
              )}
              {auth.me && auth.me.is_staff && (             
              <Table.HeaderCell className="center aligned">Contrato</Table.HeaderCell>
              )}
             
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>            
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredContratoOperativos.map((contratoOperativo, index) => (
              <Table.Row key={index}>

                {auth.me && auth.me.is_staff && ( 
                <Table.Cell className="status" style={{ textAlign: "center" }}> 
                  {contratoOperativo.statusFirma ? <Icon name="check" /> : <Icon name="close" />}
                </Table.Cell>
                )}

                <Table.Cell className="status" style={{ textAlign: "center" }}>
                  {contratoOperativo.statusCaptura ? <Icon name="check" /> : <Icon name="close" />}
                </Table.Cell>

                <Table.Cell>{contratoOperativo.nombrePdS}</Table.Cell>
                <Table.Cell>{contratoOperativo.nombreSecretaria}</Table.Cell>
                <Table.Cell>{contratoOperativo.nombreSolicitante}</Table.Cell>   

                <Table.Cell style={{ textAlign: "center" }}>{numeral(contratoOperativo.impMensualBruto).format("$0,0.00")}</Table.Cell>
                <Table.Cell>{contratoOperativo.user_nombre}</Table.Cell>  

                {auth.me && auth.me.is_staff && (            
                <Table.Cell style={{ textAlign: "center" }}>
                  <Button onClick={() => downloadPDF_OperativoFIN(contratoOperativo.id, contratoOperativo.nombrePdS)}>
                      <Icon name="download" />
                  </Button>
                </Table.Cell>
                )}

                {auth.me && auth.me.is_staff && (            
                <Table.Cell style={{ textAlign: "center" }}>
                  <Button onClick={() => downloadPDF_Operativo(contratoOperativo.id, contratoOperativo.nombrePdS)}>
                      <Icon name="download" />
                  </Button>
                </Table.Cell>
                )}

                <Actions ContratoOperativo={contratoOperativo} updateContratoOperativo={updateContratoOperativo} deleteContratoOperativo={deleteContratoOperativo}  />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/*<Pagination
            activePage={activePage}
            onPageChange={handlePageChange}
            totalPages={Math.ceil(filteredContratoOperativos.length / itemsPerPage)}></Pagination>*/}
   
            {filteredContratoOperativos.length === 0 && <p>No se encontraron contratos.</p>}
    </div> 

      );}

function Actions(props) {
  const { ContratoOperativo, updateContratoOperativo, deleteContratoOperativo } = props;
  return (
    <Table.Cell textAlign="right">      
      <Button icon onClick={() => updateContratoOperativo(ContratoOperativo)}
      style={{ backgroundColor: '#F6AF19', color: '#fff' }}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteContratoOperativo(ContratoOperativo)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}

