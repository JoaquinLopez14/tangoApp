import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/TableOfPoints.css";
import "../assets/ScoreManagement.css";
import DatedOfToday from "../hooks/DatedOfToday";

function TableOfPoints({ datos }) {
  const [rank, setRank] = useState("asc");
  const [orden, setOrden] = useState("asc");
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('datosParejas')) || [];
    setAllData(storedData);
  }, []);

  useEffect(() => {
    if (datos && datos.parejas) {
      setAllData(datos.parejas);
    }
  }, [datos]);

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
      <div className="bt-container">
        <Link to="/" className="backHome">
          Volver Atras
        </Link>
      </div>
      <div className="current-date">
        <DatedOfToday />
      </div>
      <div className="list">
        <button className="button-list" id="rank" onClick={sortByOrden}>Orden</button>
        <button className="button-list" id="competidores">Competidores</button>
        <button className="button-list">Juez 1</button>
        <button className="button-list">Juez 2</button>
        <button className="button-list">Juez 3</button>
        <button className="button-list">Juez 4</button>
        <button className="button-list">Juez 5</button>
        <button className="button-list">Total</button>
        <button className="button-list" id="rank" onClick={sortByRank}>Rank</button>
      </div>
      {!allData || allData.length === 0 ? (
        <div className="no-data">
          <p className="no-data-p">No hay datos disponibles</p>
        </div>
      ) : (
        <div className="score-container">
          {allData.map((pareja) => (
            <div className="scores" key={pareja.orden}>
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
