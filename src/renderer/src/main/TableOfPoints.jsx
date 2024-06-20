import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatedOfToday from "../components/DatedOfToday";
import { AverageScore } from "../Components";
import "../assets/TableOfPoints.css";
import "../assets/ScoreManagement.css";

function TableOfPoints({ datos }) {
  const [rank, setRank] = useState("asc");
  const [orden, setOrden] = useState("asc");
  const [allData, setAllData] = useState([]);
  const [judgeNames, setJudgeNames] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('datosParejas')) || [];
    setAllData(storedData);
    const storedJudgeNames = JSON.parse(localStorage.getItem('judgeNames')) || [];
    setJudgeNames(storedJudgeNames.slice(0, 5));  // Limitar a 5 jueces
  }, []);

  useEffect(() => {
    if (datos && datos.parejas) {
      setAllData(prevData => [...prevData, ...datos.parejas]);
      setJudgeNames(datos.judgeNames.slice(0, 5));  // Limitar a 5 jueces
    }
  }, [datos]);

  useEffect(() => {
    localStorage.setItem('datosParejas', JSON.stringify(allData));
    localStorage.setItem('judgeNames', JSON.stringify(judgeNames));
  }, [allData, judgeNames]);

  const sortByRank = () => {
    const newRank = rank === "asc" ? "desc" : "asc";
    setRank(newRank);
  
    setAllData(prevData => {
      const sortedData = [...prevData].sort((a, b) => {
        const promedioA = parseFloat(AverageScore.calcularPromedioPareja(a.puntajes).promedio);
        const promedioB = parseFloat(AverageScore.calcularPromedioPareja(b.puntajes).promedio);
  
        if (newRank === "asc") {
          return promedioA - promedioB;
        } else {
          return promedioB - promedioA;
        }
      });
      return sortedData;
    });
  };

  const sortByOrden = () => {
    const newOrden = orden === "asc" ? "desc" : "asc";
    setOrden(newOrden);

    setAllData(prevData => [...prevData].sort((a, b) => {
      if (newOrden === "asc") {
        return a.orden - b.orden;
      } else {
        return b.orden - a.orden;
      }
    }));
  };

  return (
    <section className="pr-sc2">
      <nav className="title-container">
        <h1 className="sc-title">Tabla de Puntuacion</h1>
      </nav>
      <div className="bt-backhome-container">
        <Link to="/" className="backhome">Volver Atrás</Link>
      </div>
      <DatedOfToday />
      {!allData || allData.length === 0 ? (
        <div className="no-data">
          <p className="no-data-p">No hay datos disponibles</p>
        </div>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th onClick={sortByOrden} className="th-header" id="bt-admin">Orden</th>
              <th className="th-header">Competidores</th>
              {judgeNames.map((judge, index) => (
                <th className="th-header" key={index}>{judge}</th>
              ))}
              <th onClick={sortByRank} className="th-header" id="bt-admin">Total</th>
              <th className="th-header">Rank</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((pareja, index) => {
              const { promedio, indiceMin, indiceMax } = AverageScore.calcularPromedioPareja(pareja.puntajes);

              return (
                <tr key={index}>
                  <td className="td-data">{pareja.orden}</td>
                  <td className="td-data">
                    <ul className="pair-names">
                      <li>{pareja.nombreBailarina}</li>
                      <li>{pareja.nombreBailarin}</li>
                    </ul>
                  </td>
                  {pareja.puntajes.map((puntaje, puntajeIndex) => (
                      <td
                        className={`td-data ${
                          puntajeIndex === indiceMin || puntajeIndex === indiceMax ? "td-extremo" : ""
                        }`}
                        key={puntajeIndex}
                      >
                        {puntaje}
                      </td>
                  ))}
                  <td className="td-data" id="td-total">{promedio}</td>
                  <td className="td-data">{index + 1}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TableOfPoints;
