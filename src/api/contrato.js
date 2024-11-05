import { BASE_API } from "../utils/constants";
import { useAuth } from "../hooks";

export async function getContratosApi() {
  try {
    const url = `${BASE_API}/api/contratos/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addContratoApi(data, token) {
  try {
    //const {auth} = useAuth();
    //console.log(auth);

    const formData = new FormData();
    formData.append("noContrato", data.noContrato);
    formData.append("tipoContrato", data.tipoContrato);
    formData.append("impMensualBruto", data.impMensualBruto);
    formData.append("sueldoAnterior", data.sueldoAnterior);
    formData.append("fechaOficio", data.fechaOficio);
    formData.append("NoOficio", data.NoOficio);
    formData.append("nombreSecretario", data.nombreSecretario);
    formData.append("puestoSecretario", data.puestoSecretario);
    formData.append("nombreSecretaria", data.nombreSecretaria);
    formData.append("dependencia_id", data.dependencia_id);
    formData.append("nombreSolicitante", data.nombreSolicitante);
    formData.append("puestoSolicitante", data.puestoSolicitante);
    formData.append("nombreTestigo", data.nombreTestigo);
    formData.append("puestoTestigo", data.puestoTestigo);
    formData.append("nombreVobo", data.nombreVobo);
    formData.append("puestoVobo", data.puestoVobo);
    formData.append("domicilioSecretaria", data.domicilioSecretaria);
    formData.append("nombrePdS", data.nombrePdS);
    formData.append("edadPdS", data.edadPdS);
    formData.append("sexoPdS", data.sexoPdS);
    formData.append("estadoCivilPdS", data.estadoCivilPdS);
    formData.append("curpdS", data.curpdS);
    formData.append("emailPdS", data.emailPdS);
    formData.append("inePdS", data.inePdS);
    formData.append("domicilioPdS", data.domicilioPdS);
    formData.append("cpPdS", data.cpPdS);
    formData.append("rfcPdS", data.rfcPdS);
    formData.append("funcionesProf", data.funcionesProf);
    formData.append("tituloProf", data.tituloProf);
    formData.append("institucionExpTituloProf", data.institucionExpTituloProf);
    formData.append("cedulaProf", data.cedulaProf);
    formData.append("operativoProf", data.operativoProf);
    formData.append("fechaCreacion", data.fechaCreacion);
    formData.append("montoLetra", data.montoLetra);
    formData.append("montoLetraAnterior", data.montoLetraAnterior);
    formData.append("statusFirma", data.statusFirma);
    formData.append("statusCaptura", data.statusCaptura);
    formData.append("user_id", data.user_id);
    formData.append("user_nombre", data.user_nombre);
    formData.append("fechaInicioContrato", data.fechaInicioContrato);
    formData.append("fechaFinContrato", data.fechaFinContrato);
    formData.append("telefonoPdS", data.telefonoPdS);
    formData.append("pdf1", data.pdf1);
    formData.append("pdf2", data.pdf2);
    formData.append("pdf3", data.pdf3);
    formData.append("pdf4", data.pdf4);
    formData.append("pdf5", data.pdf5);
    formData.append("pdf6", data.pdf6);
    formData.append("pdf7", data.pdf7);
    formData.append("pdf8", data.pdf8);
    formData.append("pdf9", data.pdf9);
    const url = `${BASE_API}/api/contratos/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateContratoApi(id, data, token) {
  try {
    //const {auth} = useAuth();
    //console.log(auth);
    const formData = new FormData();
    formData.append("noContrato", data.noContrato);
    formData.append("tipoContrato", data.tipoContrato);
    formData.append("impMensualBruto", data.impMensualBruto);
    formData.append("sueldoAnterior", data.sueldoAnterior);
    formData.append("fechaOficio", data.fechaOficio);
    formData.append("NoOficio", data.NoOficio);
    formData.append("nombreSecretario", data.nombreSecretario);
    formData.append("puestoSecretario", data.puestoSecretario);
    formData.append("nombreSecretaria", data.nombreSecretaria);
    formData.append("dependencia_id", data.dependencia_id);
    formData.append("nombreSolicitante", data.nombreSolicitante);
    formData.append("puestoSolicitante", data.puestoSolicitante);
    formData.append("nombreTestigo", data.nombreTestigo);
    formData.append("puestoTestigo", data.puestoTestigo);
    formData.append("nombreVobo", data.nombreVobo);
    formData.append("puestoVobo", data.puestoVobo);
    formData.append("domicilioSecretaria", data.domicilioSecretaria);
    formData.append("nombrePdS", data.nombrePdS);
    formData.append("edadPdS", data.edadPdS);
    formData.append("sexoPdS", data.sexoPdS);
    formData.append("estadoCivilPdS", data.estadoCivilPdS);
    formData.append("curpdS", data.curpdS);
    formData.append("emailPdS", data.emailPdS);
    formData.append("inePdS", data.inePdS);
    formData.append("domicilioPdS", data.domicilioPdS);
    formData.append("cpPdS", data.cpPdS);
    formData.append("rfcPdS", data.rfcPdS);
    formData.append("funcionesProf", data.funcionesProf);
    formData.append("tituloProf", data.tituloProf);
    formData.append("institucionExpTituloProf", data.institucionExpTituloProf);
    formData.append("cedulaProf", data.cedulaProf);
    formData.append("operativoProf", data.operativoProf);
    formData.append("fechaCreacion", data.fechaCreacion);
    formData.append("montoLetra", data.montoLetra);
    formData.append("montoLetraAnterior", data.montoLetraAnterior);
    formData.append("statusFirma", data.statusFirma);
    formData.append("statusCaptura", data.statusCaptura);
    formData.append("user_id", data.user_id);
    formData.append("user_nombre", data.user_nombre);
    formData.append("fechaInicioContrato", data.fechaInicioContrato);
    formData.append("fechaFinContrato", data.fechaFinContrato);
    formData.append("telefonoPdS", data.telefonoPdS);
    if (data.pdf1) formData.append("pdf1", data.pdf1);
    if (data.pdf2) formData.append("pdf2", data.pdf2);
    if (data.pdf3) formData.append("pdf3", data.pdf3);
    if (data.pdf4) formData.append("pdf4", data.pdf4);
    if (data.pdf5) formData.append("pdf5", data.pdf5);
    if (data.pdf6) formData.append("pdf6", data.pdf6);
    if (data.pdf7) formData.append("pdf7", data.pdf7);
    if (data.pdf8) formData.append("pdf8", data.pdf8);
    if (data.pdf9) formData.append("pdf9", data.pdf9);
   

    const url = `${BASE_API}/api/contratos/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteContratoApi(id, token) {
  try {
    const url = `${BASE_API}/api/contratos/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
