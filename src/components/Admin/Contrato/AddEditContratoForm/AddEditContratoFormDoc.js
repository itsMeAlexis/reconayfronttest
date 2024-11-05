import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Dropdown, Checkbox, Icon } from "semantic-ui-react";
import { map } from "lodash";
//import {useDropzone} from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDependencia, useContrato, useAuth } from "../../../../hooks";
import { useDropzone } from "react-dropzone";
import "./AddEditContratoForm.css";

export function AddEditContratoFormDoc(props) {
  const { onClose, onRefetch, contrato, onAddContrato, onUpdateContrato } =
    props;

  const [dependenciasFormat, setDepedenciasFormat] = useState([]);
  const { dependencias, getDependencias } = useDependencia();
  //const { addContrato, updateContrato } = useContrato();
  //console.log(contrato);

  //const [previewPdf, setPreviewPdf] = useState(contrato?.pdf1 || null);

  const [currentPdf, setCurrentPdf] = useState(contrato?.pdf1 || null); //Carga y edicion del PDF documentos
  //const initialValues = InitialValues(contrato, currentPdf);

  useEffect(() => {
    getDependencias();
  }, []);

  useEffect(() => {
    setDepedenciasFormat(formatDropdownData(dependencias));
  }, [dependencias]);

  //Carga y edicion del PDF documentos
  /*useEffect(() => {
    if (contrato?.pdf1) {
      setCurrentPdf({
        pdf1: contrato.pdf1,
        pdf2: contrato.pdf2,
        pdf3: contrato.pdf3,
        pdf4: contrato.pdf4,
        pdf5: contrato.pdf5,
        pdf6: contrato.pdf6,
        pdf7: contrato.pdf7,
        pdf8: contrato.pdf8,
        pdf9: contrato.pdf9,
      });
    }
  }, [contrato]);*/
  /*useEffect(() => {
    if (contrato?.pdf1) {
      setCurrentPdf(contrato.pdf1);
    }
  }, [contrato]);*/

  /*
  const handleDownloadPdf = async (pdfField) => {
    if (currentPdf && currentPdf[pdfField]) {
      try {
        let blobContent = currentPdf[pdfField];
  
        if (typeof currentPdf[pdfField] === "string") {
          // Si currentPdf es una URL, obtenemos el contenido del PDF
          const response = await fetch(currentPdf[pdfField]); // Realizar solicitud para obtener el contenido del PDF
          blobContent = await response.blob();
        }
  
        const blob = new Blob([blobContent]);
        const downloadLink = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const pdfName = contrato.nombrePdS; // Obtener el nombre del documento del campo nombrePdS
        const fileName = `${pdfName}_${pdfField}.pdf`; // Construir el nombre del archivo con el nombrePdS y la etiqueta
        a.href = downloadLink;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error al descargar el PDF:", error);
      }
    }
  };*/
  const handleDownloadPdf = async () => {
    if (currentPdf) {
      try {
        let blobContent = currentPdf;

        if (typeof currentPdf === "string") {
          // Si currentPdf es una URL, obtenemos el contenido del PDF
          const response = await fetch(currentPdf); // Realizar solicitud para obtener el contenido del PDF
          blobContent = await response.blob();
        }

        const blob = new Blob([blobContent]);
        const downloadLink = URL.createObjectURL(blob);
        const a = document.createElement("a");
        
        a.href = downloadLink;
        const fileName = "nombre_archivo.pdf";// Cambia esto al nombre deseado para el archivo descargado
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error al descargar el PDF:", error);
      }
    }
  };
/*
  const formik = useFormik({
    initialValues: InitialValues(contrato, currentPdf),
    validationSchema: Yup.object(contrato ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (contrato) {
          for (let i = 1; i <= 9; i++) {
            const pdfField = `pdf${i}`;
            if (currentPdf[pdfField] && currentPdf[pdfField] !== contrato[pdfField]) {
              formValue[pdfField] = currentPdf[pdfField];
            } else {
              formValue[pdfField] = null;
            }
          }
          eliminarArchivo({ id: contrato.id }).then(() => {});
          onUpdateContrato(formValue);
        } else {
          onAddContrato(formValue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });*/
  console.log("Datos del Formik",useFormik);
  const formik = useFormik({
    initialValues: InitialValues(contrato),
    validationSchema: Yup.object(contrato ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log("Valor de currentPdf:", currentPdf);
        if (currentPdf && currentPdf !== contrato.pdf1) {
          formValue.pdf1 = currentPdf;
        } else {
          formValue.pdf1 = null;
        }
        console.log("formValue con pdf1 actualizado:", formValue);
        //eliminarArchivo({ id: contrato.id }).then(() => {});
        onUpdateContrato(formValue);
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  /*const onDrop = (fieldName, acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const newCurrentPdf = { ...currentPdf };
      newCurrentPdf[fieldName] = file;
      setCurrentPdf(newCurrentPdf);
      formik.setFieldValue(fieldName, file);
    }
  };*/
  /*const onDrop = useCallback(
    async (acceptedFiles, fieldName) => {
      const file = acceptedFiles[0];
      const newCurrentPdf = { ...currentPdf };
      newCurrentPdf[fieldName] = file;
      setCurrentPdf(newCurrentPdf);
      await formik.setFieldValue(fieldName, file);
    },
    [currentPdf, formik]
  );*/
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // console.log(acceptedFile);
    console.log("Nuevo archivo:", file);
    await formik.setFieldValue("pdf1", file);
    setCurrentPdf(file);
    //setPreviewPdf(URL.createObjectURL(file));
    //console.log(file + "lourdes");
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  //Eliminar atchivo pdf
  // Agrega una función para eliminar el archivo
/*const eliminarArchivo = async (contrato) => {
  try {
    if (contrato && contrato.id) {
      console.log('Eliminando archivo para el contrato ID:', contrato.id);       
      const response = await fetch(`http://localhost:8000/api/eliminar_archivo/${contrato.id}/`, {
        //method: 'DELETE',
      });
      if (response.ok) {
        setCurrentPdf(null);
        formik.setFieldValue('pdf1', null);
        console.log('Archivo eliminado exitosamente');
      } else {
        console.error('Error al eliminar el archivo. Respuesta de red:', response);
      }
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
  }
}; */
const eliminarArchivo = async (contrato) => {
  try {
    if (contrato && contrato.id) {
      console.log('Eliminando archivo para el contrato ID:', contrato.id);  
      //await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch(`http://localhost:8000/api/eliminar_archivo/${contrato.id}/`, {
       
      });
      if (response.ok) {
        setCurrentPdf(null);

        formik.setFieldValue('pdf1', null);
        console.log('Archivo eliminado exitosamente');
      } else {
        console.error('Error al eliminar el archivo. Respuesta de red:', response);
      }
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
  }
};//console.log('Contrato ID:', contrato.id); 

  // fin del codigo para subir pdf
  //validar CURP
  function validarCURP(curp) {
    const curpRegex =
      /^[A-Z]{4}\d{6}[HM](AS|BC|BS|CC|CH|CL|CM|CS|DF|DG|GR|GT|HG|JC|MC|MN|MS|NE|NL|NT|OC|PL|QR|QT|SL|SP|SR|TC|TL|TS|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
    return curpRegex.test(curp.toUpperCase());
  }
  const validateCURP = (value) => {
    let error;
    if (!validarCURP(value)) {
      error = "C.U.R.P. Inválida";
    }
    return error;
  };

  const handleCURPChange = (e) => {
    const curpValue = e.target.value.slice(0, 18);
    formik.setFieldValue("curpdS", curpValue);
    formik.setFieldError("curpdS", validateCURP(curpValue));
  };
  // Fin de validar CURP

  // Validadicon del Folio de la INE

  function validarFolioINE(folio) {
    const folioRegex = /^\d{13}$/;
    return folioRegex.test(folio);
  }

  const validateFolioINE = (value) => {
    let error;
    if (!validarFolioINE(value)) {
      error = "Folio incorrecto";
    }
    return error;
  };

  const handleFolioINEChange = (e) => {
    const folioValue = e.target.value.slice(0, 13);
    formik.setFieldValue("inePdS", folioValue);
    formik.setFieldError("inePdS", validateFolioINE(folioValue));
  };

  // Fin Validadicon del Folio de la INE

  //validar RFC
  function validarRFC(rfc) {
    const rfcRegex = /^[A-Za-z]{4}\d{6}[A-Za-z0-9]{3}$/;
    return rfcRegex.test(rfc);
  }

  const validateRFC = (value) => {
    let error;
    if (!validarRFC(value)) {
      error = "R.F.C. Inválido";
    }
    return error;
  };

  const handleRFCChange = (e) => {
    const rfcValue = e.target.value.slice(0, 13);
    formik.setFieldValue("rfcPdS", rfcValue);
    formik.setFieldError("rfcPdS", validateRFC(rfcValue));
  };
  // Fin de validar RFC

  // console.log(contrato);
  const { auth } = useAuth();

  return (
    <Form className="add-edit-contrato-form" onSubmit={formik.handleSubmit}>
      
      <div className="details-container">           

        <div className="details-section4">
          <h3>
            Documentación Requerida del Prestador de Servicio Porfesional para
            dar de Alta el Contrato
          </h3>
        
          {/*Boton Acta de Nacimiento*/}
          <div>
            <h4>1.- Acta de Nacimiento</h4>
            <Form onSubmit={formik.handleSubmit} >
              <div className="ui buttons" >
             
                  <Button //Bonton para subir PDF                
                    type="button" 
                                     
                    color={formik.errors.pdf1 && "red"}
                    {...getRootProps()}                  
                    className="ui button"
                    
                    > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                  
                  </Button><div class="or"></div>              
                  <input {...getInputProps()} />
                  {currentPdf && ( // Renderizar información del PDF si existe
                    <div>
                      <a className="ui positive button" onClick={handleDownloadPdf}><Icon name="download" />
                        Descargar </a>                  
                    </div>
                  )}<div class="or"></div>
                  <div>
                      <Button className="ui negative button"
                        
                      /*  onClick={(e) => {
                          e.preventDefault();
                          console.log("Uno",currentPdf)
                          eliminarArchivo({ id: contrato.id }).then(() => {;
                          }); console.log("Despues de eliminar",currentPdf)
                         */
                          onClick={async () => {
                            //e.preventDefault();
                            try {
                            //  console.log("Uno", currentPdf);
                              await eliminarArchivo({ id: contrato.id });
                            //  console.log("Después de eliminar", currentPdf);
                            } catch (error) {
                              console.error("Error al eliminar el archivo:", error);
                            }    
                        }}
                        
                      >
                      <Icon name="close" />
                      Eliminar                      
                      </Button>               
                  </div>;
              </div> 
            </Form>
          </div>
          
        {/*
          <div style={{ margin: '20px' }}></div>

          {/* Boton INE 
          <div>
            <h4>1.- Acta de Nacimiento</h4>
            <Form onSubmit={formik.handleSubmit} >
              <div className="ui buttons" >
              
                  <Button //Bonton para subir PDF                
                    type="button"                  
                    color={formik.errors.pdf1 && "red"}
                    {...getRootProps()}                  
                    className="ui button"
                    
                    > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                  
                  </Button><div class="or"></div>              
                  <input {...getInputProps()} />
                  {currentPdf && ( // Renderizar información del PDF si existe
                    <div>
                      <a className="ui positive button" onClick={handleDownloadPdf}><Icon name="download" />
                        Descargar </a>                  
                    </div>
                )}<div class="or"></div>
                  <div>
                      <Button className="ui negative button"
                        onClick={() => {
                        // e.preventDefault();
                          eliminarArchivo({ id: contrato.id }).then(() => {;
                          });
                        }}
                        
                      >
                      <Icon name="close" />
                      Eliminar                      
                      </Button>               
                  </div>;
              </div>
            </Form>
          </div>


          <div style={{ margin: '20px' }}></div>

          <div>
          {/* Boton Comprobante de Domicilio 
          <div>
            <h4>3.- Comprobante de Domicilio (no mayor a 3 meses)</h4>
            <Form onSubmit={formik.handleSubmit}>
              <div className="ui buttons">
                <Button
                  type="button"
                  color={formik.errors.pdf1 && "red"}
                  {...getRootProps()}
                  className="ui button"
                >
                  <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                </Button>
                <div className="or"></div>
                <input {...getInputProps()} />
                {currentPdf && (
                  <div>
                    <a className="ui positive button" onClick={handleDownloadPdf}>
                      <Icon name="download" />
                      Descargar
                    </a>
                  </div>
                )}
                <div className="or"></div>
                <div>
                  <Button
                    className="ui negative button"
                    onClick={() => {
                      // Lógica para eliminar el archivo
                    }}
                  >
                    <Icon name="close" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          </div>

          <div style={{ margin: '20px' }}></div>

          {/*Boton RFC
          <div>
            <h4>5.- R.F.C.</h4>
          <Form onSubmit={formik.handleSubmit} >
            <div className="ui buttons" >
             
                <Button //Bonton para subir PDF                
                  type="button"                  
                  color={formik.errors.pdf1 && "red"}
                  {...getRootProps()}                  
                  className="ui button"
                  
                  > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                 
                </Button><div class="or"></div>              
                <input {...getInputProps()} />
                {currentPdf && ( // Renderizar información del PDF si existe
                  <div > 
                    <a className="ui positive button"  onClick={handleDownloadPdf}><Icon name="download" />
                      Descargar </a>                  
                  </div>
              )}<div class="or"></div>
                <div>
                    <Button className="ui negative button"
                      onClick={() => {
                       // e.preventDefault();
                        eliminarArchivo({ id: contrato.id }).then(() => {;
                        });
                      }}
                      
                    >
                    <Icon name="close" />
                    Eliminar                       
                    </Button>               
                </div>;
            </div>
          </Form>
          </div>

          <div style={{ margin: '20px' }}></div>

          {/*Boton Constancia de Situación Fiscal
          <div>
            <h4>6.- Constancia de Situación Fiscal.</h4>
          <Form onSubmit={formik.handleSubmit} >
            <div className="ui buttons" >
             
                <Button //Bonton para subir PDF                
                  type="button"                  
                  color={formik.errors.pdf1 && "red"}
                  {...getRootProps()}                  
                  className="ui button"
                  
                  > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                 
                </Button><div class="or"></div>              
                <input {...getInputProps()} />
                {currentPdf && ( // Renderizar información del PDF si existe
                  <div > 
                    <a className="ui positive button"  onClick={handleDownloadPdf}><Icon name="download" />
                      Descargar </a>                  
                  </div>
              )}<div class="or"></div>
                <div>
                    <Button className="ui negative button"
                      onClick={() => {
                       // e.preventDefault();
                        eliminarArchivo({ id: contrato.id }).then(() => {;
                        });
                      }}
                      
                    >
                    <Icon name="close" />
                    Eliminar                       
                    </Button>               
                </div>;
            </div>
          </Form>
          </div>

          <div style={{ margin: '20px' }}></div>
          
          {/*Boton Título
          <div>
            <h4>7.- Título.</h4>
          <Form onSubmit={formik.handleSubmit} >
            <div className="ui buttons" >
             
                <Button //Bonton para subir PDF                
                  type="button"                  
                  color={formik.errors.pdf1 && "red"}
                  {...getRootProps()}                  
                  className="ui button"
                  
                  > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                 
                </Button><div class="or"></div>              
                <input {...getInputProps()} />
                {currentPdf && ( // Renderizar información del PDF si existe
                  <div > 
                    <a className="ui positive button"  onClick={handleDownloadPdf}><Icon name="download" />
                      Descargar </a>                  
                  </div>
              )}<div class="or"></div>
                <div>
                    <Button className="ui negative button"
                      onClick={() => {
                       // e.preventDefault();
                        eliminarArchivo({ id: contrato.id }).then(() => {;
                        });
                      }}
                      
                    >
                    <Icon name="close" />
                    Eliminar                       
                    </Button>               
                </div>;
            </div>
          </Form>
          </div>

          <div style={{ margin: '20px' }}></div>

          {/*Boton Cedula Profesiona
          <div>
            <h4>8.- Cedula Profesiona.</h4>
          <Form onSubmit={formik.handleSubmit} >
            <div className="ui buttons" >
             
                <Button //Bonton para subir PDF                
                  type="button"                  
                  color={formik.errors.pdf1 && "red"}
                  {...getRootProps()}                  
                  className="ui button"
                  
                  > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                 
                </Button><div class="or"></div>              
                <input {...getInputProps()} />
                {currentPdf && ( // Renderizar información del PDF si existe
                  <div > 
                    <a className="ui positive button"  onClick={handleDownloadPdf}><Icon name="download" />
                      Descargar </a>                  
                  </div>
              )}<div class="or"></div>
                <div>
                    <Button className="ui negative button"
                      onClick={() => {
                       // e.preventDefault();
                        eliminarArchivo({ id: contrato.id }).then(() => {;
                        });
                      }}
                      
                    >
                    <Icon name="close" />
                    Eliminar                       
                    </Button>               
                </div>;
            </div>
          </Form>
          </div>

          <div style={{ margin: '20px' }}></div>

          {/*Boton Extra
          <div>
            <h4>9.- Hoja simple con número de teléfono y dirección personal de correo 
electronico.</h4>
          <Form onSubmit={formik.handleSubmit} >
            <div className="ui buttons" >
             
                <Button //Bonton para subir PDF                
                  type="button"                  
                  color={formik.errors.pdf1 && "red"}
                  {...getRootProps()}                  
                  className="ui button"
                  
                  > <Icon name="upload" />{currentPdf ? "Cambiar" : "Subir"}
                 
                </Button><div class="or"></div>              
                <input {...getInputProps()} />
                {currentPdf && ( // Renderizar información del PDF si existe
                  <div > 
                    <a className="ui positive button"  onClick={handleDownloadPdf}><Icon name="download" />
                      Descargar </a>                  
                  </div>
              )}<div class="or"></div>
                <div>
                    <Button className="ui negative button"
                      onClick={() => {
                       // e.preventDefault();
                        eliminarArchivo({ id: contrato.id }).then(() => {;
                        });
                      }}
                      
                    >
                    <Icon name="close" />
                    Eliminar                       
                    </Button>               
                </div>;
            </div>
          </Form>
          </div>
          */}
         </div>
        </div>
      
      
      <div className="details-section6">
        <Button
          type="submit"
          primary
          fluid
          content={contrato ? "Actualizar" : "Crear"}
        />
      </div>
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.nombreDependencia,
    value: item.id,
  }));
}

function InitialValues(data) {
  const { auth } = useAuth();
  //console.log(auth);
  return {
    noContrato: (data && data.noContrato) || "",
    impMensualBruto: data && data.impMensualBruto ? data.impMensualBruto : "",
    fechaOficio: data && data.fechaOficio ? data.fechaOficio : "",
    NoOficio: (data && data.NoOficio) || "",
    nombreSecretario: (data && data.nombreSecretario) || "",
    puestoSecretario: (data && data.puestoSecretario) || "",
    nombreSecretaria: (data && data.nombreSecretaria) || "",
    dependencia_id: (data && data.dependencia_id) || "",
    nombreSolicitante: (data && data.nombreSolicitante) || "",
    puestoSolicitante: (data && data.puestoSolicitante) || "",
    nombreTestigo: (data && data.nombreTestigo) || "",
    puestoTestigo: (data && data.puestoTestigo) || "",
    nombrePdS: (data && data.nombrePdS) || "",
    edadPdS: (data && data.edadPdS) || "",
    sexoPdS: (data && data.sexoPdS) || "",
    estadoCivilPdS: (data && data.estadoCivilPdS) || "",
    curpdS: (data && data.curpdS) || "",
    emailPdS: (data && data.emailPdS) || "",
    inePdS: (data && data.inePdS) || "",
    domicilioPdS: (data && data.domicilioPdS) || "",
    rfcPdS: (data && data.rfcPdS) || "",
    funcionesProf: (data && data.funcionesProf) || "",
    tituloProf: (data && data.tituloProf) || "",
    institucionExpTituloProf: (data && data.institucionExpTituloProf) || "",
    cedulaProf: (data && data.cedulaProf) || "",
    operativoProf: (data && data.operativoProf) || "",
    fechaCreacion: (data && data.fechaCreacion) || "",
    montoLetra: (data && data.montoLetra) || "",
    statusFirma: data && data.statusFirma ? true : false,
    statusCaptura: data && data.statusCaptura ? true : false,
    user_id: (data && data.user_id) || auth.me.id,
    user_nombre:
      (data && data.user_nombre) ||
      auth.me.first_name + " " + auth.me.last_name,
    fechaInicioContrato: (data && data.fechaInicioContrato) || "",
    fechaFinContrato: (data && data.fechaFinContrato) || "",
    telefonoPdS: (data && data.telefonoPdS) || "",
    pdf1: "",
    /*pdf2: "",
    pdf3: "",
    pdf4: "",
    pdf5: "",
    pdf6: "",
    pdf7: "",
    pdf8: "",
    pdf9: "",*/
  };
}

function newSchema() {
  return {
    noContrato: Yup.string(),
    impMensualBruto: Yup.number(),
    fechaOficio: Yup.string(),
    NoOficio: Yup.string(),
    nombreSecretario: Yup.string(),
    puestoSecretario: Yup.string(),
    nombreSecretaria: Yup.string(),
    dependencia_id: Yup.string(),
    nombreSolicitante: Yup.string(),
    puestoSolicitante: Yup.string(),
    nombreTestigo: Yup.string(),
    puestoTestigo: Yup.string(),
    nombrePdS: Yup.string(),
    edadPdS: Yup.string(),
    sexoPdS: Yup.string(),
    estadoCivilPdS: Yup.string(),
    curpdS: Yup.string(),
    emailPdS: Yup.string(),
    inePdS: Yup.string(),
    domicilioPdS: Yup.string(),
    rfcPdS: Yup.string(),
    funcionesProf: Yup.string(),
    tituloProf: Yup.string(),
    institucionExpTituloProf: Yup.string(),
    cedulaProf: Yup.string(),
    operativoProf: Yup.string(),
    fechaCreacion: Yup.string(),
    montoLetra: Yup.string(),
    statusFirma: Yup.boolean(),
    statusCaptura: Yup.boolean(),
    user_id: Yup.string(),
    user_nombre: Yup.string(),
    fechaInicioContrato: Yup.string(),
    fechaFinContrato: Yup.string(),
    telefonoPdS: Yup.string(),
    pdf1: Yup.string(),
    /*pdf2: Yup.string(),
    pdf3: Yup.string(),
    pdf4: Yup.string(),
    pdf5: Yup.string(),
    pdf6: Yup.string(),
    pdf7: Yup.string(),
    pdf8: Yup.string(),
    pdf9: Yup.string(),*/
  };
}

function updateSchema() {
  return {
    noContrato: Yup.string(),
    impMensualBruto: Yup.number(),
    fechaOficio: Yup.string(),
    NoOficio: Yup.string(),
    nombreSecretario: Yup.string(),
    puestoSecretario: Yup.string(),
    nombreSecretaria: Yup.string(),
    dependencia_id: Yup.number(),
    nombreSolicitante: Yup.string(),
    puestoSolicitante: Yup.string(),
    nombreTestigo: Yup.string(),
    puestoTestigo: Yup.string(),
    nombrePdS: Yup.string(),
    edadPdS: Yup.string(),
    sexoPdS: Yup.string(),
    estadoCivilPdS: Yup.string(),
    curpdS: Yup.string(),
    emailPdS: Yup.string(),
    inePdS: Yup.string(),
    domicilioPdS: Yup.string(),
    rfcPdS: Yup.string(),
    funcionesProf: Yup.string(),
    tituloProf: Yup.string(),
    institucionExpTituloProf: Yup.string(),
    cedulaProf: Yup.string(),
    operativoProf: Yup.string(),
    fechaCreacion: Yup.string(),
    montoLetra: Yup.string(),
    statusFirma: Yup.boolean(),
    statusCaptura: Yup.boolean(),
    user_id: Yup.string(),
    user_nombre: Yup.string(),
    fechaInicioContrato: Yup.string(),
    fechaFinContrato: Yup.string(),
    telefonoPdS: Yup.string(),
    pdf1: Yup.string(),
    /*pdf2: Yup.string(),
    pdf3: Yup.string(),
    pdf4: Yup.string(),
    pdf5: Yup.string(),
    pdf6: Yup.string(),
    pdf7: Yup.string(),
    pdf8: Yup.string(),
    pdf9: Yup.string(),*/
  };
}
