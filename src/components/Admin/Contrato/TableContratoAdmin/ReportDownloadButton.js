/*import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const ReportDownloadButton = ({ contrato }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    fetch(`/api/contratos/${contrato.id}/pdf`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la solicitud.");
        }
        return response.blob();
      })
      .then((blob) => {
        // Crear una URL temporal para el archivo PDF y descargarlo
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `contrato_${contrato.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el archivo PDF:", error);
        setLoading(false);
      });
  };

  return (
    <Button icon onClick={handleDownload} disabled={loading}>
      {loading ? "Descargando..." : "Descargar Informe"}
    </Button>
  );
};

export default ReportDownloadButton;*/

import React from 'react';
import axios from 'axios';

const ReportDownloadButton = ({ contrato }) => {
  const handleDownload = () => {
    // Llama a la API para generar y descargar el PDF.
    axios.get(`/generar_pdf_contrato/${contrato.id}/`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', `contrato_${contrato.id}.pdf`);
        document.body.appendChild(a);
        a.click();
      })
      .catch(error => {
        console.error('Error al descargar el PDF', error);
      });
  };

  return (
    <button onClick={handleDownload}>Descargar PDF</button>
  );
};

export default ReportDownloadButton;