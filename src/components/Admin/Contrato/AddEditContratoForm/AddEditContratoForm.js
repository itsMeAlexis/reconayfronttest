import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Dropdown, Checkbox, Icon } from "semantic-ui-react";
import { map } from "lodash";
//import {useDropzone} from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDependencia, useContrato, useAuth } from "../../../../hooks";
import { useDropzone } from "react-dropzone";
import "./AddEditContratoForm.css";

export function AddEditContratoForm(props) {
  const {
    onClose,
    onRefetch,
    contrato,
    onAddContrato,
    onUpdateContrato,
    //updateContrato,
  } = props;

  const [dependenciasFormat, setDepedenciasFormat] = useState([]);
  const { dependencias, getDependencias } = useDependencia();
  const [isOpen, setIsOpen] = useState(true);

  const [currentPdf, setCurrentPdf] = useState({
    pdf1: contrato?.pdf1 || null,
    pdf2: contrato?.pdf2 || null,
    pdf3: contrato?.pdf3 || null,
    pdf4: contrato?.pdf4 || null,
    pdf5: contrato?.pdf5 || null,
    pdf6: contrato?.pdf6 || null,
    pdf7: contrato?.pdf7 || null,
    pdf8: contrato?.pdf8 || null,
    pdf9: contrato?.pdf9 || null,
  }); //Carga y edicion del PDF documentos

  useEffect(() => {
    getDependencias();
  }, []);

  useEffect(() => {
    setDepedenciasFormat(formatDropdownData(dependencias));
  }, [dependencias]);

  const handleDownloadPdf = async (pdfKey, nombrePdS) => {
    if (currentPdf[pdfKey]) {
      try {
        let blobContent = currentPdf[pdfKey];

        if (typeof currentPdf[pdfKey] === "string") {
          // Si currentPdf es una URL, obtenemos el contenido del PDF
          const response = await fetch(currentPdf[pdfKey]); // Realizar solicitud para obtener el contenido del PDF
          blobContent = await response.blob();
        }

        const blob = new Blob([blobContent]);
        const downloadLink = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = downloadLink;
        const fileName = `${nombrePdS}.pdf`; // Cambia esto al nombre deseado para el archivo descargado
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error al descargar el PDF:", error);
      }
    }
  };

  console.log("Datos del Formik", useFormik);
  console.log("vista del setcurrenpdf", setCurrentPdf);
  const formik = useFormik({
    initialValues: InitialValues(contrato),
    validationSchema: Yup.object(contrato ? updateSchema() : newSchema()),

    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const updatedFormValue = { ...formValue };

        Object.keys(currentPdf).forEach((pdfKey) => {
          if (currentPdf[pdfKey] && currentPdf[pdfKey] !== contrato[pdfKey]) {
            updatedFormValue[pdfKey] = currentPdf[pdfKey];
          } else {
            updatedFormValue[pdfKey] = null;
          }
        });
        console.log("vista del fromvalue", formValue);
        //await eliminarArchivo(contrato); // Elimina los archivos antes de guardar
        if (contrato) onUpdateContrato(updatedFormValue);
        else onAddContrato(formValue);
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const cerrarFormulario = () => {
    setIsOpen(false);
    onRefetch();
    onClose();
  };

  const handleUploadPdf = async (pdfKey, file, customFileName) => {
    const modifiedFile = new File([file], customFileName, { type: file.type });
    await formik.setFieldValue(pdfKey, modifiedFile); // carga el campo del formulario pero no la BD
    setCurrentPdf((prevPdfs) => ({ ...prevPdfs, [pdfKey]: modifiedFile })); //carga el pdf en bd
  };

  const onDropPdf1 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "ActaNacimiento";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf1", file, customFileName);
  }, []);

  const onDropPdf2 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "INE";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf2", file, customFileName);
  }, []);

  const onDropPdf3 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "ComprobanteD";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf3", file, customFileName);
  }, []);

  const onDropPdf4 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "CURP";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf4", file, customFileName);
  }, []);

  const onDropPdf5 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "RFC";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf5", file, customFileName);
  }, []);

  const onDropPdf6 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "ConstaciaSF";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf6", file, customFileName);
  }, []);

  const onDropPdf7 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "Titulo";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf7", file, customFileName);
  }, []);

  const onDropPdf8 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "CedulaP";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf8", file, customFileName);
  }, []);

  const onDropPdf9 = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Genera el nombre personalizado del archivo
    const nombrePdS = contrato.nombrePdS; // Obtén este valor de la base de datos
    const etiqueta = "ContratoFirmado";
    const customFileName = `${nombrePdS}_${etiqueta}.pdf`;
    await handleUploadPdf("pdf9", file, customFileName);
  }, []);

  const { getRootProps: getRootPropsPdf1, getInputProps: getInputPropsPdf1 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf1,
    });

  const { getRootProps: getRootPropsPdf2, getInputProps: getInputPropsPdf2 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf2,
    });

  const { getRootProps: getRootPropsPdf3, getInputProps: getInputPropsPdf3 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf3,
    });

  const { getRootProps: getRootPropsPdf4, getInputProps: getInputPropsPdf4 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf4,
    });

  const { getRootProps: getRootPropsPdf5, getInputProps: getInputPropsPdf5 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf5,
    });

  const { getRootProps: getRootPropsPdf6, getInputProps: getInputPropsPdf6 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf6,
    });

  const { getRootProps: getRootPropsPdf7, getInputProps: getInputPropsPdf7 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf7,
    });

  const { getRootProps: getRootPropsPdf8, getInputProps: getInputPropsPdf8 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf8,
    });

  const { getRootProps: getRootPropsPdf9, getInputProps: getInputPropsPdf9 } =
    useDropzone({
      accept: "application/pdf",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropPdf9,
    });

  const eliminarArchivo = async (contrato, pdfKey) => {
    try {
      if (contrato && contrato.id) {
        console.log(
          `Eliminando archivo ${pdfKey} para el contrato ID:`,
          contrato.id
        );
        const response = await fetch(
          `http://localhost:8000/api/eliminar_archivo/${contrato.id}/${pdfKey}/`,
          {
            //method: 'DELETE', // Cambiamos a método DELETE
          }
        );
        if (response.ok) {
          setCurrentPdf((prevPdf) => ({ ...prevPdf, [pdfKey]: null }));
          formik.setFieldValue(pdfKey, null);
          console.log(`Archivo ${pdfKey} eliminado exitosamente`);
        } else {
          console.error(
            `Error al eliminar el archivo ${pdfKey}. Respuesta de red:`,
            response
          );
        }
      }
    } catch (error) {
      console.error(`Error al eliminar el archivo ${pdfKey}:`, error);
    }
  };

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
    <div>
      {isOpen && (
        <Form className="add-edit-contrato-form" onSubmit={formik.handleSubmit}>
          {auth.me && auth.me.is_staff && (
            <Form.Input
              label="Número de Contrato"
              type="text"
              name="noContrato"
              placeholder="Numero de Contrato"
              value={formik.values.noContrato}
              onChange={formik.handleChange}
              error={formik.errors.noContrato}
            />
          )}
          
            <div className="details-section1">
              <h3>DETALLES DEL CONTRATO</h3>
              <div class="five wide field">
                  <Form.Field>
                    <label>Tipo de Contrato:</label>
                    <Form.Select
                      name="tipoContrato"
                      placeholder="Tipo de Contrato"
                      value={formik.values.tipoContrato}
                      options={[
                        {
                          key: "default",
                          text: "Seleccione Tipo Contrato",
                          value: "",
                        },
                        {
                          key: "single",
                          text: "Nueva Contratación",
                          value: "Nueva Contratación",
                        },
                        {
                          key: "married",
                          text: "Renovación",
                          value: "Renovación",
                        },
                        
                      ]}
                      onChange={(_, { name, value }) =>
                        formik.setFieldValue(name, value)
                      }
                      error={formik.errors.tipoContrato}
                      disabled={formik.values.statusCaptura}
                    />
                  </Form.Field>
              </div>
              <div class="fields">
              <div class="four wide field">
                <Form.Input
                  label="Monto del Contrato Anterior"
                  type="number"
                  name="sueldoAnterior"
                  placeholder="Monto del Contrato Anterior"
                  value={formik.values.sueldoAnterior}
                  onChange={formik.handleChange}
                  error={formik.errors.sueldoAnterior}
                  disabled={formik.values.statusCaptura}
                />
              </div>
              <div class="twelve wide field">
                <Form.Input
                  label="Monto del Contrato Anterior con Letra "
                  type="text"
                  name="montoLetraAnterior"
                  placeholder="Monto del Contrato Anterior con Letra"
                  value={formik.values.montoLetraAnterior}
                  onChange={formik.handleChange}
                  error={formik.errors.montoLetraAnterior}
                  disabled={formik.values.statusCaptura}
                />
              </div>
            </div>

            <div class="fields">
              <div class="four wide field">
                <Form.Input
                  label="Monto del Contrato Nuevo"
                  type="number"
                  name="impMensualBruto"
                  placeholder="Monto del Contrato"
                  value={formik.values.impMensualBruto}
                  onChange={formik.handleChange}
                  error={formik.errors.impMensualBruto}
                  disabled={formik.values.statusCaptura}
                />
              </div>
              <div class="twelve wide field">
                <Form.Input
                  label="Monto del Contrato Nuevo con Letra"
                  type="text"
                  name="montoLetra"
                  placeholder="Monto del Contrato Nuevo con Letra"
                  value={formik.values.montoLetra}
                  onChange={formik.handleChange}
                  error={formik.errors.montoLetra}
                  disabled={formik.values.statusCaptura}
                />
              </div>
            </div>


              <div class="two fields">
                <div class="nine wide field">
                  <Form.Input
                    label="Número de Oficio de Solicitud:"
                    type="text"
                    name="NoOficio"
                    placeholder="Número de Oficio"
                    value={formik.values.NoOficio}
                    onChange={formik.handleChange}
                    error={formik.errors.NoOficio}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                <div class="nine wide field">
                  <Form.Input
                    label="Fecha del Oficio de Solicitud"
                    type="date"
                    name="fechaOficio"
                    placeholder="Fecha del Oficio"
                    value={formik.values.fechaOficio}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaOficio}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
              <div class="tre fields">
                <div class="nine wide field">
                  <Form.Input
                    label="Fecha de Incio del Contrato"
                    type="date"
                    name="fechaInicioContrato"
                    placeholder="Fecha de Incio del Contrato"
                    value={formik.values.fechaInicioContrato}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaInicioContrato}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                <div class="nine wide field">
                  <Form.Input
                    label="Fecha de Finalización del Contrato"
                    type="date"
                    name="fechaFinContrato"
                    placeholder="Fecha de Finalización del Contrato"
                    value={formik.values.fechaFinContrato}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaFinContrato}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
            </div>
            <div className="details-section2">
              <h3>
                DETALLES DE LA DEPENDENCIA QUE SOLICITA AL PRESTADOR DE SERVICIO
              </h3>
              <Form.Input
                label="Nombre de la Secretaría"
                type="text"
                name="nombreSecretaria"
                placeholder="Nombre de la Secretaría"
                value={formik.values.nombreSecretaria}
                onChange={formik.handleChange}
                error={formik.errors.nombreSecretaria}
                disabled={formik.values.statusCaptura}
              />
              <div class="two fields">
                <div class="nine wide field">
                  <Form.Input
                    label="Nombre del Secretario o Secretaria: "
                    type="text"
                    name="nombreSecretario"
                    placeholder="Nombre del Secretario"
                    value={formik.values.nombreSecretario}
                    onChange={formik.handleChange}
                    error={formik.errors.nombreSecretario}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                
                <div class="nine wide field">
                  <Form.Input
                    label="Puesto del Secretario o Secretaria:"
                    type="text"
                    name="puestoSecretario"
                    placeholder="Puesto del Secretario"
                    value={formik.values.puestoSecretario}
                    onChange={formik.handleChange}
                    error={formik.errors.puestoSecretario}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                
              </div>
              <div class="four fields">
                <div class="nine wide field">
                  <Form.Input
                    label="Nombre del que Solicita al Prestador de Servicio:"
                    type="text"
                    name="nombreSolicitante"
                    placeholder="Nombre del Solicitante"
                    value={formik.values.nombreSolicitante}
                    onChange={formik.handleChange}
                    error={formik.errors.nombreSolicitante}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                
                <div class="nine wide field">
                  <Form.Input
                    label="Puesto del que Solicita al Prestador de Servicio:"
                    type="text"
                    name="puestoSolicitante"
                    placeholder="Puesto del Solicitante"
                    value={formik.values.puestoSolicitante}
                    onChange={formik.handleChange}
                    error={formik.errors.puestoSolicitante}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                
              </div>
              <div class="four fields">
                <div class="nine wide field">
                  <Form.Input
                    label="Nombre del Testigo:"
                    type="text"
                    name="nombreTestigo"
                    placeholder="Nombre del Testigo"
                    value={formik.values.nombreTestigo}
                    onChange={formik.handleChange}
                    error={formik.errors.nombreTestigo}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
               
                <div class="nine wide field">
                  <Form.Input
                    label="Puesto del Testigo:"
                    type="text"
                    name="puestoTestigo"
                    placeholder="Puesto del Testigo"
                    value={formik.values.puestoTestigo}
                    onChange={formik.handleChange}
                    error={formik.errors.puestoTestigo}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
              <div class="four fields">
              <div class="nine wide field">
                <Form.Input
                  label="Aprobado Por (Nombre) VoBo:"
                  type="text"
                  name="nombreVobo"
                  placeholder="Nombre VoBo"
                  value={formik.values.nombreVobo}
                  onChange={formik.handleChange}
                  error={formik.errors.nombreVobo}
                  disabled={formik.values.statusCaptura}
                />
              </div>

              <div class="nine wide field">
                <Form.Input
                  label="Aprobado Por (Puesto) VoBo:"
                  type="text"
                  name="puestoVobo"
                  placeholder="Puesto del VoBo"
                  value={formik.values.puestoVobo}
                  onChange={formik.handleChange}
                  error={formik.errors.puestoVobo}
                  disabled={formik.values.statusCaptura}
                />
              </div>
            </div>
            <div class="sixteen wide field">
                  <Form.Input
                    label="Domicilio de la Dependencia"
                    type="text"
                    name="domicilioSecretaria"
                    placeholder="Domicilio de la Dependencia"
                    value={formik.values.domicilioSecretaria}
                    onChange={formik.handleChange}
                    error={formik.errors.domicilioSecretaria}
                    disabled={formik.values.statusCaptura}
                  />
              </div>
            </div>       
            <div className="details-section3">
              <h3>INFORMACIÓN DEL PRESTADOR DE SERVICIOS</h3>
              <div class="fields">
                <div class="twelve wide field">
                  <Form.Input
                    label="Nombre:"
                    type="text"
                    name="nombrePdS"
                    placeholder="Nombre del Prestador de Servicio"
                    value={formik.values.nombrePdS}
                    onChange={formik.handleChange}
                    error={formik.errors.nombrePdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                <div class="four wide field">
                  <Form.Input
                    label="Edad:"
                    type="text"
                    name="edadPdS"
                    placeholder="Edad"
                    value={formik.values.edadPdS}
                    onChange={formik.handleChange}
                    error={formik.errors.edadPdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
              <div class="two fields">
                <div class="three wide field">
                  <Form.Field>
                    <label>Sexo:</label>
                    <Form.Radio
                      label="Masculino"
                      name="sexoPdS"
                      value="Masculino"
                      checked={formik.values.sexoPdS === "Masculino"}
                      onChange={(_, { value }) =>
                        formik.setFieldValue("sexoPdS", value)
                      }
                      disabled={formik.values.statusCaptura}
                    />
                    <Form.Radio
                      label="Femenino"
                      name="sexoPdS"
                      value="Femenino"
                      checked={formik.values.sexoPdS === "Femenino"}
                      onChange={(_, { value }) =>
                        formik.setFieldValue("sexoPdS", value)
                      }
                      disabled={formik.values.statusCaptura}
                    />
                  </Form.Field>
                </div>
                <div class="five wide field">
                  <Form.Field>
                    <label>Estado Civil:</label>
                    <Form.Select
                      name="estadoCivilPdS"
                      placeholder="Estado Civil"
                      value={formik.values.estadoCivilPdS}
                      options={[
                        {
                          key: "default",
                          text: "Seleccione Estado Civil",
                          value: "",
                        },
                        {
                          key: "single",
                          text: "Soltero/a",
                          value: "Soltero(a)",
                        },
                        {
                          key: "married",
                          text: "Casado/a",
                          value: "Casado(a)",
                        },
                        {
                          key: "divorced",
                          text: "Divorciado/a",
                          value: "Divorciado(a)",
                        },
                        { key: "widowed", text: "Viudo/a", value: "Viudo(a)" },
                        {
                          key: "cohabiting",
                          text: "Unión Libre",
                          value: "Unión Libre",
                        },
                      ]}
                      onChange={(_, { name, value }) =>
                        formik.setFieldValue(name, value)
                      }
                      error={formik.errors.estadoCivilPdS}
                      disabled={formik.values.statusCaptura}
                    />
                  </Form.Field>
                </div>
                <div class="eight wide field">
                  <Form.Input
                    label="Email:"
                    type="text"
                    name="emailPdS"
                    placeholder="Email"
                    value={formik.values.emailPdS}
                    onChange={formik.handleChange}
                    error={formik.errors.emailPdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
              <div class="tree fields">
                <div class="four wide field">
                  <Form.Input
                    label="C.U.R.P.:"
                    type="text"
                    name="curpdS"
                    placeholder="C.U.R.P"
                    value={formik.values.curpdS}
                    onChange={handleCURPChange}
                    error={formik.errors.curpdS}
                    disabled={formik.values.statusCaptura}
                    maxLength="18"
                  />
                </div>
                <div class="four wide field">
                  <Form.Input
                    label="Folio I.N.E.:"
                    type="text"
                    name="inePdS"
                    placeholder="Folio del I.N.E."
                    value={formik.values.inePdS}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleFolioINEChange(e);
                    }}
                    error={formik.errors.inePdS}
                    disabled={formik.values.statusCaptura}
                    maxLength="13"
                  />
                </div>
                <div class="four wide field">
                  <Form.Input
                    label="R.F.C."
                    type="text"
                    name="rfcPdS"
                    placeholder="Registro Federal de Contribuyente"
                    value={formik.values.rfcPdS}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleRFCChange(e);
                    }}
                    error={formik.errors.rfcPdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                <div class="four wide field">
                  <Form.Input
                    label="Telefono Particular"
                    type="text"
                    name="telefonoPdS"
                    placeholder="Telefono Particular"
                    value={formik.values.telefonoPdS}
                    onChange={formik.handleChange}
                    error={formik.errors.telefonoPdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
              <div class="two fields">
                <div class="twelve wide field">
                  <Form.Input
                    label="Domicilio Particular"
                    type="text"
                    name="domicilioPdS"
                    placeholder="Domicilio Particular"
                    value={formik.values.domicilioPdS}
                    onChange={formik.handleChange}
                    error={formik.errors.domicilioPdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              
                <div class="four wide field">
                  <Form.Input
                    label="Código Postal"
                    type="text"
                    name="cpPdS"
                    placeholder="Código Postal"
                    value={formik.values.cpPdS}
                    onChange={formik.handleChange}
                    error={formik.errors.cpPdS}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>

              <div class="eighteen wide field">
                <Form.Input
                  label="Licenciatura en la que se Titulo"
                  type="text"
                  name="tituloProf"
                  placeholder="Licenciatura en la que se Titulo"
                  value={formik.values.tituloProf}
                  onChange={formik.handleChange}
                  error={formik.errors.tituloProf}
                  disabled={formik.values.statusCaptura}
                />
              </div>
              <div class="four fields">
                <div class="fourteen wide field">
                  <Form.Input
                    label="Universidad que expide su titulo"
                    type="text"
                    name="institucionExpTituloProf"
                    placeholder="Universidad que expide su titulo"
                    value={formik.values.institucionExpTituloProf}
                    onChange={formik.handleChange}
                    error={formik.errors.institucionExpTituloProf}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
                <div class="four wide field">
                  <Form.Input
                    label="No de Cedula Profesional"
                    type="text"
                    name="cedulaProf"
                    placeholder="No de Cedula Profesional"
                    value={formik.values.cedulaProf}
                    onChange={formik.handleChange}
                    error={formik.errors.cedulaProf}
                    disabled={formik.values.statusCaptura}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="funcionesProf">
                  Funciones del Prestador de Servicio
                </label>
                <textarea
                  rows="4"
                  id="funcionesProf"
                  name="funcionesProf"
                  placeholder="Funciones del Prestador de Servicio"
                  value={formik.values.funcionesProf}
                  onChange={formik.handleChange}
                  disabled={formik.values.statusCaptura}
                  maxLength={399} // Aquí se establece el límite de caracteres
                />
              </div>
            </div>            
          
          
                
            <div className="details-section4">
              <h3>
              DOCUMENTACIÓN REQUERIDA DEL PRESTADOR DE SERVICIO PARA DAR DE ALTA
              EL CONTRATO
              </h3>

              {/*Boton Acta de Nacimiento*/}
              <div class="two fields">
               <div class="nine wide field">
                <h4>1.- Acta de Nacimiento</h4>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="ui buttons">
                    <Button
                      type="button"
                      color={formik.errors.pdf1 && "red"}
                      {...getRootPropsPdf1()}
                      className="ui button"
                    >
                      <Icon name="upload" />
                      {currentPdf.pdf1 ? "Cambiar" : "Subir"}
                    </Button>

                    <div className="or"></div>

                    <input {...getInputPropsPdf1()} />
                    {currentPdf.pdf1 && (
                      <div>
                        <a
                          className="ui positive button"
                          onClick={() =>
                            handleDownloadPdf(
                              "pdf1",
                              contrato.nombrePdS + "_ActaNacimiento"
                            )
                          }
                        >
                          <Icon name="download" />
                          Descargar
                        </a>
                      </div>
                    )}

                    <div className="or"></div>
                    <div>
                      <Button
                        className="ui negative button"
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            await eliminarArchivo(contrato, "pdf1");

                            cerrarFormulario();
                          } catch (error) {
                            console.error(
                              "Error al eliminar el archivo:",
                              error
                            );
                          }
                        }}
                      >
                        <Icon name="close" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>

              <div style={{ margin: "20px" }}></div>

              {/*Boton INE*/}
              <div class="nine wide field">
                <h4>2.- I.N.E. (vigente)</h4>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="ui buttons">
                    <Button
                      //onClick={() => handleDownloadPdf("pdf2")}
                      type="button"
                      color={formik.errors.pdf2 && "red"}
                      {...getRootPropsPdf2()}
                      className="ui button"
                    >
                      <Icon name="upload" />
                      {currentPdf.pdf2 ? "Cambiar" : "Subir"}
                    </Button>

                    <div className="or"></div>

                    <input {...getInputPropsPdf2()} />

                    {currentPdf.pdf2 && (
                      <div>
                        <a
                          className="ui positive button"
                          onClick={() =>
                            handleDownloadPdf(
                              "pdf2",
                              contrato.nombrePdS + "_INE"
                            )
                          }
                        >
                          <Icon name="download" />
                          Descargar
                        </a>
                      </div>
                    )}

                    <div className="or"></div>
                    <div>
                      <Button
                        className="ui negative button"
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            await eliminarArchivo(contrato, "pdf2");
                            cerrarFormulario();
                          } catch (error) {
                            console.error(
                              "Error al eliminar el archivo:",
                              error
                            );
                          }
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
              <div style={{ margin: "20px" }}></div>

              <div>
                {/*Boton Comprobante de Domicilio */}
               <div class="three fields">
                <div class="nine wide field">
                  <h4>3.- Comprobante de Domicilio (no mayor a 3 meses)</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf3 && "red"}
                        {...getRootPropsPdf3()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf3 ? "Cambiar" : "Subir"}
                      </Button>

                      <div className="or"></div>

                      <input {...getInputPropsPdf3()} />

                      {currentPdf.pdf3 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf3",
                                contrato.nombrePdS + "_ComprobanteD"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}

                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf3");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
                          }}
                        >
                          <Icon name="close" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>

                <div style={{ margin: "20px" }}></div>

                {/*Boton CURP*/}
                <div class="nine wide field">
                  <h4>4.- C.U.R.P.</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf4 && "red"}
                        {...getRootPropsPdf4()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf4 ? "Cambiar" : "Subir"}
                      </Button>

                      <div className="or"></div>

                      <input {...getInputPropsPdf4()} />

                      {currentPdf.pdf4 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf4",
                                contrato.nombrePdS + "_CURP"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}

                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf4");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
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

                <div style={{ margin: "20px" }}></div>

                {/*Boton RFC*/}
                <div class="three fields">
                 <div class="nine wide field">
                  <h4>5.- R.F.C.</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf5 && "red"}
                        {...getRootPropsPdf5()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf5 ? "Cambiar" : "Subir"}
                      </Button>

                      <div className="or"></div>

                      <input {...getInputPropsPdf5()} />

                      {currentPdf.pdf5 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf5",
                                contrato.nombrePdS + "_RFC"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}

                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf5");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
                          }}
                        >
                          <Icon name="close" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>

                <div style={{ margin: "20px" }}></div>

                {/*Boton Constancia de Situación Fiscal.*/}

                <div class="nine wide field">
                  <h4>6.- Constancia de Situación Fiscal.</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf6 && "red"}
                        {...getRootPropsPdf6()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf6 ? "Cambiar" : "Subir"}
                      </Button>

                      <div className="or"></div>

                      <input {...getInputPropsPdf6()} />

                      {currentPdf.pdf6 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf6",
                                contrato.nombrePdS + "_ConstanciaSF"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}

                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf6");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
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

                {/*Boton Titulo.*/}

                <div class="three fields">
                 <div class="nine wide field">
                  <h4>7.- Título.</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf7 && "red"}
                        {...getRootPropsPdf7()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf7 ? "Cambiar" : "Subir"}
                      </Button>

                      <div className="or"></div>

                      <input {...getInputPropsPdf7()} />

                      {currentPdf.pdf7 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf7",
                                contrato.nombrePdS + "_Titulo"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}

                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf7");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
                          }}
                        >
                          <Icon name="close" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>

                <div style={{ margin: "20px" }}></div>

                {/*Boton Cedula Profesional */}
                <div class="nine wide field">
                  <h4>
                    8.- Cedula Profesional (en el caso de no contar con ella
                    aún, presentarán solo copia del Título).
                  </h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf8 && "red"}
                        {...getRootPropsPdf8()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf8 ? "Cambiar" : "Subir"}
                      </Button>
                      <div className="or"></div>
                      <input {...getInputPropsPdf8()} />
                      {currentPdf.pdf8 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf8",
                                contrato.nombrePdS + "_CedulaP"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}
                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf8");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
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

                
                          
                {/*Boton Contrato Firmado*/}
                {/*<div>
                
                  <h4>9.- Contrato Firmado</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="ui buttons">
                      <Button
                        type="button"
                        color={formik.errors.pdf9 && "red"}
                        {...getRootPropsPdf9()}
                        className="ui button"
                      >
                        <Icon name="upload" />
                        {currentPdf.pdf9 ? "Cambiar" : "Subir"}
                      </Button>

                      <div className="or"></div>

                      <input {...getInputPropsPdf9()} />

                      {currentPdf.pdf9 && (
                        <div>
                          <a
                            className="ui positive button"
                            onClick={() =>
                              handleDownloadPdf(
                                "pdf9",
                                contrato.nombrePdS + "_ContratoFirmado"
                              )
                            }
                          >
                            <Icon name="download" />
                            Descargar
                          </a>
                        </div>
                      )}

                      <div className="or"></div>
                      <div>
                        <Button
                          className="ui negative button"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              await eliminarArchivo(contrato, "pdf9");
                              cerrarFormulario();
                            } catch (error) {
                              console.error(
                                "Error al eliminar el archivo:",
                                error
                              );
                            }
                          }}
                        >
                          <Icon name="close" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </Form>
                
                        </div>*/}
                <div style={{ margin: "20px" }}></div>
                
              </div>
            </div>
          

          <div className="details-section5">
            {auth.me && auth.me.is_staff && (
              <div className="add-edit-contrato-form__active">
                <Checkbox
                  toggle
                  checked={formik.values.statusFirma}
                  onChange={(_, data) =>
                    formik.setFieldValue("statusFirma", data.checked)
                  }
                />
                &nbsp;&nbsp;&nbsp;&nbsp;Contrato Firmado
              </div>
            )}

            <div className="add-edit-contrato-form__active">
              <Checkbox
                toggle
                checked={formik.values.statusCaptura}
                onChange={(_, data) =>
                  formik.setFieldValue("statusCaptura", data.checked)
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;Contrato Capturado
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
      )}
    </div>
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

  return {
    noContrato: (data && data.noContrato) || "",
    tipoContrato: (data && data.tipoContrato) || "",
    impMensualBruto: data && data.impMensualBruto ? data.impMensualBruto : "",
    sueldoAnterior: (data && data.sueldoAnterior) || "",
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
    nombreVobo: (data && data.nombreVobo) || "",
    puestoVobo: (data && data.puestoVobo) || "",
    domicilioSecretaria: (data && data.domicilioSecretaria) || "",
    nombrePdS: (data && data.nombrePdS) || "",
    edadPdS: (data && data.edadPdS) || "",
    sexoPdS: (data && data.sexoPdS) || "",
    estadoCivilPdS: (data && data.estadoCivilPdS) || "",
    curpdS: (data && data.curpdS) || "",
    emailPdS: (data && data.emailPdS) || "",
    inePdS: (data && data.inePdS) || "",
    domicilioPdS: (data && data.domicilioPdS) || "",
    cpPdS: (data && data.cpPdS) || "",
    rfcPdS: (data && data.rfcPdS) || "",
    funcionesProf: (data && data.funcionesProf) || "",
    tituloProf: (data && data.tituloProf) || "",
    institucionExpTituloProf: (data && data.institucionExpTituloProf) || "",
    cedulaProf: (data && data.cedulaProf) || "",
    operativoProf: (data && data.operativoProf) || "",
    fechaCreacion: (data && data.fechaCreacion) || "",
    montoLetra: (data && data.montoLetra) || "",
    montoLetraAnterior: (data && data.montoLetraAnterior) || "",
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
    pdf2: "",
    pdf3: "",
    pdf4: "",
    pdf5: "",
    pdf6: "",
    pdf7: "",
    pdf8: "",
    pdf9: "",
  };
}

