function convertirNumeroALetras(numero) {
    // Implementa aquí la lógica para convertir el número a letras
    // Puedes utilizar una librería o escribir tu propia función para hacer la conversión
    // Aquí te proporciono una función de ejemplo simple que solo funciona para números menores a mil
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  
    let letra = '';
    const num = parseInt(numero);
  
    if (num >= 1 && num <= 999) {
      if (num === 100) {
        letra = 'cien';
      } else if (num > 100) {
        letra = centenas[Math.floor(num / 100)];
        num % 100 !== 0 && (letra += ' ' + convertirNumeroALetras(num % 100));
      } else if (num >= 90 && num <= 99) {
        letra = 'noventa y ' + unidades[num % 10];
      } else if (num >= 80 && num <= 89) {
        letra = 'ochenta y ' + unidades[num % 10];
      } else if (num >= 70 && num <= 79) {
        letra = 'setenta y ' + unidades[num % 10];
      } else if (num >= 60 && num <= 69) {
        letra = 'sesenta y ' + unidades[num % 10];
      } else if (num >= 50 && num <= 59) {
        letra = 'cincuenta y ' + unidades[num % 10];
      } else if (num >= 40 && num <= 49) {
        letra = 'cuarenta y ' + unidades[num % 10];
      } else if (num >= 30 && num <= 39) {
        letra = 'treinta y ' + unidades[num % 10];
      } else if (num >= 21 && num <= 29) {
        letra = decenas[Math.floor(num / 10)] + ' y ' + unidades[num % 10];
      } else if (num >= 11 && num <= 19) {
        letra = especiales[num - 10];
      } else {
        letra = unidades[num];
      }
    }
  
    return letra;
  }
  
  export default convertirNumeroALetras;