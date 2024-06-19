import React from 'react';

const AverageScore = ({ puntajes, showlabel }) => {
  const calcularPromedioPareja = (puntajes) => {
    const puntajesNumericos = puntajes
      .map((puntaje) => parseFloat(puntaje.replace(",", ".")))
      .sort((a, b) => a - b);
    const puntajesSinExtremos = puntajesNumericos.slice(1, -1);
    const promedio = puntajesSinExtremos.reduce((acc, puntaje) => acc + puntaje, 0) / puntajesSinExtremos.length;
    return {
      promedio: isNaN(promedio) ? "" : promedio.toFixed(3),
      puntajeMin: puntajesNumericos[0].toFixed(3),
      puntajeMax: puntajesNumericos[puntajesNumericos.length - 1].toFixed(3),
    };
  };

  const { promedio } = calcularPromedioPareja(puntajes);

  return (
    <div className="input-average-container" id="promedio">
      {showlabel && <h2 className="input-option-name">Promedio</h2>}
      <input className="input-point" type="number" id="total" value={promedio} readOnly />
    </div>
  );
};

// Definir la función calcularPromedioPareja como estática
AverageScore.calcularPromedioPareja = (puntajes) => {
  const puntajesNumericos = puntajes
    .map((puntaje) => parseFloat(puntaje.replace(",", ".")))
    .sort((a, b) => a - b);
  const puntajesSinExtremos = puntajesNumericos.slice(1, -1);
  const promedio = puntajesSinExtremos.reduce((acc, puntaje) => acc + puntaje, 0) / puntajesSinExtremos.length;
  return {
    promedio: isNaN(promedio) ? "" : promedio.toFixed(3),
    puntajeMin: puntajesNumericos[0].toFixed(3),
    puntajeMax: puntajesNumericos[puntajesNumericos.length - 1].toFixed(3),
  };
};

export default AverageScore;