function newSchema() {
  return {
    noContrato: Yup.string(),
    tipoContrato: Yup.string(),
    impMensualBruto: Yup.number(),
    sueldoAnterior: Yup.string(),
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
    nombreVobo: Yup.string(),
    puestoVobo: Yup.string(),
    domicilioSecretaria: Yup.string(),
    nombrePdS: Yup.string(),
    edadPdS: Yup.string(),
    sexoPdS: Yup.string(),
    estadoCivilPdS: Yup.string(),
    curpdS: Yup.string(),
    emailPdS: Yup.string(),
    inePdS: Yup.string(),
    domicilioPdS: Yup.string(),
    cpPdS: Yup.string(),
    rfcPdS: Yup.string(),
    funcionesProf: Yup.string(),
    tituloProf: Yup.string(),
    institucionExpTituloProf: Yup.string(),
    cedulaProf: Yup.string(),
    operativoProf: Yup.string(),
    fechaCreacion: Yup.string(),
    montoLetra: Yup.string(),
    montoLetraAnterior: Yup.string(),
    statusFirma: Yup.boolean(),
    statusCaptura: Yup.boolean(),
    user_id: Yup.string(),
    user_nombre: Yup.string(),
    fechaInicioContrato: Yup.string(),
    fechaFinContrato: Yup.string(),
    telefonoPdS: Yup.string(),
    pdf1: Yup.string(),
    pdf2: Yup.string(),
    pdf3: Yup.string(),
    pdf4: Yup.string(),
    pdf5: Yup.string(),
    pdf6: Yup.string(),
    pdf7: Yup.string(),
    pdf8: Yup.string(),
    pdf9: Yup.string(),
  };
}

