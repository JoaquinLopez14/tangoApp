import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatedOfToday from "../hooks/DatedOfToday";
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
      setJudgeNames(storedJudgeNames);
  }, []);

  useEffect (() => {
    if (datos && datos.parejas) {
      setAllData(prevData => [...prevData, ...datos.parejas])
      setJudgeNames(datos.judgeNames);
    }
  }, [datos]);

  useEffect (() => {
    localStorage.setItem('datosParejas', JSON.stringify(allData));
    localStorage.setItem('judgeNames', JSON.stringify(judgeNames));
  }, [allData, judgeNames]);


  const sortByRank = () => {
    const newRank = rank === "asc" ? "desc" : "asc";
    setRank(newRank);

    setAllData(prevData => [...prevData].sort((a, b) => {
      if (newRank === "asc") {
        return a.total - b.total;
      } else {
        return b.total - a.total;
      }
    }));
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
    <section className="pr-sc">
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
        <div className="score-container">
          <div className="sort-buttons">
            <button onClick={sortByRank}>
              Promedio ({rank === "asc" ? "Ascendente" : "Descendente"})
            </button>
            <button onClick={sortByOrden}>
              Orden ({orden === "asc" ? "Ascendente" : "Descendente"})
            </button>
          </div>
          <div className="table-header">
            <span className="header-item">ORDEN</span>
            <span className="header-item">COMPETIDORES</span>
              {judgeNames.map((judge, index) => (
              <span className="header-item" key={index}>{judge}</span>
              ))}
            <span className="header-item">TOTAL</span>
            <span className="header-item">RANK</span>
          </div>
          {allData.map((pareja, index) => (
            <div className="scores" key={index}>
              <div className="pair-order-container">
                <span className="pair-order">{pareja.orden}</span>
              </div>
              <div className="pair-names-container">
                <ul className="pair-names">
                  <li className="pair-names-list">{pareja.nombreBailarina}</li>
                  <li className="pair-names-list">{pareja.nombreBailarin}</li>
                </ul>
              </div>
              <div className="pair-container">
                {pareja.puntajes.map((puntaje, puntajeIndex) => (
                  <div className="pair-point-container" key={puntajeIndex}>
                    <span className="pair-point">{puntaje}</span>
                  </div>
                ))}
              </div>
              <div className="pair-total-container">
                <span className="pair-total">{pareja.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TableOfPoints;
