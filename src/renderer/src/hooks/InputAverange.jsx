import React from 'react';

const AverageScore = ({ puntajes, showlabel }) => {
  const calcularPromedioPareja = (puntajes) => {
    const puntajesSinExtremos = puntajes
      .map((puntaje) => parseFloat(puntaje.replace(",", ".")))
      .sort((a, b) => a - b)
      .slice(1, -1);
    const promedio = puntajesSinExtremos.reduce((acc, puntaje) => acc + puntaje, 0) / puntajesSinExtremos.length;
    return isNaN(promedio) ? "" : promedio.toFixed(3);
  };

  return (
    <div className="input-average-container" id="promedio">
      {showlabel && <h2 className="input-option-name">Promedio</h2>}
      <input className="input-point" type="number" id="total" value={calcularPromedioPareja(puntajes)} readOnly />
    </div>
  );
};

// Definir la función calcularPromedioPareja como estática
AverageScore.calcularPromedioPareja = (puntajes) => {
  const puntajesSinExtremos = puntajes
    .map((puntaje) => parseFloat(puntaje.replace(",", ".")))
    .sort((a, b) => a - b)
    .slice(1, -1);
  const promedio = puntajesSinExtremos.reduce((acc, puntaje) => acc + puntaje, 0) / puntajesSinExtremos.length;
  return isNaN(promedio) ? "" : promedio.toFixed(3);
};

export default AverageScore;