function updateSchema() {
  return {
    noContrato: Yup.string(),
    tipoContrato: Yup.string(),
    impMensualBruto: Yup.number(),
    sueldoAnterior: Yup.string(),
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
    nombreVobo: Yup.string(),
    puestoVobo: Yup.string(),
    domicilioSecretaria: Yup.string(),
    nombrePdS: Yup.string(),
    edadPdS: Yup.string(),
    sexoPdS: Yup.string(),
    estadoCivilPdS: Yup.string(),
    curpdS: Yup.string(),
    emailPdS: Yup.string(),
    inePdS: Yup.string(),
    domicilioPdS: Yup.string(),
    cpPdS: Yup.string(),
    rfcPdS: Yup.string(),
    funcionesProf: Yup.string(),
    tituloProf: Yup.string(),
    institucionExpTituloProf: Yup.string(),
    cedulaProf: Yup.string(),
    operativoProf: Yup.string(),
    fechaCreacion: Yup.string(),
    montoLetra: Yup.string(),
    montoLetraAnterior: Yup.string(),
    statusFirma: Yup.boolean(),
    statusCaptura: Yup.boolean(),
    user_id: Yup.string(),
    user_nombre: Yup.string(),
    fechaInicioContrato: Yup.string(),
    fechaFinContrato: Yup.string(),
    telefonoPdS: Yup.string(),
    pdf1: Yup.string(),
    pdf2: Yup.string(),
    pdf3: Yup.string(),
    pdf4: Yup.string(),
    pdf5: Yup.string(),
    pdf6: Yup.string(),
    pdf7: Yup.string(),
    pdf8: Yup.string(),
    pdf9: Yup.string(),
  };
}
//export default AddEditContratoForm;
